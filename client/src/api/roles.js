import axiosInstance from "./index";

/**
 * Fetches the list of permissions from the server.
 * @returns {Promise<Object>} Permissions data from the API.
 * @throws {Object} Error response data or a fallback error message.
 */
export const getPermissions = async () => {
  try {
    const response = await axiosInstance.get("/admin/permission");
    return response.data;
  } catch (error) {
    // console.error("Error fetching permissions:", error);
    throw error.response?.data || { message: "Failed to fetch permissions" };
  }
};

/**
 * Creates a new role with the provided role data.
 * @param {Object} roleData - Data for the new role.
 * @returns {Promise<Object>} Response data from the API.
 * @throws {Object} Error response data or a fallback error message.
 */
export const createRole = async (roleData) => {
  try {
    const response = await axiosInstance.post("/admin/role", roleData);
    return response.data;
  } catch (error) {
    // console.error("Error creating role:", error);
    throw error.response?.data || { message: "Failed to create new role" };
  }
};