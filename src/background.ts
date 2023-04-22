
// chrome.commands.onCommand.addListener((command) => {
//   if (command === 'toggle-sidebar') {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0].id) {
//         chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
//       }
//     });
//   }
// });

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
        console.log('MESSAGE SENT')
        getStickiedThreads().then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});


async function getStickiedThreads(): Promise<string[]> {
    const apiUrl: string = `https://www.reddit.com/r/afl/hot.json?limit=50&sort=new`

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const threads = data.data.children;
        // Find the match threads, then only use the thread links in the array
        const matchThreads = threads
            .filter((thread: any) => thread.data.permalink.includes('match_thread'))
            .map((thread: any) => thread.data.permalink);

        return matchThreads;
    } catch (error) {
        console.error('Error fetching stickied threads:', error);
        return [];
    }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRedditComments") {
        console.log("GETTING REDDIT COMMENTS");

        const threadLink = request.data.threadLink;

        getRedditComments(threadLink).then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});

// https://www.reddit.com/${threadLink}.json?limit=10&sort=new&after={timestamp} IS UNIX timestamp
async function getRedditComments(threadLink: string) {
    try {
        // `https://www.reddit.com/${threadLink}.json?limit=20&sort=new`
        const response = await fetch(`https://www.reddit.com/${threadLink}.json?sort=new&limit=10&cacheBuster=${Date.now()}`);
        const data = await response.json();
        const comments = await data[1].data.children;
        const time = Math.floor(Number(new Date()) / 1000);

        console.log('api has been reached', time)

        const filteredComments = await comments.filter((comment: any) => comment.data.created_utc > (time - 600))
        // If there's no comments that passed the criteria, return early
        if (!filteredComments) {
            return []
        };

        // Get all the relevant information we need from each comment
        const formattedComments: redditComment[] = await filteredComments.map((comment: any) => ({
            id: comment.data.id,
            username: comment.data.author,
            comment: comment.data.body,
            time: comment.data.created_utc,
            score: comment.data.score,
            flair: comment.data.author_flair_css_class,
        }));

        return formattedComments.reverse();
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("idk man")
    }
}

type redditComment = {
    id: string,
    username: string,
    comment: string,
    time: number,
    score: number,
    flair: string,
}