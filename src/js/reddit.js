"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const threadUrl2 = 'r/AFL/comments/1225t2f/match_thread_sydney_swans_vs_hawthorn_round_2/';
const threadUrl = 'r/AFL/comments/128b8xi/match_thread_gws_giants_vs_carlton_round_3/';
const initialTime = Math.floor(Date.now() / 1000);
//1679808333
async function getRedditCommentes(threadLink, time) {
    try {
        const response = await fetch(`https://www.reddit.com/${threadLink}.json?sort=new`);
        const data = await response.json();
        const comments = await data[1].data.children;
        time = Math.floor(Number(new Date()) / 1000);
        console.log('api has been reached', time);
        // comments.forEach(async(comment: any) => {
        //     if (comment.data.created_utc > time - 600) {
        //         console.log('Comment should be added')
        //     } else {
        //         console.log('Comment wont pass time check')
        //         console.log(comment.data.created_utc, '   ', time)
        //     }
        // })
        // Only use comments that happened after the time argument, unless there's no time argument just get all of them
        // const filteredComments = time
        //     ? await comments.filter((comment: any) => comment.data.created_utc > time)
        //     : comments;
        // const filteredComments = comments.filter((comment: any) => comment.data.created_utc > (time - 600))
        const filteredComments = comments;
        // console.log('filtered', filteredComments)
        // If there's no comments that passed the criteria, return early
        if (!filteredComments) {
            console.log('time issue !!!!!');
            return [];
        }
        ;
        // Get all the relevant information we need from each comment
        const formattedComments = await filteredComments.map((comment) => ({
            id: comment.data.id,
            username: comment.data.author,
            comment: comment.data.body,
            time: comment.data.created_utc,
            score: comment.data.score,
            flair: comment.data.author_flair_css_class,
        }));
        console.log(formattedComments);
        return formattedComments.reverse();
    }
    catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("idk man");
    }
}
getRedditCommentes(threadUrl2, initialTime);
// const now = 1679785353
// const aaa = 1680257085837
// const ahole = getRedditCommentes(threadUrl, now)
// // async function getRedditComments(threadLink: string, lastFetchTime: number) {
// //     let goodComments: string[] = [];
// //     try {
// //       const response = await fetch(`https://www.reddit.com/${threadLink}.json?limit=5`);
// //       const data = await response.json();
// //       const comments = await data[0].data.children;
// //       for (let i = 0; i < 5; i++) {
// //         const createdTime: number = comments[i].data.created_utc; // Time reddit comment was posted
// //         if (createdTime > lastFetchTime) {
// //           goodComments.push(comments[i].data.body);
// //         }
// //       }
// //       return goodComments;
// //     } catch (error) {
// //       console.error("Error fetching comments:", error);
// //     }
// //   }
// // getRedditComments()
// // ups = upvotes, downs = downvotes
// // created_utc = utc
// // TODO: Refresh comments every x seconds (probably outside this function) goodComments = setInterval(functionAbove)(30 seconds?)
// // Do not get comments that are older than 2 minutes
// // If it's displayed a comment don't display it again
// // Display comments only if they have more than 3 upvotes?
// // Display username and comment? (option to switch off username)
// // Display flair along with comment
// // Bigger text for the more upvotes?
// // If it has enough downvotes, display it? maybe as an option
// // option for how many upvotes it needs in order to reach the side scroller
// // Is going to have to return an object { username, flair, comment, upvotes? }
async function getRedditThreads() {
    const apiUrl = `https://www.reddit.com/r/afl/hot.json?limit=20&sort=new`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const threads = data.data.children;
        threads.forEach((thread) => {
            console.log(thread.data.permalink);
        });
        return ['hey'];
    }
    catch (error) {
        console.error('Error fetching stickied threads:', error);
        return [];
    }
}
// getRedditThreads()
// function toInitialCaps(s: string): string {
//     return s.charAt(0).toUpperCase() + s.slice(1);
//   }
// console.log(toInitialCap('melbourne'))
// const aflTeams = ["adelaide", "brisbane", "carlton", "collingwood", "essendon", "fremantle", "geelong", "gold coast", "greater western sydney", "hawthorn", "melbourne", "north melbourne", "port adelaide", "richmond", "st kilda", "sydney", "west coast", "western bulldogs"];
// function whoVsWho(threadName: string) {
//     const regex = new RegExp(aflTeams.join("|"), "gi");
//     const matches = threadName.match(regex);
//     if (matches && matches.length >= 2) {
//         return `${matches[0]} vs ${matches[1]}`;
//     }
//     return "";
// }
// console.log(whoVsWho('/r/AFL/comments/12299n2/match_thread_essendon_vs_gold_coast_round_2'))
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
async function fetchRedditAflPage() {
    try {
        const response = await axios_1.default.get('https://www.reddit.com/r/AFL/');
        const dom = new jsdom_1.JSDOM(response.data);
        const doc = dom.window.document;
        const flairOptionPaneDiv = doc.querySelector('.flairoptionpane');
        if (!flairOptionPaneDiv) {
            throw new Error('Flairoptionpane div not found');
        }
        const ul = flairOptionPaneDiv.querySelector('ul');
        if (!ul) {
            throw new Error('Target ul not found');
        }
        // Continue processing the ul element
    }
    catch (error) {
        console.error('Error fetching Reddit page:', error);
    }
}
async function fetchRedditAflPage2() {
    try {
        const response = await axios_1.default.get('https://www.reddit.com/r/AFL/');
        const html = response.data;
        // Parse the HTML content using JSDOM
        const dom = new jsdom_1.JSDOM(html);
        const doc = dom.window.document;
        // Find the ul element with the specified style
        const ulElements = doc.querySelectorAll('ul');
        const targetUl = Array.from(ulElements).find((ul) => ul.getAttribute('style') === 'width: 150px; float: left;');
        if (!targetUl) {
            throw new Error('Target ul not found');
        }
        console.log('hey');
        // Extract the span elements
        const spanElements = targetUl.querySelectorAll('li > span');
        // Initialize the aflTeamsObject
        const aflTeamsObject = {
            adelaide: [],
            brisbane: [],
            carlton: [],
            collingwood: [],
            essendon: [],
            fremantle: [],
            geelong: [],
            gold_coast: [],
            gws: [],
            hawthorn: [],
            melbourne: [],
            north_melbourne: [],
            port_adelaide: [],
            richmond: [],
            st_kilda: [],
            sydney: [],
            west_coast: [],
            western_bulldogs: [],
        };
        // Iterate through the span elements and extract the relevant class names
        spanElements.forEach((span) => {
            const classNames = span.className.split(' ');
            classNames.forEach((className) => {
                if (className.startsWith('flair-')) {
                    const teamName = className.substring(6);
                    if (aflTeamsObject.hasOwnProperty(teamName)) {
                        aflTeamsObject[teamName].push(className);
                    }
                }
            });
        });
        console.log(aflTeamsObject);
    }
    catch (error) {
        console.error('Error fetching Reddit page:', error);
    }
}
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateOAuthLink = (apiCredentials) => {
    const clientId = apiCredentials.clientId;
    const redirectUri = encodeURIComponent('http://localhost:8080');
    const responseType = 'code';
    const state = Math.random().toString(36).substring(2); // Generate a random string for state
    const scope = 'flair'; // Scope for the flair API endpoint
    return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=${responseType}&state=${state}&redirect_uri=${redirectUri}&duration=permanent&scope=${scope}`;
};
const apiCredentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.RED_USERNAME,
    password: process.env.RED_PASSWORD,
};
// const oauthLink = generateOAuthLink(apiCredentials);
// console.log(oauthLink);
const getAccessToken = async (apiCredentials, code, redirectUri) => {
    try {
        const response = await axios_1.default.post('https://www.reddit.com/api/v1/access_token', `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`user:${apiCredentials.clientId}:${apiCredentials.clientSecret}`).toString('base64')}`,
            },
        });
        console.log(response.data);
        return null;
    }
    catch (error) {
        console.error('Failed to retrieve access token:', error);
        return null;
    }
};
// getAccessToken(apiCredentials, 'jX6tYBIIluGgkRQxIkjg5o0C5zlWCQ#_', 'http://localhost:8080')
// async function fetchRedditFlair(accessToken: string) {
//   try {
//     const response = await axios.get('https://www.reddit.com/r/afl/api/link_flair.json', {
//       headers: {
//         'User-Agent': 'my-reddit-project/0.1',
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const flairData = response.data;
//     console.log('Flair data:', flairData);
//   } catch (error) {
//     console.error('Error fetching flair data:', error);    
//   }
// }
// (async () => {
//   const clientId = apiCredentials.clientId!;
//   const clientSecret = apiCredentials.clientSecret!;
//   const username = apiCredentials.username!;
//   const password = apiCredentials.password!;
//   const accessToken = await getAccessToken(clientId, clientSecret, username, password);
//   await fetchRedditFlair(accessToken);
// })();
