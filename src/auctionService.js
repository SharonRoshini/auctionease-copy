import api from "./api";

export const fetchAuctions = async (filters) => {
  const response = await api.get("/auctions", { params: filters });
  return response.data;
};

export const fetchAuctionDetails = async (id) => {
  const response = await api.get(`/auctions/${id}`);
  return response.data;
};

export const placeBid = async (auctionId, bidAmount) => {
  const response = await api.post(`/bids`, { auctionId, bidAmount });
  return response.data;
};
