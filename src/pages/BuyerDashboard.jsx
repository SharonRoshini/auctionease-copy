import React, { useState, useEffect } from "react";
import {
  fetchAuctions,
  fetchBidsByAuction,
  addBid,
  deleteBid,
} from "../services/auctionService";

const BuyerDashboard = ({ userId }) => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState({ bidAmount: 0 });
  const [message, setMessage] = useState("");

  // Fetch all auctions
  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    loadAuctions();
  }, []);

  // Fetch bids for the selected auction
  const handleTileClick = async (auctionId) => {
    setSelectedAuction(auctionId);
    try {
      const data = await fetchBidsByAuction(auctionId);
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids for auction:", error);
      setBids([]);
    }
  };

  // Handle adding a new bid
  const handleAddBid = async () => {
    if (!newBid.bidAmount || !selectedAuction) {
      setMessage("Please provide a valid bid amount.");
      return;
    }
    try {
      await addBid({
        auctionId: selectedAuction,
        bidderId: userId,
        bidAmount: parseFloat(newBid.bidAmount),
      });
      setMessage("Bid added successfully!");
      setNewBid({ bidAmount: 0 });
      handleTileClick(selectedAuction); // Refresh bids
    } catch (error) {
      console.error("Error adding bid:", error);
      setMessage("Failed to add the bid.");
    }
  };

  // Handle deleting a bid
  const handleDeleteBid = async (bidId) => {
    try {
      await deleteBid(bidId);
      setMessage("Bid deleted successfully!");
      handleTileClick(selectedAuction); // Refresh bids
    } catch (error) {
      console.error("Error deleting bid:", error);
      setMessage("Failed to delete the bid.");
    }
  };

  return (
    <div className="buyer-dashboard">
      <h1>Buyer Dashboard</h1>
      <div className="auction-cards">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="auction-card"
            onClick={() => handleTileClick(auction.id)} // Make tile clickable
          >
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p>Starting Price: ${auction.startingPrice}</p>
          </div>
        ))}
      </div>

      {selectedAuction && (
        <div className="bid-actions">
          <h2>Manage Bids for Auction {selectedAuction}</h2>

          {/* Add Bid */}
          <div className="add-bid-section">
            <h3>Add a Bid</h3>
            <input
              type="number"
              name="bidAmount"
              placeholder="Bid Amount"
              value={newBid.bidAmount}
              onChange={(e) => setNewBid({ bidAmount: e.target.value })}
            />
            <button onClick={handleAddBid}>Add Bid</button>
          </div>

          {/* Existing Bids */}
          {bids.length > 0 ? (
            <div className="existing-bids">
              <h3>Your Existing Bids</h3>
              <ul>
                {bids
                  .filter((bid) => bid.bidderId === userId) // Filter bids by current user
                  .map((bid) => (
                    <li key={bid.id}>
                      <p>Bid Amount: ${bid.bidAmount}</p>
                      <button onClick={() => handleDeleteBid(bid.id)}>Delete Bid</button>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <p>No bids placed yet.</p>
          )}
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BuyerDashboard;
