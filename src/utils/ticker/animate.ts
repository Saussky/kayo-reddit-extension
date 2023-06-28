// export default function animateTickerItem(tickerItem: HTMLElement, newsTicker: HTMLElement, duration: number): void {
//     let start: number | null = null;
//     const end: number = newsTicker.clientWidth + tickerItem.clientWidth;

//     const step = (timestamp: number): void => {
//         if (start === null) start = timestamp;

//         const progress: number = timestamp - start;
//         const position: number = end * progress / duration;

//         tickerItem.style.transform = `translateX(-${position}px)`;

//         if (progress < duration) {
//             requestAnimationFrame(step);
//         } else {
//             setTimeout(() => {
//                 newsTicker.removeChild(tickerItem);
//             }, 2000); // 2 second delay before removal.
//         }
//     };

//     requestAnimationFrame(step);
// }

export default function animateTickerItem(tickerItem: HTMLElement, newsTicker: HTMLElement): void {
    const speed = 100; // Pixels per second
    const end: number = newsTicker.clientWidth + tickerItem.clientWidth;
    const duration: number = end / speed * 1000; // Duration in milliseconds

    // Prepare the item for transition
    tickerItem.style.transition = 'none'; // Disable transitions
    tickerItem.style.transform = `translateX(0px)`; // Reset position

    // Let the DOM updates flush, so that the transform reset is definitely not animated
    requestAnimationFrame(() => {
        // Enable and start the transition
        tickerItem.style.transition = `transform ${duration}ms linear`;
        tickerItem.style.transform = `translateX(-${end}px)`;

        tickerItem.addEventListener('transitionend', () => {
            newsTicker.removeChild(tickerItem);
        }, {once: true});
    });
}


