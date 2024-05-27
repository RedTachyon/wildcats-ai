chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getAccessibilityTree") {
        chrome.debugger.attach({ tabId: sender.tab?.id }, "1.3", function() {
            chrome.debugger.sendCommand({ tabId: sender.tab?.id }, 'Accessibility.getFullAXTree', {}, function(response) {
                chrome.debugger.detach({ tabId: sender.tab?.id });
                sendResponse({ axTree: response });
            });
        });
        return true; // indicates that sendResponse will be asynchronous
    }
});
