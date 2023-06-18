import { redditComment } from '../../interfaces';
import fetchComments from '../reddit/fetchComments';
import formatSidebarComment from '../reddit/formatSidebarComment';
import addNewsTickerItem from '../ticker/addItem';
import formatTickerComment from '../reddit/formatTickerComment';
import { prod } from '../../content';

export default async function fetchAndDisplayComments(
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