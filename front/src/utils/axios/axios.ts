import axios from "axios";

const instance = axios.create({
  baseURL: "https://menualista.com/api",
  // baseURL: "http://localhost:3000",
});

export default instance;
