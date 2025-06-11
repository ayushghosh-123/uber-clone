import React from "react";
import car from "../images/car.png";

function Ridepopup() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">New ride Available</h3>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center justify-center gap-4 ">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt="Driver"
          />
          <h2 className="text-lg font-medium">Harsh Patel</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2km</h5>
      </div>
      <div>
        <h4 className="font-bold text-lg"></h4>
        <p> seats available</p>
        <p>Waiting time: </p>
      </div>
      <div className="ml-auto text-xl font-semibold text-green-700"></div>
      <button className="bg-black text-white py-2 px-6 rounded-lg w-full mt-3">
        Confirm Ride
      </button>
      <button className="bg-gray-400 text-gray-700 font-semibold p-2 rounded-lg w-full mt-4">
        Ignore
      </button>
    </div>
  );
}

export default Ridepopup;
