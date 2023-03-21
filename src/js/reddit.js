"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStickiedThreads = void 0;
const threadUrl = 'r/AFL/comments/11v6phv/match_thread_gws_giants_vs_adelaide_round_1/';
const apiUrl = `https://www.reddit.com/${threadUrl}.json`;
//?limit=5
async function getRedditComments() {
    let goodComments = []; // this is going to have to be an object
    const now = new Date();
    const utcTime = Math.floor(now.getTime() / 1000);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const comments = data[1].data.children;
        for (let i = 0; i < 5; i++) {
            // console.log(comments[i].data.created_utc)
            // console.log(utcTime - comments[i].data.created_utc)
            // console.log(comments[i].data)
            const createdTime = comments[i].data.created_utc; // Time reddit comment was posted
            const currentTimeSeconds = Math.floor(Date.parse(new Date().toUTCString()) / 1000); // Gets current UTC time in seconds
            const timeDifference = currentTimeSeconds - createdTime;
            console.log(timeDifference);
        }
        // comments.forEach((comment: any) => {
        //     if (comment.data.ups > 5) console.log(comment.data.body)
        // });
    }
    catch (error) {
        console.error('Error fetching comments:', error);
    }
}
// getRedditComments()
// ups = upvotes, downs = downvotes
// created_utc = utc
// TODO: Refresh comments every x seconds (probably outside this function) goodComments = setInterval(functionAbove)(30 seconds?)
// Do not get comments that are older than 2 minutes
// If it's displayed a comment don't display it again
// Display comments only if they have more than 3 upvotes?
// Display username and comment? (option to switch off username)
// Display flair along with comment
// Bigger text for the more upvotes?
// If it has enough downvotes, display it? maybe as an option
// option for how many upvotes it needs in order to reach the side scroller
// Is going to have to return an object { username, flair, comment, upvotes? }
async function getStickiedThreads() {
    const apiUrl = `https://www.reddit.com/r/afl/hot.json?limit=3`;
    const stickied = [];
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const threads = (data.data.children);
        const stickiedThreads = threads.filter((thread) => thread.data.stickied);
        stickiedThreads.forEach((thread) => {
            stickied.push(thread.data.permalink); //permalink starts with a /r/
        });
        return stickied;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
exports.getStickiedThreads = getStickiedThreads;
getStickiedThreads();
