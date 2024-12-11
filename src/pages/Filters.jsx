import React, { useState } from "react";

const Filters = ({ onApplyFilters }) => {
  const [title, setTitle] = useState("");

  const applyFilters = () => {
    onApplyFilters({ title });
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={applyFilters}>Search</button>
    </div>
  );
};

export default Filters;
