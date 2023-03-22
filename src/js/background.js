"use strict";
// chrome.commands.onCommand.addListener((command) => {
//   if (command === 'toggle-sidebar') {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       if (tabs[0].id) {
//         chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' });
//       }
//     });
//   }
// });
// chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
//   console.log('ddddddddd', details)
//   if (details.url.includes('kayosports.com.au')) {
//     console.log(';ahhhhh')
//   }
// });
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        console.log('changed info');
        if (tab.url && tab.url.includes('kayosports.com.au')) {
            console.log('do the thing');
            chrome.tabs.executeScript(tabId, { file: 'js/content.js' });
        }
    }
});
