import React, { Component } from "react";
import NominationItem from "./NominationItem";

class NominationList extends Component {
  render() {
    console.log(this.props.Nominations);
    const NominationList = this.props.Nominations.map((Nomination) => (
      <div className="nomination-item" key={Nomination.imdbID}>
        {console.log(Nomination)}
        <NominationItem Nominated={Nomination} />
      </div>
    ));
    return <div className="nomination-container">{NominationList}</div>;
  }
}

export default NominationList;
