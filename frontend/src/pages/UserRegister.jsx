import React, { useState } from "react";
import uberLogo from "../images/uber.png"; // Assuming you have a different logo for the captain
import { Link, useNavigate } from "react-router-dom";

function UserRegister() {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate(); // Optional if redirect needed after login

  const submitHandler = (e) => {
    e.preventDefault();

    // Basic example: simulate login
    setUserData({ email: email, password: password, fullname:{firstName: firstName, lastName: lastName} });
    // console.log(userData);
    // Clear input fields
    setEmail(" ");
    setPassword(" ");
    setFirstName(" ");
    setLastName(" ");


  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-md">
        <img className="w-16 mb-10" src={uberLogo} alt="Uber Logo" />

        <form onSubmit={(e) => submitHandler(e)} className="w-full">
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
           <div className="flex  md:flex-row gap-4 mb-5">
            <input
            className="border border-gray-300 p-2 rounded  bg-[#eeeeee] w-1/2 text-lg placeholder:text-base"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-2 rounded  bg-[#eeeeee] w-1/2 text-lg placeholder:text-base"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
           </div>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="border border-gray-300 p-2 rounded mb-5 bg-[#eeeeee] w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="border border-gray-300 p-2 rounded mb-5 bg-[#eeeeee] w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="p-2 rounded font-semibold mb-3 bg-black w-full text-lg text-white"
            type="submit"
          >
            Sign-up
          </button>

          <p className="text-center">
            Already have an account?
            <Link className="text-blue-500" to="/user-login">
              User-Login
            </Link>
          </p>
        </form>
      </div>

      <div className="w-full max-w-md mt-10">
        <p className="text-center text-sm text-gray-600">By proceeding, you consent to get marketing communications from Uber. </p>
      </div>
    </div>
  );
}

export default UserRegister;