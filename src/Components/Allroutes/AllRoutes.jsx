import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Login/Login";    
import RegisterPage from "../Login/Register"; 
import Chats from "../Chats/Chats";


const AllRoutes = ({ user, setUser, nhost, chats, setChats }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<RegisterPage />}
      />
      <Route
        path="/login"
        element={<LoginPage setUser={setUser} nhost={nhost} />}
      />
      <Route
        path="/chats"
        element={
          user ? (
            <Chats user={user} chats={chats} setChats={setChats}  setUser={setUser} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AllRoutes;
