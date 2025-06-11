import React from "react";
import { Link } from "react-router-dom";
import car from "../images/car.png";
import uber from "../images/uber.png";
import Captaindetail from "../component/Captaindetail";
import Ridepopup from "../component/Ridepopup";

function CaptainHome() {
  return (
    <div className="h-screen flex flex-col">
      <div className="fixed p-3 top-0 flex items-center justify-between w-full">
        {/* The image no longer needs absolute positioning as flexbox will handle its placement */}
        <img src={uber} alt="Uber" className="w-16" />
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map Section */}
      <div className="h-3/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info Section */}
        <Captaindetail/>
        <div className="fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12">
            <Ridepopup/>
        </div>
    </div>
  );
}

export default CaptainHome;
