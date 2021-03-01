import React, { Component } from 'react';
import api from '../service/fetch-api';

export default class Reviews extends Component {
  state = { reviews: [] };
  componentDidMount() {
    api
      .fetchMovies({ keyWord: 'get movie reviews', movieId: this.props.id })
      .then(r => this.setState({ reviews: r.results }));
  }
  render() {
    return (
      <div>
        {this.state.reviews.length > 0 ? (
          <ul>
            {this.state.reviews.map(i => (
              <li key={i.id}>
                {`Author: ${i.author}`}
                <p>{`${i.content}`}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>На этот фильм еще нет обзоров</p>
        )}
      </div>
    );
  }
}
