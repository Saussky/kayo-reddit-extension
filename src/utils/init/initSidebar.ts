import { redditComment } from '../../interfaces';
import fetchComments from '../reddit/fetchComments';
import formatSidebarComment from '../reddit/formatSidebarComment';
import createTicker from '../ticker/create';
import handleFullscreenChange from '../kayo/fullscreen';
import addNewsTickerItem from '../ticker/addItem';
import formatTickerComment from '../reddit/formatTickerComment';


export default async function initSidebar(
    video: HTMLVideoElement,
    iframe: HTMLIFrameElement,
    foundMatchingThread: string
): Promise<void> {
    console.log('loaded sidebar');
    const iframeDocument: Document = iframe.contentDocument!;
    const commentContainer = iframeDocument.querySelector('#comments-container') as HTMLElement

    const newsTicker = createTicker(video);
    handleFullscreenChange(commentContainer, newsTicker);

    // let oldComments: redditComment[] = []
    let oldComments: Map<string, redditComment> = new Map();

    const fetchNewComments = async () => {
        const comments = await fetchComments(foundMatchingThread);
    
        const newComments = comments.filter((comment) => !oldComments.has(comment.id));
        newComments.forEach((comment: redditComment) => {
            if (document.fullscreenElement) {
                const commentDiv = formatTickerComment(comment);
                addNewsTickerItem(commentDiv, newsTicker);
            } else {
                const commentDiv = formatSidebarComment(comment); 
                commentContainer.insertBefore(commentDiv, commentContainer.firstChild);
            }
        });
    
        newComments.forEach((comment) => oldComments.set(comment.id, comment));
    };
    

    await fetchNewComments();
    setInterval(fetchNewComments, 1000);
}