const aflTeams = ["adelaide", "brisbane", "carlton", "collingwood", "essendon", "fremantle", "geelong", "gold_coast", "gws", "hawthorn", "melbourne", "north_melbourne", "port_adelaide", "richmond", "st_kilda", "sydney", "west_coast", "western_bulldogs"];
const redditFlairTeams: flairTeams = {
  "AFL": "other",
  "fitzroy4": "other",
  "fitzroy7": "other",
  "fitzroy14": "other",
  "fitzroy15": "other",
  "bears9": "other",
  "bears8": "other",
  "bears13": "other",
  "bears12": "other",
  "VFL": "other",
  "victoria": "other",
  "SANFL": "other",
  "southaustralia": "other",
  "WAFL": "other",
  "westernaustralia": "other",
  "tasmania": "other",
  "allies": "other",
  "australia": "other",
  "newzealand": "other",
  "ireland": "other",
  "UK": "other",
  "USA": "other",
  "canada": "other",
  "boxingroo": "other",
  "Leprechaun": "other",
  "university": "other",
  "adelaide": "adelaide",
  "adelaide2": "adelaide",
  "adelaide3": "adelaide",
  "adelaide4": "adelaide",
  "adelaide6": "adelaide",
  "adelaide10": "adelaide",
  "adelaide11": "adelaide",
  "adelaide12": "adelaide",
  "ADLWEG": "adelaide",
  "brisbane": "brisbane",
  "brisbane2": "brisbane",
  "brisbane3": "brisbane",
  "brisbane6": "brisbane",
  "brisbane10": "brisbane",
  "brisbane11": "brisbane",
  "BRIWEG": "brisbane",
  "BRIBW": "brisbane",
  "carlton": "carlton",
  "carlton2": "carlton",
  "carlton3": "carlton",
  "carlton4": "carlton",
  "carlton6": "carlton",
  "carlton10": "carlton",
  "carlton11": "carlton",
  "carlton12": "carlton",
  "CARWEG": "carlton",
  "collingwood": "collingwood",
  "collingwood2": "collingwood",
  "collingwood3": "collingwood",
  "collingwood6": "collingwood",
  "collingwood10": "collingwood",
  "collingwood11": "collingwood",
  "collingwood12": "collingwood",
  "COLWEG": "collingwood",
  "COLBW": "collingwood",
  "essendon": "essendon",
  "essendon2": "essendon",
  "essendon3": "essendon",
  "essendon6": "essendon",
  "essendon10": "essendon",
  "essendon11": "essendon",
  "essendon12": "essendon",
  "ESSWEG": "essendon",
  "AFLW-2022-EssendonW": "essendon",
  "fremantle": "fremantle",
  "fremantle2": "fremantle",
  "fremantle3": "fremantle",
  "fremantle10": "fremantle",
  "fremantle11": "fremantle",
  "fremantle12": "fremantle",
  "fremantle13": "fremantle",
  "fremantle14": "fremantle",
  "fremantle15": "fremantle",
  "FREBW": "fremantle",
  "geelong": "geelong",
  "geelong2": "geelong",
  "geelong3": "geelong",
  "geelong6": "geelong",
  "geelong7": "geelong",
  "geelong10": "geelong",
  "geelong11": "geelong",
  "geelong12": "geelong",
  "GEEWEG": "geelong",
  "AFLW-GeelongW": "geelong",
  "GEEBW": "geelong",
  "goldcoast": "goldcoast",
  "goldcoast2": "goldcoast",
  "goldcoast10": "goldcoast",
  "goldcoast11": "goldcoast",
  "goldcoast12": "goldcoast",
  "AFLW-Gold-CoastW": "goldcoast",
  "gws": "gws",
  "gws2": "gws",
  "gws10": "gws",
  "gws11": "gws",
  "gws12": "gws",
  "hawthorn": "hawthorn",
  "hawthorn2": "hawthorn",
  "hawthorn3": "hawthorn",
  "hawthorn6": "hawthorn",
  "hawthorn7": "hawthorn",
  "hawthorn10": "hawthorn",
  "hawthorn11": "hawthorn",
  "hawthorn12": "hawthorn",
  "HAWWEG": "hawthorn",
  "AFLW-2022-HawthornW": "hawthorn",
  "melbourne": "melbourne",
  "melbourne2": "melbourne",
  "melbourne3": "melbourne",
  "melbourne4": "melbourne",
  "melbourne5": "melbourne",
  "melbourne6": "melbourne",
  "melbourne7": "melbourne",
  "melbourne8": "melbourne",
  "melbourne10": "melbourne",
  "melbourne11": "melbourne",
  "melbourne12": "melbourne",
  "MELWEG": "melbourne",
  "MELBW": "melbourne",
  "northmelbourne": "northmelbourne",
  "northmelbourne2": "northmelbourne",
  "northmelbourne3": "northmelbourne",
  "northmelbourne4": "northmelbourne",
  "northmelbourne6": "northmelbourne",
  "northmelbourne7": "northmelbourne",
  "northmelbourne10": "northmelbourne",
  "northmelbourne11": "northmelbourne",
  "northmelbourne12": "northmelbourne",
  "NORWEG": "northmelbourne",
  "AFLW-NorthW": "northmelbourne",
  "portadelaide": "portadelaide",
  "portadelaide2": "portadelaide",
  "portadelaide3": "portadelaide",
  "portadelaide10": "portadelaide",
  "portadelaide11": "portadelaide",
  "portadelaide12": "portadelaide",
  "portadelaide13": "portadelaide",
  "portadelaide14": "portadelaide",
  "PORWEG": "portadelaide",
  "AFLW-2022-PortW": "portadelaide",
  "richmond": "richmond",
  "richmond2": "richmond",
  "richmond3": "richmond",
  "richmond6": "richmond",
  "richmond7": "richmond",
  "richmond10": "richmond",
  "richmond11": "richmond",
  "richmond12": "richmond",
  "RICWEG": "richmond",
  "AFLW-RichmondW": "richmond",
  "RICBW": "richmond",
  "stkilda": "stkilda",
  "stkilda2": "stkilda",
  "stkilda6": "stkilda",
  "stkilda7": "stkilda",
  "stkilda10": "stkilda",
  "stkilda11": "stkilda",
  "stkilda12": "stkilda",
  "stkilda13": "stkilda",
  "STKWEG": "stkilda",
  "AFLW-StKildaW": "stkilda",
  "sydney": "sydney",
  "sydney3": "sydney",
  "sydney6": "sydney",
  "sydney7": "sydney",
  "sydney10": "sydney",
  "sydney11": "sydney",
  "sydney12": "sydney",
  "sydney13": "sydney",
  "SYDWEG": "sydney",
  "SYDBW": "sydney",
  "AFLW-2022-SydneyW": "sydney",
  "sydney2": "sydney",
  "westcoast": "westcoast",
  "westcoast2": "westcoast",
  "westcoast3": "westcoast",
  "westcoast4": "westcoast",
  "westcoast6": "westcoast",
  "westcoast10": "westcoast",
  "westcoast11": "westcoast",
  "westcoast12": "westcoast",
  "westcoast13": "westcoast",
  "WCEWEG": "westcoast",
  "AFLW-West-CoastW": "westcoast",
  "westernbulldogs": "westernbulldogs",
  "westernbulldogs2": "westernbulldogs",
  "westernbulldogs3": "westernbulldogs",
  "westernbulldogs4": "westernbulldogs",
  "westernbulldogs6": "westernbulldogs",
  "westernbulldogs7": "westernbulldogs",
  "westernbulldogs10": "westernbulldogs",
  "westernbulldogs11": "westernbulldogs",
  "westernbulldogs12": "westernbulldogs",
  "WBDWEG": "westernbulldogs",
  "WBDBW": "westernbulldogs"
}

// add in an option to use a vertical stripe svg or horizontal (adelaide horizontal, collingwood vertical)
const teamColors: { [key: string]: [string, string] | [string, string, string] } = {
  'adelaide': ['blue', 'red', 'yellow'],
  'brisbane': ['maroon', 'gold'],
  'carlton': ['navy', 'navy'],
  'collingwood': ['black', 'white'],
  'essendon': ['red', 'black'],
  'fremantle': ['purple', 'white'],
  'geelong': ['white', 'blue'],
  'goldcoast': ['red', 'yellow'],
  'gws': ['orange', 'orange'],
  'hawthorn': ['brown', 'yellow'],
  'melbourne': ['red', 'blue'],
  'northmelbourne': ['blue', 'white'],
  'portadelaide': ['teal', 'black'],
  'richmond': ['yellow', 'black'],
  'stkilda': ['white', 'red'],
  'sydney': ['red', 'white'],
  'westcoast': ['blue', 'yellow'],
  'westernbulldogs': ['blue', 'red'],
  'other': ['white', 'black']
};


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
          return;
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
      let idleTimeout: ReturnType<typeof setTimeout>

      const kayoPlayer = document.querySelector('.dRKRhr') as HTMLElement // this changes constantly
      // To find it, find the div with VideoBackingCard in it or the smallest div that encompassses the entire player
      // player__VideoBackingCard-sc-ocmrm0-1 dRKRhr

      if (kayoPlayer) {
        console.log('found the player')
        kayoPlayer.style.setProperty('left', 'calc(0% - 4vw)', 'important');
        kayoPlayer.style.setProperty('transform', 'translate(0%, -50%)', 'important');
        kayoPlayer.style.setProperty('width', 'calc(100% - 190px)', 'important');

        kayoPlayer.style.setProperty('height', '100vh');
        kayoPlayer.parentElement?.appendChild(iframe);

        const kayoPlayerWidth = kayoPlayer.getBoundingClientRect().width;
        iframe.style.left = `calc(${kayoPlayerWidth}px - 5vw)  `;

        kayoPlayer.addEventListener("mouseover", (event: MouseEvent) => {
          console.log('mouse over bitches')
          applyStylesToLowerControlsContainer();
        })

        kayoPlayer.addEventListener("mouseleave", function () {
          console.log('mouse left bitches')
          setTimeout(() => {
            deleteControlsContainer();
          }, 1500);
        });

        kayoPlayer.addEventListener("mousemove", (event: MouseEvent) => {
          if (idleTimeout) {
            clearTimeout(idleTimeout);
          }

          idleTimeout = setTimeout(() => {
            deleteControlsContainer();
          }, 3000);

          applyStylesToLowerControlsContainer();
        })

        // .responsive-sizer__SizerOuter-sc-1b3dxan-0
        // .responsive-sizer__SizerInner-sc-1b3dxan-1 
        // <li class="layout-composer__LayoutItem-sc-1q0dvqo-1 ItcRP martian-player__layout-item"

        const listStarter = document.querySelector('.ItcRP') as HTMLElement;
        const outerContainer = document.querySelector('.czgvne') as HTMLElement;
        const innerContainer = document.querySelector('.ikIvWZ') as HTMLElement;

        if (listStarter && outerContainer && innerContainer) {
          console.log('beezlebub')
          // listStarter.style.setProperty('height', '100vh', 'important');
          // outerContainer.style.setProperty('height', '100vh', 'important');
          // innerContainer.style.setProperty('height', '100vh', 'important');

        }
      } else {
        console.log("Can't find video player element")
      }

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


interface flairTeams {
  [key: string]: string;
}


const initSidebar = async (
  iframe: HTMLIFrameElement,
  foundMatchingThread: string
) => {
  console.log('loaded sidebar.js');
  const iframeDocument: Document = iframe.contentDocument!;
  let oldComments: redditComment2[] = []

  const commentContainer = iframeDocument.querySelector('#comments-container') as HTMLElement
  // const heading = iframeDocument.querySelector('.extension-title') as HTMLElement

  // heading.innerHTML = whoVsWho(foundMatchingThread)
  // adjustFontSize(heading)

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
        const commentP = document.createElement("p");
        let usernameH3 = document.createElement('h3')

        const teamKey: string = redditFlairTeams[comment.flair];
        if (teamKey) {
          const colours = teamColors[teamKey];
          usernameH3.innerText = comment.username;
          const svg = createTeamColorSVG(colours);
          commentDiv.appendChild(svg);
        } else {
          usernameH3.innerText = comment.username;
        }

        commentDiv.className = "comment";
        commentP.textContent = comment.comment;

        commentDiv.appendChild(usernameH3);
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
  return s
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function adjustFontSize(element: any) {
  const maxWidth = element.clientWidth;
  const fontSize = parseFloat(window.getComputedStyle(element).fontSize);

  while (element.scrollWidth > maxWidth) {
    const newFontSize = parseFloat(window.getComputedStyle(element).fontSize) - 1;
    element.style.fontSize = newFontSize + 'px';
  }
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
    lowerControlsContainer.style.opacity = "1";
    lowerControlsContainer.style.transition = "opacity 0.3s ease-in-out";
  }
}

async function deleteControlsContainer() {
  const lowerControlsContainer = document.querySelector(".sc-01-lower-controls__LowerControlsContainer-sc-1ec7mdq-0") as HTMLElement;
  if (lowerControlsContainer) {
    lowerControlsContainer.style.opacity = "0";
    setTimeout(() => {
      lowerControlsContainer.style.display = 'none';
    }, 300);
  }
}


type redditComment2 = {
  id: string,
  username: string,
  comment: string,
  time: number,
  score: number,
  flair: string,
}


function createTeamColorSVG(colors: string[]): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '25');
  svg.setAttribute('height', '25');

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
  clipPath.setAttribute('id', 'clipCircle');
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12.5');
  circle.setAttribute('cy', '12.5');
  circle.setAttribute('r', '12.5');
  clipPath.appendChild(circle);
  defs.appendChild(clipPath);
  svg.appendChild(defs);

  const rectHeight = 25 / colors.length;
  colors.forEach((color, index) => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('y', String(index * rectHeight));
    rect.setAttribute('width', '25');
    rect.setAttribute('height', String(rectHeight));
    rect.setAttribute('fill', color);
    rect.setAttribute('clip-path', 'url(#clipCircle)');
    svg.appendChild(rect);
  });

  return svg;
}
