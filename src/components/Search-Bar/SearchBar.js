import React, { Component } from "react";
import SearchInput from "./SearchInput";
import "./SearchBar.css";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="searchbar-container">
        <SearchInput
          value={this.props.value}
          onSubmit={this.props.onSubmit}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
