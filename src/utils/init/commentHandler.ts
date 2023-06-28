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
    const newComments = comments.filter((comment) => {
        if (seenCommentIDs.has(comment.id)) {
            return false;
        } else {
            seenCommentIDs.add(comment.id);
            return true;
        }
    });

    for (const comment of newComments) {
        displayComment(comment, newsTicker, commentContainer)
        const delay = comment.comment.length * 10;  
        await sleep(1000 + delay);
    };
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