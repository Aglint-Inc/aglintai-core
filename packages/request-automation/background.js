chrome.runtime.onInstalled.addListener(() => {
  console.log("Aglint AI Demo Helper installed and running in the background.");
});

chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes("aglinthq.com/requests")) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['contentScript.js']
    });
  }
}, { url: [{ hostContains: 'aglinthq.com', pathContains: 'requests' }] });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message); // For debugging
  // Handle other messages if needed
});
