(async function () {
    const collectedLinks = []; 
    const visitedUrls = new Set();
    let currentPageUrl = window.location.href; 
    const maxPages = 5;
    let pageCount = 1; 

    // ページのリンクを収集する関数
    function collectLinks() {
        const links = document.querySelectorAll('a.NC-Link.NC-MediaObject-contents');
        links.forEach(link => {
            const href = link.href;
            if (!collectedLinks.includes(href)) {
                collectedLinks.push(href);
            }
        });
    }


    // DOMが完全に読み込まれるのを待つ関数
    function waitForDomToLoad(doc) {
        return new Promise((resolve) => {
            const observer = new MutationObserver(() => {
                resolve();
                observer.disconnect(); 
            });

            observer.observe(doc.body, { childList: true, subtree: true });
        });
    }


    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    } 
    
    
    const response = await fetch(currentPageUrl);
    const html = await response.text();
    const parser = new DOMParser();
    const nextDoc = parser.parseFromString(html, "text/html");

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    waitForDomToLoad(nextDoc);
    collectLinks();

    let shuffledLinks = shuffleArray(collectedLinks);

    // 状態を保存
    chrome.storage.local.clear();
    chrome.storage.local.set({ "mylist": shuffledLinks }, function () {
        console.log("mylist saved");
    });
    chrome.storage.local.set({"index": 0 }, function() {
        console.log("index saved");
    });
})();


