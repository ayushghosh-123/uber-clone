import React from "react";
import uberLogo from "../images/uber.png";
import backgroundImage from "../images/background.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="w-full h-screen flex flex-col items-start justify-between pt-8 bg-cover bg-bottom"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <img className="w-16 ml-8" src={uberLogo} alt="Uber Logo" />
      <div className="bg-white w-full h-1/4 flex items-center justify-center flex-col gap-4 py-4 px-4 pb-7">
        <h2 className="text-3xl font-bold">Get started with Uber</h2>
        <Link to="/user-login" className="bg-black text-white py-3 px-4 rounded mt-5 flex items-center justify-center">
          Continue
        </Link>
      </div>
    </div>
  );
}

export default Home;
