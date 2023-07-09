//History

document.addEventListener('DOMContentLoaded', function () {
  // let searchHistoryList = document.getElementById('searchHistoryList');
  // let downloadHistoryList = document.getElementById('downloadHistoryList');

  // chrome.history.search({ text: '', maxResults: 10 }, function(results) {
  //   results.forEach(function(result) {
  //     console.log(result)
  //     var listItem = document.createElement('li');
  //     var listUrl = document.createElement('a');
  //     listUrl.href=result.url;
  //     listUrl.textContent = result.title;
  //     listItem.appendChild(listUrl)
  //     searchHistoryList.appendChild(listItem);
  //     // searchHistoryList.appendChild(listUrl);
  //   });
  // });

  // chrome.downloads.search({ limit: 100 }, function(results) {
  //   results.forEach(function(result) {
  //     var listItem = document.createElement('li');

  //     listItem.textContent = result.filename;
  //     downloadHistoryList.appendChild(listItem);
  //   });
  // }); 

  const videoExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".wmv",
    ".flv",
    ".webm",
    ".mpeg",
    ".mpg",
    ".m4v",
    ".3gp",
    ".f4v",
    ".swf",
    ".rm",
    ".rmvb",
    ".ogv",
    ".vob",
    ".mts",
    ".m2ts",
    ".ts",
    ".divx",
    ".asf",
  ];

  const audioExtensions = [
    ".mp3",
    ".wav",
    ".ogg",
    ".aac",
    ".flac",
    ".wma",
    ".m4a",
    ".opus",
    ".aiff",
    ".alac",
    ".ape",
    ".mid",
    ".midi",
    ".amr",
    ".mp2",
    ".ac3",
    ".ra",
    ".pcm",
    ".au",
    ".raw",
    ".mka",
  ];





  const numberOfDays = 10000;  // Replace with the desired number of days

  // Calculate the start and end times based on the current date
  const endTime = new Date().getTime();
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - numberOfDays);
  startTime.setHours(0, 0, 0, 0);

  // Create the query object with the specified time range
  const query = {
    text: '',              // Search for all URLs (empty string matches all)
    startTime: startTime.getTime(),
    endTime: endTime,
    maxResults: 1000000
  };


  chrome.history.search(query, function (results) {
    console.log(results)
    results.forEach(function (result) {
      // console.log(result)
      const s_table = document.getElementById('S-WebSearch')
      const p_table = document.getElementById('S-PDF')
      const a_table = document.getElementById('S-Audios')
      const v_table = document.getElementById('S-Videos')
      //creating new row
      var row = document.createElement('tr');

      //Search Title
      var title = document.createElement('td');
      title.setAttribute('class', 'SearchName');
      var a = document.createElement('a');
      a.href = result.url;
      a.innerText = result.title;

      //Last Visit
      var LastVisit = document.createElement('td');
      LastVisit.setAttribute('class', 'LastVisit');
      let time = new Date(result.lastVisitTime).toString();
      // console.log(time)
      let lastTime = time.substring(0, time.lastIndexOf('G'));
      LastVisit.innerText = lastTime;

      //Visit Count
      var VisitCount = document.createElement('td');
      VisitCount.setAttribute('class', 'VisitCount');
      VisitCount.innerText = result.visitCount;

      //Append the rows and columns

      title.appendChild(a);
      row.appendChild(title);
      row.appendChild(LastVisit);
      row.appendChild(VisitCount);
      // s_table.appendChild(row);
      if (result.url.includes('.pdf')) {
        p_table.appendChild(row);
      }
      else if (videoExtensions.includes(result.url)) {
        v_table.appendChild(row);
      }
      else if (audioExtensions.includes(result.url)) {
        a_table.appendChild(row);
      }
      else {
        s_table.appendChild(row);
      }
    });
  });


  // Download List
  const dTable = document.getElementById('WebSearch');
  const pTable = document.getElementById('PDF');
  const aTable = document.getElementById('Audios');
  const vTable = document.getElementById('Videos');

  chrome.downloads.search({ limit: 300 }, function (results) {
    results.forEach(function (result) {

      var dRow = document.createElement('tr');

      //Table data
      //file name
      var FileName = document.createElement('td');
      FileName.setAttribute('class', 'FileName');
      var str = result.filename;
      var lastIndex = str.lastIndexOf('\\');
      // FileName.innerText = str.substring(lastIndex+1);
      var loc = document.createElement('a');
      loc.href = "./Downloads/" + str.substring(lastIndex + 1);
      loc.innerText = str.substring(lastIndex + 1);
      FileName.appendChild(loc);

      //Start time
      var StartTime = document.createElement('td');
      StartTime.setAttribute('class', 'StartTime');
      StartTime.innerText = result.startTime;

      //End time
      var EndTime = document.createElement('td');
      EndTime.setAttribute('class', 'EndTime');
      EndTime.innerText = result.endTime;

      //Append elements
      dRow.appendChild(FileName);
      dRow.appendChild(StartTime);
      dRow.appendChild(EndTime);
      // dTable.appendChild(dRow);

      if (result.filename.includes('.pdf')) {
        pTable.appendChild(dRow);
      }
      else if (videoExtensions.includes(result.filename)) {
        vTable.appendChild(dRow);
      }
      else if (audioExtensions.includes(result.filename)) {
        aTable.appendChild(dRow);
      }
      else {
        dTable.appendChild(dRow);
      }
    });
  });
});

