import React, {useState} from 'react';

const SearchMedication = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value)
    handleSearch(query)
  };

  return (
    <div className="searchbar">
      <label htmlFor="search"></label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        value={query}
        onChange={handleChange} />
    </div>
  )
}

export default SearchMedication