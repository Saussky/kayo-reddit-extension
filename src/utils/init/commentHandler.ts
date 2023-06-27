import { redditComment } from '../../interfaces';
import formatSidebarComment from '../reddit/formatSidebarComment';
import addNewsTickerItem from '../ticker/addItem';
import formatTickerComment from '../reddit/formatTickerComment';
import { getCommentsFromBackground } from '../reddit/fetchComments';
import { sleep } from '../misc';
import { prod } from '../../content';


export default async function fetchAndDisplayComments(
    foundMatchingThread: string,
    newsTicker: HTMLElement,
    commentContainer: HTMLElement,
    seenCommentIDs: Set<string>
) {
    // Fetches reddit comments from the background.ts file, which is necessary to not get blocked by CORS
    const comments: redditComment[] = await getCommentsFromBackground(foundMatchingThread)
    console.log('kunt', comments)
    const newComments = comments.filter((comment) => !seenCommentIDs.has(comment.id));

    newComments.forEach((comment: redditComment) => {
        displayComment(comment, newsTicker, commentContainer)
        const delay = comment.comment.length * 10;  
        seenCommentIDs.add(comment.id);        
        sleep(1000 + delay)
    });

    newComments.forEach((comment) => seenCommentIDs.add(comment.id));
};

function displayComment(comment: redditComment,
    newsTicker: HTMLElement,
    commentContainer: HTMLElement,
    ) {
    if (document.fullscreenElement) {
        const commentDiv = formatTickerComment(comment);
        addNewsTickerItem(commentDiv, newsTicker);
    } else {
        if (!prod) {
            const commentDivTest = formatTickerComment(comment);
            addNewsTickerItem(commentDivTest, newsTicker);
        }

        const commentDiv = formatSidebarComment(comment);
        commentContainer.insertBefore(commentDiv, commentContainer.firstChild);
    }
} 