import React from "react";

function SearchInput({ onSubmit, value, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        type="search"
        placeholder="Enter movie title"
      />
      <button type="submit" className="search-button">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}

export default SearchInput;
