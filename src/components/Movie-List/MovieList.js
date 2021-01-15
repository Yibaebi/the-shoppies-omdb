import React, { Component } from "react";
import "./MovieList.css";
import MovieItem from "./MovieItem";
// import DefaultPoster from "../../assets/Images/movie-poster.jpg";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Nominate",
      Nominations: [],
    };
  }

  render() {
    console.log(this.props.Movies);
    const MovieList = this.props.Movies.map((movie) => {
      if (movie.Poster === "N/A") {
        movie.Poster =
          "https://thumbs.dreamstime.com/b/sign-word-unavailable-turned-available-two-pieces-white-paper-53496146.jpg";
      }
      return (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          disabled={this.props.disabled}
          onNominate={this.props.onNominate}
        />
      );
    });
    return <div className="movie-list-container">{MovieList}</div>;
  }
}

export default MovieList;
