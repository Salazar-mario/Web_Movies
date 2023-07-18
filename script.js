document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd496e6cc';

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=batman`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const movie = data;
                console.log(movie);

                // Procesa los datos de la película aquí
                const movieContainer = document.getElementById('movie-container');
                movieContainer.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h3>${movie.Title}</h3>
                            <p>Año: ${movie.Year}</p>
                            <img src="${movie.Poster}" alt="${movie.Title} Poster">
                            <p>${movie.Plot}</p>
                        </div>
                    </div>
                `;
            } else {
                console.log('No se encontraron resultados.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
