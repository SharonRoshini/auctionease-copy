import React, { useState, useEffect } from "react";
import {
  fetchAuctions,
  fetchBidsByAuction,
  addBid,
  deleteBid,
  updateBid,
} from "../services/auctionService";
import Modal from "react-modal";

Modal.setAppElement("#root");

const BuyerDashboard = ({ user }) => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [modalType, setModalType] = useState(null); // "add", "edit", "delete"
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch auctions on component mount
  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data || []);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    loadAuctions();
  }, []);

  // Fetch bids for the selected auction
  const handleAuctionClick = async (auctionId) => {
    setSelectedAuction(auctionId);
    try {
      const data = await fetchBidsByAuction(auctionId);
      setBids(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bids:", error);
      setBids([]);
    }
  };

  // Add bid
  const handleAddBid = async () => {
    if (!bidAmount || bidAmount <= 0) {
      setMessage("Please enter a valid bid amount.");
      return;
    }
    try {
      await addBid({
        auctionId: selectedAuction,
        bidderId: user.id,
        bidAmount: parseFloat(bidAmount),
      });
      setMessage("Bid added successfully!");
      refreshBids();
      setModalType(null);
    } catch (error) {
      console.error("Error adding bid:", error);
      setMessage("Failed to add bid.");
    }
  };

  // Edit bid
  const handleEditBid = async () => {
    if (!currentBid || bidAmount <= 0) {
      setMessage("Please enter a valid bid amount.");
      return;
    }
    try {
      await updateBid(currentBid.id, { bidAmount: parseFloat(bidAmount) });
      setMessage("Bid updated successfully!");
      refreshBids();
      setModalType(null);
    } catch (error) {
      console.error("Error updating bid:", error);
      setMessage("Failed to update bid.");
    }
  };

  // Delete bid
  const handleDeleteBid = async () => {
    try {
      await deleteBid(currentBid.id);
      setMessage("Bid deleted successfully!");
      refreshBids();
      setModalType(null);
    } catch (error) {
      console.error("Error deleting bid:", error);
      setMessage("Failed to delete bid.");
    }
  };

  // Refresh bids
  const refreshBids = async () => {
    try {
      const data = await fetchBidsByAuction(selectedAuction);
      setBids(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error refreshing bids:", error);
    }
  };

  return (
    <div className="buyer-dashboard">
      <h1>Buyer Dashboard</h1>
      <div className="auction-cards">
        {auctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <button onClick={() => handleAuctionClick(auction.id)}>View Bids</button>
            <button
              onClick={() => {
                setSelectedAuction(auction.id);
                setModalType("add");
              }}
            >
              Add Bid
            </button>
          </div>
        ))}
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <Modal isOpen={true} onRequestClose={() => setModalType(null)}>
          <h2>Add a New Bid</h2>
          <input
            type="number"
            placeholder="Enter Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button onClick={handleAddBid}>Submit Bid</button>
          <button onClick={() => setModalType(null)}>Cancel</button>
          {message && <p>{message}</p>}
        </Modal>
      )}

      {modalType === "edit" && currentBid && (
        <Modal isOpen={true} onRequestClose={() => setModalType(null)}>
          <h2>Edit Bid</h2>
          <input
            type="number"
            placeholder="Enter New Bid Amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button onClick={handleEditBid}>Update Bid</button>
          <button onClick={() => setModalType(null)}>Cancel</button>
          {message && <p>{message}</p>}
        </Modal>
      )}

      {modalType === "delete" && currentBid && (
        <Modal isOpen={true} onRequestClose={() => setModalType(null)}>
          <h2>Delete Bid</h2>
          <p>Are you sure you want to delete this bid?</p>
          <button onClick={handleDeleteBid}>Yes, Delete</button>
          <button onClick={() => setModalType(null)}>Cancel</button>
          {message && <p>{message}</p>}
        </Modal>
      )}

      {/* Bids List */}
      {bids.length > 0 && (
        <div className="bids-list">
          <h2>Bids for Selected Auction</h2>
          <ul>
            {bids.map((bid) => (
              <li key={bid.id}>
                <p>Bid Amount: ${bid.bidAmount}</p>
                <button
                  onClick={() => {
                    setCurrentBid(bid);
                    setBidAmount(bid.bidAmount);
                    setModalType("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setCurrentBid(bid);
                    setModalType("delete");
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
