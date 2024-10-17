function contentLog(message) {
    console.log(`[CONTENT ${new Date().toISOString()}]: ${message}`);
  }
  
  function getSelectedText() {
    contentLog('getSelectedText function called');
    try {
      const selection = window.getSelection();
      contentLog(`Selection object: ${selection}`);
      const selectedText = selection.toString().trim();
      contentLog(`Raw selected text: "${selectedText}"`);
      
      if (selectedText) {
        contentLog(`Selected text (${selectedText.length} characters): ${selectedText}`);
        chrome.runtime.sendMessage({action: "logSelectedText", text: selectedText}, function(response) {
          if (chrome.runtime.lastError) {
            contentLog(`Error sending message: ${chrome.runtime.lastError.message}`);
          } else {
            contentLog(`Message sent to background. Response: ${JSON.stringify(response)}`);
          }
        });
      } else {
        contentLog('No text currently selected');
      }
    } catch (error) {
      contentLog(`Error in getSelectedText: ${error.message}`);
    }
  }
  
  // Automatically log selection changes
  document.addEventListener('selectionchange', function() {
    contentLog('Selection changed event fired');
    getSelectedText();
  });
  
  contentLog('Content script loaded. Use getSelectedText() to manually trigger text selection logging.');
  
  //Inject a button into the page for easy testing
  const button = document.createElement('button');
  button.textContent = 'Log Selected Text';
  button.style.position = 'fixed';
  button.style.top = '10px';
  button.style.right = '10px';
  button.style.zIndex = '9999';
  button.addEventListener('click', getSelectedText);
  document.body.appendChild(button);