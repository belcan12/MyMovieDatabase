import { fetchTopMovies, searchMovies, fetchMovieDetails } from './api.js';
import { renderTopMovies, renderSearchResults, renderMovieDetails, renderFavorites } from './render.js';
import { renderTrailers } from './caroussel.js';

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname.split('/').pop();

  if (path === 'index.html' || path === '') {
    await handleIndexPage();
  } else if (path === 'search.html') {
    await handleSearchPage();
  } else if (path === 'movie.html') {
    await handleMoviePage();
  } else if (path === 'favorites.html') {
    handleFavoritesPage();
  }
});

async function handleIndexPage() {
  try {
    const movies = await fetchTopMovies();
    // Blanda om listan för att få slumpmässiga trailers
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    // Rendera 5 trailers
    shuffled.slice(0, 5).forEach((movie, i) => renderTrailers(movie, i + 1));
    // Rendera topplistan med 20 filmer
    renderTopMovies(movies);
  } catch (error) {
    console.error('Fel vid initialisering:', error);
  }

  document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  });
}


async function handleSearchPage() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');
  
  if (query) {
    try {
      const results = await searchMovies(query);
      renderSearchResults(results);
    } catch (error) {
      document.getElementById('cardContainer').innerHTML = `<p>${error.message}</p>`;
    }
  }
}

async function handleMoviePage() {
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get('id');
  
  if (imdbID) {
    try {
      const movie = await fetchMovieDetails(imdbID);
      renderMovieDetails(movie);
    } catch (error) {
      document.getElementById('movieInformation').innerHTML = `<p>${error.message}</p>`;
    }
  }
}

function handleFavoritesPage() {
  renderFavorites();
}