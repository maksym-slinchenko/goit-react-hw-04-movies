import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import api from '../service/fetch-api';

export default class MoviesPage extends Component {
  state = {
    movieNameForSearch: '',
    movieName: '',
    movies: [],
    page: 1,
    totalPages: null,
  };

  async componentDidMount() {
    const query = this.props.location.search.split('=')[1];
    if (!query) {
      return;
    }
    this.addQueryToUrl(query);
    api
      .fetchMovies({
        keyWord: 'search movies',
        movieName: query,
        pageNumber: this.state.page,
      })
      .then(r => {
        this.setState({ movies: r.results, totalPages: r.total_pages });
      })
      .finally(this.setState({ movieNameForSearch: '' }));
  }

  // Отображение значений в инпуте
  handleChange = e => {
    this.setState({ movieNameForSearch: e.currentTarget.value });
  };

  // Добавление query в адресную строку

  addQueryToUrl = query =>
    this.props.history.push(`${this.props.match.url}?query=${query}`);

  // Внесение изменений в стэйт imageName по сабмиту формы
  handleSubmit = e => {
    const { movieNameForSearch } = this.state;
    e.preventDefault();
    if (movieNameForSearch.trim() === '') {
      alert('Введите название фильма');
      return;
    }
    this.setState(
      {
        movieName: movieNameForSearch,
      },
      () =>
        api
          .fetchMovies({
            keyWord: 'search movies',
            movieName: this.state.movieName,
            pageNumber: this.state.page,
          })
          .then(r => {
            this.setState({ movies: r.results, totalPages: r.total_pages });
          })
          .finally(
            this.setState({ movieNameForSearch: '' }, () =>
              this.addQueryToUrl(this.state.movieName),
            ),
          ),
    );
  };

  //   Изменения стэйта pageNumber для перелистывания стр. поиска
  //   увеличение
  handleIncreasePage = () => {
    const prevPage = this.state.page;
    if (prevPage >= this.state.totalPages) {
      return;
    }
    this.setState({ page: prevPage + 1 }, () =>
      api
        .fetchMovies({
          keyWord: 'search movies',
          movieName: this.state.movieName,
          pageNumber: this.state.page,
        })
        .then(r => {
          this.setState({ movies: r.results });
        }),
    );
  };
  //   уменьшение
  handleReducePage = () => {
    const prevPage = this.state.page;
    if (prevPage < 2) {
      return;
    }
    this.setState({ page: prevPage - 1 }, () =>
      api
        .fetchMovies({
          keyWord: 'search movies',
          movieName: this.state.movieName,
          pageNumber: this.state.page,
        })
        .then(r => {
          this.setState({ movies: r.results });
        }),
    );
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Поиск фильма"
            onChange={this.handleChange}
            value={this.state.movieNameForSearch}
          />
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Поиск</span>
          </button>
        </form>
        <div>
          <ul>
            {this.state.movies.map(i => (
              <li key={i.id}>
                <Link
                  to={{
                    pathname: `${this.props.match.url}/${i.id}`,
                    state: { from: this.props.location },
                  }}
                >
                  {i.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {this.state.totalPages > 1 && (
          <>
            <Button
              buttonName={'Предыдущая стр'}
              callBack={this.handleReducePage}
            />
            <Button
              buttonName={'Следующая стр'}
              callBack={this.handleIncreasePage}
            />
          </>
        )}
      </header>
    );
  }
}
