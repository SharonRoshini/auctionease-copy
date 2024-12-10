import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AuctionEase</Link>
      </div>
      <div className="navbar-links">
        {loggedIn ? (
          <>
            <Link to="/add-auction">Add Auction</Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
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