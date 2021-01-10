import React, { Component } from "react";
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
      <div>
        <h1>MovieList.js</h1>
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
