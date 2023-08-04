import { getStickiedThreads } from "./utils/reddit/fetchThreads";
import { getRedditComments } from "./utils/reddit/fetchComments";


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

chrome.runtime.onMessage.addListener((
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: Function) => {
    if (request.action === "getRedditComments") {
        console.log("GETTING REDDIT COMMENTS");

        const threadLink = request.data.threadLink;
        const redditComments = getRedditComments(threadLink)

        redditComments.then((threads) => {
            console.log('cunt', threads)
            sendResponse(threads);
        });

        return true; // Required to make the response async
    }
});