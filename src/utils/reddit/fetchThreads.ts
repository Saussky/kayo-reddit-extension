export const getRedditThreads = (): Promise<string[]> => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "getRedditThreads" }, (response) => {
            resolve(response);
        });
    });
}