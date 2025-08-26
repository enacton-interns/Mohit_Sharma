import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/quotes/random",
});

export const getQuote = async () => {
  const response = await api.get();
  return response.status === 200 ? response.data : [];
};
