import React, { Component } from "react";
import NominationItem from "./NominationItem";

class NominationList extends Component {
  state = {
    disabled: false,
  };
  render() {
    return (
      <div>
        <h1>Nomination List</h1>
        <NominationItem disabled={this.state.disabled} />
      </div>
    );
  }
}

export default NominationList;
