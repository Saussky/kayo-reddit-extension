"use strict";
chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-sidebar') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
            }
        });
    }
});
