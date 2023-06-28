import updatePlayerStyles from "../kayo/movePlayer";
import handlePlayerEvents from "../kayo/handlePlayerEvents";
import initSidebar from "./initSidebar";


export default function initExtension(video: HTMLVideoElement, foundMatchingThread: string) {
    const sidebar = document.getElementById('kayo-reddit-sidebar')
    if (sidebar) document.removeChild(sidebar)

    const iframe: HTMLIFrameElement = document.createElement('iframe');
    iframe.id = 'kayo-reddit-sidebar';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.cssText = `
      border: none;
      height: 100%;
      position: absolute;
      width: 335px;
      top: 0;
      z-index: 99999;
    `;

    iframe.onload = () => {
        initSidebar(video, iframe, foundMatchingThread);
    };

    const kayoPlayer = document.querySelector('.player__VideoBackingCard-sc-ocmrm0-1') as HTMLElement
    if (kayoPlayer) {
        updatePlayerStyles(kayoPlayer, iframe);
        kayoPlayer.parentElement?.appendChild(iframe);
        handlePlayerEvents(kayoPlayer);
    } else {
        console.log("Can't find video player element")
    }
}
