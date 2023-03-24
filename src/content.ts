
function initObserver() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  let extensionInitialized = false;

  const observer = new MutationObserver((mutationsList, observer) => {
    if (extensionInitialized) {
      return;
    }

    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const videoPlayer = document.querySelector('video');
        if (videoPlayer) {
          console.log('oii')
          initExtension();
          extensionInitialized = true;
          observer.disconnect(); // Stop observing when the video player is found
          break;
        }
      }
    }
  });

  observer.observe(targetNode, config);
}

initObserver();



function initExtension() {
  const sidebarExists = document.getElementById('kayo-reddit-sidebar');
  console.log('initExtension')

  if (!sidebarExists) {
    console.log('iframe')

        // left: calc(100% - 267px);
    const iframe = document.createElement('iframe');
    iframe.id = 'kayo-reddit-sidebar';
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.cssText = `
    border: none;
    height: 100%;
    position: absolute;
    width: 335px;

    top: 0;
    z-index: 99999;
  `;

    const videoElement = document.querySelector('video');
    if (videoElement) {
      console.log('player found')
      const locationDiv = document.querySelector('.bvuuzM') as HTMLElement;
      const parentDiv = document.querySelector('.ikIvWZ') as HTMLElement;

      if (locationDiv) {
        locationDiv.style.setProperty('left', 'calc(0% - 4vw)', 'important');
        locationDiv.style.setProperty('transform', 'translate(0%, -50%)', 'important');
        locationDiv.style.setProperty('width', 'calc(100% - 190px)', 'important');
        locationDiv.parentElement?.appendChild(iframe);

        const locationDivWidth = locationDiv.getBoundingClientRect().width;
        iframe.style.left = `calc(${locationDivWidth}px - 5vw)  `;
      }


      /// videoElement.parentNode!.insertBefore(iframe, videoElement.nextSibling);
    } else {
      console.log('Player div not found');
      document.body.appendChild(iframe);
    }

    iframe.onload = () => {
      console.log('iframe loaded');
      initSidebar(iframe);
    };

  } else {
    console.log('nframe')
    sidebarExists.remove();
  }
}
// initExtension()



const initSidebar = (iframe: HTMLIFrameElement) => {
  console.log('loaded sidebar.js');

  const iframeDocument = iframe.contentDocument!;

  iframeDocument.getElementById('load-comments')!.addEventListener('click', async () => {
    console.log('click');


    const threadUrl = (iframeDocument.getElementById('thread-url') as HTMLInputElement).value;
    const apiUrl = `https://www.reddit.com/${threadUrl}.json?limit=5`;

    try {
      console.log('gddday mate');
      const response = await fetch(apiUrl);
      const data = await response.json();
      const comments = data[1].data.children;
      const commentsContainer = iframeDocument.getElementById('comments-container');
      commentsContainer!.innerHTML = '';

      comments.forEach((comment: any) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
                <strong>${comment.data.author}</strong>:
                <p>${comment.data.body}</p>
              `;
        commentsContainer!.appendChild(commentDiv);
      });
    }
    catch (error) {
      const commentsContainer = iframeDocument.getElementById('comments-container')!;
      commentsContainer.innerHTML = 'something went wronnng!'
      console.error('Error fetching comments:', error);
    }
  });
}


