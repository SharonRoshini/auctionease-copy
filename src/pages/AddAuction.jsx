// import React, { useState } from "react";
// import { createAuction } from "../services/auctionService";

// const AddAuction = () => {
//   const [auction, setAuction] = useState({
//     title: "",
//     description: "",
//     startingPrice: 0,
//     startTime: "",
//     endTime: "",
//   });

//   const [message, setMessage] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAuction({ ...auction, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createAuction(auction);
//       setMessage("Auction created successfully!");
//     } catch (error) {
//       setMessage("Error creating auction.");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Auction</h1>
//       <form onSubmit={handleSubmit}>
//         <input name="title" placeholder="Title" onChange={handleInputChange} required />
//         <input name="description" placeholder="Description" onChange={handleInputChange} required />
//         <input name="startingPrice" type="number" placeholder="Starting Price" onChange={handleInputChange} required />
//         <input name="startTime" type="datetime-local" onChange={handleInputChange} required />
//         <input name="endTime" type="datetime-local" onChange={handleInputChange} required />
//         <button type="submit">Create Auction</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AddAuction;