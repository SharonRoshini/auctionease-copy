import React, { useState } from "react";
import axios from "axios";

const ETLDashboard = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunETL = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:8080/AuctionEase/auctions/etl");
      setBids(response.data);
    } catch (err) {
      setError("Failed to execute ETL pipeline. Please try again.");
      console.error("ETL Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="etl-dashboard">
      <h1>ETL Pipeline Dashboard</h1>
      <button onClick={handleRunETL} disabled={loading}>
        {loading ? "Running ETL..." : "Run ETL Pipeline"}
      </button>
      {error && <p className="error">{error}</p>}
      <div className="bids-list">
        {bids.length > 0 ? (
          <table>
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
                  <td>${bid.bidAmount}</td>
                  <td>{bid.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data retrieved. Run the ETL pipeline to load data.</p>
        )}
      </div>
    </div>
  );
};

export default ETLDashboard;
