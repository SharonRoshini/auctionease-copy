import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAuctionDetails } from "../services/auctionService";

const AuctionDetails = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAuctionDetails(id);
      setAuction(data);
    };

    fetchData();
  }, [id]);

  if (!auction) return <p>Loading...</p>;

  return (
    <div>
      <h1>{auction.title}</h1>
      <p>{auction.description}</p>
      <p>Starting Price: ${auction.startingPrice}</p>
      <p>End Date: {new Date(auction.endDate).toLocaleString()}</p>
    </div>
  );
};

export default AuctionDetails;

