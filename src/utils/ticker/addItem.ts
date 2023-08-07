import animateTickerItem from "./animate";

export default function addNewsTickerItem(element: HTMLElement, newsTicker: HTMLElement, onEdgeReached: () => void): void {
  const tickerItem = element.cloneNode(true) as HTMLElement;
  tickerItem.style.cssText = `
  display: inline-block;
  padding: 0 2rem;
  font-size: 1.2rem;
  color: white;
  position: absolute;
  right: -40vw;
  `;

  const triggerDistance = window.innerWidth * 0.89; // 89% of screen width

  const timer = setInterval(() => {
    const tickerItemRight = tickerItem.getBoundingClientRect().right;

    // Check if the right edge of the ticker item has reached 5vw from the right of the viewport
    if (tickerItemRight <= triggerDistance) {
      clearInterval(timer);  // Clear the interval to prevent continuous checks once the condition is met
      onEdgeReached();
    }
  }, 100);

  newsTicker.appendChild(tickerItem); // Append tickerItem before starting the animation
  animateTickerItem(tickerItem, newsTicker);
}