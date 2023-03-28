
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
    if (request.action === "getStickiedThreads") {
        console.log('MESSAGE SENT')
        getStickiedThreads().then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});


function getStickiedThreadLinks(threads: any[]): string[] {
    const stickiedThreads = threads.filter((thread: any) => thread.data.stickied);
    return stickiedThreads.map((thread: any) => thread.data.permalink);
}

async function getStickiedThreads(): Promise<string[]> {
    const apiUrl: string = `https://www.reddit.com/r/afl/hot.json?limit=3`

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const threads = data.data.children;
        const stickiedThreadLinks = getStickiedThreadLinks(threads);
        return stickiedThreadLinks;
    } catch (error) {
        console.error('Error fetching stickied threads:', error);
        return [];
    }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getRedditComments") {
        console.log("GETTING REDDIT COMMENTS");

        const threadLink = request.data.threadLink;
        const lastFetchTime = request.data.lastFetchTime;
        getRedditComments(threadLink, lastFetchTime).then((threads) => {
            sendResponse(threads);
        });
        return true; // Required to make the response async
    }
});

// https://www.reddit.com/${threadLink}.json?limit=10&sort=new&after={timestamp} IS UNIX timestamp
async function getRedditComments(threadLink: string, lastFetchTime: number) {
    let goodComments: string[] = [];
  
    try {
      const response = await fetch(`https://www.reddit.com/${threadLink}.json?limit=5`);
      const data = await response.json();
      const comments = await data[0].data.children;
  
    //   for (let i = 0; i < 5; i++) {
    //     const createdTime: number = comments[i].data.created_utc; // Time reddit comment was posted
  
    //     if (createdTime > lastFetchTime) {
    //       goodComments.push(comments[i].data.body);
    //     }
    //   }

    comments.forEach((comment: any) => {
        goodComments.push(comment.data.body)
    })
  
      return goodComments;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }