import React from "react";
import Map from "../images/map.jpg";
import { Link } from "react-router-dom";
import car from '../images/car.png'

function Riding(props) {
  return (
    <div className="h-screen flex flex-col">
      <Link
        to="/home"
        className="fixed h-10 w-10 bg-white flex items-center justify-center right-1 top-7 rounded-full"
      >
        <i className="ri-home-line text-lg font-bold"></i>
      </Link>

      {/* Map Section */}
      <div className="h-1/2">
        <img src={Map} alt="Map" className="h-full w-full object-cover" />
      </div>

      {/* Info Section */}
      <div className="h-1/2 bg-white p-6 rounded-t-3xl shadow-inner">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={car || "/images/default-vehicle.png"}
            alt={null || "Vehicle"}
            className="h-20 w-40 object-contain"
          />
          <div className="text-left">
            <h2 className="text-lg font-medium">Ayush</h2>
            <h4 className="text-xl font-semibold -mt-0.5">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">
              {props.model || "Maruti Suzuki Alto"}
            </p>
          </div>
        </div>

        <button className="bg-black text-white w-full py-3 rounded-lg text-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
}

export default Riding;
