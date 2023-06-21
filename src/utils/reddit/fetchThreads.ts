export const getRedditThreads = (): Promise<string[]> => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "getRedditThreads" }, (response) => {
            resolve(response);
        });
    });
}

export async function getStickiedThreads(): Promise<string[]> {
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
