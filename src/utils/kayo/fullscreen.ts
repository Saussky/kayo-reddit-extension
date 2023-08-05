import animateTickerItem from "../ticker/animate";
import addNewsTickerItem from "../ticker/addItem";
import { deleteControlsContainer } from "./controls"
import initTicker from "../init/initTicker";

export default function handleFullscreenChange(video: HTMLVideoElement, foundMatchingThread: string): void {
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            return
        } else {
            console.log('a')
        }
    });
}