// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '5ee161198ef9e0a3c6d9fc3b1ccb8cd3'; // Reemplaza 'TU_CLAVE_DE_API' con tu clave de API de TMDb

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const movies = data.results;
                const movieContainer = document.getElementById('movies-list');
                
                movies.forEach(movie => {
                    const movieItem = document.createElement('li');

                    // Crea un enlace (a) con el ID de la película como parámetro en la URL
                    const movieLink = document.createElement('a');
                    movieLink.href = `detalle.html?id=${movie.id}`; // Agrega el ID de la película como parámetro en la URL
                    movieLink.textContent = `${movie.title} (${movie.release_date})`;

                    movieItem.appendChild(movieLink);
                    movieContainer.appendChild(movieItem);
                });
            } else {
                console.log('No se encontraron resultados.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
