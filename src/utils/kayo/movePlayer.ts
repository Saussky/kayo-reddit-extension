// Function to update player styles
export default function updatePlayerStyles (player: HTMLElement, iframe: HTMLIFrameElement) {
    player.style.setProperty('left', 'calc(0% - 4vw)', 'important');
    player.style.setProperty('transform', 'translate(0%, -50%)', 'important');
    player.style.setProperty('width', 'calc(100% - 190px)', 'important');
    player.style.setProperty('height', '100vh');

    const playerWidth = player.getBoundingClientRect().width;
    iframe.style.left = `calc(${playerWidth}px - 5vw)`;
}