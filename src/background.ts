
import { redditComment } from "./interfaces";
import { prod } from "./content";
import getRedditComments from "./utils/reddit/fetchComments";


chrome.runtime.onMessage.addListener((
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: Function) => {
    if (request.action === "getRedditThreads") {
        console.log('MESSAGE SENT')
        getStickiedThreads().then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});


async function getStickiedThreads(): Promise<string[]> {
    const apiUrl: string = `https://www.reddit.com/r/afl/hot.json?limit=50&sort=new`

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const threads = data.data.children;
        // Find the match threads, then only use the thread links in the array
        const matchThreads = threads
            .filter((thread: any) => thread.data.permalink.includes('match_thread'))
            .map((thread: any) => thread.data.permalink);

        return matchThreads;
    } catch (error) {
        console.error('Error fetching stickied threads:', error);
        return [];
    }
}


chrome.runtime.onMessage.addListener((
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: Function) => {
    if (request.action === "getRedditComments") {
        console.log("GETTING REDDIT COMMENTS");

        const threadLink = request.data.threadLink;
        console.log('threadLink' + threadLink)

        const redditComments = prod
            ? getRedditComments(threadLink)
            : getAllRedditComments(threadLink);

        redditComments.then((threads) => {
            sendResponse(threads);
        });

        return true; // Required to make the response async
    }
});


async function getAllRedditComments(threadLink: string) {
    try {
        const response = await fetch(`https://www.reddit.com/${threadLink}.json?sort=new&limit=10`);
        const data = await response.json();
        const comments = await data[1].data.children;

        // Get all the relevant information we need from each comment
        const formattedComments: redditComment[] = await comments.map((comment: any) => ({
            id: comment.data.id,
            username: comment.data.author,
            comment: comment.data.body,
            time: comment.data.created_utc,
            score: comment.data.score,
            flair: comment.data.author_flair_css_class,
        }));

        return formattedComments.reverse();
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("idk man")
    }
}