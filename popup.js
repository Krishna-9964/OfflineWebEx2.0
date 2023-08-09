
button = document.getElementById('openNewTabButton');
button.addEventListener('click', function () {
    window.open("downloads.html", '_blank')

})
filter = document.getElementById('FilterHistory');
filter.addEventListener('click', function () {
    window.open("filter.html", '_blank')

})

search = document.getElementById('OfflineSearch');
search.addEventListener('click', function () {
    window.open("./search box/index.html", '_blank')
})


//Download content
document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("download-button");
    downloadButton.addEventListener("click", async function () {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: downloadPage
        });
    });
});

async function downloadPage() {
    const url = window.location.href;
    var filename = ""
    if (document.title === '') {
        filename = url.substring(url.lastIndexOf("/") + 1)
        filename = filename.replace(/[^a-zA-Z0-9.]/g, " ");
    }
    else {
        const originalString = document.title;
        filename = originalString.replace(/[^\w\s.-]/gi, "") + ".html";
    }

    // console.log(validFileName);
    // const filename = "offline_page.html";
    await chrome.runtime.sendMessage({ action: "startDownload", url, filename });
}
