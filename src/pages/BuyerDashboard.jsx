import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuctions } from "../services/auctionService";

const BuyerDashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [searchTitle, setSearchTitle] = useState(""); // Real-time filter state
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Load auctions on component mount
  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
        setFilteredAuctions(data); // Initialize filtered auctions
        setError(null);
      } catch (err) {
        console.error("Error fetching auctions:", err);
        setError("Failed to load auctions.");
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, []);

  // Apply filters in real-time when search inputs change
  useEffect(() => {
    const filtered = auctions.filter((auction) => {
      const titleMatch = auction.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const idMatch =
        searchId === "" || auction.auctionId.toString() === searchId;

      return titleMatch && idMatch;
    });

    setFilteredAuctions(filtered);
  }, [searchTitle, searchId, auctions]);

  if (loading) return <p>Loading auctions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Buyer Dashboard</h1>

      {/* Filters Section */}
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

      {/* Auctions List Section */}
      {filteredAuctions.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredAuctions.map((auction) => (
            <div key={auction.auctionId} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{auction.title}</h5>
                  <p className="card-text">{auction.description}</p>
                  <div className="auction-info">
                    <p>
                      <strong>ID:</strong> {auction.auctionId}
                    </p>
                    <p>
                      <strong>Starting Price:</strong> $
                      {auction.startingPrice}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          auction.status ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {auction.status ? "Active" : "Closed"}
                      </span>
                    </p>
                  </div>
                  <button className="btn btn-primary w-100"
                  onClick={() => navigate(`/auction/${auction.auctionId}`)}>
                  View Details </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">
          No auctions match your search criteria.
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
