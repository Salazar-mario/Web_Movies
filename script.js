document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3';
    const movieContainer = document.getElementById('movies-list');

    // Función para obtener las películas según la categoría
    function getMoviesByCategory(category) {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    movieContainer.innerHTML = ''; // Limpiamos la lista de películas actual
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

    // Función para realizar la búsqueda de películas
    function searchMovies() {
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value;

        // Verificar que se haya ingresado un término de búsqueda
        if (searchTerm.trim() === '') {
            alert('Por favor, ingrese un término de búsqueda.');
            return;
        }

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    movieContainer.innerHTML = ''; // Limpiamos la lista de películas actual
                    const movies = data.results;
                    movies.forEach(movie => {
                        const movieCard = createMovieCard(movie);
                        movieContainer.appendChild(movieCard);
                    });
                } else {
                    movieContainer.innerHTML = '<p class="no-results">No se encontraron películas para este término de búsqueda.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para crear la tarjeta de película
    function createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card', 'card', 'm-2'); // Agregar clases 'movie-card', 'card', y 'm-2' para estilizar la card

        // Contenedor de la imagen de la película
        const movieImage = document.createElement('img');
        movieImage.classList.add('card-img-top');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Ruta de la imagen
        movieImage.alt = movie.title;
        movieCard.appendChild(movieImage);

        // Cuerpo de la card
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Detalles de la película
        const movieTitle = document.createElement('h5');
        movieTitle.classList.add('card-title');
        movieTitle.textContent = movie.title;
        cardBody.appendChild(movieTitle);

        const movieReleaseDate = document.createElement('p');
        movieReleaseDate.classList.add('card-text');
        movieReleaseDate.textContent = `Año de lanzamiento: ${movie.release_date}`;
        cardBody.appendChild(movieReleaseDate);

        // Agregar estrellas de valoración
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

        cardBody.appendChild(movieRating);

        // Botón para ver detalles de la película
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.classList.add('btn', 'btn-primary', 'view-details-button');
        viewDetailsButton.textContent = 'Ver detalles';
        viewDetailsButton.setAttribute('data-movie-id', movie.id); // Establecer el ID de la película como atributo personalizado
        cardBody.appendChild(viewDetailsButton);

        // Botón para agregar a favoritos
        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.classList.add('btn', 'btn-danger', 'add-to-favorites-button');
        addToFavoritesButton.innerHTML = '<i class="heart-icon far fa-heart"></i> Agregar a favoritos';
        addToFavoritesButton.setAttribute('data-movie-id', movie.id); // Establecer el ID de la película como atributo personalizado
        cardBody.appendChild(addToFavoritesButton);

        movieCard.appendChild(cardBody);

        // Agregar evento de clic para el botón "Ver detalles" dentro de la tarjeta
        viewDetailsButton.addEventListener('click', () => {
            const movieId = viewDetailsButton.getAttribute('data-movie-id');
            viewMovieDetails(movieId);
        });

        // Agregar evento de clic para el botón "Agregar a favoritos" dentro de la tarjeta
        addToFavoritesButton.addEventListener('click', () => {
            const movieId = addToFavoritesButton.getAttribute('data-movie-id');
            toggleFavoriteMovie(movieId);

            // Actualizar el ícono de corazón para reflejar el cambio
            const heartIcon = addToFavoritesButton.querySelector('.heart-icon');
            heartIcon.classList.toggle('fas');
            heartIcon.classList.toggle('far');
        });

        // Verificar si la película está en favoritos y cambiar el ícono si es necesario
        const heartIcon = addToFavoritesButton.querySelector('.heart-icon');
        if (isFavorite(movie.id)) {
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.add('far');
        }

        return movieCard;
    }

    // Función para redirigir a la página de detalle de la película
    function viewMovieDetails(movieId) {
        window.location.assign(`/detalle.html?movieId=${movieId}`);
    }

    // Función para agregar o quitar una película de favoritos
    function toggleFavoriteMovie(movieId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const index = favorites.indexOf(movieId);
        if (index !== -1) {
            // Si la película ya está en favoritos, la quitamos
            favorites.splice(index, 1);
        } else {
            // Si la película no está en favoritos, la agregamos
            favorites.push(movieId);
        }

        // Guardamos la lista actualizada de favoritos en el almacenamiento local
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Función para verificar si una película está en favoritos
    function isFavorite(movieId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(movieId);
    }

    // Agregar evento de clic para el botón "Buscar"
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchMovies);

    // Obtener películas populares al cargar la página por defecto
    getMoviesByCategory('popular');
});
