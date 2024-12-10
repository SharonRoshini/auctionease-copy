import React from "react";
import { Link, useNavigate } from "react-router-dom";
import aucLogo from "../assets/auc.webp";

const NavbarComponent = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={aucLogo} alt="AuctionEase" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Auctions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-auction">
                Add Auction
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={() => navigate("/login")}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
