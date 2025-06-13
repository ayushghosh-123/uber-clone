// LocationSearchpannel.jsx
import React from "react";

function LocationSearchpannel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) {

    const handleSuggestionClick = (suggestion) => {
        // When setting pickup/destination, you might want to store the full object
        // or just the description depending on what your backend expects later.
        // For now, let's assume you want to store the description string.
        if (activeField === 'pickup') {
            setPickup(suggestion.description) // Use suggestion.description here
        } else if (activeField === 'destination') {
            setDestination(suggestion.description) // Use suggestion.description here
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                // Ensure suggestions is an array before mapping
                // Although the error implies it is an array of objects, not just objects.
                Array.isArray(suggestions) && suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem.description}</h4> {/* <--- FIXED HERE */}
                    </div>
                ))
            }
        </div>
    );
}

export default LocationSearchpannel;