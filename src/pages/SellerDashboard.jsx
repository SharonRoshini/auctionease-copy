import React, { useState, useEffect } from "react";
import {
  fetchAuctions,
  createAuction,
  deleteAuction,
  updateAuction,
} from "../services/auctionService";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SellerDashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [newAuction, setNewAuction] = useState({
    title: "",
    description: "",
    startingPrice: 0,
    startTime: "",
    endTime: "",
  });
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Load all auctions on component mount
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

  // Handle Add Auction
  const handleAddAuction = async () => {
    try {
      await createAuction(newAuction);
      setMessage("Auction added successfully!");
      setIsAddModalOpen(false);
      const data = await fetchAuctions();
      setAuctions(data); // Reload auctions
    } catch (error) {
      setMessage("Failed to add auction.");
      console.error("Error adding auction:", error);
    }
  };

  // Handle Delete Auction
  const handleDeleteAuction = async (auctionId) => {
    try {
      await deleteAuction(auctionId);
      setMessage("Auction deleted successfully!");
      const data = await fetchAuctions();
      setAuctions(data); // Reload auctions
    } catch (error) {
      setMessage("Error deleting auction.");
      console.error("Error deleting auction:", error);
    }
  };

  // Handle Update Auction
  const handleUpdateAuction = async () => {
    try {
      await updateAuction(selectedAuction.id, selectedAuction);
      setMessage("Auction updated successfully!");
      setIsEditModalOpen(false);
      const data = await fetchAuctions();
      setAuctions(data); // Reload auctions
    } catch (error) {
      setMessage("Failed to update auction.");
      console.error("Error updating auction:", error);
    }
  };

  // Open edit modal and populate auction data
  const openEditModal = (auction) => {
    setSelectedAuction({ ...auction });
    setIsEditModalOpen(true);
  };

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      <button onClick={() => setIsAddModalOpen(true)}>Add Auction</button>

      <div className="auction-list">
        {auctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p>
              <strong>Starting Price:</strong> ${auction.startingPrice}
            </p>
            <p>
              <strong>Start Time:</strong> {new Date(auction.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong> {new Date(auction.endTime).toLocaleString()}
            </p>
            <button onClick={() => openEditModal(auction)}>Edit</button>
            <button onClick={() => handleDeleteAuction(auction.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Auction Modal */}
      <Modal isOpen={isAddModalOpen} onRequestClose={() => setIsAddModalOpen(false)}>
        <h2>Add Auction</h2>
        <form>
          <input
            name="title"
            placeholder="Title"
            onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={(e) => setNewAuction({ ...newAuction, description: e.target.value })}
          />
          <input
            name="startingPrice"
            type="number"
            placeholder="Starting Price"
            onChange={(e) => setNewAuction({ ...newAuction, startingPrice: e.target.value })}
          />
          <input
            name="startTime"
            type="datetime-local"
            onChange={(e) => setNewAuction({ ...newAuction, startTime: e.target.value })}
          />
          <input
            name="endTime"
            type="datetime-local"
            onChange={(e) => setNewAuction({ ...newAuction, endTime: e.target.value })}
          />
          <button type="button" onClick={handleAddAuction}>
            Submit
          </button>
        </form>
      </Modal>

      {/* Edit Auction Modal */}
      {selectedAuction && (
        <Modal isOpen={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)}>
          <h2>Edit Auction</h2>
          <form>
            <input
              name="title"
              value={selectedAuction.title}
              placeholder="Title"
              onChange={(e) =>
                setSelectedAuction({ ...selectedAuction, title: e.target.value })
              }
            />
            <textarea
              name="description"
              value={selectedAuction.description}
              placeholder="Description"
              onChange={(e) =>
                setSelectedAuction({ ...selectedAuction, description: e.target.value })
              }
            />
            <input
              name="startingPrice"
              type="number"
              value={selectedAuction.startingPrice}
              placeholder="Starting Price"
              onChange={(e) =>
                setSelectedAuction({ ...selectedAuction, startingPrice: e.target.value })
              }
            />
            <input
              name="startTime"
              type="datetime-local"
              value={new Date(selectedAuction.startTime).toISOString().slice(0, 16)}
              onChange={(e) =>
                setSelectedAuction({ ...selectedAuction, startTime: e.target.value })
              }
            />
            <input
              name="endTime"
              type="datetime-local"
              value={new Date(selectedAuction.endTime).toISOString().slice(0, 16)}
              onChange={(e) =>
                setSelectedAuction({ ...selectedAuction, endTime: e.target.value })
              }
            />
            <button type="button" onClick={handleUpdateAuction}>
              Update
            </button>
          </form>
        </Modal>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default SellerDashboard;
