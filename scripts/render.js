
import { addFavorite, removeFavorite, getFavorites } from './favorites.js';

export function renderMovieCard(movie, container, isFavorite = false) {
  
  const poster = (movie.Poster && movie.Poster !== 'N/A') 
                   ? movie.Poster 
                   : './icons/missing-poster.svg';

  
  const card = document.createElement('article');
  card.className = 'movie-card';
  card.innerHTML = `
    <div class="poster-container">
      <img src="${poster}" alt="${movie.Title} poster" class="movie-poster">
      <button class="favorite-btn">
        <i class="${isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i>
      </button>
    </div>
    <h3 class="movie-title">${movie.Title}</h3>
  `;
  
  
  const favBtn = card.querySelector('.favorite-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
   
    const iconEl = favBtn.querySelector('i');
    iconEl.className = isFavorite 
      ? 'fa-regular fa-star'
      : 'fa-solid fa-star';
  });
  
  
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.favorite-btn')) {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    }
  });
  
  container.appendChild(card);
}



export function renderTopMovies(movies) {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';
  movies.slice(0, 20).forEach(movie => renderMovieCard(movie, container));
}

export function renderSearchResults(results) {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';
  results.forEach(movie => renderMovieCard(movie, container));
}

export function renderMovieDetails(movie) {
  const container = document.getElementById('movieInformation');
  if (!container) return;
  
  const poster = (movie.Poster && movie.Poster !== 'N/A')
                 ? movie.Poster
                 : './icons/missing-poster.svg';
  
  container.innerHTML = `
    <div class="movie-detail">
      <img src="${poster}" alt="${movie.Title} poster" class="movie-detail-poster">
      <div class="movie-info">
        <h1 class="movie-title-detail">${movie.Title} (${movie.Year})</h1>
        <p class="movie-plot">${movie.Plot}</p>
        <p class="movie-rating">IMDb Rating: ${movie.imdbRating}</p>
        <p class="movie-director">Regissör: ${movie.Director}</p>
        <p class="movie-actors">Skådespelare: ${movie.Actors}</p>
      </div>
    </div>
  `;
}

export function renderFavorites() {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';
  const favorites = getFavorites();
  favorites.forEach(movie => renderMovieCard(movie, container, true));
}
