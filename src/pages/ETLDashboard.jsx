import React, { useState } from "react";
import api from "../services/api";

const ETLDashboard = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to trigger the ETL pipeline
  const runETLPipeline = async () => {
    setLoading(true); // Show a loading indicator
    try {
      const response = await api.get("/AuctionEase/auctions/etl");

      if (response.data && Array.isArray(response.data)) {
        setBids(response.data); // Update state with the new bids
      } else {
        alert("No data returned from ETL pipeline.");
      }
    } catch (error) {
      console.error("Error running ETL pipeline:", error);
      alert("Failed to run ETL pipeline. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">ETL Pipeline Dashboard</h1>
      <div className="text-center">
        <button className="btn btn-primary" onClick={runETLPipeline} disabled={loading}>
          {loading ? "Running ETL Pipeline..." : "Run ETL Pipeline"}
        </button>
      </div>

      {/* Table to display bid data */}
      {bids.length > 0 && (
        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Bid ID</th>
                <th>Bid Amount</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid.bidId}>
                  <td>{bid.bidId}</td>
                  <td>${bid.bidAmount.toFixed(2)}</td>
                  <td>{bid.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message when no data is available */}
      {bids.length === 0 && !loading && (
        <p className="text-center mt-4">No data available. Click "Run ETL Pipeline" to fetch data.</p>
      )}
    </div>
  );
};

export default ETLDashboard;
