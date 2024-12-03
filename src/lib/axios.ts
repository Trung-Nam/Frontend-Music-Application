import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-music-flow-application.onrender.com/api",
});
