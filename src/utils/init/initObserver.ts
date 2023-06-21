import { extractTeamName, checkURL, findMatchingThread } from "../misc";
import initExtension from "./initExtension";
import { getRedditThreads } from "../reddit/fetchThreads";
import { prod } from "../../content";


const config = { childList: true, subtree: true };
let video: HTMLVideoElement | null = null;

export default async function initObserver() {
    const targetNode = document.body as HTMLElement;
    let extensionInitialized = false;

    const observer = new MutationObserver(async (mutationsList, observer) => {
        if (extensionInitialized) {
            return;
        }

        const url = window.location.href;
        if (!checkURL(url)) return;

        const kayoTeams = extractTeamName(url);
        const redditThreads = prod ? await getRedditThreads() : ['r/AFL/comments/1299rcy/match_thread_melbourne_vs_sydney_round_3/'];

        const foundMatchingThread = findMatchingThread(kayoTeams, redditThreads);
        if (!foundMatchingThread) {
            console.log("Couldn't find matching reddit thread");
            return;
        }
        
        console.log('matching thread', foundMatchingThread);
        video = document.querySelector('video');
        if (video) {
            initExtension(video, foundMatchingThread);
            extensionInitialized = true;
            observer.disconnect(); // Stop observing when the video player is found
            video = null; // reset video variable
        }
    });

    observer.observe(targetNode, config);
}
