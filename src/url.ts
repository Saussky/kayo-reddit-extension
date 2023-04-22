// there is a div on the reddit wesbite with the class ="flairoptionpane" that has a ul element with the style="width: 150px; float: left;" 

// inside this ul element there are li elements, and inside those li elements there are spans with the class set to things similar to "flair flair-adelaide" and "class="flair flair-adelaide3"

// get every word that isn't "flair" and "flair-" and compare it to this array

// const aflTeams = ["adelaide", "brisbane", "carlton", "collingwood", "essendon", "fremantle", "geelong", "gold_coast", "gws", "hawthorn", "melbourne", "north_melbourne", "port_adelaide", "richmond", "st_kilda", "sydney", "west_coast", "western_bulldogs"];

// if the span class has anything similar to this




// // // Checks the website URL, if it's a footy game it gets the it gets the string such as 'st-kilda-saints-vs-fremantle-dockers'
// // function checkUrl(): string {
// //     const url = window.location.href;
// //     const regex = /\/fixture\/sport!afl\/[\w-]*!?\d*\/fixture-([\w-]+)/;

// //     const match = url.match(regex);
// //     if (match) {
// //         const extractedData = match[1];
// //         console.log('Regex matched', extractedData);
// //         return extractedData
// //     } else {
// //         console.log('No regex matched')
// //         return ''
// //     }
// // }


// // function observeUrlChanges() {
// //     const targetNode = document.querySelector('body');

// //     const observerConfig = {
// //         childList: true,
// //         subtree: true,
// //     };

// //     const urlObserver = new MutationObserver(async () => {
// //         const kayoUrl: string = checkUrl();

// //         if (kayoUrl) {
// //             // probably turn this into it's own function
// //             const redditThreads = await getStickiedThreads();

// //             redditThreads.forEach((threadLink: string) => {
// //                 if (isSameGame(kayoUrl, threadLink)) {
// //                     console.log('we are in business')
// //                     // setInterval
// //                     // Every 15 seconds 
// //                     setInterval(() => {
// //                         getRedditComments(threadLink)

// //                         // Run the function that gets comments and puts them on screen
// //                     }, 150000)
                    
// //                   } else {
// //                     console.log('noiiiiiiii')
// //                   }
// //             })
// //         }
// //     });

// //     if (targetNode) {
// //         urlObserver.observe(targetNode, observerConfig);
// //     }
// // }








// // export function extractTeamName(urlString: string) {
// //     const words = urlString.toLowerCase().split(/[-_]/);
// //     const teamNames = words.filter((word) => word !== 'vs' && word !== 'fixture' && word !== 'match' && word !== 'thread' && word !== 'round');
// //     return teamNames;
// // }

// // export default function isSameGame(urlString: string, redditTitle: string) {
// //     const kayo: string[] = extractTeamName(urlString);
// //     const reddit: string[] = extractTeamName(redditTitle);

// //     let matchCount = 0;

// //     // Counts the matching words in the above arrays, if there are two then returns true
// //     for (const kayoElement of kayo) {
// //         for (const redditElement of reddit) {
// //             if (kayoElement === redditElement) {
// //                 matchCount++;

// //                 if (matchCount >= 2) {
// //                     return true;
// //                 }
// //             }
// //         }
// //     }

// //     return false;
// // }

// // function commonValues(kayo: string[], reddit: string[]): string[] {
// //     return kayo.filter((value) => reddit.includes(value));
// //   }

// //   // if (isSameGame(checkUrl(), reddit)) {
// //   //   console.log('oiiiiiii')
// //   // } else {
// //   //   console.log('noiiiiiiii')
// //   // }