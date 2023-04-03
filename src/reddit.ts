const threadUrl2: string = 'r/AFL/comments/1225t2f/match_thread_sydney_swans_vs_hawthorn_round_2/'
const threadUrl = 'r/AFL/comments/128b8xi/match_thread_gws_giants_vs_carlton_round_3/'
const initialTime = Math.floor(Date.now() / 1000);


interface redditCommenet {
  id: string,
  username: string,
  comment: string,
  score: number,
  flair: string,
}
//1679808333



async function getRedditCommentes(threadLink: string, time: number) {
  try {
      const response = await fetch(`https://www.reddit.com/${threadLink}.json?limit=6&sort=new`);
      const data = await response.json();
      const comments = await data[1].data.children;

      time = Math.floor(Number(new Date()) / 1000);
      console.log('api has been reached', time)

      comments.forEach(async(comment: any) => {
          if (comment.data.created_utc > time - 600) {
              console.log('Comment should be added')
          } else {
              console.log('Comment wont pass time check')
              console.log(comment.data.created_utc, '   ', time)
          }
      })

      // Only use comments that happened after the time argument, unless there's no time argument just get all of them
      // const filteredComments = time
      //     ? await comments.filter((comment: any) => comment.data.created_utc > time)
      //     : comments;

      const filteredComments = comments.filter((comment: any) => comment.data.created_utc > (time - 600))

      // console.log('filtered', filteredComments)
      // If there's no comments that passed the criteria, return early
      if (!filteredComments) {
          console.log('time issue !!!!!')
          return []
      };

      // Get all the relevant information we need from each comment
      const formattedComments: redditCommenet[] = await filteredComments.map((comment: any) => ({
          id: comment.data.id,
          username: comment.data.author,
          comment: comment.data.body,
          time: comment.data.created_utc,
          score: comment.data.score,
          flair: comment.data.author_flair_css_class,
      }));

      console.log(formattedComments);
      return formattedComments.reverse();
  } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("idk man")
  }
}


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


async function getRedditThreads(): Promise<string[]> {
  const apiUrl: string = `https://www.reddit.com/r/afl/hot.json?limit=20&sort=new`

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const threads = data.data.children;
      threads.forEach((thread: any) => {
        console.log(thread.data.permalink)
      })
      return ['hey']
  } catch (error) {
      console.error('Error fetching stickied threads:', error);
      return [];
  }
}

// getRedditThreads()


function toInitialCaps(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  
console.log(toInitialCap('melbourne'))

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