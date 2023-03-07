import React from 'react';

const SearchMedication = ({search, onSearchChange}) => {
  return (
    <div className="searchbar">
      <label htmlFor="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)} />

    </div>
  )
}

export default SearchMedication