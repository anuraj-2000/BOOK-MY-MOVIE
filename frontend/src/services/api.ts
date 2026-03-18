import axios from "axios";

const API = axios.create({
  baseURL: "https://book-my-movie-sw0r.onrender.com/",
});

export default API;