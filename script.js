const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3'; // Reemplaza 'TU_API_KEY' con tu clave de API

document.addEventListener('DOMContentLoaded', () => {
    const movieContainer = document.getElementById('movies-list');
    const genreMap = {};

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es`)
        .then(response => response.json())
        .then(data => {
            data.genres.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });
            getMoviesByCategory('popular');
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function getMoviesByCategory(category) {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=es`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    movieContainer.innerHTML = '';
                    const movies = data.results;
                    movies.forEach(movie => {
                        const movieCard = createMovieCard(movie);
                        movieContainer.appendChild(movieCard);
                    });
                } else {
                    movieContainer.innerHTML = '<p class="no-results">No se encontraron películas para esta categoría.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'card', 'm-2'); // Agregar clases 'movie-card', 'card', y 'm-2' para estilizar la card

        // Contenedor del póster de la película
        const movieImageContainer = document.createElement('div');
        movieImageContainer.classList.add('movie-image-container');

        // Imagen de la película (póster)
        const movieImage = document.createElement('img');
        movieImage.classList.add('card-img-top');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Ruta de la imagen
        movieImage.alt = movie.title;
        movieImageContainer.appendChild(movieImage);

        // Contenedor de la información de la película (mostrado al pasar el mouse por encima)
        const movieInfoContainer = document.createElement('div');
        movieInfoContainer.classList.add('movie-info-container');

        // Información de la película (título, sinopsis, género, valoración)
        const movieTitle = document.createElement('h5');
        movieTitle.classList.add('card-title');
        movieTitle.textContent = movie.title;
        movieInfoContainer.appendChild(movieTitle);

        const movieOverview = document.createElement('p');
        movieOverview.classList.add('movie-overview');
        movieOverview.textContent = movie.overview;
        movieInfoContainer.appendChild(movieOverview);

        const movieGenres = document.createElement('p');
        movieGenres.classList.add('movie-genres');
        movieGenres.textContent = getGenresByIds(movie.genre_ids);
        movieInfoContainer.appendChild(movieGenres);

        const movieRating = document.createElement('div');
        movieRating.classList.add('movie-rating');

        // Valor de la valoración de la película
        const voteAverage = movie.vote_average;
        const starsTotal = 5;

        // Redondear el valor de la valoración a la mitad más cercana
        const rating = Math.round(voteAverage / 2);

        // Crear las estrellas de valoración
        for (let i = 1; i <= starsTotal; i++) {
            const star = document.createElement('i');
            if (i <= rating) {
                star.classList.add('fas', 'fa-star');
            } else {
                star.classList.add('far', 'fa-star');
            }
            movieRating.appendChild(star);
        }

        movieInfoContainer.appendChild(movieRating);

        // Agregar evento de clic para la tarjeta de película
        movieCard.addEventListener('click', () => {
            const movieId = movie.id;
            viewMovieDetails(movieId);
        });

        // Agregar contenedores al card
        movieCard.appendChild(movieImageContainer);
        movieCard.appendChild(movieInfoContainer);

        return movieCard;
    }

    function getGenresByIds(genreIds) {
        return genreIds.map(id => genreMap[id]).join(', ');
    }

    function viewMovieDetails(movieId) {
        // Cambiar "detalle.html" por la ruta de la página de detalles de la película
        window.location.assign(`/detalle.html?movieId=${movieId}`);
    }

    // Función para buscar películas por término de búsqueda
    function searchMovies() {
        const searchInput = document.getElementById('search-input').value;
        if (searchInput) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInput}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        movieContainer.innerHTML = '';
                        const movies = data.results;
                        movies.forEach(movie => {
                            const movieCard = createMovieCard(movie);
                            movieContainer.appendChild(movieCard);
                        });
                    } else {
                        movieContainer.innerHTML = '<p class="no-results">No se encontraron películas con el término de búsqueda proporcionado.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            movieContainer.innerHTML = '<p class="no-results">Por favor, ingresa un término de búsqueda.</p>';
        }
    }

    // Agregar evento de clic para el botón "Buscar"
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchMovies);

    // Obtener películas populares al cargar la página por defecto
    getMoviesByCategory('popular');
});
