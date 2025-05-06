import axios from "axios";
import { getCookie } from "cookies-next";
import { mainUrl } from "../URL/main.url";

// Validate the base URL
const baseURL = mainUrl;
// const baseURL = "https://api.dev.onlinestaff.net";
if (!baseURL) {
  console.error("Base API URL is not defined in environment variables");
}

// Create axios instance with validated configuration
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Log request details in development
    if (process.env.NODE_ENV === "development") {
      console.log("Request:", {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        headers: config.headers,
      });
    }

    // Retrieve access token from cookies
    const accessToken = getCookie("accessToken");

    // Log the retrieved access token
    console.log("accessToken:", accessToken);

    // Add Authorization header if access token exists
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Log and reject the error
    if (process.env.NODE_ENV === "development") {
      console.error("Request error:", error);
    }
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("Response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
    }
    return response;
  },
  (error) => {
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
