import React from 'react';

const MedicationCard = ({ medication, onDeleteMedication }) => {
    const { id } = medication;

    const handleDeleteClick = () => {
        fetch(`http://localhost:9292/medications/${id}`, {
            method: "DELETE"
        })
        onDeleteMedication(id)
    };

    const handleEditClick = () => {
        console.log("updating!")
    }

    return (
      <div>
            <img src={medication.image_url} alt="medication images" />
            <h3>{medication.medication_name}</h3>
            <h4>${medication.price}</h4>
            <button className="emoji-button update" onClick={handleEditClick}>✏️</button>
            <button className="emoji-button delete" onClick={handleDeleteClick}>🗑</button> 
            <br />
            <br />
            <br />
            <br />
      </div>
    );
}



export default MedicationCard