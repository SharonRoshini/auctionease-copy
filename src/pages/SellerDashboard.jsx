import React, { useState, useEffect } from "react";
import { fetchAuctions, deleteAuction } from "../services/auctionService";

const SellerDashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadSellerAuctions = async () => {
      try {
        const data = await fetchAuctions(); // Adjust if seller-specific endpoint exists
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions", error);
      }
    };

    loadSellerAuctions();
  }, []);

  const handleDeleteAuction = async (auctionId) => {
    try {
      await deleteAuction(auctionId);
      setAuctions(auctions.filter((auction) => auction.id !== auctionId));
      setMessage("Auction deleted successfully!");
    } catch (error) {
      setMessage("Error deleting auction.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      {message && <p>{message}</p>}
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <strong>{auction.title}</strong> - {auction.description}
            <button onClick={() => handleDeleteAuction(auction.id)}>
              Delete Auction
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerDashboard;
