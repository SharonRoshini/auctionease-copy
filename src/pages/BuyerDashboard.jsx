import React from "react";
import { useNavigate } from "react-router-dom";

const mockAuctions = [
  { id: 1, title: "Antique Vase", startingPrice: 100 },
  { id: 2, title: "Vintage Car", startingPrice: 20000 },
  { id: 3, title: "Painting by Monet", startingPrice: 5000 },
];

const BuyerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Available Auctions</h1>
      <div className="auction-list">
        {mockAuctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <h3>{auction.title}</h3>
            <p>Starting Price: ${auction.startingPrice}</p>
            <button onClick={() => navigate(`/bid/${auction.id}`)}>Place Bid</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
