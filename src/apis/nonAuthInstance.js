import axios from "axios";

const nonAuthInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL ?? "http://localhost:5000",
});

export default nonAuthInstance;