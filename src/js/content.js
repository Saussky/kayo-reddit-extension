"use strict";
const sidebarExists = document.getElementById('kayo-reddit-sidebar');
const currentUrl = window.location.href;
console.log(`window url is ${currentUrl}`);
if (!sidebarExists) {
    console.log('iframe');
    const iframe = document.createElement('iframe');
    iframe.id = 'kayo-reddit-sidebar';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.cssText = `
    border: none;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    z-index: 99999;
  `;
    document.body.appendChild(iframe);
    iframe.onload = () => {
        console.log('iframe loaded');
        initSidebar(iframe);
    };
}
else {
    console.log('nframe');
    sidebarExists.remove();
}
const initSidebar = (iframe) => {
    console.log('loaded sidebar.js');
    const iframeDocument = iframe.contentDocument;
    iframeDocument.getElementById('load-comments').addEventListener('click', async () => {
        console.log('click');
        const threadUrl = iframeDocument.getElementById('thread-url').value;
        const apiUrl = `https://www.reddit.com/${threadUrl}.json?limit=5`;
        try {
            console.log('gddday mate');
            const response = await fetch(apiUrl);
            const data = await response.json();
            const comments = data[1].data.children;
            const commentsContainer = iframeDocument.getElementById('comments-container');
            commentsContainer.innerHTML = '';
            comments.forEach((comment) => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                <strong>${comment.data.author}</strong>:
                <p>${comment.data.body}</p>
              `;
                commentsContainer.appendChild(commentDiv);
            });
        }
        catch (error) {
            const commentsContainer = iframeDocument.getElementById('comments-container');
            commentsContainer.innerHTML = 'something went wronnng!';
            console.error('Error fetching comments:', error);
        }
    });
};
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
        checkUrl();
    });
    if (targetNode) {
        urlObserver.observe(targetNode, observerConfig);
    }
}
// Monitor URL changes
observeUrlChanges();
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
