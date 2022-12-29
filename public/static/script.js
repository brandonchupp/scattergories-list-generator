const NUMBER_OF_CATEGORIES = 12;
const NUMBER_OF_LISTS = 3;
const STATE_DELIMITER = "z";

let categoriesState = [];

function getWordList(state) {
    fetch("/static/categories.txt")
        .then(data => data.text())
        .then(text => processWordList(text, state))
        .catch(error => new Error(error));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function processWordList(wordList, state) {
    let categories = wordList.split("\n");

    renderedLists = "";

    for (let list = 1; list < NUMBER_OF_LISTS + 1; list++) {
        renderedLists += `<details><summary>List ${list}</summary><ol>`;
        for (let category = 0; category < NUMBER_OF_CATEGORIES; category++) {
            let categoryIdx;
            if (state) {
                // Grab the first available state index
                categoryIdx = state.splice(0, 1);
            } else {
                categoryIdx = getRandomInt(categories.length);
            }
            let categoryText = categories.splice(categoryIdx, 1);

            // Store the indexes so they can be used to rebuild the word lists.
            categoriesState.push(categoryIdx);

            renderedLists += `<li>${categoryText}</li>`;
        }
        renderedLists += `</ol></details>`;
    }

    renderedLists += getSharableLink();

    document.querySelector(".content").innerHTML = renderedLists;

}

function getSharableLink() {
    let state = categoriesState.join(STATE_DELIMITER);
    let URL = `${window.location.href}?state=${encodeURIComponent(state)}`;
    return `
        <a role="button" href="sms:?&body=View the category lists: ${URL}">
            Share
        </a>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    // Parse query parameters
    const params = (new URL(location)).searchParams;
    if (params.get("state")) {
        let state = params.get("state").split(STATE_DELIMITER);
        getWordList(state);
    }

    document.querySelector("#random-list").addEventListener(
        "click",
        function () {
            getWordList();
        }
    );
}, false);