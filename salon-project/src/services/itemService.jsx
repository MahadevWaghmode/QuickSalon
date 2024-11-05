import axios from 'axios';
import { myAxios, privateAxios } from './helper';
import { getCurrentUserId } from '../auth';


const userId = getCurrentUserId();

// Fetch all Items  
export const getAllItems = async ( itemType, Id) => {
    try {
      const response = await privateAxios.get(`/api/admin/${itemType}`)
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
};

// Add a new Item
export const addItem = async ( itemType,id, item) => {
  try {
    
    const response = await privateAxios.post(`/api/admin/${itemType}`, item, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// Update an existing Item
export const updateItem = async (userId, itemType, itemId, item) => {
  try {
    const response = await privateAxios.put(`/api/admin/${itemType}/${itemId}`, item, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating item in ${itemType}:`, error);
    throw error;
  }
};

// Delete an Item
export const deleteItem = async (itemType, itemId) => {
  try {
    await axios.delete(`${apiUrl}/${itemType}/${itemId}`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
