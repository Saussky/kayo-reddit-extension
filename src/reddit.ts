const threadUrl: string = 'r/AFL/comments/11v6phv/match_thread_gws_giants_vs_adelaide_round_1/';
const initialTime = Math.floor(Date.now() / 1000);


type redditCommenet = {
  username: string,
  comment: string,
  score: number,
  flair: string,
}


async function getRedditCommentes(threadLink: string, lastFetchTime: number) {
  const formattedComments: redditCommenet[]  = []


  try {
      const response = await fetch(`https://www.reddit.com/${threadLink}.json?limit=5`);
      const data = await response.json();
      const comments = await data[1].data.children;

      await Promise.all(comments.map(async (comment: any) => {
        const author = comment.data.author;
        const votes = comment.data.score;
        const flair = comment.data.author_flair_css_class;
        const text = comment.data.body;
      
        formattedComments.push({
          username: author,
          comment: text,
          score: votes,
          flair: flair
        });
      }));

      console.log(formattedComments)
      return formattedComments;
  } catch (error) {
      console.error("Error fetching comments:", error);
  }
}

const ahole = getRedditCommentes(threadUrl, initialTime)
console.log(ahole)

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


// export async function getStickiedThreads() {
//     const apiUrl: string = `https://www.reddit.com/r/afl/hot.json?limit=3`
//     const stickied: string[] = [];

//     try {
//         const response = await fetch(apiUrl)
//         const data = await response.json()
//         const threads = (data.data.children)
//         const stickiedThreads = threads.filter((thread: any) => thread.data.stickied);

//         stickiedThreads.forEach(async (thread: any) => {
//             stickied.push(await thread.data.permalink) //permalink starts with a /r/
//         })
//         return stickied
//     } catch (error) {
//         console.error(error)
//         return []
//     }
// }


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