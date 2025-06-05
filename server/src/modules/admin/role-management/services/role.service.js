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

  async getAllRoles(query) {
    try {
      return await RoleModel.find(query)
        .populate("permissions", "id name slug")
        .populate("created_by")
        .populate("updated_by");
    } catch (error) {
      console.error("Error fetching all roles: ", error);
      throw new Error("Error fetching all roles: " + error.message);
    }
  },

  async getRoleById(query, roleId) {
    try {
      return await RoleModel.findOne({ _id: roleId, ...query })
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
