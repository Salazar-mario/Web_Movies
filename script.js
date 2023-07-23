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

                        // Agregar la tarjeta de película al contenedor
                        movieContainer.appendChild(movieCard);
                    });

                    // Agregar eventos de clic para los botones "Ver detalles"
                    const viewDetailsButtons = document.querySelectorAll('.view-details-button');
                    viewDetailsButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            const movieId = button.dataset.movieId;
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

                        // Agregar la tarjeta de película al contenedor
                        movieContainer.appendChild(movieCard);
                    });

                    // Agregar eventos de clic para los botones "Ver detalles"
                    const viewDetailsButtons = document.querySelectorAll('.view-details-button');
                    viewDetailsButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            const movieId = button.dataset.movieId;
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

    // Función para redirigir a la página de detalle de la película
    function viewMovieDetails(movieId) {
        window.location.assign(`/detalle.html?movieId=${movieId}`);
    }

    // Agregar evento de clic para el botón "Buscar"
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchMovies);

    // Configurar eventos de clic para los botones "Ver detalles" y opciones de filtro
    function setupViewDetailsButtons() {
        const viewDetailsButtons = document.querySelectorAll('.view-details-button');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const movieId = button.dataset.movieId;
                viewMovieDetails(movieId);
            });
        });
    }

    function setupFilterItems() {
        const filterItems = document.querySelectorAll('.filter-item');
        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                getMoviesByCategory(category);
            });
        });
    }

    setupViewDetailsButtons();
    setupFilterItems();

    // Obtener películas populares al cargar la página por defecto
    getMoviesByCategory('popular');
});
