//initial values
let MOVIE_DB_API = "2d7704e84ec52686bb05e667c3813bc4"
let IMG_URL = "https://image.tmdb.org/t/p/w500"
let MOVIE_DB_ENDPOINT = "https://api.themoviedb.org"
let loadUpcoming = true

const log = console.log
let inputElement = document.querySelector("#inputValue")
let buttonElement = document.querySelector("#search")
let main = document.querySelector(".main")

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`
    return url
}

function requestMovies(url, onComplete) {
    fetch(url)
        .then(resolve => resolve.json())
        .then(onComplete)
        .catch(err => log(err))
}



function searchUpcomingMovies() {
    const url = generateMovieDBUrl('/movie/upcoming');
    
    requestMovies(url, displayMovies);
}

searchUpcomingMovies()
    



function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    
    requestMovies(url, displayMovies);
}



buttonElement.addEventListener("click", (event) => { 
    event.preventDefault() 
    // log("Event: ", event)
    let value = inputElement.value
    
    if(value) {
        searchMovie(value)
            .then(displayMovies)
            .catch(err => console.error(err))
    }

    inputElement.value = ""
})

function displayMovie(movie) {
    // log(movie)
    // log(movie.id)
    return `
        <div class="movie">
            <h1 class="title">${movie.title}</h1>
            <div class="spanLine"><span>${movie.original_language} / </span><span>Rating: ${movie.vote_average ? movie.vote_average : "No rating"} / </span><span>Premiered: ${movie.release_date ? movie.release_date.slice(0, 4) : "No premiere date"}</span></div>
            <hr class="hr1">
            <p class="summary">${(movie.overview)}</p>
            <img class="image" src="${(movie.poster_path ? IMG_URL + movie.poster_path : "No image")}" alt="Movie image"/>
        </div>
    `
    // <div class="genres">${movie.show.genres[0] ? movie.show.genres.slice(0).join(" , ") : 'Sadly there are no genres for this show'}</div>
}


function displayMovies(moviesData) {
    // console.log(moviesData.results)
    main.innerHTML = ""
    main.innerHTML = `
        <div class="movies">
            ${moviesData.results.map(displayMovie).join("")}
        </div>
    `
    inputElement.value = ""
}
