window.initSidebar = () => {
    initHeading('balls');

    document.getElementById('load-comments')!.addEventListener('click', async () => {
        console.log('click');
        const threadUrl = (document.getElementById('thread-url') as HTMLInputElement).value;
        const apiUrl = `https://www.reddit.com/${threadUrl}.json?limit=5`;

        try {
            console.log('gddday mate');
            const response = await fetch(apiUrl);
            const data = await response.json();
            const comments = data[1].data.children;
            const commentsContainer = document.getElementById('comments-container');
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
            const commentsContainer = document.getElementById('comments-container')!;
            commentsContainer.innerHTML = 'something went wronnng!'
            console.error('Error fetching comments:', error);
        }
    });
}

function initHeading(text: string) {
    const heading = document.querySelector('.extensionTitle') as HTMLElement
    heading.innerHTML = text;
}