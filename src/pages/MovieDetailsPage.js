import React, { Component, lazy, Suspense } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../service/fetch-api';

// Динамический импорт
const Cast = lazy(() =>
  import('../components/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews' /* webpackChunkName: "reviews" */),
);

export default class MovieDetailsPage extends Component {
  state = { movie: {} };
  componentDidMount() {
    const { movieId } = this.props.match.params;

    api
      .fetchMovies({ keyWord: 'get movie details', movieId: movieId })
      .then(r => {
        this.setState({ movie: r });
      });
  }

  //Функция для возварщения на прошлую страницу
  onGoBack = () => {
    const { history, location } = this.props;
    history.push(location.state.from);
  };

  render() {
    const {
      poster_path,
      title,
      vote_average,
      overview,
      genres,
    } = this.state.movie;
    const { url, path, params } = this.props.match;
    return (
      <>
        {this.props.location.state && (
          <button onClick={this.onGoBack}>Назад</button>
        )}
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            alt={title}
          />
        ) : (
          <img
            src={
              'https://plastic-system.ru/local/templates/common/images/no-image.png'
            }
            alt={title}
            width="250"
          />
        )}

        <h1>{title}</h1>
        <p>Рейтинг: {`${vote_average * 10}%`}</p>
        <h2>Превью</h2>
        <p>{overview}</p>
        <h3>Жанры</h3>
        {genres && genres.map(i => <p key={i.id}>{i.name}</p>)}
        <Link
          to={{
            pathname: `${url}/cast`,
            state: { from: this.props.location.state.from },
          }}
        >
          <h3>Актёры</h3>
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            path={`${path}/cast`}
            render={props => <Cast {...props} id={params.movieId} />}
          />
        </Suspense>
        <Link
          to={{
            pathname: `${url}/reviews`,
            state: { from: this.props.location.state.from },
            replace: true,
          }}
        >
          <h3>Обзоры</h3>
        </Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            path={`${path}/reviews`}
            render={props => <Reviews {...props} id={params.movieId} />}
          />{' '}
        </Suspense>
      </>
    );
  }
}
