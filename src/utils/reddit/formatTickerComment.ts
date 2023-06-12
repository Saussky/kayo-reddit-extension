import { RedditFlair, redditComment, TeamLogos } from '../../interfaces';
import redditFlairTeamsData from '../../static/afl/redditFlair.json'
import teamColoursData from '../../static/afl/teamColours.json'
import createTeamColorSVG from '../svg/sidebar';


const teamColours = teamColoursData as TeamLogos;
const redditFlairTeams = redditFlairTeamsData as RedditFlair

export default function formatTickerComment(comment: redditComment): HTMLDivElement {
  const tickerItem = document.createElement("div");
  tickerItem.className = 'ticker__item';
  
  const svgNode = createTeamColorSVG(teamColours[redditFlairTeams[comment.flair]]);
  svgNode.style.marginRight = "2px";

  const usernameNode = document.createElement("h3");
  usernameNode.style.display = "inline-block";
  usernameNode.style.color = "white";
  usernameNode.innerText = comment.username + ':';

  const commentNode = document.createElement("p");
  commentNode.style.display = "inline-block";
  commentNode.style.color = "white";
  commentNode.innerText = comment.comment;

  tickerItem.appendChild(svgNode);
  tickerItem.appendChild(usernameNode);
  tickerItem.appendChild(commentNode);

  return tickerItem;
}
