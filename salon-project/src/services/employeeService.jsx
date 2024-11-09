import { privateAxios } from "./helper";

export const getEmployees = async (salonId) => {
  try {
    const response = await privateAxios.get(
      `/api/admin/salon/${salonId}/employee`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error Getting Salon:`, error);
    throw error;
  }
};

export const addEmployee = async (salonId, employee) => {
  try {
    const response = await privateAxios.post(
      `/api/admin/salon/${salonId}/employee`,
      employee,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error Adding Salon:`, error);
    throw error;
  }
};

// Edit an existing employee (assumes a PUT endpoint exists)
export const editEmployee = async (salonId, empId, updateEmp) => {
  try {
    const response = await privateAxios.put(
      `/api/admin/salon/${salonId}/employee/${empId}`,
      updateEmp,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating Employee:`, error);
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
