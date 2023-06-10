import { redditComment } from "src/interfaces";


export default async function fetchComments(foundMatchingThread: string): Promise<redditComment[]> {
    const comments: redditComment[] = await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "getRedditComments", data: { threadLink: foundMatchingThread } }, (response) => {
            resolve(response);
        });
    });

    return comments;
}
