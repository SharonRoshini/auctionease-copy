import React, { useState } from "react";
import { addAuction } from "../services/auctionService";

const AddAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAuction(formData);
      alert("Auction added successfully!");
    } catch (error) {
      console.error("Error adding auction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Auction</h1>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input name="startingPrice" type="number" placeholder="Starting Price" onChange={handleChange} required />
      <input name="endDate" type="datetime-local" onChange={handleChange} required />
      <button type="submit">Create Auction</button>
    </form>
  );
};

export default AddAuction;
