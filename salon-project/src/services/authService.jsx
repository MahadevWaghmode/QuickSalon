import axios from 'axios';
import { myAxios } from './helper';

//const apiUrl = "http://localhost:8000/api/auth";

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await myAxios.post("/api/auth/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    

    // Check if login is successful based on the response
    if (response.status === 200) {
      return response.data; // You can return the token or user data as per your API response
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.log("Error logging in user:", error);
    throw error;
  }
};

// Register User
export const registerUser = async (user) => {
  const response = await myAxios.post("/api/auth/register", user);
  console.log("res :",response)
  return response.data;
};

