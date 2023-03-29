async function initObserver() {
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
        // Check if the URL does not contain the string 'afl'. Maybe move this to manifest?
        if (!url.toLowerCase().includes('afl')) {
          console.log('The URL does not contain "afl".');
          break;
        }

        const kayoTeams: string[] = extractTeamName(url);
        let redditTeams: string[] = await new Promise((resolve) => {
          chrome.runtime.sendMessage({ action: "getStickiedThreads" }, (response) => {
            resolve(response);
          });
        });

        redditTeams = ['r/AFL/comments/1225t2f/match_thread_sydney_swans_vs_hawthorn_round_2/']

        let foundMatchingThread: string = '';
        for (const thread of redditTeams) {
          const game = extractTeamName(thread);

          if (commonValues(kayoTeams, game).length >= 2) {
            foundMatchingThread = thread
          }
        }

        if (!foundMatchingThread) {
          console.log("Couldn't find matching reddit thread");
          break;
        }

        console.log('matching thread', foundMatchingThread)


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

initObserver();


function extractTeamName(urlString: string) {
  const words = urlString.toLowerCase().split(/[-_!1]/);
  const teamNames = words.filter((word) => word !== 'vs' && !word.startsWith('https://') && word !== 'fixture' && word !== 'match' && word !== 'thread' && word !== 'round');
  return teamNames;
}

const aflTeams = ["adelaide", "brisbane", "carlton", "collingwood", "essendon", "fremantle", "geelong", "gold_coast", "greater_western_sydney", "hawthorn", "melbourne", "north_melbourne", "port_adelaide", "richmond", "st_kilda", "sydney", "west_coast", "western_bulldogs"];

function whoVsWho(threadName: string) {
  const regex = new RegExp(aflTeams.join("|"), "gi");
  const matches = threadName.match(regex);
  if (matches && matches.length >= 2) {
    return `${matches[0].replace('_', ' ')} vs ${matches[1].replace('_', ' ')}`;
  }
  return "";
}



function initExtension(foundMatchingThread: string) {
  const sidebarExists = document.getElementById('kayo-reddit-sidebar') as HTMLElement
  console.log('initExtension')

  if (!sidebarExists) {
    // left: calc(100% - 267px);
    const iframe: HTMLIFrameElement = document.createElement('iframe');
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
      console.log('video found')
      const kayoPlayer = document.querySelector('.bvuuzM') as HTMLElement;      // const parentDiv = document.querySelector('.ikIvWZ') as HTMLElement;

      if (kayoPlayer) {
        kayoPlayer.style.setProperty('left', 'calc(0% - 4vw)', 'important');
        kayoPlayer.style.setProperty('transform', 'translate(0%, -50%)', 'important');
        kayoPlayer.style.setProperty('width', 'calc(100% - 190px)', 'important');
        kayoPlayer.parentElement?.appendChild(iframe);

        const kayoPlayerWidth = kayoPlayer.getBoundingClientRect().width;
        iframe.style.left = `calc(${kayoPlayerWidth}px - 5vw)  `;
      }
    } else {
      console.log('video not found');
    }

    iframe.onload = () => {
      console.log('iframe loaded');
      initSidebar(iframe, foundMatchingThread);
    };

  } else {
    console.log('no iframe')
    sidebarExists.remove();
  }
}
// initExtension()



const initSidebar = async (
  iframe: HTMLIFrameElement,
  foundMatchingThread: string
) => {
  console.log('loaded sidebar.js');
  const iframeDocument: Document = iframe.contentDocument!;

  const heading = iframeDocument.querySelector('.extension-title') as HTMLElement
  const commentContainer = iframeDocument.querySelector('#comments-container') as HTMLElement

  heading.innerHTML = whoVsWho(foundMatchingThread)
  const initialTime: number = Math.floor(Date.parse(new Date().toUTCString()) / 1000); // Gets current UTC time in seconds

  const fetchNewComments = async () => {
    console.log('15 seconds hopefully')
    const comments: redditComment2[] = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "getRedditComments", data: { threadLink: foundMatchingThread, lastFetchTime: initialTime } }, (response) => {
        resolve(response);
      });
    });

    console.log('coments... ', comments)

    comments.forEach((comment: redditComment2) => {
      const commentDiv = document.createElement("div");
      const usernameH1 = document.createElement("h1");
      const commentP = document.createElement("p");
    
      usernameH1.textContent = comment.username;
      commentP.textContent = comment.comment;
    
      commentDiv.appendChild(usernameH1);
      commentDiv.appendChild(commentP);
      commentContainer.appendChild(commentDiv);
    });
  };

  // Fetch comments initially
  await fetchNewComments();

  // Fetch new comments every 15 seconds
  setInterval(fetchNewComments, 15000);
}




function commonValues(kayo: string[], reddit: string[]): string[] {
  return kayo.filter((value) => reddit.includes(value));
}



type redditComment2 = {
  username: string,
  comment: string,
  score: number,
  flair: string,
}