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
    throw (
      error.response?.data || {
        message: "Failed to fetch permissions from the server.",
      }
    );
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
    throw error.response?.data || { message: "Failed to create a new role." };
  }
};

/**
 * Fetch all roles.
 * @returns {Promise<Object>} Response data from the API.
 * @throws {Object} Error response data or a fallback error message.
 */
export const getRoles = async () => {
  try {
    const response = await axiosInstance.get("/admin/role");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to retrieve the list of roles.",
      }
    );
  }
};

/**
 * Fetch a single role by its ID.
 * @param {number|string} id - The ID of the role to fetch.
 * @returns {Promise<Object>} Response data from the API.
 * @throws {Object} Error response data or a fallback error message.
 */
export const getRoleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/role/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: `Failed to fetch the role with ID: ${id}.`,
      }
    );
  }
};

/**
 * Updates an existing role by its ID.
 * @param {number|string} id - The ID of the role to update.
 * @param {Object} roleData - Updated role data.
 * @returns {Promise<Object>} Response data from the API.
 * @throws {Object} Error response data or a fallback error message.
 */
export const updateRole = async (id, roleData) => {
  try {
    const response = await axiosInstance.put(`/admin/role/${id}`, roleData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: `Failed to update the role with ID: ${id}.`,
      }
    );
  }
};
