import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import api from '../service/fetch-api';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';

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
        <img
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt={title}
        />
        <h1>{title}</h1>
        <p>Рейтинг: {`${vote_average * 10}%`}</p>
        <h2>Превью</h2>
        <p>{overview}</p>
        <h3>Жанры</h3>
        {genres && genres.map(i => <p key={i.id}>{i.name}</p>)}
        <Link
          to={{ pathname: `${url}/cast`, state: { from: this.props.location } }}
        >
          <h3>Актёры</h3>
        </Link>
        <Route
          path={`${path}/cast`}
          render={props => <Cast {...props} id={params.movieId} />}
        />
        <Link
          to={{
            pathname: `${url}/reviews`,
            state: { from: this.props.location },
          }}
        >
          <h3>Обзоры</h3>
        </Link>
        <Route
          path={`${path}/reviews`}
          render={props => <Reviews {...props} id={params.movieId} />}
        />
      </>
    );
  }
}
