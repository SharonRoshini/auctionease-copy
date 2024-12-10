import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ loggedIn }) => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === "buyer") {
      navigate("/buyer-dashboard");
    } else if (role === "seller") {
      navigate("/seller-dashboard");
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to AuctionEase</h1>
      {/* Show Login/Signup buttons if the user is not logged in */}
      {!loggedIn ? (
        <div className="auth-section">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </div>
      ) : (
        /* Show role selection buttons if the user is logged in */
        <div className="role-selection">
          <h2>Select Your Role</h2>
          <button onClick={() => handleRoleSelection("buyer")}>I'm a Buyer</button>
          <button onClick={() => handleRoleSelection("seller")}>I'm a Seller</button>
        </div>
      )}
    </div>
  );
};

export default Home;
