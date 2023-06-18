export default function createTicker(video: HTMLVideoElement): HTMLElement {
    const ticker = document.createElement("div");
    ticker.className = 'ticker-wrap'
    ticker.style.cssText = `
      position: absolute;
      bottom: 0;
      color: white;
      width: 100%;
      height: 30px;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.5);
      box-sizing: content-box;
      display: flex;
      align-items: center;
      white-space: nowrap;
      z-index: 999;
      display: none;
    `;

    video.parentElement!.appendChild(ticker);

    return ticker;
}