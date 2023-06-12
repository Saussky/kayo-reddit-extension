import animateTickerItem from "./animate";


export default function addNewsTickerItem(element: HTMLElement, newsTicker: HTMLElement): void {
    const tickerItem = element.cloneNode(true) as HTMLElement;
    tickerItem.style.cssText = `
    display: inline-block;
    padding: 0 2rem;
    font-size: 1.2rem;
    color: white;
  `;
    animateTickerItem(tickerItem, newsTicker, 15000);
    newsTicker.appendChild(tickerItem);
}
