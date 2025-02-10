import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust this if your backend is hosted elsewhere

// ✅ Signup API
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Signup failed");
  }
};

// ✅ Login API
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login failed");
  }
};

// ✅ Forgot Password API
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Error in password reset");
  }
};
