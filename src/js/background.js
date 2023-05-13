"use strict";
// chrome.commands.onCommand.addListener((command) => {
//   if (command === 'toggle-sidebar') {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0].id) {
//         chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
//       }
//     });
//   }
// });
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
//   console.log('ddddddddd', details)
//   if (details.url.includes('kayosports.com.au')) {
//     console.log(';ahhhhh')
//   }
// });
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//     console.log('changed info')
//     if (tab.url && tab.url.includes('kayosports.com.au')) {
//       console.log('do the thing')
//       chrome.tabs.executeScript(tabId, { file: 'js/content.js' });
//     }
//   }
// })
// None of these work, because Kayo's video player doesn't trigger any events, it just loads, sothis is handled in the content.ts file
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRedditThreads") {
        console.log('MESSAGE SENT');
        getStickiedThreads().then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});
function getStickiedThreads() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = `https://www.reddit.com/r/afl/hot.json?limit=50&sort=new`;
        try {
            const response = yield fetch(apiUrl);
            const data = yield response.json();
            const threads = data.data.children;
            // Find the match threads, then only use the thread links in the array
            const matchThreads = threads
                .filter((thread) => thread.data.permalink.includes('match_thread'))
                .map((thread) => thread.data.permalink);
            return matchThreads;
        }
        catch (error) {
            console.error('Error fetching stickied threads:', error);
            return [];
        }
    });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRedditComments") {
        console.log("GETTING REDDIT COMMENTS");
        const threadLink = request.data.threadLink;
        // Testing thread
        // getAllRedditComments(threadLink).then((threads) => {
        //     sendResponse(threads);
        // });
        getRedditComments(threadLink).then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});
function getRedditComments(threadLink) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // `https://www.reddit.com/${threadLink}.json?limit=20&sort=new`
            const response = yield fetch(`https://www.reddit.com/${threadLink}.json?sort=new&limit=10&cacheBuster=${Date.now()}`);
            const data = yield response.json();
            const comments = yield data[1].data.children;
            const time = Math.floor(Number(new Date()) / 1000);
            console.log('api has been reached', time);
            const filteredComments = yield comments.filter((comment) => comment.data.created_utc > (time - 600));
            // If there's no comments that passed the criteria, return early
            if (!filteredComments) {
                return [];
            }
            ;
            // Get all the relevant information we need from each comment
            const formattedComments = yield filteredComments.map((comment) => ({
                id: comment.data.id,
                username: comment.data.author,
                comment: comment.data.body,
                time: comment.data.created_utc,
                score: comment.data.score,
                flair: comment.data.author_flair_css_class,
            }));
            return formattedComments.reverse();
        }
        catch (error) {
            console.error("Error fetching comments:", error);
            throw new Error("idk man");
        }
    });
}
function getAllRedditComments(threadLink) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // `https://www.reddit.com/${threadLink}.json?limit=20&sort=new`
            const response = yield fetch(`https://www.reddit.com/${threadLink}.json?sort=new&limit=10`);
            const data = yield response.json();
            const comments = yield data[1].data.children;
            // Get all the relevant information we need from each comment
            const formattedComments = yield comments.map((comment) => ({
                id: comment.data.id,
                username: comment.data.author,
                comment: comment.data.body,
                time: comment.data.created_utc,
                score: comment.data.score,
                flair: comment.data.author_flair_css_class,
            }));
            return formattedComments.reverse();
        }
        catch (error) {
            console.error("Error fetching comments:", error);
            throw new Error("idk man");
        }
    });
}
