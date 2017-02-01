function checkForValidUrl(tabId, changeInfo, tab) {
     if(tab.url.match("https://jaccount.sjtu.edu.cn/jaccount/jalogin") != null){
          chrome.pageAction.show(tabId);
     }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
