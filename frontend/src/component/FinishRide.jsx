import React from "react";
import { Link } from "react-router-dom";

function FinishRide(props) {
  return (
    <div>
      <div className="relative p-4">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-3 right-6 text-2xl text-gray-600 hover:text-black"
          onClick={() => props.setFinishRidePannel(false)}
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-4">Finish your Ride</h3>

        {/* Driver Info */}
        <div className="flex items-center justify-between border-4  border-yellow-400 p-3 rounded-lg">
          <div className="flex items-center gap-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000"
              alt="Driver"
            />
            <h2 className="text-lg font-medium">Monovendra Patel</h2>
          </div>
          <h5 className="text-lg font-semibold">2.2 km</h5>
        </div>

        {/* Address Info */}
        <div className="flex justify-center items-center flex-col gap-4 p-4 bg-gray-50">
          <div className="flex justify-start items-start gap-4 w-full max-w-md bg-white p-4 rounded-xl shadow-md hover:bg-gray-100 transition">
            <h4>
              <i className="ri-map-pin-user-line text-2xl text-blue-600"></i>
            </h4>
            <div>
              <h3 className="font-semibold text-base">562/11-A</h3>
              <p className="text-sm text-gray-600">Kankariya Table, Bhopal</p>
            </div>
          </div>

          <div className="flex justify-start items-start gap-4 w-full max-w-md bg-white p-4 rounded-xl shadow-md hover:bg-gray-100 transition">
            <h4>
              <i className="ri-map-pin-user-line text-2xl text-blue-600"></i>
            </h4>
            <div>
              <h3 className="font-semibold text-base">562/11-A</h3>
              <p className="text-sm text-gray-600">Kankariya Table, Bhopal</p>
            </div>
          </div>

          <div className="flex justify-start items-start gap-4 w-full max-w-md bg-white p-4 rounded-xl shadow-md hover:bg-gray-100 transition">
            <h4>
              <i className="ri-map-pin-user-line text-2xl text-blue-600"></i>
            </h4>
            <div>
              <h3 className="font-semibold text-base">562/11-A</h3>
              <p className="text-sm text-gray-600">Kankariya Table, Bhopal</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10  w-full">
          <Link
            to='/captain-home'
            className="bg-green-500 text-white flex justify-center py-2 px-6 rounded-lg w-full mt-6 hover:bg-green-600"
          >
            Finish Ride
          </Link>
          <p className="text-red-500 mt-10 text-xs">Click on finish ride button if you have completed the payment</p>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
