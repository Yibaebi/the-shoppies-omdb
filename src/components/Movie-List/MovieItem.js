import React from "react";
import MoviePoster from "../../assets/Images/movie-poster.jpg";
import Button from "../Buttons/Button";

function MovieItem(props) {
  return (
    <div className="movie-item">
      <div className="image-container">
        <img src={MoviePoster} alt="Movie Poster" />
      </div>
      <div className="title-container">
        <h3>Kill Billy</h3>
        <p>(1993)</p>
      </div>
      <div className="movie-content-container">
        <Button
          label={props.label}
          type="submit"
          onClick={props.onClick}
          className="btn nominate"
          iconClass="far fa-check-circle"
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default MovieItem;
