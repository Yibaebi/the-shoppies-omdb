import React, { Component } from "react";
import NominationItem from "./NominationItem";

class NominationList extends Component {
  render() {
    const NominationList = this.props.Nominations.map((Nomination) => (
      <div className="nomination-item" key={Nomination.imdbID}>
        <NominationItem
          Nominated={Nomination}
          removeNomination={this.props.removeNomination}
        />
      </div>
    ));
    return <div className="nomination-container">{NominationList}</div>;
  }
}

export default NominationList;
