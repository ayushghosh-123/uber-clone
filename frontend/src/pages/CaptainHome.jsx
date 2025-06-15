import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import car from "../images/car.png";
import uber from "../images/uber.png";
import Captaindetail from "../component/Captaindetail";
import Ridepopup from "../component/Ridepopup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidepopup from "../component/ConfirmRidepopup";


function CaptainHome() {
  const [ridePopupPannel, setridePopupPannel] = useState(true);
  const [ConfirmridePopupPannel, setConfirmridePopupPannel] = useState(false);

  const ridePopupPannelRef = useRef(null);
  const ConfirmridePopupPannelRef = useRef(null);

  useGSAP(() => {
    if (ridePopupPannelRef.current) {
      gsap.to(ridePopupPannelRef.current, {
        y: ridePopupPannel ? 0 : "100%", // changed vehicleFound to ridePopupPannel
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [ridePopupPannel]);

  useGSAP(() => {
    if (ConfirmridePopupPannelRef.current) {
      gsap.to(ConfirmridePopupPannelRef.current, {
        y: ConfirmridePopupPannel ? 0 : "100%", // changed vehicleFound to ridePopupPannel
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [ConfirmridePopupPannel]);



  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar - overlays on top of map */}
      <div className="fixed top-0 left-0 right-0 z-20 p-3 flex items-center justify-between w-full">
        <img src={uber} alt="Uber" className="w-16" />
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map Section - full height up to 60% of screen */}
      <div className="h-3/5 relative z-10">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Captain Info */}
      <Captaindetail />

      {/* Ride Popup Panel */}
      <div
        ref={ridePopupPannelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <Ridepopup setridePopupPannel={setridePopupPannel} setConfirmridePopupPannel={setConfirmridePopupPannel} />
      </div>

       <div
        ref={ConfirmridePopupPannelRef}
        className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <ConfirmRidepopup setridePopupPannel={setridePopupPannel} setConfirmridePopupPannel={setConfirmridePopupPannel} />
      </div>
    </div>
  );
}

export default CaptainHome;
