import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        {user && user.role === "BUYER" && <Link to="/buyer-dashboard">Buyer Dashboard</Link>}
        {user && user.role === "SELLER" && <Link to="/seller-dashboard">Seller Dashboard</Link>}
        {user && user.role === "SELLER" && <Link to="/add-auction">Add Auction</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
