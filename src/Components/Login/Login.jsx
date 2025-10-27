import React, { useState } from "react";
import { NhostClient } from "@nhost/nhost-js";
import { useNavigate } from "react-router-dom";
import img from "../../assets/img.png";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});


const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { session, error } = await nhost.auth.signIn({ email, password });
    if (error) {
      alert(error.message);
      return;
    }
    if (session) {
      setUser(session.user);
      alert("Logged in successfully!");
      navigate("/chats");
    }
  };

  const handleRegister = () => navigate("/register");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center md:items-start md:justify-start md:ml-20 p-6 md:p-0 md:w-1/2">
        <h1 className="text-2xl md:text-4xl font-bold text-black mb-2 md:mt-10">
          Welcome Back!
        </h1>
        <p className="mb-6 md:mb-10 text-gray-700">Please login to continue</p>

        <form className="flex flex-col gap-4 w-full md:w-80" onSubmit={handleLogin}>
          <label className="flex flex-col">
            <span className="text-gray-500 mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md h-12 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-500 mb-1">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md h-12 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <div className="flex flex-col md:flex-row gap-3 mt-6 w-full">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-1/2 h-12 rounded-md transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleRegister}
              className="bg-gray-400 hover:bg-gray-500 text-white w-full md:w-1/2 h-12 rounded-md transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 h-64 md:h-screen flex items-center justify-center">
        <img
          src={img}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
