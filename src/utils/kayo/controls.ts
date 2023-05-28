export function applyStylesToLowerControlsContainer() {
    const lowerControlsContainer = document.querySelector(".sc-01-lower-controls__LowerControlsContainer-sc-1ec7mdq-0") as HTMLElement;

    if (lowerControlsContainer) {
        lowerControlsContainer.style.display = 'flex'
        lowerControlsContainer.style.position = "fixed";
        lowerControlsContainer.style.bottom = "0";
        lowerControlsContainer.style.left = "50%";
        lowerControlsContainer.style.transform = "translateX(-50%)";
        lowerControlsContainer.style.zIndex = "1000";
        lowerControlsContainer.style.opacity = "1";
        lowerControlsContainer.style.transition = "opacity 0.3s ease-in-out";
    }
}

export function deleteControlsContainer() {
    const lowerControlsContainer = document.querySelector(".sc-01-lower-controls__LowerControlsContainer-sc-1ec7mdq-0") as HTMLElement;
    if (lowerControlsContainer) {
        lowerControlsContainer.style.opacity = "0";
        setTimeout(() => {
            lowerControlsContainer.style.display = 'none';
        }, 300);
    }
}