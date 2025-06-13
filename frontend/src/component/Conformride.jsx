import React, { forwardRef } from "react";

const Conformride = forwardRef(
  (
    { selectedVehicle, setConfirmRidePanel, setvehicleFound, createRide , pickup, destination, fare, vehicleType },
    ref
  ) => {
    if (!selectedVehicle) return null;

    return (
      <div
        ref={ref}
        className="fixed w-full bottom-0 bg-white rounded-t-3xl p-6 shadow-lg"
      >
        <button
          className="absolute top-3 right-6 text-2xl"
          onClick={() => setConfirmRidePanel(false)}
        >
          <i className="ri-close-line"></i>
        </button>

        <h3 className="text-xl font-semibold mb-4">Confirm Your Ride</h3>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={selectedVehicle.img}
            alt={selectedVehicle.name}
            className="h-16 w-16 object-contain"
          />
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-xl text-gray-800">
              {selectedVehicle.name}
            </h4>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Pickup:</span> {pickup}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Destination:</span> {destination}
            </p>
          </div>
          <div className="ml-auto text-xl font-semibold text-green-700">
            {fare[vehicleType]}
          </div>
        </div>

        <button
          className="bg-black text-white py-2 px-6 rounded-lg w-full"
          onClick={() => {
            setvehicleFound(true);
            createRide();
            setConfirmRidePanel(false)
          }}
        >
          Confirm Ride
        </button>
      </div>
    );
  }
);

export default Conformride;
