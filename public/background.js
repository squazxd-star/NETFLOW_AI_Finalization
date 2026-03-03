// Netflow AI — Background Service Worker (Manifest V3)
// Opens the side panel when the extension icon is clicked.

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Relay messages from sidepanel to content script on active tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.action === "GENERATE_IMAGE" || message?.action === "UPLOAD_IMAGES" || message?.action === "PING") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab?.id) {
                sendResponse({ success: false, message: "No active tab found" });
                return;
            }
            chrome.tabs.sendMessage(tab.id, message, (response) => {
                if (chrome.runtime.lastError) {
                    sendResponse({
                        success: false,
                        message: "Content script not found on this page. Make sure Google Flow is open."
                    });
                } else {
                    sendResponse(response);
                }
            });
        });
        return true; // async
    }
});
