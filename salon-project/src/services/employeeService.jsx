import { privateAxios } from "./helper";

export const getAllEmployees = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};


export const addEmployee = async (salonId,employee) => {
  try {
    const response = await privateAxios.post(`/api/admin/salon/${salonId}/employee`, employee, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Adding Salon:`, error);
    throw error;
  }
};



// Edit an existing employee (assumes a PUT endpoint exists)
export const editEmployee = async (employeeId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing employee:", error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${employeeId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
