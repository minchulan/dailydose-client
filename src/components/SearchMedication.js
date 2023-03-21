import React from 'react';

const SearchMedication = ({onQueryChange, query}) => {
  return (
    <div className="searchbar">
      <label htmlFor="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <hr />
    </div>
  );
}

export default SearchMedication