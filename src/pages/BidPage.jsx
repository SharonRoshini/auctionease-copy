import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { placeBid } from "../services/auctionService";

const BidPage = () => {
  const { id } = useParams();
  const [bidAmount, setBidAmount] = useState("");

  const handleBid = async () => {
    try {
      await placeBid(id, bidAmount);
      alert("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div>
      <h1>Place Your Bid</h1>
      <input
        type="number"
        placeholder="Enter your bid"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
};

export default BidPage;

