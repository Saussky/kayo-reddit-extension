import { redditComment } from '../../interfaces';
import { teamColours, redditFlairTeams } from '../misc';
import createTeamColorSVG from '../svg/ticker';


export default function formatTickerComment(comment: redditComment): HTMLDivElement {
  const tickerItem = document.createElement("div");
  tickerItem.className = 'ticker__item';

  const teamKey = redditFlairTeams[comment.flair];

  if (teamKey) {
    try {
      const svgNode = createTeamColorSVG(teamColours[teamKey]);
      svgNode.style.marginRight = "6px";
      svgNode.style.marginTop = "20px";
      tickerItem.appendChild(svgNode);
    } catch (err) {
      console.error('Error while creating SVG:', err);
    }
  }

  const usernameNode = document.createElement("h3");
  usernameNode.style.display = "inline-block";
  usernameNode.style.color = "white";
  usernameNode.style.marginRight = "2px";
  usernameNode.innerText = comment.username + ':';

  const commentNode = document.createElement("p");
  commentNode.style.display = "inline-block";
  commentNode.style.color = "white";
  commentNode.style.marginRight = "2px";
  commentNode.innerText = comment.comment;

  tickerItem.appendChild(usernameNode);
  tickerItem.appendChild(commentNode);

  return tickerItem;
}
