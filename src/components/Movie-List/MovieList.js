import React from "react";
import "./MovieList.css";
import MovieItem from "./MovieItem";

const MovieList = (props) => {
  const MovieList = props.Movies.map((movie) => {
    if (movie.Poster === "N/A") {
      movie.Poster =
        "https://thumbs.dreamstime.com/b/sign-word-unavailable-turned-available-two-pieces-white-paper-53496146.jpg";
    }
    return (
      <MovieItem
        key={movie.imdbID}
        movie={movie}
        disabled={props.disabled}
        onNominate={props.onNominate}
      />
    );
  });
  return (
    <div className="movie-list-container">
      <h2>
        You can only make five nominations. Hover or click on a card to
        nominate.
      </h2>
      {MovieList}
    </div>
  );
};

export default MovieList;
