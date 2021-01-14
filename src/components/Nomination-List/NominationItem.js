import React from "react";
import Button from "../Buttons/Button";

function NominationItem(props) {
  console.log(props);
  return (
    <div className="nomination-item">
      <div className="nomination-item-details">
        <h3 className="">Movie Title</h3>
        <p>(1993)</p>
        <p className="mb-1">
          Donec id elit non mi porta gravida at eget metus. Lorem, ipsum dolor
          sit amet consectetur adipisicing elit. Illo, iure?
        </p>
        <Button
          label="Remove"
          type="submit"
          onClick={console.log("Deleted")}
          className="btn delete"
          disabled={props.disabled}
          iconClass="fas fa-trash-alt"
        />
      </div>
    </div>
  );
}

export default NominationItem;
