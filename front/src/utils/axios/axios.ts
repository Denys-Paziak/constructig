import axios from "axios";

const instance = axios.create({
  baseURL: "http://185.233.117.23:3000",
  // baseURL: "http://localhost:3000",
});

export default instance;
