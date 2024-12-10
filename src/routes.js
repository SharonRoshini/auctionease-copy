import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddAuction from "./pages/AddAuction";
import UpdateAuction from "./pages/UpdateAuction";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";

const AppRoutes = ({ loggedIn, setLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/add-auction" element={<AddAuction />} />
      <Route path="/update-auction/:id" element={<UpdateAuction />} />
      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
