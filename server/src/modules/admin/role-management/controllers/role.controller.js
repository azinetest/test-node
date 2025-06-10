const RoleService = require("../services/role.service");
const { StatusCodes } = require("http-status-codes");
const slugify = require("slugify");
const getAccessControlQuery = require("../../../../utils/accessControl");
const sendResponse = require("../../../../utils/response"); // Import sendResponse function

class RoleController {
  async create(req, res) {
    try {
      const { name, permissions, description, status } = req.body;
      const roleData = {
        name,
        slug: slugify(name, { lower: true }),
        permissions,
        description,
        status,
        created_by: req.user?.id || null,
        updated_by: null,
      };
      const newRole = await RoleService.createRole(roleData);
      return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Role created successfully.",
        data: newRole,
      });
    } catch (error) {
      console.error("Error in creating role:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while creating the role.",
        error: error.message,
      });
    }
  }

  async getRoles(req, res) {
    try {
      const query = getAccessControlQuery(req.user, {});
      const roles = await RoleService.getAllRoles(query);
      if (!roles || roles.length === 0) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: true,
          message: "Roles not found.",
          data: [],
        });
      }
      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Roles fetched successfully.",
        data: roles,
      });
    } catch (error) {
      console.error("Error in fetching roles: ", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching roles.",
        error: error.message,
      });
    }
  }

  async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const query = getAccessControlQuery(req.user, {});
      const role = await RoleService.getRoleById(query, id);
      if (!role) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "Role not found.",
          data: null,
        });
      }
      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Role fetched successfully.",
        data: role,
      });
    } catch (error) {
      console.error("Error in fetching role by ID: ", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching the role by ID.",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, permissions, description, status } = req.body;

      // Prepare update data
      const roleData = {
        name,
        slug: name ? slugify(name, { lower: true }) : undefined,
        permissions,
        description,
        status,
        updated_by: req.user?.id || null,
      };

      // Remove undefined fields (like slug if name not provided)
      Object.keys(roleData).forEach(
        (key) => roleData[key] === undefined && delete roleData[key]
      );

      const updatedRole = await RoleService.updateRole(id, roleData);

      if (!updatedRole) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "Role not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Role updated successfully.",
        data: updatedRole,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while updating the role.",
        error: error.message,
      });
    }
  }
}

module.exports = new RoleController();
