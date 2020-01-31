console.log("Background running!");



chrome.webRequest.onBeforeRequest.addListener(function(details) { 
    if(details.url.search("imgur") > 0){
        newUrl= details.url.split("imgur")[0] + 'imgurp' + details.url.split("imgur")[1];
        return {redirectUrl: newUrl};
    }else if(details.url.search("pastebin") > 0){
        newUrl= details.url.split("pastebin")[0] + 'pastebinp' + details.url.split("pastebin")[1];
        return {redirectUrl: newUrl};
    }
},
{urls: ["*://*.wikipedia.org/*", "*://*.imgur.com/*", "*://imgur.com/*", "*://*.pastebin.com/*", "*://pastebin.com/*"]},
["blocking"]);          //These url's are blocked before they're processed here.
  