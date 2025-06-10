import React, { forwardRef } from "react";

const Lookingfordriver = forwardRef(
  ({ selectedVehicle, setConfirmRidePanel, setvehicleFound, setwaitingForDriver }, ref) => {
    if (!selectedVehicle) return null;

    return (
      <div
        ref={ref}
        className="fixed w-full bottom-0 bg-white rounded-t-3xl p-6 shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <button
          className="absolute top-3 right-6 text-2xl"
          onClick={() => setConfirmRidePanel(false)}
        >
          <i className="ri-close-line"></i>
        </button>

        <h3 className="text-xl font-semibold mb-4">Looking for a driver</h3>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={selectedVehicle.img}
            alt={selectedVehicle.name}
            className="h-16 w-16 object-contain"
          />
          <div>
            <h4 className="font-bold text-lg">{selectedVehicle.name}</h4>
            <p>{selectedVehicle.seats} seats available</p>
            <p>Waiting time: {selectedVehicle.waitTime}</p>
          </div>
          <div className="ml-auto text-xl font-semibold text-green-700">
            ${selectedVehicle.price}
          </div>
        </div>

        <button
          className="bg-black text-white py-2 px-6 rounded-lg w-full"
          onClick={() => setwaitingForDriver(true)}
        >
          Confirm Ride
        </button>
      </div>
    );
  }
);

export default Lookingfordriver;
