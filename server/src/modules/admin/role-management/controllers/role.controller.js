const RoleService = require("../services/role.service");
const { StatusCodes } = require("http-status-codes");
const slugify = require("slugify");
const { getAccessControlQuery } = require("../../../../utils/accessControl");

class RoleController {
  async create(req, res) {
    try {
      const { name, permissions, description } = req.body;
      const roleData = {
        name,
        slug: slugify(name, { lower: true }),
        permissions,
        description,
        created_by: req.user?.id || null,
        updated_by: null,
      };
      const newRole = await RoleService.createRole(roleData);
      return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "Role created successfully.",
        data: newRole,
      });
    } catch (error) {
      console.error("Error in creating role:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
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
        return res.status(StatusCodes.NOT_FOUND).json({
          status: true,
          message: "Roles not found.",
          data: [],
        });
      }
      return res.status(StatusCodes.OK).json({
        status: true,
        message: "Roles fetched successfully.",
        data: roles,
      });
    } catch (error) {
      console.error("Error in fetching roles: ", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
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
        return res.status(StatusCodes.NOT_FOUND).json({
          status: false,
          message: "Role not found.",
          data: null,
        });
      }
      return res.status(StatusCodes.OK).json({
        status: false,
        message: "Role fetched successfully.",
        data: role,
      });
    } catch (error) {
      console.error("Error in fetching role by ID: ", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "An error occurred while fetching the role by ID.",
        error: error.message,
      });
    }
  }
}

module.exports = new RoleController();