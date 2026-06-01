import axios from "axios";

const API = axios.create({
  baseURL: "https://verifyflow-backend.onrender.com/api"
});

export default API;