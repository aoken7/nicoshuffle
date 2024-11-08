
(async function () {

    await new Promise(resolve => setTimeout(resolve, 3000));

    const video = document.querySelector('video');

    video.addEventListener('play', () => {
        console.log('play event');
    });

    video.addEventListener('ended', () => {
        console.log("ended event");

        chrome.storage.local.get(['mylist'], function (result) {
            const collectedLinks = result.mylist;

            if (collectedLinks && collectedLinks.length > 0) {
                var index = 0;
                chrome.storage.local.get(['index'], function (result) {
                    index = result.index;

                    const url = new URL(collectedLinks[(index + 1) % collectedLinks.length]);
                    url.searchParams.set('continuous', '1');

                    console.log('current index:', index);
                    index++;
                    chrome.storage.local.set({ "index": index }, function () {
                        console.log("index saved");

                    });
                    window.location.href = url.toString();
                });

            }
        });

    });

})();