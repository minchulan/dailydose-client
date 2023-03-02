import React from 'react';

const SearchMedication = ({search, onSearchChange}) => {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Medications: </label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Type medication name to search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)} />

    </div>
  )
}

export default SearchMedication