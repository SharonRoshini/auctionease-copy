import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAuctionById,
  fetchHighestBid,
  addBid,
} from "../services/auctionService";

const AuctionDetails = ({ userId }) => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [newBidAmount, setNewBidAmount] = useState("");

  useEffect(() => {
    const loadAuctionDetails = async () => {
      try {
        const auctionData = await fetchAuctionById(auctionId);
        setAuction(auctionData);

        const highestBidData = await fetchHighestBid(auctionId);
        setHighestBid(highestBidData || null);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      }
    };

    loadAuctionDetails();
  }, [auctionId]);

  const handleAddBid = async () => {
    const enteredBidAmount = parseFloat(newBidAmount);

    if (!enteredBidAmount || enteredBidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (highestBid && enteredBidAmount <= highestBid.bidAmount) {
      alert("Bid amount must be greater than the current highest bid.");
      return;
    }

    const payload = {
      auctionId: parseInt(auctionId), // Ensure auctionId is parsed correctly
      bidderId: userId,              // Ensure userId is passed from the parent
      bidAmount: enteredBidAmount,   // Validate user input
    };

    console.log("Payload being sent to addBid:", payload);

    try {
      await addBid(payload);

      alert("Bid added successfully!");
      setNewBidAmount("");

      // Reload highest bid details
      const updatedHighestBid = await fetchHighestBid(auctionId);
      setHighestBid(updatedHighestBid);
    } catch (error) {
      console.error("Error adding bid:", error);
      alert("Failed to add the bid. Please try again.");
    }
  };

  if (!auction) return <p>Loading auction details...</p>;

  return (
    <div className="container mt-4">
      <h1>{auction.title}</h1>
      <p>{auction.description}</p>
      <p>
        <strong>Starting Price:</strong> ${auction.startingPrice}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={auction.status ? "text-success" : "text-danger"}>
          {auction.status ? "Active" : "Closed"}
        </span>
      </p>
      {highestBid && (
        <p>
          <strong>Highest Bid:</strong> ${highestBid.bidAmount}{" "}
          {highestBid.bidderId && <span>(User ID: {highestBid.bidderId})</span>}
        </p>
      )}

      {auction.status && (
        <div>
          <h3>Place Your Bid</h3>
          <input
            type="number"
            placeholder="Enter your bid amount"
            value={newBidAmount}
            onChange={(e) => setNewBidAmount(e.target.value)}
            className="form-control mb-2"
          />
          <button
            onClick={handleAddBid}
            className="btn btn-primary"
            disabled={!auction.status}
          >
            Add Bid
          </button>
        </div>
      )}
    </div>
  );
};

export default AuctionDetails;
