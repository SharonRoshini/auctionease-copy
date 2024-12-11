import React, { useState, useEffect } from "react";
import { fetchAuctions } from "../services/auctionService";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        const data = await fetchAuctions();
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions", error);
      }
    };

    loadAuctions();
  }, []);

  return (
    <div>
      <h1>Auction List</h1>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>{auction.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;