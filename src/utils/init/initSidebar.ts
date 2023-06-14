import { redditComment } from '../../interfaces';
import fetchComments from '../reddit/fetchComments';
import formatSidebarComment from '../reddit/formatSidebarComment';
import createTicker from '../ticker/create';
import handleFullscreenChange from '../kayo/fullscreen';
import addNewsTickerItem from '../ticker/addItem';
import formatTickerComment from '../reddit/formatTickerComment';
import { prod } from '../../content';


export default async function initSidebar(
    video: HTMLVideoElement,
    iframe: HTMLIFrameElement,
    foundMatchingThread: string
): Promise<void> {
    // Gets the extension from the DOM
    const commentContainer = iframe.contentDocument!.querySelector('#comments-container') as HTMLElement
    // Creates the news ticker
    const newsTicker: HTMLElement = createTicker(video);
    // Stores reddit comments via ID so they don't repeat
    let seenCommentIDs: Set<string> = new Set();


    handleFullscreenChange(commentContainer, newsTicker);
    // await fetchAndDisplayComments(foundMatchingThread, newsTicker, commentContainer, oldComments);
    setInterval(() => {
        fetchAndDisplayComments(foundMatchingThread, newsTicker, commentContainer, seenCommentIDs)
    }, 1000);
}

async function fetchAndDisplayComments(
    foundMatchingThread: string,
    newsTicker: HTMLElement,
    commentContainer: HTMLElement,
    seenCommentIDs: Set<string>
    ) {
    const comments = await fetchComments(foundMatchingThread);
    const newComments = comments.filter((comment) => !seenCommentIDs.has(comment.id));

    newComments.forEach((comment: redditComment) => {
        displayComment(comment, newsTicker, commentContainer)
    });

    newComments.forEach((comment) => seenCommentIDs.add(comment.id));
};

function displayComment(comment: redditComment, newsTicker: HTMLElement, commentContainer: HTMLElement) {
    if (document.fullscreenElement) {
        const commentDiv = formatTickerComment(comment);
        addNewsTickerItem(commentDiv, newsTicker);
    } else {
        const commentDiv = formatSidebarComment(comment); 
        commentContainer.insertBefore(commentDiv, commentContainer.firstChild);

        // Loads ticker items without it being live
        if (!prod) addNewsTickerItem(commentDiv, newsTicker);
    }
} 