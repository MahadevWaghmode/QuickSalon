import { privateAxios } from "./helper";



export const getAllSalons = async () => {
  try {
    const response = await privateAxios.get(`/api/admin/salon`)
    return response.data;
  } catch (error) {
    console.error("Error fetching Salon:", error);
    throw error;
  }
};

export const getSalon =async(salonId)=>{
  try {
    const response = await privateAxios.get(`/api/admin/salon/${salonId}`)
    return response.data;
  } catch (error) {
    console.error("Error fetching Salon:", error);
    throw error;
  }

}

// Add a new salon
export const addSalon = async (salonData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salonData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding salon:", error);
    throw error;
  }
};

// Edit an existing salon (assumes a PUT endpoint exists)
export const editSalon = async (salonId, updateSalon) => {
  try {
    const response = await privateAxios.put(`/api/admin/salon/${salonId}`, updateSalon, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating Salon:`, error);
    throw error;
  }
};

// Delete a salon
export const deleteSalon = async (salonId) => {
  try {
    await fetch(`${BASE_URL}/${salonId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting salon:", error);
    throw error;
  }
};
