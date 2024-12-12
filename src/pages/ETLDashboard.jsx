import React from "react";
import { performETL } from "../services/auctionService";

const ETLDashboard = () => {
  const handleRunETL = async () => {
    try {
      await performETL();
      alert("ETL pipeline executed successfully!");
    } catch (error) {
      console.error("Error running ETL:", error);
      alert("Failed to execute ETL pipeline.");
    }
  };

  return (
    <div className="etl-dashboard">
      <h1>Add Bid ETL</h1>
      <button onClick={handleRunETL}>Run ETL</button>
    </div>
  );
};

export default ETLDashboard;
