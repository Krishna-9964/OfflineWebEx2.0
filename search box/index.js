
var items = []
chrome.downloads.search({ limit: 300 }, function (results) {
    // console.log(results)
    results.forEach(function (result) {
        var str = result.filename;
        var lastIndex = str.lastIndexOf('\\');
        items.push(str.substring(lastIndex + 1));
    })
});


var input = document.getElementById('search-input');
var suggestionsList = document.getElementById('suggestions');
var top_matched = document.getElementById('top-matched')
var matchingResults = [];

input.addEventListener('input', function () {
    // console.log(items)
    var inputValue = input.value.toLowerCase();
    // var matchingResults = [];

    if (inputValue.length > 0) {
        matchingResults = items.filter(function (item) {
            return item.toLowerCase().indexOf(inputValue) > -1;
        }).slice(0, 10);
    }

    displaySuggestions(matchingResults);
});

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        suggestionsList.style.display = 'none';
        top_matched.innerHTML = '';
        matchingResults.forEach(function (result) {
            var listItem = document.createElement('li');
            var h = document.createElement('h5');
            var a = document.createElement('a');
            a.innerText = result;
            a.href = "/Downloads/" + result;
            h.appendChild(a);
            listItem.appendChild(h);
            top_matched.appendChild(listItem);
        });

        console.log(input.value);
    }
});

function displaySuggestions(results) {
    suggestionsList.innerHTML = '';

    if (results.length > 0) {
        results.forEach(function (result) {
            var listItem = document.createElement('li');
            listItem.textContent = result;
            suggestionsList.appendChild(listItem);
        });

        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}

suggestionsList.addEventListener('click', function (event) {
    var selectedValue = event.target.textContent;
    input.value = selectedValue;
    suggestionsList.style.display = 'none';
});