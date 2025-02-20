import { oData } from './data.js';

const OMDB_API_KEY = 'a61b7ee6'; 

export async function fetchTopMovies() {
  try {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    if (!response.ok) throw new Error('Kunde inte hämta toppfilmer');
    const data = await response.json();
    oData.topMovieList = data;
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av toppfilmer:', error);
    throw error;
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Sökning misslyckades');
    const data = await response.json();
    if (data.Response === 'False') throw new Error(data.Error);
    return data.Search;
  } catch (error) {
    console.error('Sökfel:', error);
    throw error;
  }
}

export async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&plot=full&i=${imdbID}`);
    if (!response.ok) throw new Error('Kunde inte hämta filmdetaljer');
    const data = await response.json();
    if (data.Response === 'False') throw new Error(data.Error);
    return data;
  } catch (error) {
    console.error('Fel vid hämtning av detaljer:', error);
    throw error;
  }
}