const MOVIES_FILE_NAME = "movies.json"
const SHOWS_FILE_NAME = "shows.json"

let shows = null; // Cache
let movies = null; // Cache
let active = "movies";

function showLoading() {
    const loaderElement = document.querySelector(".loader");
    const highlightElement = document.querySelector(".highlight");
    loaderElement.classList.add("show");
    highlightElement.classList.remove("show");
}

function hideLoading() {
    const loaderElement = document.querySelector(".loader");
    loaderElement.classList.remove("show");
}

function printError(error) {
    console.error(error);

    const errorElement = document.querySelector(".error");

    errorElement.innerHTML = error;
    errorElement.classList.add("show");

    hideLoading();
}

function renderItems(items) {
    const highlightElement = document.querySelector(".highlight");
    const listElement = document.querySelector(".list");

    const highlight = items[0];

    listElement.replaceChildren([]);

    for (i of items) {
        let li = document.createElement("li");
        li.classList = ["list-item"];
        li.innerHTML = i.title;
        listElement.appendChild(li);
    }

    highlightElement.innerHTML = highlight.title;
    highlightElement.classList.add("show");

    hideLoading();
}

function loadShows() {
    active = "shows";

    if (shows != null) {
        renderItems(shows);
        return;
    }

    showLoading();

    fetch(`./${SHOWS_FILE_NAME}`)
        .then(res => res.json())
        .then((json) => {
            shows = json;
            renderItems(json);
        })
        .catch(printError);
}

function loadMovies() {
    active = "movies";

    if (movies != null) {
        renderItems(movies);
        return;
    }

    showLoading();

    fetch(`./${MOVIES_FILE_NAME}`)
        .then(res => res.json())
        .then((json) => {
            movies = json;
            renderItems(json);
        })
        .catch(printError);
}

function switchTo(moviesOrShows) {
    const toMoviesButton = document.getElementById("to-movies");
    const toShowsButton = document.getElementById("to-shows");

    if (moviesOrShows === "movies" && active !== "movies") {
        toMoviesButton.classList.add("selected");
        toShowsButton.classList.remove("selected");

        loadMovies();
        return;
    }

    if (moviesOrShows === "shows" && active !== "shows") {
        toMoviesButton.classList.remove("selected");
        toShowsButton.classList.add("selected");

        loadShows();
        return;
    }
}

loadMovies();
