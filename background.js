console.log("Background running!");


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0];
    var activeTabId = activeTab.id; // Fetch the id so we can redirect
    checkIfBlocked(activeTab);

 });


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    checkIfBlocked(tab);
});


chrome.tabs.onCreated.addListener(function(tab) {         
    checkIfBlocked(tab);
 });


chrome.webRequest.onBeforeRequest.addListener(function(details) { 
    if(details.url.search("wikipedia") > 0){        //Does it actually include "wikipedia"?
        newUrl= details.url.split("wikipedia")[0] + 'zwikipedia' + details.url.split("wikipedia")[1]; //add 'z' before it if it does.
        return {redirectUrl: newUrl};           //then redirect
    }else if(details.url.search("imgur") > 0){
        newUrl= details.url.split("imgur")[0] + 'imgurp' + details.url.split("imgur")[1];
        return {redirectUrl: newUrl};
    }
},
{urls: ["*://*.wikipedia.org/*", "*://*.imgur.com/*", "*://imgur.com/*"]},
["blocking"]);          //These url's are blocked before they're processed here.
  

 function checkIfBlocked(tab){
    var url = new URL(tab.url)
    console.log(url);
    var domain = url.hostname
    if(domain === "imgur.com"){
        newUrl= url.protocol + '//imgurp.com/' + url.pathname
        chrome.tabs.update(tab.id, {url: newUrl });
    }

    if(domain.search("wikipedia") > 0){
        newUrl= url.protocol + "//en.zwikipedia.org"  + url.pathname
        chrome.tabs.update(tab.id, {url: newUrl });
    }

    
    
 }