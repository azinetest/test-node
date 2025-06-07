import { toast } from "sonner";
import axiosInstance from "./index";

export const getPermissions = async () => {
  try {
    const response = await axiosInstance.get("/permissions");
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch permissions");
    throw error.response?.data || { message: "Failed to fetch permissions" };
  }
};
