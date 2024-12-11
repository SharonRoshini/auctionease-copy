import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the auctionId from the URL
import { fetchAuctionById, fetchHighestBid, addBid, deleteBid } from "../services/auctionService";

const AuctionDetails = ({ userId }) => {
  const { auctionId } = useParams(); // Get auctionId from the route
  const [auction, setAuction] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [userBid, setUserBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const auctionData = await fetchAuctionById(auctionId);
        setAuction(auctionData);

        const highestBidData = await fetchHighestBid(auctionId);
        setHighestBid(highestBidData);

        if (highestBidData?.bidderId === userId) {
          setUserBid(highestBidData); // Set user bid if it matches the logged-in user
        } else {
          setUserBid(null);
        }

        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching auction details:", err);
        setError("Failed to load auction details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [auctionId, userId]);

  const handleAddBid = async (bidAmount) => {
    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      await addBid({
        auctionId: auction.auctionId,
        bidderId: userId,
        bidAmount: parseFloat(bidAmount),
      });
      alert("Bid added successfully!");
      window.location.reload(); 
    } catch (err) {
      console.error("Error adding bid:", err);
      alert("Failed to add the bid.");
    }
  };

  const handleDeleteBid = async () => {
    try {
      await deleteBid(userBid.id);
      setUserBid(null);
      alert("Bid deleted successfully.");
      window.location.reload(); // Refresh to update the details
    } catch (err) {
      console.error("Error deleting bid:", err);
      alert("Failed to delete the bid.");
    }
  };

  if (loading) return <p>Loading auction details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.description}</p>
      <p>Starting Price: ${auction.startingPrice}</p>
      {highestBid && <p>Highest Bid: ${highestBid.bidAmount}</p>}

      {userBid ? (
        <>
          <p>Your Current Bid: ${userBid.bidAmount}</p>
          <button onClick={() => handleAddBid(prompt("Enter your new bid amount:"))}>Update Bid</button>
          <button onClick={handleDeleteBid}>Delete Bid</button>
        </>
      ) : (
        <button onClick={() => handleAddBid(prompt("Enter your bid amount:"))}>Add Bid</button>
      )}
    </div>
  );
};

export default AuctionDetails;
