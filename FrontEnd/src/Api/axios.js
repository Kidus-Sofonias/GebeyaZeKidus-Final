import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000"
  // baseURL: "https://gebayazekidus.onrender.com",
  baseURL: "http://35.176.151.83:5000/",
});

export { axiosInstance };
