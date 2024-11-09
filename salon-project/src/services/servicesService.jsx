import { myAxios, privateAxios } from "./helper";

export const getServices = async (salonId) => {
  try {
    const response = await privateAxios.get(`/api/admin/salon/${salonId}/service`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Getting Service:`, error);
    throw error;
  }
};

export const addService = async (salonId,service) => {
  try {
    const response = await privateAxios.post(`/api/admin/salon/${salonId}/service`, service, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error Adding Service:`, error);
    throw error;
  }
};


export const editService = async (salonId, serviceId, updateService) => {
  try {
    const response = await privateAxios.put(
      `/api/admin/salon/${salonId}/service/${serviceId}`,
      updateService,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating Service:`, error);
    throw error;
  }
};
export const deleteService = () => {};

// // Fetch all services
// export const getAllServices = async () => {
//   try {
//     const response = await fetch(BASE_URL);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching services:", error);
//     throw error;
//   }
// };

// // Add a new service
// export const addService = async (serviceData) => {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(serviceData),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error adding service:", error);
//     throw error;
//   }
// };

// // Edit an existing service (assumes a PUT endpoint exists)
// export const editService = async (serviceId, updatedData) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${serviceId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error editing service:", error);
//     throw error;
//   }
// };

// // Delete a service
// export const deleteService = async (serviceId) => {
//   try {
//     await fetch(`${BASE_URL}/${serviceId}`, {
//       method: "DELETE",
//     });
//   } catch (error) {
//     console.error("Error deleting service:", error);
//     throw error;
//   }
// };
