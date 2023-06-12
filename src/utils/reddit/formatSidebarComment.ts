import { RedditFlair, redditComment, TeamLogos } from '../../interfaces';
import redditFlairTeamsData from '../../static/afl/redditFlair.json'
import teamColoursData from '../../static/afl/teamColours.json'
import createTeamColorSVG from '../svg/sidebar';


const teamColours = teamColoursData as TeamLogos;
const redditFlairTeams = redditFlairTeamsData as RedditFlair

export default function formatRedditComment(comment: redditComment): HTMLDivElement {
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';

  const userContainer = document.createElement('div');
  userContainer.style.cssText = `
    display: flex;
    align-items: center;
  `;

  const usernameH3 = document.createElement('h3');
  usernameH3.innerText = comment.username;
  
  const teamKey = redditFlairTeams[comment.flair];
  if (teamKey) {
    try {
      const svg = createTeamColorSVG(teamColours[teamKey]);
      userContainer.appendChild(svg);
    } catch (err) {
      console.error('Error while creating SVG:', err);
    }
  }

  userContainer.appendChild(usernameH3);
  commentDiv.appendChild(userContainer);

  const commentP = document.createElement('p');
  commentP.textContent = comment.comment;
  commentDiv.appendChild(commentP);

  return commentDiv;
}