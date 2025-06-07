import React, { useState, useContext } from "react";
import uberDriverLogo from "../images/uber-driver.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContex";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext); // Corrected context usage
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captain = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain);

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain); // Correct setter
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }

      // Clear input fields
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-md">
        <img className="w-16 mb-10" src={uberDriverLogo} alt="Uber Driver Logo" />

        <form onSubmit={submitHandler} className="w-full">
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
            Join a fleet?{" "}
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
