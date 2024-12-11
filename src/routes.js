// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import AddAuction from "./pages/AddAuction";
// import UpdateAuction from "./pages/UpdateAuction";
// import BuyerDashboard from "./pages/BuyerDashboard";
// import SellerDashboard from "./pages/SellerDashboard";

// const AppRoutes = ({ loggedIn, setLoggedIn }) => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home loggedIn={loggedIn} />} />
//       <Route path="/add-auction" element={<AddAuction />} />
//       <Route path="/update-auction/:id" element={<UpdateAuction />} />
//       <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
//       <Route path="/seller-dashboard" element={<SellerDashboard />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddAuction from "./pages/AddAuction";
import UpdateAuction from "./pages/UpdateAuction";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ETLDashboard from "./pages/ETLDashboard";
const AppRoutes = ({ loggedIn, setLoggedIn }) => {
  return (
    <Routes>
      <Route path="/" element={<Home loggedIn={loggedIn} />} />
      <Route path="/update-auction/:id" element={<UpdateAuction />} />
      <Route
      path="/buyer-dashboard"
      element={<BuyerDashboard/>}
    />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/etl" element={<ETLDashboard />} />
      <Route path="/add-auction" element={<AddAuction />} />
      <Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;