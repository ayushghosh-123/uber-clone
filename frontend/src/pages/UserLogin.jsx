import React, { useState, useContext } from "react";
import uberLogo from "../images/uber.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/Usercontex";
import axios from "axios";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Optional if redirect needed after login

  const { user, setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic example: simulate login
    const loginData = { email: email, password: password };
try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        loginData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home'); // Optional
      }
         // Clear form
        setEmail("");
        setPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="p-7 flex flex-col justify-between items-center h-screen bg-[#f5f5f5]">
      <div className="w-full max-w-md">
        <img className="w-16 mb-10" src={uberLogo} alt="Uber Logo" />

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
            New here?{" "}
            <Link className="text-blue-500" to="/user-register">
              Create new account
            </Link>
          </p>
        </form>
      </div>

      <div className="w-full max-w-md mt-10">
        <Link
          className="p-2 rounded font-semibold mb-3 bg-red-400 w-full text-lg text-white flex justify-center items-center"
          to="/captain-login"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
