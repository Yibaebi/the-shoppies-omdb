import React from "react";
import Button from "../Buttons/Button";

function NominationItem(props) {
  console.log(props);
  return (
    <div>
      <h1>Nomination Item</h1>
      <Button
        label="Remove"
        type="submit"
        onClick={console.log("Deleted")}
        className="btn delete"
        disabled={props.disabled}
        iconClass="fas fa-trash-alt"
      />
    </div>
  );
}

export default NominationItem;
