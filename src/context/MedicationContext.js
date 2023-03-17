import React, {useState} from 'react';

const MedicationContext = React.createContext();

const MedicationProvider = ({ children }) => {
    const [medication, setMedication] = useState();
    return (
        <MedicationContext.Provider value={ }>
            {children}
        </MedicationContext.Provider>
    )
}

export { MyContext, MedicationProvider }



// NOTES:------------------
// Provider is baked in
// Create a context first 
// value prop is fundamental
// destructure children and display children within 
// 