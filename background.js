var picChange = true;

chrome.browserAction.onClicked.addListener(function(info,tab) {
   chrome.tabs.query({
      "active": true, 
      "currentWindow": true
   }, function (tabs) {
//   chrome.tabs.executeScript(null, {file: "runLeos.js"});
      chrome.tabs.sendMessage(tabs[0].id, {
         "functiontoInvoke": "changePics"
      });
   });
   
   if (picChange == true) {
      picChange = false; 
   }
   else {
      picChange = true;
   }
   
});
