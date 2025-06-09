const RoleModel = require("../models/role.model.js");

const RoleService = {
  async createRole(roleData) {
    try {
      const newRole = new RoleModel(roleData);
      return await newRole.save();
    } catch (error) {
      console.error("Error creating role: ", error);
      throw new Error("Error creating role: " + error.message);
    }
  },

  async getAllRoles(query) {
    try {
      const rolesWithUserCount = await RoleModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "role_id",
            as: "users",
          },
        },
        {
          $addFields: {
            userCount: { $size: "$users" },
          },
        },
        {
          $project: {
            users: 0,
          },
        },
      ]);

      // To populate permissions, created_by, updated_by, you can do this:
      const populatedRoles = await RoleModel.populate(rolesWithUserCount, [
        { path: "permissions", select: "id name slug" },
        { path: "created_by", select: "_id first_name last_name username" },
        { path: "updated_by", select: "_id first_name last_name username" },
      ]);

      return populatedRoles;
    } catch (error) {
      console.error("Error fetching all roles with user count: ", error);
      throw new Error(
        "Error fetching all roles with user count: " + error.message
      );
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
