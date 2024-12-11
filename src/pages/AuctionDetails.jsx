import React, { useState, useEffect } from "react";
import { fetchAuctionById } from "../services/auctionService";

const AuctionDetails = ({ auctionId }) => {
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    const loadAuction = async () => {
      try {
        const data = await fetchAuctionById(auctionId);
        setAuction(data);
      } catch (error) {
        console.error("Error loading auction details", error);
      }
    };

    loadAuction();
  }, [auctionId]);

  if (!auction) return <p>Loading...</p>;

  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.description}</p>
      <p>Starting Price: ${auction.startingPrice}</p>
      <p>Start Time: {new Date(auction.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
    </div>
  );
};

export default AuctionDetails;
