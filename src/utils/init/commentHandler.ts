import { redditComment } from '../../interfaces';
import addNewsTickerItem from '../ticker/addItem';
import formatTickerComment from '../reddit/formatTickerComment';
import { getCommentsFromBackground } from '../reddit/fetchComments';
import { sleep } from '../misc';
import { prod } from '../../content';


export let commentsQueue: redditComment[];

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
    console.log('cunt bag')

    // If there is no currently displayed comment, display the first comment in the queue
    if (newsTicker.children.length === 0 && commentsQueue.length > 0) {
        console.log('fuck cumberland')
        const nextComment = commentsQueue.shift();
        displayComment(nextComment!, newsTicker);
    }

    // for (const comment of newComments) {
    //     displayComment(comment, newsTicker, commentContainer)
    // };
};

function displayComment(comment: redditComment,
    newsTicker: HTMLElement,
) {
    const commentDiv = formatTickerComment(comment);
    addNewsTickerItem(commentDiv, newsTicker);
} 