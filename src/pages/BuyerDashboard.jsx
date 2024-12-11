import React, { useState, useEffect } from "react";
import { fetchAuctions, fetchAuctionByTitle } from "../services/auctionService";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters"; 

const BuyerDashboard = ({ userId }) => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();

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

  const handleFilterSearch = async ({ title }) => {
    try {
      const data = await fetchAuctionByTitle(title);
      setAuctions(data ? [data] : []);
    } catch (error) {
      console.error("Error searching auctions:", error);
    }
  };

  const handleTileClick = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="buyer-dashboard">
      <h1>Buyer Dashboard</h1>
      <Filters onApplyFilters={handleFilterSearch} />
      <div className="auction-cards">
        {auctions.map((auction) => (
          <div
            key={auction.auctionId}
            className="auction-card"
            onClick={() => handleTileClick(auction.auctionId)}
          >
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
