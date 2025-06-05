const RoleModel = require("../models/role.model.js");

const RoleService = {
  async createRole(roleData) {
    try {
      const newRole = new RoleModel(roleData);
      return await newRole
        .save()
        .populate("permissions", "id name slug")
        .populate("created_by")
        .populate("updated_by");
    } catch (error) {
      console.error("Error creating role: ", error);
      throw new Error("Error creating role: " + error.message);
    }
  },

  async getAllRoles() {
    try {
      return await RoleModel.find()
        .populate("permissions", "id name slug")
        .populate("created_by")
        .populate("updated_by");
    } catch (error) {
      console.error("Error fetching all roles: ", error);
      throw new Error("Error fetching all roles: " + error.message);
    }
  },

  async getRoleById(roleId) {
    try {
      return await RoleModel.findById(roleId)
        .populate("permissions", "id name slug")
        .populate("created_by")
        .populate("updated_by");
    } catch (error) {
      console.error("Error fetching role by ID: ", error);
      throw new Error("Error fetching role by ID: " + error.message);
    }
  },

  async updateRole(roleId, roleData) {
    try {
      return await RoleModel.findByIdAndUpdate(roleId, roleData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      console.error("Error updating role: ", error);
      throw new Error("Error updating role: " + error.message);
    }
  },
};

module.exports = RoleService;
