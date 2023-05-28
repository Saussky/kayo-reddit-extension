import animateTickerItem from "../ticker/animate";

export default function handleFullscreenChange(commentContainer: HTMLElement, newsTicker: HTMLElement): void {
    document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement) {
            commentContainer.style.display = "none";
            newsTicker.style.display = "flex";
            Array.from(commentContainer.children).forEach((commentDiv) =>
                animateTickerItem(commentDiv as HTMLElement, newsTicker, 15000)
            );
        } else {
            commentContainer.style.display = "block";
            newsTicker.style.display = "none";
        }
    });
}