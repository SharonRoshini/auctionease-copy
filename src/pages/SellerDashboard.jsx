import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockSellerAuctions = [
  { id: 1, title: "Antique Vase", startingPrice: 100 },
  { id: 2, title: "Vintage Car", startingPrice: 20000 },
];

const SellerDashboard = () => {
  const [auctions, setAuctions] = useState(mockSellerAuctions);
  const navigate = useNavigate();

  const deleteAuction = (id) => {
    const updatedAuctions = auctions.filter((auction) => auction.id !== id);
    setAuctions(updatedAuctions);
    alert(`Auction with ID ${id} deleted.`);
  };

  return (
    <div>
      <h1>Manage Auctions</h1>
      <button onClick={() => navigate("/add-auction")}>Add Auction</button>
      <div className="auction-list">
        {auctions.map((auction) => (
          <div key={auction.id} className="auction-card">
            <h3>{auction.title}</h3>
            <p>Starting Price: ${auction.startingPrice}</p>
            <button onClick={() => navigate(`/update-auction/${auction.id}`)}>Update</button>
            <button onClick={() => deleteAuction(auction.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
