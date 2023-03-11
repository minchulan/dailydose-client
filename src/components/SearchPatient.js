import React, { useState } from 'react';

const SearchPatient = ({ handleSearchPatient }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value)
        handleSearchPatient(query)
    };

    return (
        <div className="searchbar">
            <label htmlFor="search"></label>
            <input
                type="text"
                id="search"
                name="search"
                placeholder="Search by first name..."
                autocomplete="off"
                value={query}
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchPatient