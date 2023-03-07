import React from "react";

const SearchPatient = ({ search, onSearchChange }) => {
  return (
    <div className="searchbar">
      <label htmlFor="search"></label>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchPatient;
