
import { addFavorite, removeFavorite } from './favorites.js';

export function createMovieCard(movie, isFavorite = false) {
  const card = document.createElement('article');
  card.className = 'movie-card';
  
  card.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title} poster" class="movie-poster">
    <h3 class="movie-title">${movie.Title}</h3>
    <p class="movie-year">${movie.Year}</p>
    <button class="favorite-btn">${isFavorite ? 'Ta bort' : 'Spara'} favorit</button>
  `;
  
  // Hantera klick på favoritknappen
  const btn = card.querySelector('.favorite-btn');
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Förhindra att kortet triggar navigering
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
    // Ge feedback eller ta bort kortet från vyn
    card.remove();
  });
  
  // Klick på kortet öppnar filmens detaljer
  card.addEventListener('click', () => {
    window.location.href = `movie.html?id=${movie.imdbID}`;
  });
  
  return card;
}
