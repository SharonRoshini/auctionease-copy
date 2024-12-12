import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AddAuction from "./pages/AddAuction";
import UpdateAuction from "./pages/UpdateAuction";
import BidPage from "./pages/BidPage";
import AuctionDetails from "./pages/AuctionDetails";
import ETLDashboard from "./pages/ETLDashboard";
import './styles/style.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("User logged in successfully:", userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="app">
      <NavbarComponent 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn} 
        onLogout={handleLogout} 
        user={user}
      />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/login" 
            element={!user ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : user.role === "BUYER" ? (
              <Navigate to="/buyer-dashboard" />
            ) : (
              <Navigate to="/seller-dashboard" />
            )}
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/" />}
          />

          {/* Buyer Routes */}
          <Route 
            path="/buyer-dashboard" 
            element={user?.role === "BUYER" ? (
              <BuyerDashboard userId={user.id} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route 
            path="/auction/:auctionId" 
            element={user?.role === "BUYER" ? (
              <AuctionDetails user={user} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route 
            path="/bid/:id" 
            element={user?.role === "BUYER" ? (
              <BidPage user={user} />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Seller Routes */}
          <Route 
            path="/seller-dashboard" 
            element={user?.role === "SELLER" ? (
              <SellerDashboard userId={user.id} />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route 
            path="/add-auction" 
            element={user?.role === "SELLER" ? (
              <AddAuction />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route 
            path="/update-auction/:id" 
            element={user?.role === "SELLER" ? (
              <UpdateAuction />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Admin Routes */}
          <Route 
            path="/etl" 
            element={user?.role === "ADMIN" ? (
              <ETLDashboard />
            ) : (
              <Navigate to="/login" />
            )}
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;