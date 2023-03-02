import React, { useState } from 'react';

const MedicationEditForm = ({price, id, onUpdateMedication}) => {
    const [medicationPrice, setMedicationPrice] = useState(price)

    const medicationObject = { price: medicationPrice };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedObject = { medicationObject };
        fetch(`http://localhost:9292/medications/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicationObject)
        })
            .then(r => r.json())
            .then(updatedObject => onUpdateMedication(updatedObject))
        
    }

    return (
        <form className="edit-price" onSubmit={handleFormSubmit}>
            <input type="text" name="price" autoComplete="off" value={medicationPrice} onChange={(e) => setMedicationPrice(e.target.value)} />
            <input type="submit" value="Save" />
        </form>
    )
}

export default MedicationEditForm