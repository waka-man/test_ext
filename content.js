function getStoredUrl() {
    chrome.runtime.sendMessage({action: "getStoredUrl"}, function(response) {
      if (response.error) {
        console.error('Error retrieving stored URL:', response.error);
      } else {
        console.log('Retrieved stored URL:', response.url);
      }
    });
  }
  console.log('URL Reader content script loaded. Use getStoredUrl() to retrieve the stored URL.');
