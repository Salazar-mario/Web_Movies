document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd496e6cc'; // Reemplaza con tu clave de API OMDb

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const movies = data.Search;

                const movieContainer = document.getElementById('movies-list');
                movies.forEach(movie => {
                    const movieItem = document.createElement('li');
                    movieItem.textContent = `${movie.Title} (${movie.Year})`;
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
