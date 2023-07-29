document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3';

    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es`)
        .then(response => response.json())
        .then(movie => {
            // Obtener referencias a los elementos HTML en los que se mostrarán los detalles de la película
            const movieTitle = document.getElementById('movie-title');
            const movieReleaseDate = document.getElementById('movie-release-date');
            const movieOverview = document.getElementById('movie-overview');
            const moviePoster = document.getElementById('movie-poster');
            const movieTMDB = document.getElementById('movie-tmdb');
            const movieGenres = document.getElementById('movie-genres');
            const movieAudio = document.getElementById('movie-audio');
            const movieDirector = document.getElementById('movie-director');
            const movieCast = document.getElementById('movie-cast');

            // Construir la URL de la imagen de la película
            const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const posterPath = movie.poster_path;
            const posterUrl = posterBaseUrl + posterPath;

            // Actualizar elementos HTML con la información de la película
            movieTitle.textContent = movie.title;
            movieReleaseDate.textContent = `Año de lanzamiento: ${movie.release_date}`;
            movieOverview.textContent = `${movie.overview}`;
            movieTMDB.innerHTML = `TMDB: ${getRatingWithStars(movie.vote_average)}`;
            movieGenres.textContent = `Géneros: ${movie.genres.map(genre => genre.name).join(', ')}`;

            // Mostrar la imagen de la película
            moviePoster.src = posterUrl;
            moviePoster.alt = `${movie.title} Poster`;

            // Agrega más detalles de la película si es necesario
            // En este caso, el director no se proporciona directamente en el objeto 'movie', por lo que muestra "Pendiente de obtener información de la API" en ese campo hasta que se obtenga esa información desde otra fuente (si está disponible).
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Agregar un evento de clic al botón de regreso (`backButton`)
    const backButton = document.getElementById('back-to-home-button');
    backButton.addEventListener('click', () => {
        // Redirigir a la página de inicio (cambia 'index.html' por el nombre de tu archivo de inicio)
        window.location.href = 'index.html';
    });
});

function getRatingWithStars(rating) {
    const starsTotal = 5;
    const roundedRating = Math.round(rating / 2); // Redondear el valor de la calificación a la mitad más cercana

    let starsHTML = '';

    for (let i = 1; i <= starsTotal; i++) {
        if (i <= roundedRating) {
            starsHTML += '<i class="fas fa-star"></i>'; // Estrella llena (icono de FontAwesome)
        } else {
            starsHTML += '<i class="far fa-star"></i>'; // Estrella vacía (icono de FontAwesome)
        }
    }

    return `${starsHTML} ${rating}/10`;
}
