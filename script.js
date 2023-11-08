
"use strict";

class Movie {
  constructor(title, director, releaseDate, imdbRating, posterUrl) {
    this.title = title;
    this.director = director;
    this.releaseDate = releaseDate;
    this.imdbRating = imdbRating;
    this.posterUrl = posterUrl;
  }
}

let moviesInfo;
let movies = [];

/* Event Listeners */
let fileButton = document.getElementById("moviefile");
let yearsFilter = document.getElementById("movie-year");
let directorFilter = document.getElementById("movie-director");
let orderFilter = document.getElementById("movie-order");

fileButton.addEventListener("change", function () {
  /* Your Code Here */

  let file = fileButton.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    moviesInfo = JSON.parse(reader.result);
    for (let movie of moviesInfo.movies) {
      let M1 = new Movie(
        movie.title,
        movie.director,
        movie.releaseDate,
        movie.imdbRating,
        movie.posterUrl
      );
      movies.push(M1);
    }

    displayMovies(movies);
  };

  reader.readAsText(file);
});


function displayMovies(movieList) {
  const moviePosters = document.getElementById("movie-posters");
  moviePosters.innerHTML = "";

  let imagePath = "images/";

  for (let movie of movieList) {
    moviePosters.innerHTML += `<div class="movie"><img src="${imagePath + movie.posterUrl}" alt="${movie.title}"></div>`;
  }
}


yearsFilter.addEventListener("change", function () {
  /* Your Code Here */

  directorFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;

  let selectedYear = parseInt(yearsFilter.value);
  let filteredMovies = movies;


  if (selectedYear) {
    filteredMovies = movies.filter(function (movie) {
      return new Date(movie.releaseDate).getFullYear() >= selectedYear;
    });
  }

  displayMovies(filteredMovies);
});

directorFilter.addEventListener("change", function () {
  /* Your Code Here */

  yearsFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;

  let selectedDirector = directorFilter.value;
  let filteredMovies;

  if (selectedDirector) {
    filteredMovies = movies.filter(function (movie) {
      return movie.director === selectedDirector;
    });

  } else {
    filteredMovies = movies;
  }

  displayMovies(filteredMovies);
});


orderFilter.addEventListener("change", function () {
  /* Your Code Here */

  directorFilter.selectedIndex = 0;
  yearsFilter.selectedIndex = 0;

  let sortedMovie = orderFilter.value;
  let Descending = movies.slice().reverse();

  if (sortedMovie === "Descending") {
    displayMovies(Descending);
  } else {
    displayMovies(movies);
  }

});