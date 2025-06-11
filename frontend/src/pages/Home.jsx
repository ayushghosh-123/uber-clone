import React, { useRef, useEffect, useState } from "react";
import Uberimage from "../images/uber.png";
import map from "../images/map.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchpannel from "../component/LocationSearchpannel";
import Vehiclepannel from "../component/Vehiclepannel";
import Conformride from "../component/Conformride";
import Lookingfordriver from "../component/lookingfordriver";
import Waitingfordriver from "../component/Waitingfordriver";
import Riding from "./Riding";

gsap.registerPlugin(useGSAP);

function Home() {
  const [destination, setDestination] = useState("");
  const [pickup, setPickup] = useState("");
  const [panel, setPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const formRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundeRef = useRef(null); // ✅ Correct ref 
  const waitingForDriverRef = useRef(null); // ✅ Correct ref 

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Pickup:", pickup, "Destination:", destination);
  };

  // Animate location panel
  useEffect(() => {
    if (!formRef.current || !panelCloseRef.current) return;

    gsap.to(formRef.current, {
      height: panel ? "430px" : "0px",
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(panelCloseRef.current, {
      opacity: panel ? 1 : 0,
      duration: 0.3,
    });
  }, [panel]);

  // Animate vehicle panel
  useGSAP(() => {
    if (vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, {
        y: vehiclePanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehiclePanel]);

  // Animate confirm ride panel
  useGSAP(() => {
    if (confirmRideRef.current) {
      gsap.to(confirmRideRef.current, {
        y: confirmRidePanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [confirmRidePanel]);

  // Animate "looking for driver" panel
  useGSAP(() => {
    if (vehicleFoundeRef.current) {
      gsap.to(vehicleFoundeRef.current, {
        y: vehicleFound ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriverRef.current) {
      gsap.to(waitingForDriverRef.current, {
        y: vehicleFound ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="relative h-screen overflow-hidden">
      <img src={Uberimage} alt="Uber" className="w-16 absolute left-5 top-5" />

      <div className="h-screen w-screen" onClick={() => setVehiclePanel(false)}>
        <img src={map} alt="map" className="h-full w-full object-cover" />
      </div>

      {/* Bottom White Panel */}
      <div className="absolute bottom-0 w-full flex flex-col justify-end">
        <div className="p-5 bg-white h-[30%] relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanel(false)}
            className="absolute top-6 right-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="absolute h-16 w-1 top-[40%] left-8 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanel(true)}
              className="border border-gray-300 px-4 py-2 bg-[#eee] text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="Enter pickup location"
            />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanel(true)}
              className="border border-gray-300 px-4 py-2 bg-[#eee] text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="Enter destination location"
            />
            <button
              className="bg-black text-white py-2 px-6 rounded-lg w-full"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {/* Animated Location Panel */}
        <div ref={formRef} className="h-0 bg-white overflow-hidden">
          <LocationSearchpannel
            setVehiclePanel={setVehiclePanel}
            setpanelopen={setPanel}
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <Vehiclepannel
        ref={vehiclePanelRef}
        setVehiclePanel={setVehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setSelectedVehicle={setSelectedVehicle}
      />

      {/* Confirm Ride Panel */}
      <Conformride
        ref={confirmRideRef}
        selectedVehicle={selectedVehicle}
        setvehicleFound={setvehicleFound}
        setConfirmRidePanel={setConfirmRidePanel}
      />

      {/* Looking for Driver Panel */}
      <Lookingfordriver
        ref={vehicleFoundeRef}
        selectedVehicle={selectedVehicle}
        setConfirmRidePanel={setConfirmRidePanel}
        setvehicleFound={setvehicleFound}
        setwaitingForDriver={setwaitingForDriver}
      />

      <Waitingfordriver 
      ref={waitingForDriverRef}
      selectedVehicle={selectedVehicle}
      waitingForDriver={waitingForDriver}
      setwaitingForDriver={setwaitingForDriver}
      />

      <Riding
      selectedVehicle={selectedVehicle}
      />
    </div>
  );
}

export default Home;
