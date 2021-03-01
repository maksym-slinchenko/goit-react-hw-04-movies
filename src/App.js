import './App.css';
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

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
      <Switch>
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route exact path="/" component={HomePage} />
        <Route e component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
