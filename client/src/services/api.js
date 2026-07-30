import axios from "axios";

const API = axios.create({
  baseURL: "https://foodexpress-backend-p9dv.onrender.com/api",
});

export default API;