"use strict";
async function initObserver() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };
    let extensionInitialized = false;
    const observer = new MutationObserver(async (mutationsList, observer) => {
        if (extensionInitialized) {
            return;
        }
        const url = window.location.href;
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check if the URL does not contain the string 'afl'. Maybe move this to manifest?
                if (!url.toLowerCase().includes('afl')) {
                    console.log('The URL does not contain "afl".');
                    break;
                }
                const kayoTeams = extractTeamName(url);
                let redditTeams = await new Promise((resolve) => {
                    chrome.runtime.sendMessage({ action: "getStickiedThreads" }, (response) => {
                        resolve(response);
                    });
                });
                let foundMatchingThread = '';
                for (const thread of redditTeams) {
                    const game = extractTeamName(thread);
                    if (commonValues(kayoTeams, game).length >= 2) {
                        foundMatchingThread = thread;
                    }
                }
                if (!foundMatchingThread) {
                    console.log("Couldn't find matching reddit thread");
                    break;
                }
                console.log('matching thread', foundMatchingThread);
                const videoPlayer = document.querySelector('video');
                if (videoPlayer) {
                    console.log('oii');
                    initExtension(foundMatchingThread);
                    extensionInitialized = true;
                    observer.disconnect(); // Stop observing when the video player is found
                    break;
                }
            }
        }
    });
    observer.observe(targetNode, config);
}
// let redditTeams: string[] = await new Promise((resolve) => {
//   chrome.runtime.sendMessage({ action: "getStickiedThreads" }, (response) => {
//     resolve(response);
//   });
// });
// redditTeams = extractTeamName(redditTeams.join('-'))
initObserver();
function extractTeamName(urlString) {
    const words = urlString.toLowerCase().split(/[-_!1]/);
    const teamNames = words.filter((word) => word !== 'vs' && !word.startsWith('https://') && word !== 'fixture' && word !== 'match' && word !== 'thread' && word !== 'round');
    return teamNames;
}
const aflTeams = ["adelaide", "brisbane", "carlton", "collingwood", "essendon", "fremantle", "geelong", "gold_coast", "greater_western_sydney", "hawthorn", "melbourne", "north_melbourne", "port_adelaide", "richmond", "st_kilda", "sydney", "west_coast", "western_bulldogs"];
function whoVsWho(threadName) {
    const regex = new RegExp(aflTeams.join("|"), "gi");
    const matches = threadName.match(regex);
    if (matches && matches.length >= 2) {
        return `${matches[0].replace('_', ' ')} vs ${matches[1].replace('_', ' ')}`;
    }
    return "";
}
function initExtension(foundMatchingThread) {
    var _a;
    const sidebarExists = document.getElementById('kayo-reddit-sidebar');
    console.log('initExtension');
    if (!sidebarExists) {
        // left: calc(100% - 267px);
        const iframe = document.createElement('iframe');
        iframe.id = 'kayo-reddit-sidebar';
        iframe.src = chrome.runtime.getURL('sidebar.html');
        iframe.style.cssText = `
    border: none;
    height: 100%;
    position: absolute;
    width: 335px;
    top: 0;
    z-index: 99999;
  `;
        const videoElement = document.querySelector('video');
        if (videoElement) {
            console.log('video found');
            const locationDiv = document.querySelector('.bvuuzM'); // const parentDiv = document.querySelector('.ikIvWZ') as HTMLElement;
            if (locationDiv) {
                locationDiv.style.setProperty('left', 'calc(0% - 4vw)', 'important');
                locationDiv.style.setProperty('transform', 'translate(0%, -50%)', 'important');
                locationDiv.style.setProperty('width', 'calc(100% - 190px)', 'important');
                (_a = locationDiv.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(iframe);
                const locationDivWidth = locationDiv.getBoundingClientRect().width;
                iframe.style.left = `calc(${locationDivWidth}px - 5vw)  `;
            }
        }
        else {
            console.log('video not found');
        }
        iframe.onload = () => {
            console.log('iframe loaded');
            initSidebar(iframe, foundMatchingThread);
        };
    }
    else {
        console.log('no iframe');
        sidebarExists.remove();
    }
}
// initExtension()
const initSidebar = async (iframe, foundMatchingThread) => {
    console.log('loaded sidebar.js');
    const iframeDocument = iframe.contentDocument;
    const heading = iframeDocument.querySelector('.extension-title');
    const commentContainer = iframeDocument.querySelector('#comments-container');
    heading.innerHTML = whoVsWho(foundMatchingThread);
    const initialTime = Math.floor(Date.parse(new Date().toUTCString()) / 1000); // Gets current UTC time in seconds
    const fetchNewComments = async () => {
        console.log('15 seconds hopefully');
        const comments = await new Promise((resolve) => {
            chrome.runtime.sendMessage({ action: "getRedditComments", data: { threadLink: foundMatchingThread, lastFetchTime: initialTime } }, (response) => {
                resolve(response);
            });
        });
        console.log(comments);
        comments.forEach((comment) => {
            const commentDiv = document.createElement("div");
            commentDiv.textContent = comment;
            commentContainer.appendChild(commentDiv);
        });
    };
    // Fetch comments initially
    await fetchNewComments();
    // Fetch new comments every 15 seconds
    setInterval(fetchNewComments, 15000);
};
function commonValues(kayo, reddit) {
    return kayo.filter((value) => reddit.includes(value));
}
