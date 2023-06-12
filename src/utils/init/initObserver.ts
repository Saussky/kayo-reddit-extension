import { extractTeamName } from "../misc";
import initExtension from "./initExtension";
import { checkURL, findMatchingThread } from "../misc";
import { getRedditThreads } from "../reddit/fetchThreads";
import { prod } from "../../content";

let video: HTMLVideoElement | null = null;

export default async function initObserver() {
    const targetNode = document.body as HTMLElement;
    const config = { childList: true, subtree: true };
    let extensionInitialized = false;

    const observer = new MutationObserver(async (mutationsList, observer) => {
        if (extensionInitialized) {
            return;
        }

        const url: string = window.location.href;

        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                if (!checkURL(url)) break;

                const kayoTeams: string[] = extractTeamName(url);
                let redditThreads: string[] = await getRedditThreads();
                if (!prod) redditThreads = ['r/AFL/comments/1299rcy/match_thread_melbourne_vs_sydney_round_3/']

                const foundMatchingThread = findMatchingThread(kayoTeams, redditThreads);
                if (!foundMatchingThread) {
                    console.log("Couldn't find matching reddit thread");
                    break;
                }
                console.log('matching thread', foundMatchingThread)

                video = document.querySelector('video')!;
                if (video) {
                    initExtension(video, foundMatchingThread);
                    extensionInitialized = true;
                    observer.disconnect(); // Stop observing when the video player is found
                    video = null; // reset video variable
                    return;
                }
            }
        }
    });

    observer.observe(targetNode, config);
}
