import axios from "axios";

// create an axios instance

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // Your API's base URL
  timeout: 10000, // Request timeout in milliseconds
});

// create an axios interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
// axiosInstance.interceptors.response.use(
//   function (response) {
//     // Any status code that lies within the range of 2xx causes this function to trigger.
//     // Do something with response data (e.g., transform it, log it).
//     console.log("Response Received:", response.status);
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx causes this function to trigger.
//     // Do something with response error (e.g., global error handling, token refresh).
//     //error.statucod===401 //lets call the refrsh token
//     console.error("Response Error:", error.response.status);
//     return Promise.reject(error);
//   },
// );
