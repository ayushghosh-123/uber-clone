import React, { useState } from "react";
import uberDriverLogo from "../images/uber-driver.png"; // Assuming you have a different logo for the captain
import { Link, useNavigate } from "react-router-dom";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainLoginData, setCaptainLoginData] = useState({});
  const navigate = useNavigate(); // Optional if redirect needed after login

  const submitHandler = (e) => {
    e.preventDefault();

    // Basic example: simulate login
    setCaptainLoginData({ email, password });
    // console.log(captainLoginData);

    // Clear input fields
    setEmail(" ");
    setPassword(" ");

    // Optionally navigate to user dashboard
    // navigate("/user-dashboard");
  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-md">
        <img className="w-16 mb-10" src={uberDriverLogo} alt="Uber Driver Logo" />

        <form onSubmit={(e) => submitHandler(e)} className="w-full">
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="border border-gray-300 p-2 rounded mb-7 bg-[#eeeeee] w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="border border-gray-300 p-2 rounded mb-7 bg-[#eeeeee] w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            className="p-2 rounded font-semibold mb-3 bg-black w-full text-lg text-white"
            type="submit"
          >
            Login
          </button>

          <p className="text-center">
            joint a fleet?
            <Link className="text-blue-500" to="/captain-signup">
              Register as Captain
            </Link>
          </p>
        </form>
      </div>

      <div className="w-full max-w-md mt-10">
        <Link
          className="p-2 rounded font-semibold mb-3 bg-orange-400 w-full text-lg text-white flex justify-center items-center"
          to="/user-login"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;