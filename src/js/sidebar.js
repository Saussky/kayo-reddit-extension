"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.initSidebar = () => {
    initHeading('balls');
    document.getElementById('load-comments').addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('click');
        const threadUrl = document.getElementById('thread-url').value;
        const apiUrl = `https://www.reddit.com/${threadUrl}.json?limit=5`;
        try {
            console.log('gddday mate');
            const response = yield fetch(apiUrl);
            const data = yield response.json();
            const comments = data[1].data.children;
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = '';
            comments.forEach((comment) => {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                <strong>${comment.data.author}</strong>:
                <p>${comment.data.body}</p>
              `;
                commentsContainer.appendChild(commentDiv);
            });
        }
        catch (error) {
            const commentsContainer = document.getElementById('comments-container');
            commentsContainer.innerHTML = 'something went wronnng!';
            console.error('Error fetching comments:', error);
        }
    }));
};
function initHeading(text) {
    const heading = document.querySelector('.extensionTitle');
    heading.innerHTML = text;
}
