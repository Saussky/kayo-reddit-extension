import createTicker from '../ticker/create';
import handleFullscreenChange from '../kayo/fullscreen';
import fetchAndDisplayComments from './commentHandler';
import { prod } from '../../content';

export default async function initSidebar(
    video: HTMLVideoElement,
    iframe: HTMLIFrameElement,
    foundMatchingThread: string
): Promise<void> {
    const commentContainer = iframe.contentDocument!.querySelector('#comments-container') as HTMLElement // Gets the extension from the DOM
    const newsTicker: HTMLElement = createTicker(video); // Creates the news ticker
    let seenCommentIDs: Set<string> = new Set(); // Stores reddit comments via ID to check for repeats

    handleFullscreenChange(commentContainer, newsTicker); // Listens for fullscreen events
    !prod && fetchAndDisplayComments(foundMatchingThread, newsTicker, commentContainer, seenCommentIDs)

    setInterval(() => {
        fetchAndDisplayComments(foundMatchingThread, newsTicker, commentContainer, seenCommentIDs)
    }, 1000);
}