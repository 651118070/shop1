import axios from "axios";

const Base_URL = "https://mboashop.onrender.com";

const axiosInstance = axios.create({
  baseURL: Base_URL,
});

export const axiosPrivate = axios.create({
  baseURL: Base_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosInstance };
