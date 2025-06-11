import React, { forwardRef } from 'react';

const Waitingfordriver = forwardRef(
  ({  setwaitingForDriver, selectedVehicle }, ref) => {
    if (!selectedVehicle) return null; // Prevent render if no vehicle is selected

    return (
      <div
        ref={ref}
        className="fixed w-full bottom-0 bg-white rounded-t-3xl p-6 shadow-lg z-50"
        style={{ transform: "translateY(100%)" }}
      >
        <button
          className="absolute top-3 right-6 text-2xl"
          onClick={() => {
             setwaitingForDriver(false);
          }}
        >
          <i className="ri-close-line"></i>
        </button>

        <h3 className="text-xl font-semibold mb-4">Your Ride</h3>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={selectedVehicle.img || "/images/default-vehicle.png"} // fallback if image missing
            alt={selectedVehicle.name || "Vehicle"}
            className="h-16 w-16 object-contain"
          />
          <div className="text-left">
            <h2 className="text-lg font-medium">Ayush</h2>
            <h4 className="text-xl font-semibold -mt-0.5">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">
              {selectedVehicle.model || "Maruti Suzuki Alto"}
            </p>
          </div>
          <div className="ml-auto text-sm font-semibold text-green-700">
            Waiting for driver...
            {/* Optionally show ETA or location updates */}
          </div>
        </div>

        <button
          className="bg-black text-white py-2 px-6 rounded-lg w-full"
          onClick={() =>  setwaitingForDriver(false)}
        >
          Cancel Ride
        </button>
      </div>
    );
  }
);

export default Waitingfordriver;

