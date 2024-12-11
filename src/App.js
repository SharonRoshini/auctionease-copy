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
import "./styles/style.css";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate(userData.role === "BUYER" ? "/buyer-dashboard" : "/seller-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="app">
      <NavbarComponent user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={!user ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/buyer-dashboard"
            element={user?.role === "BUYER" ? <BuyerDashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/seller-dashboard"
            element={user?.role === "SELLER" ? <SellerDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-auction"
            element={user?.role === "SELLER" ? <AddAuction /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-auction/:id"
            element={user?.role === "SELLER" ? <UpdateAuction /> : <Navigate to="/login" />}
          />
          <Route path="/bid/:id" element={user?.role === "BUYER" ? <BidPage user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
