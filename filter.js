const webpageExtensions = [".html", ".htm", ".php", ".asp", ".aspx", ".jsp", ".css", ".js", ".com", ".net", ".org", ".edu", ".gov", ".mil", ".int", ".io", ".co", ".uk", ".ca", ".us", ".au", ".jp", ".de", ".fr", ".it", ".es", ".ru", ".cn"];

const documentExtensions = [".doc", ".docx", ".pdf", ".txt", ".rtf", ".odt", ".xls", ".xlsx", ".csv", ".ppt", ".pptx", ".odp"];

const audioExtensions = [".mp3", ".wav", ".ogg", ".aac", ".flac", ".wma", ".m4a", ".opus", ".aiff", ".alac"];

const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".wmv", ".flv", ".webm", ".mpeg", ".mpg", ".m4v", ".3gp"];

const fileExtensions = [".zip", ".rar", ".tar", ".gz", ".7z", ".exe", ".dmg", ".apk", ".msi", ".html", ".css", ".js", ".ttf", ".otf", ".woff", ".woff2", ".sqlite", ".db", ".json", ".xml", ".epub", ".torrent", ".bak", ".log", ".iso", ".ics"];

const otherExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".tiff", ".ico"];







var btn = document.querySelector("#search")

btn.addEventListener('click', printHistory);

function printHistory() {
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var from_date = new Date(from);
    var to_date = new Date(to);
    to_date.setHours(0, 0, 0, 0)
    from_date.setHours(0, 0, 0, 0)

    if (from_date > to_date || from === '' || to === '' || from_date > new Date()) {
        window.alert("Enter valid date");
        document.getElementById('from').value = null;
        document.getElementById('to').value = null;
    }
    else {
        getHistory(from_date, to_date);
    }
    // console.log("From : " +from + " To : "+to);
}

function getHistory(from_date, to_date) {

    // Calculate the difference in milliseconds between the two dates
    var timeDiff = Math.abs(from_date.getTime() - to_date.getTime());

    // Convert milliseconds to days
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysDiff == 0)
        to_date = new Date();

    // console.log("The number of days between the two dates is: " + daysDiff);

    const numberOfDays = daysDiff;  // Replace with the desired number of days

    // Calculate the start and end times based on the current date
    const endTime = to_date.getTime();
    const startTime = to_date;
    startTime.setDate(startTime.getDate() - numberOfDays);
    startTime.setHours(0, 0, 0, 0);

    console.log(endTime + " : " + startTime)
    // Create the query object with the specified time range
    const query = {
        text: '',              // Search for all URLs (empty string matches all)
        startTime: startTime.getTime(),
        endTime: endTime,
        maxResults: 1000000
    };


    chrome.history.search(query, function (results) {
        // console.log(results[0])

        //sort the results according to lastVisitTime in descending order
        results.sort(function (a, b) {
            return b.lastVisitTime - a.lastVisitTime;
        });
        appendHistoryItems(results);
        categorizeHistory(results);
        deleteHistory();
    });
}

function deleteHistory() {
    // Get all delete buttons
    const deleteButtons = document.querySelectorAll('.delete');

    // Add click event listener to each delete button
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get the parent list item
            const listItem = this.parentNode;

            // Remove the list item from the DOM
            listItem.remove();

            // Perform any additional actions here, such as deleting the history
            const link = listItem.querySelector('a');
            const href = link.getAttribute('href');
            // ... Perform the necessary actions to delete the history based on the href
            chrome.history.deleteUrl({ url: href });
        });
    });
}


function appendHistoryItems(results) {
    var ul = document.getElementById("records");
    results.forEach(function (result) {
        let date = new Date(result.lastVisitTime);
        let date_mod = '' + date.getDate().toString().padStart(2, "0") + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getFullYear();
        var li = document.createElement('li');
        li.setAttribute('class', 'list-group-item');

        let a = document.createElement('a');
        a.href = result.url;
        a.innerText = result.title;

        let p = document.createElement('p');
        p.innerText = date_mod;

        let button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'btn btn-outline-danger delete');
        button.setAttribute('value', 'Delete');
        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(button);
        ul.appendChild(li);
    });
}


function filterHistory(results) {

    web_li = doc_li = vid_li = aud_li = file_li = oth_li = ''

    results.forEach(result => {
        let date = new Date(result.lastVisitTime);
        let date_mod = '' + date.getDate().toString().padStart(2, "0") + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getFullYear();
        // let extension = result.url.split('.').pop();
        let position = result.url.lastIndexOf('.');
        let extension = result.url.substring(position);
        // console.log(extension)
        if (webpageExtensions.includes(extension)) {

            web_li += '<li class="list-group-item"><a href=' + result.url + '>' + result.title + '</a><p>' + date_mod + '</p><input type="button" class="btn btn-outline-danger delete" value="Delete"></li>'

        }
        else if (documentExtensions.includes(extension)) {
            doc_li += '<li class="list-group-item"><a href=' + result.url + '>' + result.title + '</a><p>' + date_mod + '</p><input type="button" class="btn btn-outline-danger delete" value="Delete"></li>'
        }
        else if (videoExtensions.includes(extension)) {
            vid_li += '<li class="list-group-item"><a href=' + result.url + '>' + result.title + '</a><p>' + date_mod + '</p><input type="button" class="btn btn-outline-danger delete" value="Delete"></li>'

        }
        else if (videoExtensions.includes(extension)) {
            aud_li += '<li class="list-group-item"><a href=' + result.url + '>' + result.title + '</a><p>' + date_mod + '</p><input type="button" class="btn btn-outline-danger delete" value="Delete"></li>'

        }
        else if (videoExtensions.includes(extension)) {
            file_li += '<li class="list-group-item"><a href=' + result.url + '>' + result.title + '</a><p>' + date_mod + '</p><input type="button" class="btn btn-outline-danger delete" value="Delete"></li>'

        }
        else {
            oth_li += '<li class="list-group-item"><a href=' + result.url + '>' + result.title + '</a><p>' + date_mod + '</p><input type="button" class="btn btn-outline-danger delete" value="Delete"></li>'

        }
    })

    return { web: web_li, doc: doc_li, vid: vid_li, aud: aud_li, file: file_li, oth: oth_li }
}





function categorizeHistory(results) {
    let content = document.getElementById('content');
    let ul = document.createElement('ul');
    ul.setAttribute('id', 'records');

    filtered_history = filterHistory(results);

    var tabs = document.querySelectorAll('.tabs')
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            while (content.firstChild) {
                content.firstChild.remove();
            }
            if (btn.getAttribute('id') === 'Websites') {
                ul.innerHTML = filtered_history.web;
            }
            else if (btn.getAttribute('id') === 'Documents') {
                ul.innerHTML = filtered_history.doc;
            }
            else if (btn.getAttribute('id') === 'Videos') {
                ul.innerHTML = filtered_history.vid;
            }
            else if (btn.getAttribute('id') === 'Audios') {
                ul.innerHTML = filtered_history.aud;
            }
            else if (btn.getAttribute('id') === 'Files') {
                ul.innerHTML = filtered_history.file;
            }
            else {
                ul.innerHTML = filtered_history.oth;
            }

            content.appendChild(ul);
            deleteHistory();
        })
    })

}