import { myAxios, privateAxios } from "./helper";

export const getAllServices = (itemType,salonId) => {
  return myAxios.get(`/${itemType}/${salonId}`).then((respone) => {
    return respone.data;
  });
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


export const editService = () => {};

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
