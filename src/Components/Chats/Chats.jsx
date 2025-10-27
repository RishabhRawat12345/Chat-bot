import React from 'react';
import { FaRobot, FaComments, FaUser } from 'react-icons/fa';
import ChatsSections from '../../Components/Chats/chats.jsx';

const Chats = () => {
  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-48 flex flex-col p-6  ">
        <div className="flex items-center mb-10">
          <FaRobot size={30} color="#22c55e" className="mr-3" />
          <h1 className="font-bold text-2xl">Chat Bot</h1>
        </div>

        <nav className="flex flex-col gap-6">
          <div className="cursor-pointer hover:text-black hover:bg-white font-semibold text-lg flex items-center gap-3 h-10 pl-5 w-60 rounded">
            <FaComments color="#22c55e" />
            Chats
          </div>
          <div className="cursor-pointer hover:text-black hover:bg-white font-semibold text-lg flex items-center gap-3 h-10 pl-5 w-60 rounded">
            <FaUser />
            Profile
          </div>
        </nav>
      </div>
      <div className="flex-1 p-8 mb-">
       <ChatsSections/>
      </div>
    </div>
  );
};

export default Chats;
