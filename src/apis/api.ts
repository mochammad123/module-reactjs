import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Api = axios.create({
  baseURL: baseUrl,
  headers: {},
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
