import api from "./api";

// Auction APIs
export const fetchAuctions = async () => {
  const response = await api.get("/AuctionEase/auctions");
  return response.data;
};

export const fetchAuctionById = async (id) => {
  const response = await api.get(`/AuctionEase/auctions/${id}`);
  return response.data;
};

export const createAuction = async (auctionData) => {
  const response = await api.post("/AuctionEase/auctions", auctionData);
  return response.data;
};

export const updateAuction = async (id, updatedData) => {
  const response = await api.put(`/AuctionEase/auctions/${id}`, updatedData);
  return response.data;
};

export const deleteAuction = async (id) => {
  const response = await api.delete(`/AuctionEase/auctions/${id}`);
  return response.data;
};

// Bid APIs
export const addBid = async (bidData) => {
  const response = await api.post("/Auctions/bids", bidData);
  return response.data;
};

export const fetchBidsByAuction = async (auctionId) => {
  try {
    const response = await api.get(`/Auctions/bids/auction/${auctionId}`);
    return response.data || []; // Return an empty array if response.data is undefined or null
  } catch (error) {
    console.error("Error fetching bids:", error);
    return []; // Return an empty array on error to prevent map() from breaking
  }
};

export const updateBid = async (bidId, updatedData) => {
  try {
    const response = await api.put(`/Auctions/bids/${bidId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating bid:", error);
    throw error;
  }
};


export const fetchHighestBid = async (auctionId) => {
  const response = await api.get(`/Auctions/bids/auction/${auctionId}/highest`);
  return response.data;
};

export const deleteBid = async (bidId) => {
  const response = await api.delete(`/Auctions/bids/${bidId}`);
  return response.data;
};

// User APIs
export const signupUser = async (userData) => {
  const response = await api.post("/AuctionEase/auctionusers", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.get("/AuctionEase/auctionusers");
  const users = response.data;

  const user = users.find(
    (u) => u.username === credentials.username && u.password === credentials.password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  return user;
};

export const fetchUsers = async () => {
  const response = await api.get("/AuctionEase/auctionusers");
  return response.data;
};

export const fetchUserByUsername = async (username) => {
  const response = await api.get(`/AuctionEase/auctionusers/${username}`);
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await api.put(`/AuctionEase/auctionusers/${id}`, updatedData);
  return response.data;
};

export const deleteUser = async (username) => {
  const response = await api.delete(`/AuctionEase/auctionusers/${username}`);
  return response.data;
};

// ETL Pipeline API
export const performETL = async () => {
  const response = await api.get("/AuctionEase/auctions/etl");
  return response.data;
};

// Kafka API
export const sendBidUpdates = async (bidUpdateData) => {
  const response = await api.post("/Auctions/bids/updates", bidUpdateData);
  return response.data;
};

// Extract data
export const extractAuctions = async () => {
  const response = await api.get('/AuctionEase/auctions');
  return response.data;
};

export const extractBidsForAuction = async (auctionId) => {
  const response = await api.get(`/Auctions/bids/auction/${auctionId}`);
  return response.data;
};




// Optional: Load or process data in the backend
export const loadTransformedData = async (data) => {
  const response = await api.post('/AuctionEase/etl/load', data);
  return response.data;
};
