"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reddit_1 = require("./reddit");
// Checks the website URL, if it's a footy game it gets the it gets the string such as 'st-kilda-saints-vs-fremantle-dockers'
function checkUrl() {
    const url = window.location.href;
    const regex = /\/fixture\/sport!afl\/[\w-]*!?\d*\/fixture-([\w-]+)/;
    const match = url.match(regex);
    if (match) {
        const extractedData = match[1];
        console.log('Regex matched', extractedData);
        return extractedData;
    }
    else {
        console.log('No regex matched');
        return '';
    }
}
function observeUrlChanges() {
    const targetNode = document.querySelector('body');
    const observerConfig = {
        childList: true,
        subtree: true,
    };
    const urlObserver = new MutationObserver(() => {
        if (checkUrl()) {
            const redditThreads = (0, reddit_1.getStickiedThreads)();
        }
    });
    if (targetNode) {
        urlObserver.observe(targetNode, observerConfig);
    }
}
const extractTeamName = (urlString) => {
    const words = urlString.toLowerCase().split(/[-_]/);
    const teamNames = words.filter((word) => word !== 'vs' && word !== 'fixture' && word !== 'match' && word !== 'thread' && word !== 'round');
    return teamNames;
};
function isSameGame(urlString, redditTitle) {
    const kayo = extractTeamName(urlString);
    const reddit = extractTeamName(redditTitle);
    let matchCount = 0;
    // Counts the matching words in the above arrays, if there are two then returns true
    for (const kayoElement of kayo) {
        for (const redditElement of reddit) {
            if (kayoElement === redditElement) {
                matchCount++;
                if (matchCount >= 2) {
                    return true;
                }
            }
        }
    }
    return false;
}
// if (isSameGame(checkUrl(), reddit)) {
//   console.log('oiiiiiii')
// } else {
//   console.log('noiiiiiiii')
// }
