import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { fetchAuctionById } from '../services/api';

const BidPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successBid, setSuccessBid] = useState(null);

  useEffect(() => {
    const loadAuctionData = async () => {
      try {
        setLoading(true);
        const auctionData = await fetchAuctionById(id);
        if (auctionData) {
          setAuction(auctionData);
        } else {
          setError('Auction not found');
        }
      } catch (err) {
        setError('Failed to load auction details');
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

    if (parseFloat(bidAmount) <= auction.startingPrice) {
      toast.error(`Bid must be higher than ${auction.startingPrice}`);
      return;
    }

    // Set success bid data and show modal
    setSuccessBid({
      amount: bidAmount,
      auctionTitle: auction.title
    });
    setShowModal(true);
    toast.success('Bid placed successfully!');
    setBidAmount('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/buyer-dashboard');
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
    <>
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Place a Bid</h2>
            <div className="auction-details mb-4">
              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
              <p className="text-muted">Starting Price: ${auction.startingPrice}</p>
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
                  min={auction.startingPrice + 0.01}
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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bid Placed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successBid && (
            <div>
              <p>Your bid of ${successBid.amount} has been placed successfully for:</p>
              <h5>{successBid.auctionTitle}</h5>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Return to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BidPage;