import React, { useRef , useEffect} from "react";
import Uberimage from "../images/uber.png";
import map from "../images/map.jpg";
import { useState } from "react";
import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchpannel from "../component/LocationSearchpannel";

function Home() {
  // Function to handle form submission
  const [destination, setDestination] = useState("");
  const [pickup, setPickup] = useState("");
  const [panel, setPanel] = useState(false);
  const formRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  // GSAP animation setup
useEffect(() => {
  gsap.to(formRef.current, {
    height: panel ? '430px' : '0px',
    duration: 0.5,
    ease: 'power2.out',
  });

  if (panel) {
    gsap.from(panelCloseRef.current, {
      opacity: 0,
      height: '70%',
    });
  } else {
    gsap.to(panelCloseRef.current, {
      opacity: 1,
      height: '0%',
    });
  }
}, [panel]);



  return (
    <div className="relative h-screen w-screen">
      <img src={Uberimage} alt="Uber" className="w-16 absolute left-5 top-5" />
      <div className="h-screen w-screen ">
        {/* images for temporary use */}
        <img src={map} alt="map drag" className="h-full w-full object-cover " />
      </div>
      <div className=" absolute bottom-0 w-full flex flex-col justify-end">
        {/* Top Section: Search Form */}
        <div className="p-5 bg-white h-[30%] relative">
          <h5 ref={panelCloseRef} onClick={() => setPanel(false)} className="absolute  top-6 right-6 text-2xl"><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[40%] left-8 bg-gray-700 rounded-full"></div>
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
              onClick={() => setPanel(true)}
              onChange={(e) => setDestination(e.target.value)}
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

        {/* Bottom Section: Placeholder for Content */}
        <div ref={formRef} className="h-0 bg-white ">
          <LocationSearchpannel/>
        </div>
      </div>
    </div>
  );
}

export default Home;
