import updatePlayerStyles from "../kayo/movePlayer";
import handlePlayerEvents from "../kayo/handlePlayerEvents";
import initSidebar from "./initTicker";
import handleFullscreenChange from "../kayo/fullscreen";
import createTicker from "../ticker/create";
import initTicker from "./initTicker";


export default function initExtension(video: HTMLVideoElement, foundMatchingThread: string) {
    // class="normalized-styled-components__Section-sc-1ps5wcq-2 component__PlayerBackingCard-sc-156ft39-0 btqTYd hPxZkt sm-web-player"
    // .player__VideoBackingCard-sc-ocmrm0-1
    const kayoPlayer = document.querySelector('.component__PlayerBackingCard-sc-156ft39-0') as HTMLElement
    if (kayoPlayer) {
        initTicker(video, foundMatchingThread)
    } else {
        console.log("Can't find video player element")
    }
}
