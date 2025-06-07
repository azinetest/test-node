import { toast } from "sonner";
import axiosInstance from "./index";
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();
export const getPermissions = async () => {
  try {
    const response = await axiosInstance.get("/permissions");
    return response.data;
  } catch (error) {
    toast({
      title: "Error fetching permissions.",
      description: error.message,
      variant: "destructive",
    });
    throw error.response?.data || { message: "Failed to fetch permissions" };
  }
};
