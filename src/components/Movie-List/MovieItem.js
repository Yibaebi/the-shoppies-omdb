import React from "react";
import Button from "../Buttons/Button";

function MovieItem(props) {
  return (
    <div>
      <h3>Movie</h3>
      <Button
        label={props.label}
        type="submit"
        onClick={props.onClick}
        className="btn nominate"
        iconClass="far fa-check-circle"
        disabled={props.disabled}
      />
    </div>
  );
}

export default MovieItem;
