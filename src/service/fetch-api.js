function fetchMovies(options) {
  const key = '57b61550c95d27c5b0720bcb7d8b9934';
  const { keyWord, movieId, movieName, pageNumber } = options;
  // Список самых популярных фильмов за неделю
  if (keyWord === 'get trending') {
    return fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&language=en`,
    ).then(r => r.json());
  }
  // Запрос полной информации о фильме для страницы кинофильма.
  if (keyWord === 'get movie details') {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en`,
    ).then(r => r.json());
  }
  // Запрос по поиску фильма
  if (keyWord === 'search movies') {
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en&query=${movieName}&page=${pageNumber}&include_adult=true`,
    ).then(r => r.json());
  }
  //Запорс на актерский состав
  if (keyWord === 'get movie cast') {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en`,
    ).then(r => r.json());
  }
  //Запрос на обзоры к фильму
  if (keyWord === 'get movie reviews') {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${key}&language=en`,
    ).then(r => r.json());
  }
}
const api = { fetchMovies };

export default api;
