
import { renderTrailers } from './caroussel.js';
import { createMovieCard } from './movieCard.js';
import { addFavorite, removeFavorite, getFavorites } from './favorites.js';

export function renderMovieCard(movie, container, isFavorite = false) {
  // Store the current favorite state locally
  let currentFavoriteStatus = isFavorite;
  const card = document.createElement('article');
  card.className = 'movie-card';
  card.innerHTML = `
    <div class="poster-container">
      <img src="${movie.Poster}" alt="${movie.Title} poster" class="movie-poster">
      <button class="favorite-btn">
        <i class="${currentFavoriteStatus ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i>
      </button>
    </div>
    <h3 class="movie-title">${movie.Title}</h3>
  `;
  
  // Favorite button event listener
  const favBtn = card.querySelector('.favorite-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering card click
    if (currentFavoriteStatus) {
      removeFavorite(movie.imdbID);
      currentFavoriteStatus = false;
    } else {
      addFavorite(movie);
      currentFavoriteStatus = true;
    }
    // Update the star icon based on the new state
    const iconEl = favBtn.querySelector('i');
    iconEl.className = currentFavoriteStatus ? 'fa-solid fa-star' : 'fa-regular fa-star';

    // If on the favorites page, remove the card when unfavorited
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'favorites.html' && !currentFavoriteStatus) {
      card.remove();
    }
  });
  
  // Navigate to movie details on card click
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
  container.innerHTML = `
    <div class="movie-detail">
      <img src="${movie.Poster}" alt="${movie.Title} poster">
      <div class="movie-info">
        <h1>${movie.Title} (${movie.Year})</h1>
        <p>${movie.Plot}</p>
        <p>IMDb Rating: ${movie.imdbRating}</p>
        <p>Regissör: ${movie.Director}</p>
        <p>Skådespelare: ${movie.Actors}</p>
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
