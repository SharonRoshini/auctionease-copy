import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import './styles/style.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <div className="app">
      <NavbarComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route 
            path="/login" 
            element={<Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />} 
          />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/buyer-dashboard" 
            element={loggedIn ? <BuyerDashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/seller-dashboard" 
            element={loggedIn ? <SellerDashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/add-auction" 
            element={loggedIn ? <AddAuction /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/update-auction/:id" 
            element={loggedIn ? <UpdateAuction /> : <Navigate to="/login" replace />} 
          />
          {/* Add the bid route */}
          <Route 
            path="/bid/:id" 
            element={<BidPage />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;