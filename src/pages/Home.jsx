import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to AuctionEase</h1>
      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button> {/* Redirects to /login */}
        <button onClick={() => navigate("/signup")}>Signup</button> {/* Redirects to /signup */}
      </div>
    </div>
  );
};

export default Home;
