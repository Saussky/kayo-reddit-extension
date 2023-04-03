const aflTeams = ["adelaide", "brisbane", "carlton", "collingwood", "essendon", "fremantle", "geelong", "gold_coast", "gws", "hawthorn", "melbourne", "north_melbourne", "port_adelaide", "richmond", "st_kilda", "sydney", "west_coast", "western_bulldogs"];

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
          chrome.runtime.sendMessage({ action: "getRedditThreads" }, (response) => {
            resolve(response);
          });
        });

        redditTeams = ['r/AFL/comments/1299rcy/match_thread_melbourne_vs_sydney_round_3/']

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

        kayoPlayer.style.setProperty('height', '100vh');
        kayoPlayer.parentElement?.appendChild(iframe);

        const kayoPlayerWidth = kayoPlayer.getBoundingClientRect().width;
        iframe.style.left = `calc(${kayoPlayerWidth}px - 5vw)  `;

        kayoPlayer.addEventListener("mouseover", (event) => {
          console.log('mouse over bitches')
          applyStylesToLowerControlsContainer();
        })

        kayoPlayer.addEventListener("mouseleave", function () {
          console.log('mouse left bitches')
          deleteControlsContainer()
        });
      }

      // const lowerControlsContainer = document.querySelector(".sc-01-lower-controls__LowerControlsContainer-sc-1ec7mdq-0") as HTMLElement;
      // if (lowerControlsContainer) {
      //   lowerControlsContainer.style.position = "fixed";
      //   lowerControlsContainer.style.bottom = "0";
      //   lowerControlsContainer.style.left = "50%";
      //   lowerControlsContainer.style.transform = "translateX(-50%)";
      //   lowerControlsContainer.style.zIndex = "1000";
      // }



    } else {
      console.log('video not found');
    }



    iframe.onload = () => {
      console.log('iframe loaded');
      initSidebar(iframe, foundMatchingThread);
    };

  } else {
    console.log('side bar already exists')
  }
}



const initSidebar = async (
  iframe: HTMLIFrameElement,
  foundMatchingThread: string
) => {
  console.log('loaded sidebar.js');
  const iframeDocument: Document = iframe.contentDocument!;
  let oldComments: redditComment2[] = []

  const commentContainer = iframeDocument.querySelector('#comments-container') as HTMLElement
  const heading = iframeDocument.querySelector('.extension-title') as HTMLElement

  heading.innerHTML = whoVsWho(foundMatchingThread)

  // takes control of the scroller from the background page // doesn't work yet
  window.addEventListener("wheel", (event: WheelEvent) => {
    if (commentContainer?.contains(event.target as Node)) {
      event.preventDefault();
      commentContainer.scrollTop += event.deltaY;
    }
  });



  const fetchNewComments = async () => {
    const comments: redditComment2[] = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "getRedditComments", data: { threadLink: foundMatchingThread } }, (response) => {
        resolve(response);
      });
    });

    // Check each comment to make sure it isn't a duplicate, if it isn't, send it to the screen and add it to the group of comments to check against
    comments.forEach((comment: redditComment2) => {
      if (!oldComments.some((oldComment) => oldComment.id === comment.id)) {
        const commentDiv = document.createElement("div");
        const usernameH1 = document.createElement("h3");
        const commentP = document.createElement("p");

        commentDiv.className = "comment";

        usernameH1.textContent = comment.username;
        commentP.textContent = comment.comment;

        commentDiv.appendChild(usernameH1);
        commentDiv.appendChild(commentP);
        commentContainer.insertBefore(commentDiv, commentContainer.firstChild);

        // Add the comment to oldComments array
        oldComments.push(comment);
      }
    });

    // Getting the max time of the previous comments and passing that in to getRedditComments as an argument would be better
    // but it hasn't been working
    // if (comments.length > 0) {
    //   console.log('oi')
    //   console.log(lastTime, 'last1')
    //   // lastTime = comments[comments.length -   1].time
    //   lastTime = Math.max(...comments.map(comment => comment.time));
    //   console.log(lastTime, 'last2')
    // } else {
    //   console.log(lastTime)
    // }

  };

  // Fetch comments initially
  await fetchNewComments();

  // Fetch new comments every 1 seconds
  setInterval(fetchNewComments, 1000);
}




function commonValues(kayo: string[], reddit: string[]): string[] {
  return kayo.filter((value) => reddit.includes(value));
}

function extractTeamName(urlString: string) {
  const words = urlString.toLowerCase().split(/[-_!1]/);
  const teamNames = words.filter((word) => word !== 'vs' && !word.startsWith('https://') && word !== 'fixture' && word !== 'match' && word !== 'thread' && word !== 'round');
  return teamNames;
}


function whoVsWho(threadName: string) {
  const regex = new RegExp(aflTeams.join("|"), "gi");
  const matches = threadName.match(regex);
  if (matches && matches.length >= 2) {
    const teamOne = toInitialCap(matches[0])
    const teamTwo = toInitialCap(matches[1])
    console.log('teeam', teamOne, teamTwo)
    return `${toInitialCap(matches[0].replace('_', ' '))} vs ${toInitialCap(matches[1].replace('_', ' '))}`;
  }
  return "";
}

function toInitialCap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function applyStylesToLowerControlsContainer() {
  const lowerControlsContainer = document.querySelector(".sc-01-lower-controls__LowerControlsContainer-sc-1ec7mdq-0") as HTMLElement;

  if (lowerControlsContainer) {
    lowerControlsContainer.style.display = 'flex'
    lowerControlsContainer.style.position = "fixed";
    lowerControlsContainer.style.bottom = "0";
    lowerControlsContainer.style.left = "50%";
    lowerControlsContainer.style.transform = "translateX(-50%)";
    lowerControlsContainer.style.zIndex = "1000";
  }
}

function deleteControlsContainer() {
  const lowerControlsContainer = document.querySelector(".sc-01-lower-controls__LowerControlsContainer-sc-1ec7mdq-0") as HTMLElement;
  lowerControlsContainer.style.display = 'none'
}


type redditComment2 = {
  id: string,
  username: string,
  comment: string,
  time: number,
  score: number,
  flair: string,
}



