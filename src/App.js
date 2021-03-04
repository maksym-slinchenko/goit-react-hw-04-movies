import './App.css';
import React, { lazy, Suspense } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

// Динамический импорт
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to={{ pathname: '/' }}>Главная</Link>
        </li>
        <li>
          <Link to={{ pathname: '/movies' }}>Фильмы</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route exact path="/" component={HomePage} />
          <Route component={HomePage} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
