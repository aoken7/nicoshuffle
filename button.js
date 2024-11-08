

(async function () {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 画面が描画されるまで待機

    const continuousPlayButton = document.querySelector('.MylistMenu-continuous');
    const pagination = document.querySelector('.MylistMenu-pagination');

    const newButton = document.createElement('button');
    newButton.classList.add('ContinuousPlayButton');  // ボタンのCSSを適用するためのクラス
    newButton.textContent = 'シャッフル再生';

    newButton.style.marginLeft = '16px';

    // ボタンのホバー効果
    newButton.addEventListener('mouseover', () => {
        newButton.style.backgroundColor = '#555';
        newButton.style.color = '#fff';
    });
    newButton.addEventListener('mouseout', () => {
        newButton.style.backgroundColor = '#fff';
        newButton.style.color = '#555';
    });

    if (continuousPlayButton) {
        continuousPlayButton.parentNode.appendChild(newButton);
    }

    if (pagination && continuousPlayButton.parentNode) {
        continuousPlayButton.parentNode.appendChild(pagination);
    }

    newButton.addEventListener('click', function () {
        chrome.storage.local.get(['mylist'], function (result) {
            const collectedLinks = result.mylist;

            if (collectedLinks && collectedLinks.length > 0) {
                var index = 0;
                chrome.storage.local.get(['index'], function (result) {
                    index = result.index;

                    const url = new URL(collectedLinks[collectedLinks.length % (index + 2)]);
                    url.searchParams.set('continuous', '1');

                    console.log('play index:', index);
                    index++;
                    chrome.storage.local.set({ "index": index }, function () {
                        console.log("index saved");
                    });

                    window.open(url.toString(), '_blank');
                });
            }
        });

    });
})();