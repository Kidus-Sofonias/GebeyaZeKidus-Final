import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000"
  baseURL: "https://gebayazekidus.onrender.com",
});

export { axiosInstance };
