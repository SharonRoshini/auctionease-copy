import React, { useState, useEffect } from "react";
import { fetchBidsByAuction, addBid } from "../services/auctionService";

const BidPage = ({ auctionId }) => {
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadBids = async () => {
      try {
        const data = await fetchBidsByAuction(auctionId);
        setBids(data);
      } catch (error) {
        console.error("Error fetching bids", error);
      }
    };

    loadBids();
  }, [auctionId]);

  const handleBid = async () => {
    try {
      await addBid({ auctionId, bidAmount });
      setMessage("Bid placed successfully!");
    } catch (error) {
      setMessage("Error placing bid.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Bids for Auction {auctionId}</h1>
      <ul>
        {bids.map((bid) => (
          <li key={bid.id}>${bid.bidAmount} by User {bid.bidderId}</li>
        ))}
      </ul>
      <input type="number" onChange={(e) => setBidAmount(Number(e.target.value))} placeholder="Enter your bid" />
      <button onClick={handleBid}>Place Bid</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BidPage;
