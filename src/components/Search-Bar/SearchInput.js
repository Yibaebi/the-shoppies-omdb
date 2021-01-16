import React from "react";

function SearchInput({ onSubmit, value, onChange, searchIcon }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        type="search"
        placeholder="Enter movie title"
      />
      <button type="submit" className="search-button">
        {searchIcon}
      </button>
    </form>
  );
}

export default SearchInput;
