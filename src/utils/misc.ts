import { RedditFlair, TeamLogos } from '../interfaces';
import redditFlairTeamsData from '../static/afl/redditFlair.json'
import teamColoursData from '../static/afl/teamColours.json'


export const teamColours = teamColoursData as TeamLogos;
export const redditFlairTeams = redditFlairTeamsData as RedditFlair


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
            break;  // This will break the loop after finding the match
        }
    }
    return foundMatchingThread;
}

