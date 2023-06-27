import { redditComment } from "src/interfaces";
import { prod } from '../../content'


export async function getRedditComments(threadLink: string) {
    try {
        let response = prod
            ? await fetch(`https://www.reddit.com/${threadLink}.json?sort=new&limit=10&cacheBuster=${Date.now()}`)
            : await fetch(`https://www.reddit.com/${threadLink}.json?sort=new&limit=10`);

        const data = await response.json();
        const comments = await data[1].data.children;
        const time = Math.floor(Number(new Date()) / 1000);

        const formattedComments: redditComment[] = await comments.reduce((formattedCommentsAccumulator: redditComment[], comment: any) => {
            // Check if comment.data.body is not undefined, then don't do the time check unless its in production
            if (comment.data.body && (!prod || (prod && comment.data.created_utc > time))) {
                formattedCommentsAccumulator.push({
                    id: comment.data.id,
                    username: comment.data.author,
                    comment: comment.data.body,
                    time: comment.data.created_utc,
                    score: comment.data.score,
                    flair: comment.data.author_flair_css_class,
                });
            }
            return formattedCommentsAccumulator;
        }, []);

        return formattedComments.reverse();
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Failed to get Reddit comments")
    }
}

export async function getCommentsFromBackground(foundMatchingThread: string): Promise<redditComment[]> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "getRedditComments", data: { threadLink: foundMatchingThread } }, (response) => {
            resolve(response);
        });
    });
}