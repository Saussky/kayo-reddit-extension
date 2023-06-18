import createTicker from '../ticker/create';
import handleFullscreenChange from '../kayo/fullscreen';
import fetchAndDisplayComments from './commentHandler';


export default async function initSidebar(
    video: HTMLVideoElement,
    iframe: HTMLIFrameElement,
    foundMatchingThread: string
): Promise<void> {
    // Gets the extension from the DOM
    const commentContainer = iframe.contentDocument!.querySelector('#comments-container') as HTMLElement
    const newsTicker: HTMLElement = createTicker(video); // Creates the news ticker
    newsTicker.style.backgroundColor = "rgba(0,0,0,0.01)"; // 0.1 represents 10% opacity
    let seenCommentIDs: Set<string> = new Set(); // Stores reddit comments via ID to check for repeats

    handleFullscreenChange(commentContainer, newsTicker); // Listens for fullscreen events
    setInterval(() => {
        fetchAndDisplayComments(foundMatchingThread, newsTicker, commentContainer, seenCommentIDs)
    }, 1000);
}