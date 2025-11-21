import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create an axios instance with default config
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Reusable PUT function
export const updateVolunteerInfo = async (data) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  try {
    const response = await api.put(`/volunteer/info?${params.toString()}`, {});
    return response.data;
  } catch (error) {
    console.error("Error updating volunteer info:", error);
    throw error;
  }
};


// 
// In src/services/volunteerService.js
export const getVolunteerInfo = async () => {
  try {
    const response = await api.get('/volunteer/info');
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteer info:', error);
    throw error;
  }
};

// Update the default export
export default {
  updateVolunteerInfo,
  getVolunteerInfo
};
// You can add more API functions here as needed

