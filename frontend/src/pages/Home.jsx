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
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null)

  const panelRef = useRef(null); 
  const panelCloseRef = useRef(null); 
  const vehiclePanelRef = useRef(null); 
  const confirmRideRef = useRef(null); 
  const vehicleFoundRef = useRef(null); 
  const waitingForDriverRef = useRef(null); 

  /**
   * Handles changes in the pickup location input field.
   * Fetches location suggestions from the API if input length is sufficient.
   * @param {Object} e - The event object from the input change.
   */
  const handlePickupChange = async (e) => {
    const inputValue = e.target.value;
    setPickup(inputValue);

    
    if (inputValue.length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      // Make API call to get location suggestions
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: inputValue },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
      setPickupSuggestions([]); // Clear suggestions on error
    }
  };

  /**
   * Handles changes in the destination location input field.
   * Fetches location suggestions from the API if input length is sufficient.
   * @param {Object} e - The event object from the input change.
   */
  const handleDestinationChange = async (e) => {
    const inputValue = e.target.value;
    setDestination(inputValue);

    // Only fetch suggestions if the input has at least 3 characters
    if (inputValue.length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      // Make API call to get location suggestions
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: inputValue },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
      setDestinationSuggestions([]); // Clear suggestions on error
    }
  };

  async function findTrip() {
    // Check if both pickup and destination are provided
    if (!pickup || !destination) {
      console.warn("Please enter both pickup and destination locations.");
      // Optionally, show a user-friendly message on the UI
      return;
    }

    try {
      // Make a GET request to fetch the fare
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: {
          pickup,
          destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Pass authorization token
        }
      });

      // Set the received fare data in state
      setFare(response.data);
      console.log("Fare fetched successfully:", response.data);

      setVehiclePanel(true);
      setPanel(false);

    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  }


async function createRide() {
  if (!pickup || !destination) {
    console.error("Error: Pickup or destination is missing. Cannot create ride.");
    return; 
  }
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Error: Authentication token is missing. Please log in.");
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`, {
      pickup,       
      destination,   
      vehicleType    
    }, {
      headers: {
        Authorization: `Bearer ${token}` // Use the checked token
      }
    });

    console.log("Ride creation successful:", response.data);

  } catch (error) {
    // 3. Robust error handling for network requests
    if (error.response) {
      console.error("Ride creation failed with response error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Ride creation failed: No response received from server.", error.request);
    } else {
      console.error("Ride creation failed: Request setup error.", error.message);
    }
  }
}

  // useEffect for animating the main location search panel (panelRef)
  useEffect(() => {
    if (!panelRef.current || !panelCloseRef.current) return;

    // Animate the height of the panel for open/close effect
    gsap.to(panelRef.current, {
      height: panel ? "430px" : "0px",
      duration: 0.5,
      ease: "power2.out",
    });

    // Animate the opacity of the close button
    gsap.to(panelCloseRef.current, {
      opacity: panel ? 1 : 0,
      duration: 0.3,
    });
  }, [panel]); // Dependency: 'panel' state

  // useGSAP for animating the vehicle selection panel (vehiclePanelRef)
  useGSAP(() => {
    if (vehiclePanelRef.current) {
      // Animate the Y position for slide-up/slide-down effect
      gsap.to(vehiclePanelRef.current, {
        y: vehiclePanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehiclePanel]); // Dependency: 'vehiclePanel' state

  // useGSAP for animating the ride confirmation panel (confirmRideRef)
  useGSAP(() => {
    if (confirmRideRef.current) {
      // Animate the Y position for slide-up/slide-down effect
      gsap.to(confirmRideRef.current, {
        y: confirmRidePanel ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [confirmRidePanel]); // Dependency: 'confirmRidePanel' state

  // useGSAP for animating the looking for driver panel (vehicleFoundRef)
  useGSAP(() => {
    if (vehicleFoundRef.current) {
      // Animate the Y position for slide-up/slide-down effect
      gsap.to(vehicleFoundRef.current, {
        y: vehicleFound ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [vehicleFound]); // Dependency: 'vehicleFound' state

  // useGSAP for animating the waiting for driver panel (waitingForDriverRef)
  useGSAP(() => {
    if (waitingForDriverRef.current) {
      // Animate the Y position for slide-up/slide-down effect
      gsap.to(waitingForDriverRef.current, {
        y: waitingForDriver ? 0 : "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [waitingForDriver]); // Dependency: 'waitingForDriver' state

  return (
    <div className="relative h-screen overflow-hidden font-inter"> {/* Added font-inter class */}
      {/* Uber logo positioned at top-left */}
      <img src={Uberimage} alt="Uber" className="w-16 absolute left-5 top-5 z-10" /> {/* Added z-10 for layering */}

      {/* Background map image */}
      <div className="h-screen w-screen" onClick={() => setVehiclePanel(false)}>
        <img src={map} alt="map" className="h-full w-full object-cover" />
      </div>

      {/* Main Bottom Panel - Contains pickup/destination inputs and "Find Trip" button */}
      <div className="absolute bottom-0 w-full flex flex-col justify-end">
        <div className="p-5 bg-white h-[30%] relative rounded-t-3xl shadow-lg"> {/* Added rounded corners and shadow */}
          {/* Close button for the main panel */}
          <h5
            ref={panelCloseRef}
            onClick={() => setPanel(false)}
            className="absolute top-6 right-6 text-2xl cursor-pointer text-gray-600 hover:text-black transition-colors duration-200"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold mb-4 text-gray-800">Find a trip</h4>
          <form> {/* Removed onSubmit={submitHandler} */}
            <input
              value={pickup}
              onChange={handlePickupChange}
              onFocus={() => {
                setPanel(true);
                setActiveField("pickup");
              }}
              className="border border-gray-300 px-4 py-3 bg-gray-100 text-lg rounded-xl w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" // Styled input
              type="text"
              placeholder="Enter pickup location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onFocus={() => {
                setPanel(true);
                setActiveField("destination");
              }}
              className="border border-gray-300 px-4 py-3 bg-gray-100 text-lg rounded-xl w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" // Styled input
              type="text"
              placeholder="Enter destination location"
            />
            <button
              className="bg-black text-white py-3 px-6 rounded-xl w-full text-lg font-medium shadow-md hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105 active:scale-100" // Styled button
              type="button" // Changed to type="button" to prevent default form submission
              onClick={findTrip}
            >
              Find Trip
            </button>
          </form>
        </div>

        {/* Location Suggestions Panel - Slides up/down */}
        <div ref={panelRef} className="h-0 bg-white overflow-hidden rounded-b-3xl shadow-inner"> {/* Added rounded corners and shadow */}
          {panel && ( // Only render LocationSearchpannel if panel is open to save resources
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

      {/* Vehicle Selection Panel - Slides up from bottom */}
      <Vehiclepannel
        selectedVehicle={setVehicleType}
        ref={vehiclePanelRef}
        setVehiclePanel={setVehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setSelectedVehicle={setSelectedVehicle}
        pickup={pickup} // Pass pickup and destination to Vehiclepannel
        destination={destination}
        fare={fare} // Pass fare to Vehiclepannel
      />

      {/* Confirm Ride Panel - Slides up from bottom */}
      <Conformride
        createRide = {createRide}
        ref={confirmRideRef}
        selectedVehicle={selectedVehicle}
        setvehicleFound={setvehicleFound}
        setConfirmRidePanel={setConfirmRidePanel}
        pickup={pickup} // Pass pickup and destination to Conformride
        destination={destination}
        fare={fare}
        vehicleType={vehicleType} // Pass fare to Conformride
      />

      {/* Searching Driver Panel - Slides up from bottom */}
      <Lookingfordriver
        ref={vehicleFoundRef}
        selectedVehicle={selectedVehicle}
        setConfirmRidePanel={setConfirmRidePanel}
        setvehicleFound={setvehicleFound}
        setwaitingForDriver={setwaitingForDriver}
        pickup={pickup} // Pass pickup and destination to Lookingfordriver
        destination={destination}
        fare={fare} 
        vehicleType={vehicleType}// Pass fare to Lookingfordriver
      />

      {/* Waiting for Driver Panel - Slides up from bottom */}
      <Waitingfordriver
        ref={waitingForDriverRef}
        selectedVehicle={selectedVehicle}
        waitingForDriver={waitingForDriver}
        setwaitingForDriver={setwaitingForDriver}
        pickup={pickup} // Pass pickup and destination to Waitingfordriver
        destination={destination}
        fare={fare} // Pass fare to Waitingfordriver
      />

      {/* Final Ride Screen (Always rendered, but content changes based on state) */}
      <Riding selectedVehicle={selectedVehicle} />
    </div>
  );
}

export default Home;
