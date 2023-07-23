document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3';

    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`)
        .then(response => response.json())
        .then(movie => {
            const movieTitle = document.getElementById('movie-title');
            const movieReleaseDate = document.getElementById('movie-release-date');
            const movieOverview = document.getElementById('movie-overview');
            const movieCast = document.getElementById('movie-cast');

            // Construir la URL de la imagen de la película
            const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const posterPath = movie.poster_path;
            const posterUrl = posterBaseUrl + posterPath;

            // Actualizar elementos HTML con la información de la película
            movieTitle.textContent = movie.title;
            movieReleaseDate.textContent = `Año de lanzamiento: ${movie.release_date}`;
            movieOverview.textContent = `Sinopsis: ${movie.overview}`;

            // Mostrar la imagen de la película
            const moviePoster = document.createElement('img');
            moviePoster.src = posterUrl;
            moviePoster.alt = `${movie.title} Poster`;
            movieCast.appendChild(moviePoster);

            // Obtener el reparto de la película
            const cast = movie.credits.cast;
            let castList = '<p>Reparto: ';
            for (let i = 0; i < cast.length; i++) {
                castList += `${cast[i].name} (${cast[i].character})`;
                if (i < cast.length - 1) {
                    castList += ', ';
                }
            }
            castList += '</p>';
            movieCast.innerHTML += castList;

            // Agrega más detalles de la película si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
