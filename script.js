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

                        // Botón para ver detalles de la película
                        const viewDetailsButton = document.createElement('button');
                        viewDetailsButton.classList.add('btn', 'btn-primary', 'view-details-button');
                        viewDetailsButton.textContent = 'Ver detalles';
                        viewDetailsButton.setAttribute('data-movie-id', movie.id); // Establecer el ID de la película como atributo personalizado
                        cardBody.appendChild(viewDetailsButton);

                        // Agregar estrellas de valoración
                        const movieRating = document.createElement('div');
                        movieRating.classList.add('movie-rating');

                        const voteAverage = movie.vote_average;
                        const starsTotal = 5;
                        const rating = Math.round(voteAverage / 2);

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

                        movieCard.appendChild(cardBody);

                        // Agregar la tarjeta de película al contenedor
                        movieContainer.appendChild(movieCard);

                        // Agregar evento de clic para el botón "Ver detalles" dentro de la tarjeta
                        viewDetailsButton.addEventListener('click', () => {
                            const movieId = viewDetailsButton.dataset.movieId;
                            viewMovieDetails(movieId);
                        });
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
                        const movieCard = document.createElement('div');
                        movieCard.classList.add('movie-card'); // Agregar la clase 'movie-card' para el estilo

                        // Contenedor de la imagen de la película
                        const movieImageContainer = document.createElement('div');
                        movieImageContainer.classList.add('movie-image');
                        const movieImage = document.createElement('img');
                        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // Ruta de la imagen
                        movieImage.alt = movie.title;
                        movieImageContainer.appendChild(movieImage);
                        movieCard.appendChild(movieImageContainer);

                        // Detalles de la película
                        const movieDetails = document.createElement('div');
                        movieDetails.classList.add('movie-details');
                        const movieTitle = document.createElement('h3');
                        movieTitle.textContent = movie.title;
                        const movieReleaseDate = document.createElement('p');
                        movieReleaseDate.textContent = `Año de lanzamiento: ${movie.release_date}`;
                        movieDetails.appendChild(movieTitle);
                        movieDetails.appendChild(movieReleaseDate);
                        movieCard.appendChild(movieDetails);

                        // Botón para ver detalles de la película
                        const viewDetailsButton = document.createElement('button');
                        viewDetailsButton.classList.add('btn', 'btn-primary', 'view-details-button');
                        viewDetailsButton.textContent = 'Ver detalles';
                        viewDetailsButton.setAttribute('data-movie-id', movie.id); // Establecer el ID de la película como atributo personalizado
                        movieCard.appendChild(viewDetailsButton);

                        // Agregar estrellas de valoración
                        const movieRating = document.createElement('div');
                        movieRating.classList.add('movie-rating');

                        const voteAverage = movie.vote_average;
                        const starsTotal = 5;
                        const rating = Math.round(voteAverage / 2);

                        for (let i = 1; i <= starsTotal; i++) {
                            const star = document.createElement('i');
                            if (i <= rating) {
                                star.classList.add('fas', 'fa-star');
                            } else {
                                star.classList.add('far', 'fa-star');
                            }
                            movieRating.appendChild(star);
                        }

                        movieCard.appendChild(movieRating);

                        // Agregar la tarjeta de película al contenedor
                        movieContainer.appendChild(movieCard);

                        // Agregar evento de clic para el botón "Ver detalles" dentro de la tarjeta
                        viewDetailsButton.addEventListener('click', () => {
                            const movieId = viewDetailsButton.dataset.movieId;
                            viewMovieDetails(movieId);
                        });
                    });
                } else {
                    movieContainer.innerHTML = '<p class="no-results">No se encontraron películas para este término de búsqueda.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function viewMovieDetails(movieId) {
        window.location.assign(`/detalle.html?movieId=${movieId}`);
    }

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchMovies);
    
    getMoviesByCategory('popular');
});
