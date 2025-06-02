const slugify = require("slugify");
const Services = require("../services/service.service");
const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../../utils/response"); // Adjust path as necessary

class ServiceController {
  // Create a new service
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

      return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Service created successfully.",
        data: newService,
      });
    } catch (error) {
      console.error("Error in create service controller:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while creating the service.",
        error: error.message,
      });
    }
  }

  // Get all services
  async getServices(req, res) {
    try {
      const services = await Services.getAllServices();

      if (!services || services.length === 0) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Services not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "Services fetched successfully.",
        data: services,
      });
    } catch (error) {
      console.error("Error in fetching services:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching services.",
        error: error.message,
      });
    }
  }

  // Get a service by ID
  async getServiceById(req, res) {
    try {
      const { id } = req.params;

      const service = await Services.getServiceById(id);

      if (!service) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Service not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "Service fetched successfully.",
        data: service,
      });
    } catch (error) {
      console.error("Error in fetching service by ID:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching the service by ID.",
        error: error.message,
      });
    }
  }

  // Update a service
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
        updated_by: req.user?.id || null,
      };

      const updatedService = await Services.updateService(id, serviceData);

      if (!updatedService) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Service not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "Service updated successfully.",
        data: updatedService,
      });
    } catch (error) {
      console.error("Error in updating service:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while updating the service.",
        error: error.message,
      });
    }
  }
}

module.exports = new ServiceController();