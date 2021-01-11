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
        <div className="movie-content">
          <div className="movie-content-description">
            <p className="movie-rating">
              <i className="fa fa-star"></i> 7.1/10
            </p>
            <h4>
              <span>1982</span> <span>SCI-FI, THRILLER</span>
            </h4>
            <p>
              A blade runner must pursue and try to terminate four replicants
              who stole a ship in space and have returned to Earth to find their
              creator.
            </p>
          </div>
        </div>
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
