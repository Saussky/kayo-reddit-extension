import { extractTeamName, checkURL, findMatchingThread } from "../misc";
import initExtension from "./initExtension";
import { getRedditThreads } from "../reddit/fetchThreads";
import { prod } from "../../content";


const config = { childList: true, subtree: true };
let video: HTMLVideoElement | null = null;
let extensionInitialized = false; 

export default async function initObserver() {
    if (extensionInitialized) return;
    const targetNode = document.body as HTMLElement;

    const observer = new MutationObserver(async (mutationsList, observer) => {
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
            video = null; // reset video variable
            observer.disconnect(); // Stop observing when the video player is found
        }
    });

    observer.observe(targetNode, config);
}
