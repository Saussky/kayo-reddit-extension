import animateTickerItem from "../ticker/animate";
import addNewsTickerItem from "../ticker/addItem";
import { deleteControlsContainer } from "./controls"

export default function handleFullscreenChange(commentContainer: HTMLElement, newsTicker: HTMLElement): void {
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            deleteControlsContainer()
            commentContainer.style.display = "none";
            newsTicker.style.display = "flex";

        } else {
            commentContainer.style.display = "block";
            newsTicker.style.display = "flex";
        }
    });
}