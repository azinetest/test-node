import axiosInstance from "./index";

export const getServices = async () => {
    try {
        const services = await axiosInstance.get("/admin/service");
        return services.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch services" };
    }
}