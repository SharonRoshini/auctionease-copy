import React, { useState, useEffect } from "react";
import { getAuctions } from "../services/auctionService";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAuctions();
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions", error);
      }
    };

    fetchAuctions();
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
