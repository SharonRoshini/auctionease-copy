import React from "react";
import { Link } from "react-router-dom";

const NavbarComponent = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AuctionEase</Link>
      </div>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/etl">Add Bid ETL</Link>
        {user && (
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
