import React from "react";
import Button from "../Buttons/Button";

function NominationItem({ Nominated, removeNomination }) {
  return (
    <div className="nomination-item-details">
      <div>
        <h3 className="">{Nominated.Title}</h3>
        <p>{Nominated.Year}</p>
      </div>

      <Button
        label="Remove"
        type="submit"
        onClick={(e) => removeNomination(e, Nominated)}
        className="btn delete"
        iconClass="fas fa-trash-alt"
      />
    </div>
  );
}

export default NominationItem;
