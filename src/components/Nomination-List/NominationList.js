import React from "react";
import NominationItem from "./NominationItem";

const NominationList = (props) => {
  const NominationList = props.Nominations.map((Nomination) => (
    <div className="nomination-item" key={Nomination.imdbID}>
      <NominationItem
        Nominated={Nomination}
        removeNomination={props.removeNomination}
      />
    </div>
  ));
  return <div className={`nomination-container`}>{NominationList}</div>;
};

export default NominationList;
