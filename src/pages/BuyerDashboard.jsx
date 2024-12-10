import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuctions } from "../services/api";
import { toast } from "react-toastify";

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTitle, setSearchTitle] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        setFilteredAuctions(data);
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

  useEffect(() => {
    // Filter auctions based on search criteria
    const filtered = auctions.filter(auction => {
      const titleMatch = auction.title.toLowerCase().includes(searchTitle.toLowerCase());
      const idMatch = searchId === "" || auction.auctionId.toString() === searchId;
      return titleMatch && idMatch;
    });
    setFilteredAuctions(filtered);
  }, [searchTitle, searchId, auctions]);

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
      
      {/* Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">Filter Auctions</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Search by Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter auction title..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Search by Auction ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter auction ID..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {filteredAuctions.length === 0 ? (
        <div className="alert alert-info">
          No auctions found matching your criteria.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredAuctions.map((auction) => (
            <div key={auction.auctionId} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">{auction.description}</p>
                  <div className="auction-info">
                    <p className="mb-2">
                      <strong>ID:</strong> {auction.auctionId}
                    </p>
                    <p className="mb-2">
                      <strong>Starting Price:</strong> ${auction.startingPrice}
                    </p>
                    <p className="mb-2">
                      <strong>Status:</strong>{" "}
                      <span className={`badge ${auction.status ? "bg-success" : "bg-danger"}`}>
                        {auction.status ? "Active" : "Closed"}
                      </span>
                    </p>
                  </div>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/bid/${auction.auctionId}`)}
                    disabled={!auction.status}
                  >
                    {auction.status ? "Place Bid" : "Auction Closed"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;