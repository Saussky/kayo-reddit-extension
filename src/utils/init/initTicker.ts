import createTicker from '../ticker/create';
import handleFullscreenChange from '../kayo/fullscreen';
import fetchAndDisplayComments from './commentHandler';
import { prod } from '../../content';

export default async function initTicker(
    video: HTMLVideoElement,
    foundMatchingThread: string
): Promise<void> {
    const newsTicker: HTMLElement = createTicker(video); // Creates the news ticker div
    let seenCommentIDs: Set<string> = new Set(); // Stores reddit comments via ID to check for repeats

    // !prod && fetchAndDisplayComments(foundMatchingThread, newsTicker, seenCommentIDs)

    setInterval(() => {
        fetchAndDisplayComments(foundMatchingThread, newsTicker, seenCommentIDs)
    }, 1000);
}