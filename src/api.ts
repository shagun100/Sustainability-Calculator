import axios from "axios";

const API_BASE_URL = "https://your-api-url.com"; // Replace with your backend URL

export const addDevice = async (deviceData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/devices`, deviceData);
    return response.data;
  } catch (error) {
    console.error("Error adding device:", error);
    throw error;
  }
};

export const getDevices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/devices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};
