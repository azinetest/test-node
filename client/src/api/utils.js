import axiosInstance from "./index";

// Generic API utility for handling common CRUD operations
export const apiRequest = async (method, endpoint, data = null, config = {}) => {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `${method.toUpperCase()} request to ${endpoint} failed` };
  }
};

// Convenience methods for common HTTP verbs
export const get = (endpoint, config) => apiRequest("get", endpoint, null, config);
export const post = (endpoint, data, config) => apiRequest("post", endpoint, data, config);
export const put = (endpoint, data, config) => apiRequest("put", endpoint, data, config);
export const del = (endpoint, config) => apiRequest("delete", endpoint, null, config);