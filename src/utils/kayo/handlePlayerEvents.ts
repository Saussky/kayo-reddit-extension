import { applyStylesToLowerControlsContainer } from "./controls";
import { deleteControlsContainer } from "./controls";


export default function handlePlayerEvents (player: HTMLElement) {
    let idleTimeout: ReturnType<typeof setTimeout>

    player.addEventListener("mouseover", () => {
        applyStylesToLowerControlsContainer();
    })

    player.addEventListener("mouseleave", () => {
        setTimeout(deleteControlsContainer, 1500);
    });

    player.addEventListener("mousemove", () => {
        if (idleTimeout) {
            clearTimeout(idleTimeout);
        }

        idleTimeout = setTimeout(deleteControlsContainer, 3000);
        applyStylesToLowerControlsContainer();
    })
}