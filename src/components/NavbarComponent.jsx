import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AuctionEase</Link>
      </div>
      <div className="navbar-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
    
      </div>
    </nav>
  );
};

export default NavbarComponent;