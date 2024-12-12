import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAuctionById, fetchHighestBid, addBid } from "../services/auctionService";

const AuctionDetails = ({ user }) => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [newBidAmount, setNewBidAmount] = useState("");

  // Load auction and highest bid details
  useEffect(() => {
    const loadAuctionDetails = async () => {
      try {
        const auctionData = await fetchAuctionById(auctionId);
        setAuction(auctionData);

        const highestBidData = await fetchHighestBid(auctionId);
        setHighestBid(highestBidData || null);
      } catch (error) {
        console.error("Error loading auction details:", error);
      }
    };

    loadAuctionDetails();
  }, [auctionId]);

  // Handle adding a new bid
  const handleAddBid = async () => {
    if (!newBidAmount || parseFloat(newBidAmount) <= (highestBid?.bidAmount || auction.startingPrice)) {
      alert("Enter a valid bid amount greater than the highest bid or starting price.");
      return;
    }

    try {
      const payload = {
        auctionId: parseInt(auctionId),
        bidderId: user.auctionUserId, // Pass logged-in user's ID
        bidAmount: parseFloat(newBidAmount),
      };

      await addBid(payload);
      alert("Bid added successfully!");
      setNewBidAmount(""); // Reset input field

      // Reload highest bid
      const updatedHighestBid = await fetchHighestBid(auctionId);
      setHighestBid(updatedHighestBid);
    } catch (error) {
      console.error("Error adding bid:", error);
      alert("Failed to add bid.");
    }
  };

  if (!auction) return <p>Loading auction details...</p>;

  return (
    <div className="auction-details-page">
      <div className="auction-details-container">
        <h1 className="auction-title">{auction.title}</h1>
        <p className="auction-description">{auction.description}</p>
        <p>
          <strong>Starting Price:</strong> ${auction.startingPrice}
        </p>
        <p>
          <strong>Status:</strong> {auction.status ? "Active" : "Closed"}
        </p>
        {highestBid && (
          <p>
            <strong>Highest Bid:</strong> ${highestBid.bidAmount}
          </p>
        )}

        {auction.status && (
          <div className="bid-section">
            <h3>Place Your Bid</h3>
            <input
              type="number"
              className="bid-input"
              placeholder="Enter your bid amount"
              value={newBidAmount}
              onChange={(e) => setNewBidAmount(e.target.value)}
            />
            <button className="bid-button" onClick={handleAddBid}>
              Add Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionDetails;
