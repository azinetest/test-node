const slugify = require("slugify");
const Services = require("../services/service.service");
const { StatusCodes } = require("http-status-codes");
class SerivceController {
  // Method to create a new service
  async create(req, res) {
    try {
      const { name, prefix, status, mastersheet } = req.body;
      const serviceData = {
        name,
        slug: slugify(name, { lower: true }),
        prefix,
        status,
        mastersheet,
        created_by: req.user?.id || null,
        updated_by: null,
      };
      const newService = await Services.createService(serviceData);
      return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "Service created successfully.",
        data: newService,
      });
    } catch (error) {
      console.error("Error in create service controller:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "An error occurred while creating the service.",
        error: error.message,
      });
    }
  }

  // Method to fetch all services
  async getServices(req, res) {
    try {
      const service = await Services.getAllServices();
      if (!service || service.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: true,
          message: "Services not found.",
          data: [],
        });
      }
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "Services fetched successfully.",
        data: service,
      });
    } catch (error) {
      console.error("Error in fetching services:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "An error occurred while fetching services.",
        error: error.message,
      });
    }
  }

  // Method to get a service by ID
  async getServiceById(req, res) {
    try {
      const { id } = req.params; // Use req.params for route parameters
      const service = await Services.getServiceById(id);
      if (!service) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: true,
          message: "Service not found.",
          data: null,
        });
      }
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "Service fetched successfully.",
        data: service,
      });
    } catch (error) {
      console.error("Error in fetching service by ID:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "An error occurred while fetching the service by ID.",
        error: error.message,
      });
    }
  }

  // Method to update the service
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, prefix, status, mastersheet } = req.body;
      const serviceData = {
        name,
        slug: slugify(name, { lower: true }),
        prefix,
        status,
        mastersheet,
        created_by: req.user?.id || null,
        updated_by: null,
      };

      const updatedService = await Services.updateService(id, serviceData);
      if (!updatedService) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: true,
          message: "Service not found.",
        });
      }
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "Service updated successfully.",
        data: updatedService,
      });
    } catch (error) {
      console.error("Error in updateing service:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "An error occurred while updateing service.",
        error: error.message,
      });
    }
  }
}

module.exports = new SerivceController();
