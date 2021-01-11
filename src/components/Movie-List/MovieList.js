import React, { Component } from "react";
import "./MovieList.css";
import MovieItem from "./MovieItem";

class MovieList extends Component {
  state = { disabled: false, label: "Nominate" };
  handleNomination = (e) => {
    if (e.currentTarget.disabled === false) {
      this.setState({
        disabled: true,
        label: "Nominated",
      });
    }
  };
  render() {
    return (
      <div className="movie-list-container">
        <MovieItem
          disabled={this.state.disabled}
          onClick={(e) => this.handleNomination(e)}
          label={this.state.label}
        />
        <MovieItem
          disabled={this.state.disabled}
          onClick={(e) => this.handleNomination(e)}
          label={this.state.label}
        />
        <MovieItem
          disabled={this.state.disabled}
          onClick={(e) => this.handleNomination(e)}
          label={this.state.label}
        />
      </div>
    );
  }
}

export default MovieList;
