import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchAuctions } from "../services/api";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching auctions:", err);
        setError("Failed to load auctions");
        toast.error("Error loading auctions");
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Available Auctions</h1>
      {auctions.length === 0 ? (
        <div className="alert alert-info">
          No auctions are currently available.
        </div>
      ) : (
        <div className="auction-list">
          {auctions.map((auction) => (
            <div key={auction.auctionId} className="auction-card">
              <h3>{auction.title}</h3>
              <p className="description">{auction.description}</p>
              <div className="auction-info">
                <p>Starting Price: ${auction.startingPrice}</p>
                <p>Status: {auction.status ? "Active" : "Closed"}</p>
                <p>Start Time: {new Date(auction.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => navigate(`/bid/${auction.auctionId}`)}
                disabled={!auction.status}
              >
                {auction.status ? "Place Bid" : "Auction Closed"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;