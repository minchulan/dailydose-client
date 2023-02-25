import React from 'react';

const SearchPatient = ({searchPatient, setSearchPatient, onSearchChange}) => {
    return (
        <div>
            <input type="text" name="Search" placeholder="Search" value={searchPatient} onChange={e => onSearchChange(e.target.value)} />

        </div>
        
    )
}

export default SearchPatient;
