import React, { Component } from "react";
import SearchInput from "./SearchInput";
import "./SearchBar.css";

export default class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.searchQuery, "Submitted");
  };
  render() {
    return (
      <div className="searchbar-container">
        <SearchInput
          value={this.state.searchQuery}
          onSubmit={(e) => this.handleSearchSubmit(e)}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
        />
      </div>
    );
  }
}
