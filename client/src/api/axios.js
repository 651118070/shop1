import axios from "axios";

const Base_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: Base_URL,
});

export const axiosPrivate = axios.create({
  baseURL: Base_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { axiosInstance };
