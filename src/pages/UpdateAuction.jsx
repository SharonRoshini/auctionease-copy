import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockAuctions = [
  { id: 1, title: "Antique Vase", startingPrice: 100, description: "A beautiful antique vase from the Ming Dynasty." },
  { id: 2, title: "Vintage Car", startingPrice: 20000, description: "A well-maintained vintage car from 1950." },
];

const UpdateAuction = () => {
  const { id } = useParams(); // Get the auction ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    startingPrice: "",
    description: "",
  });

  useEffect(() => {
    // Simulate fetching the auction data based on the ID
    const auctionToEdit = mockAuctions.find((auction) => auction.id === parseInt(id));
    if (auctionToEdit) {
      setFormData({
        title: auctionToEdit.title,
        startingPrice: auctionToEdit.startingPrice,
        description: auctionToEdit.description,
      });
    } else {
      alert("Auction not found!");
      navigate("/seller-dashboard");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Updated auction ID ${id} with:`, formData);

    // Mock logic to update the auction
    alert(`Auction "${formData.title}" updated successfully!`);
    navigate("/seller-dashboard"); // Redirect back to the seller dashboard
  };

  return (
    <div className="update-auction-container">
      <h1>Update Auction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Starting Price:
          <input
            type="number"
            name="startingPrice"
            value={formData.startingPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>
        <button type="submit">Update Auction</button>
      </form>
    </div>
  );
};

export default UpdateAuction;