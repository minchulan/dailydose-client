import React from 'react';

const SearchPatient = ({ onSearchChange, search }) => {
  return (
    <div className="searchbar">
      <label htmlFor="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search by first name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <hr />
    </div>
  );
}

export default SearchPatient