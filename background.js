function debugLog(message) {
    console.log(`[DEBUG ${new Date().toISOString()}]: ${message}`);
  }
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      debugLog(`Saving URL: ${tab.url}`);
      chrome.storage.local.set({currentUrl: tab.url}, function() {
        if (chrome.runtime.lastError) {
          debugLog(`Error saving to storage: ${chrome.runtime.lastError.message}`);
        } else {
          debugLog('URL successfully saved to local storage');
        }
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getStoredUrl") {
      chrome.storage.local.get(['currentUrl'], function(result) {
        if (chrome.runtime.lastError) {
          debugLog(`Error retrieving from storage: ${chrome.runtime.lastError.message}`);
          sendResponse({error: chrome.runtime.lastError.message});
        } else {
          debugLog(`Retrieved URL from storage: ${result.currentUrl}`);
          sendResponse({url: result.currentUrl});
        }
      });
      return true; // Indicates we will send a response asynchronously
    }
  });
  
  debugLog('Background script loaded');
  