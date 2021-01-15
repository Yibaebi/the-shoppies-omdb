import React from "react";
import Button from "../Buttons/Button";

function MovieItem({ movie, onNominate }) {
  return (
    <div className="movie-item">
      <div className="image-container">
        <img src={movie.Poster} alt="Movie Poster" />
      </div>
      <div className="title-container">
        <h3>{movie.Title}</h3>
        <p>({movie.Year})</p>
      </div>
      <div className="movie-content-container">
        <Button
          label={movie.label}
          type="submit"
          onClick={(e) => onNominate(e, movie)}
          className="btn nominate"
          iconClass="far fa-check-circle"
          disabled={movie.nominated}
        />
      </div>
    </div>
  );
}

export default MovieItem;
