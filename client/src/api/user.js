import axiosInstance from "./index";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await axiosInstance.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update user profile" };
  }
};

export const getUsers = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/users", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};
