import React, { Component } from "react";
import NominationItem from "./NominationItem";

class NominationList extends Component {
  state = {
    disabled: false,
  };
  render() {
    return (
      <div className="nomination-container">
        <NominationItem disabled={this.state.disabled} />
        <NominationItem disabled={this.state.disabled} />
        <NominationItem disabled={this.state.disabled} />
        <NominationItem disabled={this.state.disabled} />
        <NominationItem disabled={this.state.disabled} />
      </div>
    );
  }
}

export default NominationList;
