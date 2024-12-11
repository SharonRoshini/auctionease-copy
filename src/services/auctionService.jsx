import api from './api';

// Auction APIs
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

export const updateAuction = async (id, updatedData) => {
  const response = await api.put(`/AuctionEase/auctions/${id}`, updatedData);
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
    // Fetch all users
    const response = await api.get('/AuctionEase/auctionusers');
    const users = response.data;

    // Find the user by username
    const user = users.find((u) => u.username === credentials.username);

    // Validate password
    if (user && user.password === credentials.password) {
      return user; // Login successful
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw error.response?.data || new Error("Login failed. Please check your credentials.");
  }
};

// export const loginUser = async (credentials) => {
//   const response = await api.post('/auctionusers/login', credentials);
//   return response.data;
// };

// export const validateLogin = async (username, password) => {
//   try {
//     const response = await api.get(`/auctionusers/${username}`); // Fetch user details
//     const user = response.data;

//     // Simulate password validation (update based on how passwords are stored)
//     if (user.password === password) {
//       return user; // Return user if validation succeeds
//     } else {
//       throw new Error("Invalid credentials");
//     }
//   } catch (error) {
//     throw error.response?.data || new Error("User not found or validation failed");
//   }
// };

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
  try {
    console.log("Sending payload to API:", bidData); // Debug
    const response = await api.post('/Auctions/bids', bidData);
    return response.data;
  } catch (error) {
    console.error("Error in addBid API:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchBidsByAuction = async (auctionId) => {
  const response = await api.get(`/Auctions/bids/auction/${auctionId}`);
  return response.data;
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

// Kafka API
export const sendBidUpdates = async (bidUpdateData) => {
  const response = await api.post('/Auctions/bids/updates', bidUpdateData);
  return response.data;
};
