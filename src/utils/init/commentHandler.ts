import { redditComment } from '../../interfaces';
import addNewsTickerItem from '../ticker/addItem';
import formatTickerComment from '../reddit/formatTickerComment';
import { getCommentsFromBackground } from '../reddit/fetchComments';
import { sleep } from '../misc';
import { prod } from '../../content';


let commentsQueue: redditComment[] = [];
let isCommentBeingDisplayed: boolean = false;

export default async function fetchAndDisplayComments(
    foundMatchingThread: string,
    newsTicker: HTMLElement,
    seenCommentIDs: Set<string>
) {
    // Fetches reddit comments from the background.ts file, which is necessary to not get blocked by CORS
    const comments: redditComment[] = await getCommentsFromBackground(foundMatchingThread)

    // Checks to see if the comment has already been displayed 
    const newComments = comments.filter((comment) => {
        if (seenCommentIDs.has(comment.id)) {
            return false;
        } else {
            seenCommentIDs.add(comment.id);
            return true;
        }
    });

    commentsQueue = [...commentsQueue, ...newComments];

    // If there is no currently displayed comment, display the first comment in the queue
    if (!isCommentBeingDisplayed && commentsQueue.length > 0) { // newsTicker.children.length === 0 &&
        displayNextComment(newsTicker);
    }

};

function displayNextComment(newsTicker: HTMLElement) {
    if (commentsQueue.length > 0) {
        isCommentBeingDisplayed = true;
        const nextComment = commentsQueue.shift();
        displayComment(nextComment!, newsTicker);
    }
}

function displayComment(comment: redditComment, newsTicker: HTMLElement) {
    const commentDiv = formatTickerComment(comment);

    addNewsTickerItem(commentDiv, newsTicker, () => {
        if (commentsQueue.length > 0) {
            isCommentBeingDisplayed = false;
            displayNextComment(newsTicker);
        }
    });
}