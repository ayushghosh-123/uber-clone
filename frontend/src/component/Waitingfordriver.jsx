import React, { forwardRef } from 'react';

const Waitingfordriver = forwardRef(({ setwaitingForDriver, setvehicleFound }, ref) => {
  return (
    <div
      className="fixed w-full h-100 bottom-0 bg-white rounded-t-3xl p-6 shadow-lg"
      ref={ref}
    >
      <button
        className="absolute top-3 right-6 text-2xl"
        onClick={() => setvehicleFound(false)}
      >
        <i className="ri-close-line"></i>
      </button>

      <h3 className="text-xl font-semibold mb-4">Looking for a driver</h3>

      <div className="flex items-center gap-4 mb-4">
        <img
          src="" // Replace with your image URL
          alt="Driver"
          className="h-16 w-16 object-contain"
        />
        <div className="text-left">
          <h2 className="text-lg font-medium">Ayush</h2>
          <h4 className="text-xl font-semibold -mt-0.5">MP04 AB 1234</h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
        </div>
        <div className="ml-auto text-xl font-semibold text-green-700">
          {/* Optional status or fare here */}
        </div>
      </div>

      <button
        className="bg-black text-white py-2 px-6 rounded-lg w-full"
        onClick={() => setwaitingForDriver(false)} // You can replace this with a function
      >
        Confirm Ride
      </button>
    </div>
  );
});

export default Waitingfordriver;
