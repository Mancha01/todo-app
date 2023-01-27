import axios from "axios";

export default axios.create({
  baseURL: "https://63d1195cd5f0fa7fbdc3ecfb.mockapi.io/api",
  headers: {
    "Content-type": "application/json",
  },
});
