import React from "react";
import uberLogo from "../images/uber.png";
import backgroundImage from "../images/background.jpg";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

function Start() {
  return (
    <div
      className="h-screen w-full flex flex-col justify-between items-center pt-8 bg-cover bg-center font-inter"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <img className="w-16 ml-8 self-start" src={uberLogo} alt="Uber Logo" />

      <div
        className="
          bg-white // White background
          w-full // Full width on small screens
          sm:max-w-md // Max width on small-medium screens (e.g., 28rem)
          md:max-w-lg // Max width on medium screens (e.g., 32rem)
          lg:max-w-xl // Max width on large screens (e.g., 36rem)
          mx-auto // Center horizontally when max-width is applied
          rounded-t-3xl // Rounded top corners
          py-8 px-6 // Vertical and horizontal padding
          flex flex-col items-center gap-6 // Flex column, center items, gap between children
          shadow-2xl 
          text-center // Center text within this panel
        "
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Get started with Uber
        </h2>
        <Link
          to="/user-login"
          className="
            bg-black text-white // Black background, white text
            py-4 px-8 
            rounded-xl 
            mt-5 // Top margin
            flex items-center justify-center // Center content within the button
            w-full // Full width on small screens
            max-w-xs // Max width for the button itself to prevent overstretching
            font-semibold text-lg // Larger, bolder text
            shadow-md 
            hover:bg-gray-800 
            transition-colors duration-200 
            transform hover:scale-105 active:scale-95 
          "
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default Start;
