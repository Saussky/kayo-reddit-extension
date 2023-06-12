import { TeamLogo } from "../../interfaces";


let idCounter = 0

export default function createTickerSVG(teamLogo: TeamLogo): SVGSVGElement {
  idCounter++;
  const uniqueId = 'clipCircle' + idCounter;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '20');
  svg.setAttribute('height', '20');

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
  clipPath.setAttribute('id', uniqueId);

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '10');
  circle.setAttribute('cy', '10');
  circle.setAttribute('r', '10');
  clipPath.appendChild(circle);
  defs.appendChild(clipPath);
  svg.appendChild(defs);

  const colors = teamLogo.colours;
  const direction = teamLogo.direction;

  if (direction === 'horizontal') {
    const rectHeight = 20 / colors.length;
    colors.forEach((color, index) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('y', String(index * rectHeight));
      rect.setAttribute('width', '20');
      rect.setAttribute('height', String(rectHeight));
      rect.setAttribute('fill', color);
      rect.setAttribute('clip-path', `url(#${uniqueId})`);
      svg.appendChild(rect);
    });
  }
  else if (direction === 'vertical') {
    const rectWidth = 20 / 3;
    for (let index = 0; index < 3; index++) {
      const color = colors[index % colors.length];
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(index * rectWidth));
      rect.setAttribute('width', String(rectWidth));
      rect.setAttribute('height', '20');
      rect.setAttribute('fill', color);
      rect.setAttribute('clip-path', `url(#${uniqueId})`);
      svg.appendChild(rect);
    }
  }
  else if (direction === 'diagonal') {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '-18');
    rect.setAttribute('y', '5');
    rect.setAttribute('width', '88');
    rect.setAttribute('height', '8');
    rect.setAttribute('transform', 'rotate(-45 10 10)');
    rect.setAttribute('fill', colors[0]);
    rect.setAttribute('clip-path', `url(#${uniqueId})`);
    svg.appendChild(rect);

    const backgroundRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    backgroundRect.setAttribute('width', '20');
    backgroundRect.setAttribute('height', '20');
    backgroundRect.setAttribute('fill', colors[1]);
    backgroundRect.setAttribute('clip-path', `url(#${uniqueId})`);
    svg.insertBefore(backgroundRect, rect);
  }


  return svg;
}