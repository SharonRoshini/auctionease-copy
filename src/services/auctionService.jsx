import api from './api';

export const fetchAuctions = async () => {
  const response = await api.get('/AuctionEase/auctions');
  return response.data;
};

export const fetchAuctionById = async (id) => {
  const response = await api.get(`/AuctionEase/auctions/${id}`);
  return response.data;
};
export const fetchAuctionByTitle = async (title) => {
  const response = await api.get(`/AuctionEase/auctions/title/${title}`);
  return response.data;
};

export const createAuction = async (auctionData) => {
  const response = await api.post('/AuctionEase/auctions', auctionData);
  return response.data;
};

export const updateAuction = async (auctionId, updatedData) => {
  const response = await api.put(`/AuctionEase/auctions/${auctionId}`, updatedData);
  return response.data;
};

export const deleteAuction = async (id) => {
  const response = await api.delete(`/AuctionEase/auctions/${id}`);
  return response.data;
};

// User APIs
export const signupUser = async (userData) => {
  const response = await api.post('/AuctionEase/auctionusers', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.get('/AuctionEase/auctionusers');
    const users = response.data;

    const user = users.find((u) => u.username === credentials.username);

    if (user && user.password === credentials.password) {
      return user;
        } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw error.response?.data || new Error("Login failed. Please check your credentials.");
  }
};

export const fetchUsers = async () => {
  const response = await api.get('/AuctionEase/auctionusers');
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

// Bid APIs
export const addBid = async (bidData) => {
  console.log("Making POST request with payload:", bidData);
  try {
    const response = await api.post('/Auctions/bids', bidData);
    return response.data;
  } catch (error) {
    console.error("Error in addBid API:", error);
    throw error;
  }
};


export const fetchBidsByAuction = async (auctionId) => {
  const response = await api.get(`/Auctions/bids/auction/${auctionId}`);
  return response.data || [];
};

export const fetchHighestBid = async (auctionId) => {
  const response = await api.get(`/Auctions/bids/auction/${auctionId}/highest`);
  return response.data;
};

export const deleteBid = async (bidId) => {
  const response = await api.delete(`/Auctions/bids/${bidId}`);
  return response.data;
};

// ETL Pipeline API
export const performETL = async () => {
  const response = await api.get('/AuctionEase/auctions/etl');
  return response.data;
};

// // Kafka API
// export const sendBidUpdates = async (bidUpdateData) => {
//   const response = await api.post('/Auctions/bids/updates', bidUpdateData);
//   return response.data;
// };

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