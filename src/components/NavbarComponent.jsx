import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ user, onLogout }) => {
  // const navigate = useNavigate();


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Login</Link>
      </div>
      <div className="navbar-links">
            <Link to="/login">AuctionEase</Link>
            <Link to="/signup">Signup</Link>
    
      </div>
    </nav>
  );
};

export default NavbarComponent;