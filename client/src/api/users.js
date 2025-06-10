import axiosInstance from "./index";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/admin/user", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create user" };
  }
}

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put("/user/profile", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update user profile" };
  }
};

export const getUsers = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/admin/user", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};
