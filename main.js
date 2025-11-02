const MOVIES_FILE_NAME = "movies.json"

function printError(error) {
    const ERROR_CLASS = "error";

    console.error(error);

    const errorElement = document.querySelector(`.${ERROR_CLASS}`);
    const loaderElement = document.querySelector(`.${LOADER_CLASS}`);

    errorElement.innerHTML = error;
    loaderElement.classList.remove("show");
    errorElement.classList.add("show");
}

function renderMovies(movies) {
    const CONTAINER_CLASS = "movie";
    const LOADER_CLASS = "loader";

    const movieElement = document.querySelector(`.${CONTAINER_CLASS}`);
    const loaderElement = document.querySelector(`.${LOADER_CLASS}`);

    const movie = movies[0];

    movieElement.innerHTML = movie.title;
    loaderElement.classList.remove("show");
    movieElement.classList.add("show");
}

function loadMovies() {
    fetch(`./${MOVIES_FILE_NAME}`)
        .then(res => res.json())
        .then(renderMovies)
        .catch(printError);
}

loadMovies();