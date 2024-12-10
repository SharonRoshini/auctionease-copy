import axios from 'axios';

const BASE_URL = 'http://localhost:8080/AuctionEase';
const AUCTIONS_URL = `${BASE_URL}/auctions`;
const BIDS_URL = `${BASE_URL}/Auctions/bids`;

// Auction-related functions
export const fetchAuctions = async () => {
  const response = await axios.get(AUCTIONS_URL);
  return response.data;
};

export const fetchAuctionById = async (id) => {
  const response = await axios.get(`${AUCTIONS_URL}/${id}`);
  return response.data;
};

export const createAuction = async (auctionData) => {
  const response = await axios.post(AUCTIONS_URL, auctionData);
  return response.data;
};

export const updateAuction = async (id, auctionData) => {
  const response = await axios.put(`${AUCTIONS_URL}/${id}`, auctionData);
  return response.data;
};

export const deleteAuction = async (id) => {
  await axios.delete(`${AUCTIONS_URL}/${id}`);
};

// Bid-related functions
export const addBid = async (bidData) => {
  const response = await axios.post(BIDS_URL, bidData);
  return response.data;
};

export const fetchBidsByAuction = async (auctionId) => {
  const response = await axios.get(`${BIDS_URL}/auction/${auctionId}`);
  return response.data;
};

export const fetchHighestBid = async (auctionId) => {
  const response = await axios.get(`${BIDS_URL}/auction/${auctionId}/highest`);
  return response.data;
};

// User-related functions
export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/auctionusers`);
  return response.data;
};

export const fetchUserByUsername = async (username) => {
  const response = await axios.get(`${BASE_URL}/auctionusers/${username}`);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auctionusers`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${BASE_URL}/auctionusers/${id}`, userData);
  return response.data;
};

export const deleteUser = async (username) => {
  await axios.delete(`${BASE_URL}/auctionusers/${username}`);
};

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});