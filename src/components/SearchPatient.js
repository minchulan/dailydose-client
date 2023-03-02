import React from "react";

const SearchPatient = ({search, onSearchChange}) => {
  return (
    <div>
      <input
        type="text"
        name="Search"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchPatient;
