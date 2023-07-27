document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3';
    const favoritesContainer = document.getElementById('favorites-list');

    // Función para obtener las películas favoritas
    function getFavoriteMovies() {
        // Obtener la lista de favoritos almacenada en el LocalStorage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Limpiar la lista de favoritos actual
        favoritesContainer.innerHTML = '';

        // Si no hay películas favoritas, mostrar un mensaje
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p class="no-results">No tienes películas favoritas.</p>';
            return;
        }

        // Obtener los detalles de las películas favoritas mediante la API
        favorites.forEach(movieId => {
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es`)
                .then(response => response.json())
                .then(movie => {
                    // Crear la tarjeta de película
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card', 'card', 'm-2');

                    // Contenedor de la imagen de la película
                    const movieImage = document.createElement('img');
                    movieImage.classList.add('card-img-top');
                    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
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

                    // Botón para eliminar de favoritos
                    const removeButton = document.createElement('button');
                    removeButton.classList.add('btn', 'btn-danger', 'remove-from-favorites');
                    removeButton.textContent = 'Eliminar de Favoritos';
                    removeButton.setAttribute('data-movie-id', movie.id); // Establecer el ID de la película como atributo personalizado

                    // Agregar evento de clic para el botón "Eliminar de Favoritos"
                    removeButton.addEventListener('click', () => {
                        const movieId = removeButton.dataset.movieId;
                        removeFromFavorites(movieId);
                    });

                    // Agregar el botón de eliminar a la tarjeta
                    cardBody.appendChild(removeButton);

                    movieCard.appendChild(cardBody);

                    // Agregar la tarjeta de película al contenedor
                    favoritesContainer.appendChild(movieCard);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    // Función para eliminar una película de favoritos
    function removeFromFavorites(movieId) {
        // Obtener las películas favoritas del localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Filtrar la película con el ID proporcionado para eliminarla de la lista de favoritos
        const updatedFavorites = favorites.filter(id => id !== movieId);

        // Actualizar el localStorage con la nueva lista de favoritos
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Mostrar la alerta de eliminación
        alert('La película ha sido eliminada de favoritos.');

        // Volver a cargar las películas favoritas actualizadas
        getFavoriteMovies();
    }

    // Obtener las películas favoritas al cargar la página de favoritos por defecto
    getFavoriteMovies();
});
const backToIndexButton = document.getElementById('back-to-index-button');
    backToIndexButton.addEventListener('click', () => {
        // Redirigir al índice (cambia 'index.html' por el nombre de tu archivo de índice)
        window.location.href = 'index.html';
    });

