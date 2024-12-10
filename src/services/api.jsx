import axios from "axios";

// Base URL of the backend
const BASE_URL = "http://localhost:8080/AuctionEase";

// API instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Auction API
export const fetchAuctions = async () => {
  const response = await api.get("/auctions");
  return response.data;
};

export const fetchAuctionById = async (id) => {
  const response = await api.get(`/auctions/${id}`);
  return response.data;
};

export const createAuction = async (auctionData) => {
  const response = await api.post("/auctions", auctionData);
  return response.data;
};

export const updateAuction = async (id, updatedData) => {
  const response = await api.put(`/auctions/${id}`, updatedData);
  return response.data;
};

export const deleteAuction = async (id) => {
  const response = await api.delete(`/auctions/${id}`);
  return response.data;
};

// User API
export const signupUser = async (userData) => {
  const response = await api.post("/auctionusers", userData);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get("/auctionusers");
  return response.data;
};

export const fetchUserByUsername = async (username) => {
  const response = await api.get(`/auctionusers/${username}`);
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await api.put(`/auctionusers/${id}`, updatedData);
  return response.data;
};

export const deleteUser = async (username) => {
  const response = await api.delete(`/auctionusers/${username}`);
  return response.data;
};

// Bid API
export const addBid = async (bidData) => {
  const response = await api.post("/bids", bidData);
  return response.data;
};

export const fetchBidsByAuction = async (auctionId) => {
  const response = await api.get(`/bids/auction/${auctionId}`);
  return response.data;
};

export const fetchHighestBid = async (auctionId) => {
  const response = await api.get(`/bids/auction/${auctionId}/highest`);
  return response.data;
};

export default api;
