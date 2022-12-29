let NUMBER_OF_CATEGORIES = 12;
let NUMBER_OF_LISTS = 3;

function getWordList() {
    fetch('/static/categories.txt')
        .then(data => data.text())
        .then(processWordList)
        .catch(error => new Error(error));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function processWordList(wordList) {
    let categories = wordList.split("\n");

    renderedLists = '';

    for (let list = 1; list < NUMBER_OF_LISTS + 1; list++) {
        renderedLists += `<details><summary>List ${list}</summary><ol>`;
        for (let category = 0; category < NUMBER_OF_CATEGORIES; category++) {
            let categoryIdx = getRandomInt(categories.length);
            let categoryText = categories.splice(categoryIdx, 1);

            renderedLists += `<li>${categoryText}</li>`;
        }
        renderedLists += `</ol></details>`;
    }
    document.querySelector(".content").innerHTML = renderedLists;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#random-list").addEventListener(
        "click",
        getWordList
    );
}, false);