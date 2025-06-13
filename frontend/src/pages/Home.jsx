import React, { useRef, useState, useEffect } from "react";
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
import axios from "axios";

gsap.registerPlugin(useGSAP);

function Home() {
  const [destination, setDestination] = useState("");
  const [pickup, setPickup] = useState("");
  const [panel, setPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const handlePickupChange = async (e) => {
    const inputValue = e.target.value; // Capture the input value once
    setPickup(inputValue);

    if (inputValue.length < 3) {
      setPickupSuggestions([]); // Clear suggestions if input is too short
      return; // Stop execution here, don't make the API call
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: inputValue }, // Use the captured inputValue
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
      // It's good practice to clear suggestions on error, or handle it gracefully
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const inputValue = e.target.value; // Capture the input value once
    setDestination(inputValue);

    if (inputValue.length < 3) {
      setDestinationSuggestions([]); // Clear suggestions if input is too short
      return; // Stop execution here, don't make the API call
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: inputValue }, // Use the captured inputValue
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
      setDestinationSuggestions([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPanel(true);
  };

  useEffect(() => {
    if (!panelRef.current || !panelCloseRef.current) return;

    gsap.to(panelRef.current, {
      height: panel ? "430px" : "0px",
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(panelCloseRef.current, {
      opacity: panel ? 1 : 0,
      duration: 0.3,
    });
  }, [panel]);

  useGSAP(() => {
    if (vehiclePanelRef.current) {
      gsap.to(vehiclePanelRef.current, {
        y: vehiclePanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRideRef.current) {
      gsap.to(confirmRideRef.current, {
        y: confirmRidePanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFoundRef.current) {
      gsap.to(vehicleFoundRef.current, {
        y: vehicleFound ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriverRef.current) {
      gsap.to(waitingForDriverRef.current, {
        y: waitingForDriver ? 0 : "100%",
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

      {/* Main Bottom Panel */}
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
            <input
              value={pickup}
              onChange={handlePickupChange}
              onFocus={() => { // Using onFocus is better for activating the panel
                setPanel(true);
                setActiveField("pickup");
              }}
              className="border border-gray-300 px-4 py-2 bg-[#eee] text-lg rounded-lg w-full mb-4"
              type="text"
              placeholder="Enter pickup location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onFocus={() => { // Using onFocus is better for activating the panel
                setPanel(true);
                setActiveField("destination");
              }}
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

        {/* Location Suggestions Panel */}
        <div ref={panelRef} className="h-0 bg-white overflow-hidden">
          {panel && ( // Only render LocationSearchpannel if panel is open
            <LocationSearchpannel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanel}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          )}
        </div>
      </div>

      {/* Vehicle Selection */}
      <Vehiclepannel
        ref={vehiclePanelRef}
        setVehiclePanel={setVehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setSelectedVehicle={setSelectedVehicle}
      />

      {/* Confirm Ride */}
      <Conformride
        ref={confirmRideRef}
        selectedVehicle={selectedVehicle}
        setvehicleFound={setvehicleFound}
        setConfirmRidePanel={setConfirmRidePanel}
      />

      {/* Searching Driver */}
      <Lookingfordriver
        ref={vehicleFoundRef}
        selectedVehicle={selectedVehicle}
        setConfirmRidePanel={setConfirmRidePanel}
        setvehicleFound={setvehicleFound}
        setwaitingForDriver={setwaitingForDriver}
      />

      {/* Waiting for Driver */}
      <Waitingfordriver
        ref={waitingForDriverRef}
        selectedVehicle={selectedVehicle}
        waitingForDriver={waitingForDriver}
        setwaitingForDriver={setwaitingForDriver}
      />

      {/* Final Ride Screen */}
      <Riding selectedVehicle={selectedVehicle} />
    </div>
  );
}

export default Home;