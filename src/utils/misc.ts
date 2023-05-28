export function commonValues(kayo: string[], reddit: string[]): string[] {
    return kayo.filter((value) => reddit.includes(value));
}

export function extractTeamName(urlString: string) {
    const words = urlString.toLowerCase().split(/[-_!1]/);
    const teamNames = words.filter((word) => word !== 'vs' && !word.startsWith('https://') && word !== 'fixture' && word !== 'match' && word !== 'thread' && word !== 'round');
    return teamNames;
}

export const checkURL = (url: string): boolean => {
    if (!url.toLowerCase().includes('afl')) {
        console.log('The URL does not contain "afl".');
        return false;
    }
    return true;
}

export const findMatchingThread = (kayoTeams: string[], redditThreads: string[]): string => {
    let foundMatchingThread: string = '';
    for (const thread of redditThreads) {
        const game = extractTeamName(thread);

        if (commonValues(kayoTeams, game).length >= 2) {
            foundMatchingThread = thread;
        }
    }
    return foundMatchingThread;
}