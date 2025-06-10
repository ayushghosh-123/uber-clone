import React from "react";

function LocationSearchpannel({ setVehiclePanel, setpanelopen }) {
  const locations = [
    "24B, near KAPPOR'S CAFE, SHERIYAN CODING SCHOOL, Bhopal",
    "25A, near XYZ CAFE, ABC SCHOOL, Bhopal",
    "26C, near PQR CAFE, DEF SCHOOL, Bhopal",
    "27D, near LMN CAFE, GHI SCHOOL, Bhopal",
  ];

  const handleSelect = () => {
    setVehiclePanel(true);   // Open vehicle panel
    setpanelopen(false);     // Close location panel
  };

  return (
    <div className="p-5">
      {locations.map((location, index) => (
        <div
          key={index}
          onClick={handleSelect}
          className="flex items-center border-2 p-3 border-gray-300 active:border-black my-4 justify-start gap-4 cursor-pointer"
        >
          <h2 className="bg-[#eee] w-12 h-8 flex justify-center items-center rounded-full">
            <i className="ri-map-pin-2-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchpannel;

