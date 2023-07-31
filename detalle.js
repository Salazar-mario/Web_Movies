document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3';

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es`)
        .then(response => response.json())
        .then(movie => {
            const movieTitle = document.getElementById('movie-title');
            const movieReleaseDate = document.getElementById('movie-release-date');
            const movieOverview = document.getElementById('movie-overview');
            const moviePoster = document.getElementById('movie-poster');
            const movieTMDB = document.getElementById('movie-tmdb');
            const movieGenres = document.getElementById('movie-genres');
            const movieAudio = document.getElementById('movie-audio');
            const movieDirector = document.getElementById('movie-director');
            const movieCast = document.getElementById('movie-cast');

            const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const posterPath = movie.poster_path;
            const posterUrl = posterBaseUrl + posterPath;

            movieTitle.textContent = movie.title;
            movieReleaseDate.textContent = `Año de lanzamiento: ${movie.release_date}`;
            movieOverview.textContent = `${movie.overview}`;
            movieTMDB.innerHTML = `TMDB: ${getRatingWithStars(movie.vote_average)}`;
            movieGenres.textContent = `${movie.genres.map(genre => genre.name).join(', ')}`;

            moviePoster.src = posterUrl;
            moviePoster.alt = `${movie.title} Poster`;

            
        })
        .catch(error => {
            console.error('Error:', error);
        });

    const backButton = document.getElementById('back-to-home-button');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function getRatingWithStars(rating) {
    const starsTotal = 5;
    const roundedRating = Math.round(rating / 2); // Redondear el valor de la calificación a la mitad más cercana

    let starsHTML = '';

    for (let i = 1; i <= starsTotal; i++) {
        if (i <= roundedRating) {
            starsHTML += '<i class="fas fa-star"></i>'; 
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }

    return `${starsHTML} ${rating}/10`;
}
