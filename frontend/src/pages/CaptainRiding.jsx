import React, { useRef, useState } from "react";
import uber from "../images/uber.png";
import { Link } from "react-router-dom";
import FinishRide from "../component/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function CaptainRiding(props) {
  const [finishRidePannel, setFinishRidePannel] = useState(false);

  const finishRidePannelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePannelRef.current) {
      gsap.to(finishRidePannelRef.current, {
        y: finishRidePannel ? 0 : "100%", // changed vehicleFound to ridePopupPannel
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [finishRidePannel]);

  return (
    <div className="h-screen relative">
      {/* Top Bar - overlays on top of map */}
      <div className="fixed top-0 left-0 right-0 z-20 p-3 flex items-center justify-between w-full">
        <img src={uber} alt="Uber" className="w-16" />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map Section - full height up to 60% of screen */}
      <div className="h-4/5 relative z-10">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      <div
        className="h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative"
        onClick={() => {
          setFinishRidePannel(true);
        }}
      >
        <button
          type="button"
          className="absolute top-3 right-6 w-[95%] text-2xl text-gray-600 hover:text-black"
        >
          <i className="ri-arrow-up-wide-line"></i>
        </button>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-500 text-white flex justify-center py-2 px-6 rounded-lg  font-bold">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePannelRef}
        className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 rounded-t-3xl shadow-lg"
        style={{ transform: "translateY(100%)" }}
      >
        <FinishRide  setFinishRidePannel={setFinishRidePannel} />
      </div>
    </div>
  );
}

export default CaptainRiding;
