export default function animateTickerItem(tickerItem: HTMLElement, newsTicker: HTMLElement, duration: number): void {
    let start: number | null = null;
    const end: number = newsTicker.clientWidth + tickerItem.clientWidth;

    const step = (timestamp: number): void => {
        if (start === null) start = timestamp;

        const progress: number = timestamp - start;
        const position: number = end * progress / duration;

        tickerItem.style.transform = `translateX(-${position}px)`;

        if (progress < duration) {
            requestAnimationFrame(step);
        } else {
            setTimeout(() => {
                newsTicker.removeChild(tickerItem);
            }, 2000); // 2 second delay before removal.
        }
    };

    requestAnimationFrame(step);
}