import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContex";

function Captaindetail() {
  const { captain, isLoading, error } = useContext(CaptainDataContext);

  // Static placeholders — replace with dynamic data if available
  const hoursOnline = "10.2";
  const ridesCompleted = "25";
  const rating = "4.9";

  // Helper to safely display the captain's name
  const getCaptainFullName = () => {
    if (isLoading) return "Loading Captain...";
    if (error) return `Error: ${error.message}`;
    if (captain?.firstname && captain?.lastname) return `${captain.firstname} ${captain.lastname}`;
    return "Captain not available";
  };

  return (
    <div className="w-full bg-gray-50 rounded-t-3xl shadow-lg pb-4 font-inter">
      {/* Captain Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-5 border-b border-gray-200">
        <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
          <img
            className="h-14 w-14 rounded-full object-cover ring-2 ring-blue-400"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt="Driver Profile"
          />
          <h4 className="text-xl font-semibold text-gray-900">
            {getCaptainFullName()}
          </h4>
          <div className="flex flex-col items-end w-full md:w-auto">
          <h4 className="text-3xl font-bold text-green-600">$295.20</h4>
          <p className="text-sm text-gray-600">Earned Today</p>
        </div>
        </div>
      </div>
      <br />
      {/* Stats Section */}
      <div className="flex flex-wrap justify-around items-center gap-y-4 py-5 px-4">
        <div className="flex flex-col items-center text-center w-1/3 sm:w-1/4 md:w-auto p-2">
          <i className="text-3xl text-blue-500 ri-calendar-schedule-line mb-1"></i>
          <h5 className="text-lg font-bold text-gray-800">{hoursOnline}</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="flex flex-col items-center text-center w-1/3 sm:w-1/4 md:w-auto p-2">
          <i className="text-3xl text-purple-500 ri-road-map-line mb-1"></i>
          <h5 className="text-lg font-bold text-gray-800">{ridesCompleted}</h5>
          <p className="text-sm text-gray-600">Rides Completed</p>
        </div>

        <div className="flex flex-col items-center text-center w-1/3 sm:w-1/4 md:w-auto p-2">
          <i className="text-3xl text-yellow-500 ri-star-line mb-1"></i>
          <h5 className="text-lg font-bold text-gray-800">{rating}</h5>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  );
}

export default Captaindetail;
