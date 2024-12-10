import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAuctionById, fetchHighestBid, addBid } from '../services/api';

const BidPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [auction, setAuction] = useState(null);
  const [highestBid, setHighestBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuctionData = async () => {
      try {
        setLoading(true);
        const auctionData = await fetchAuctionById(id);
        setAuction(auctionData);
        
        const highestBidData = await fetchHighestBid(id);
        setHighestBid(highestBidData);
        
        setError(null);
      } catch (err) {
        setError('Failed to load auction details. Please try again later.');
        toast.error('Error loading auction details');
      } finally {
        setLoading(false);
      }
    };

    loadAuctionData();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount)) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    try {
      const bidData = {
        auctionId: parseInt(id),
        bidderId: 1, // Replace with actual user ID from authentication
        bidAmount: parseFloat(bidAmount)
      };

      await addBid(bidData);
      toast.success('Bid placed successfully!');
      setBidAmount('');
      // Refresh highest bid
      const newHighestBid = await fetchHighestBid(id);
      setHighestBid(newHighestBid);
    } catch (err) {
      toast.error('Failed to place bid. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Auction not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Place a Bid</h2>
          <div className="auction-details mb-4">
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <p className="text-muted">Starting Price: ${auction.startingPrice}</p>
            {highestBid && (
              <p className="text-primary fw-bold">
                Current Highest Bid: ${highestBid.bidAmount}
              </p>
            )}
          </div>

          <form onSubmit={handleBid} className="mt-4">
            <div className="form-group">
              <label htmlFor="bidAmount" className="form-label">Your Bid Amount ($)</label>
              <input
                type="number"
                className="form-control"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={highestBid ? highestBid.bidAmount + 1 : auction.startingPrice + 1}
                step="0.01"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary mt-3"
            >
              Place Bid
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BidPage;