import React, { useState } from 'react';
import { FiCheck } from "react-icons/fi";
import img from "../../assets/img.png";
import { NhostClient } from '@nhost/nhost-js';
import { useNavigate } from 'react-router-dom';

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});


const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error, session } = await nhost.auth.signUp({
      email,
      password,
      options: { displayName: username }
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Account created successfully!');
      navigate('/login'); 
    }
  };

  const handleLogin = () => navigate("/login");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center md:items-start md:ml-20 p-6 md:p-0 md:w-1/2">
        <h1 className="text-2xl md:text-4xl font-bold text-black mb-2 md:mt-10">
          Welcome to NoSpace Community
        </h1>
        <p className="mb-6 md:mb-10 text-gray-700">Please enter your credentials</p>

        <form className="flex flex-col gap-4 w-full md:w-80" onSubmit={handleRegister}>
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
            <span className="text-gray-500 mb-1">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="text-sm text-gray-500 mt-2">
            <p>- Use 8 or more characters</p>
            <p>- One uppercase character</p>
            <p>- One lowercase character</p>
            <p>- One number</p>
            <p>- One special character</p>
          </div>

          <div className="flex items-center mt-4 gap-3">
            <button
              type="button"
              onClick={() => setIsChecked(!isChecked)}
              className={`w-5 h-5 flex items-center justify-center border-2 rounded transition-all
                ${isChecked ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-400"}`}
            >
              {isChecked && <FiCheck size={16} />}
            </button>
            <p className="text-sm">I want to receive emails about product updates, events, and promotions</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mt-6 w-full">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-1/2 h-12 rounded-md transition">
              Create An Account
            </button>
            <button type="button" onClick={handleLogin} className="bg-gray-400 hover:bg-gray-500 text-white w-full md:w-1/2 h-12 rounded-md transition">
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 h-64 md:h-screen flex items-center justify-center">
        <img src={img} alt="Illustration" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
