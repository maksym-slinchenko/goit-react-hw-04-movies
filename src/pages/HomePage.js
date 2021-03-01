import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../service/fetch-api';

export default class HomePage extends Component {
  state = { trendingMovies: [] };
  componentDidMount() {
    api.fetchMovies({ keyWord: 'get trending' }).then(r => {
      this.setState({ trendingMovies: r.results });
    });
  }
  render() {
    return (
      <div>
        <h1>Попульные фильмы недели</h1>
        <ul>
          {this.state.trendingMovies.map(i => (
            <li key={i.id}>
              <Link
                to={{
                  pathname: `/movies/${i.id}`,
                  state: { from: this.props.location },
                }}
              >
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
