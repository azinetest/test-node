const PermissionModel = require("../models/permission.model");
const { StatusCodes } = require("http-status-codes");

const PermissionService = {
  async createPermission(permissionData) {
    try {
      // Create a new permission instance
      const newPermission = new PermissionModel(permissionData);

      // Save the permission to the database
      return await newPermission.save();
    } catch (error) {
      console.error("Error creating permission: ", error);
      throw new Error("Error creating permission: " + error.message);
    }
  },

  async getAllPermissions() {
    try {
      // Fetch all permission from the database
      return await PermissionModel.find();
    } catch (error) {
      console.error("Error fetching all permission: ", error);
      throw new Error("Error fetching all permission: " + error.message);
    }
  },

  async getPermissionById(permissionId) {
    try {
      return await PermissionModel.findById(permissionId);
    } catch (error) {
      console.error("Error fetching permission by ID: ", error);
      throw new Error("Error fetching permission by ID: " + error.message);
    }
  },

  async updatePermission(permissionId, permissionData) {
    try {
      return await PermissionModel.findByIdAndUpdate(
        permissionId,
        permissionData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      console.error("Error update permission: ", error);
      throw new Error("Error update permission: " + error.message);
    }
  },

  async deletePermission(permissionId) {
    try {
      const deletePermission = PermissionModel.deleteOne({ _id: permissionId });

      if (deletePermission.deletedCount === 0) {
        return {
          status: StatusCodes.NOT_FOUND,
          message: "Permission not found.",
          data: null,
        };
      }

      return {
        status: StatusCodes.OK,
        message: "Permission deleted successfully.",
        data: null,
      };
    } catch (error) {
      console.error("Error delete permission: ", error);
      throw new Error("Error delete permission: " + error.message);
    }
  },
};

module.exports = PermissionService;
