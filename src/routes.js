// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import BuyerDashboard from "./pages/BuyerDashboard";
// import SellerDashboard from "./pages/SellerDashboard";
// import AddAuction from "./pages/AddAuction";
// import UpdateAuction from "./pages/UpdateAuction";
// import AuctionDetails from "./pages/AuctionDetails";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ETLDashboard from "./pages/ETLDashboard";

// const AppRoutes = ({ user, setUser }) => (
//   <Routes>
//     <Route path="/" element={<Home user={user} />} />
//     <Route
//       path="/buyer-dashboard"
//       element={user?.role === "BUYER" ? <BuyerDashboard userId={user.id} /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/seller-dashboard"
//       element={user?.role === "SELLER" ? <SellerDashboard userId={user.id} /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/add-auction"
//       element={user?.role === "SELLER" ? <AddAuction /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/update-auction/:id"
//       element={user?.role === "SELLER" ? <UpdateAuction /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/auction/:auctionId"
//       element={user?.role === "BUYER" ? <AuctionDetails user={user} /> :<Navigate to="/login" />}
//     />
//     <Route
//     path="/etl" element={<ETLDashboard/>}
//     />
//     <Route
//       path="/login"
//       element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
//     />
//     <Route path="/signup" element={<Signup />} />
//     <Route path="*" element={<Navigate to="/" />} />
//   </Routes>
// );

// export default AppRoutes;
