import React from 'react';

const SearchMedication = ({search, onSearchChange}) => {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Rx Savings: </label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Enter a medication"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)} />

    </div>
  )
}

export default SearchMedication