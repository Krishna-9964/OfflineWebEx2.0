chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "startDownload") {
        const options = {
            url: request.url,
            filename: "" + request.filename,
            saveAs: false
        };

        chrome.downloads.download(options, function (downloadId) {
            console.log("Download started with ID", downloadId);
        });
    }
});
