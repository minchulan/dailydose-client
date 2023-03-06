import React, { useState } from 'react';
import MedicationEditForm from './MedicationEditForm';

const MedicationCard = ({ medication, onDeleteMedication, onUpdateMedication }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { price, id } = medication;

    const handleDeleteClick = () => {
        fetch(`http://localhost:9292/medications/${id}`, {
            method: "DELETE"
        })
        onDeleteMedication(id)
    };

    const handleUpdatePrice = (updatedPrice) => {
        setIsEditing(false);
        onUpdateMedication(updatedPrice);
    }

    return (
      <div>
        <img src={medication.image_url} alt="medication images" />
        <h2>{medication.medication_name}</h2>
        <p>aka {medication.aka}</p>
        <h5>THC {medication.thc_strength}%, CBD {medication.cbd_strength}%</h5>
        <p>🧘 {medication.feelings}</p>
        {isEditing ? (
          <MedicationEditForm
            price={price} 
            id={id}
            onUpdateMedication={handleUpdatePrice}
          />
        ) : (<h2>${medication.price}</h2>)}
        <button
          className="emoji-button edit"
          onClick={() => setIsEditing((isEditing) => !isEditing)}
        >
          ✏️
        </button>
        <button className="emoji-button delete" onClick={handleDeleteClick}>
          🗑
        </button>
        <hr />
      </div>
    );
}

export default MedicationCard