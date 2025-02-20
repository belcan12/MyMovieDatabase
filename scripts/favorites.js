export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  export function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  export function addFavorite(movie) {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      saveFavorites(favorites);
    }
  }
  
  export function removeFavorite(imdbID) {
    const favorites = getFavorites().filter(fav => fav.imdbID !== imdbID);
    saveFavorites(favorites);
  }