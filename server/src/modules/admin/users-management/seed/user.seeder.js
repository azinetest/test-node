const path = require("path");
const fs = require("fs");
const UserModel = require("../models/user.model");
const RoleModel = require("../../role-management/models/role.model");

const UserSeederData = async () => {
  try {
    const userData = fs.readFileSync(
      path.join(__dirname, "users.json"),
      "utf8"
    );
    const parsedData = JSON.parse(userData);

    // Fetch the role_id of Super Admin
    const superAdminRole = await RoleModel.findOne({ slug: "super-admin" });

    if (!superAdminRole) {
      throw new Error("Super Admin role not found in the roles collection.");
    }

    for (const item of parsedData) {
      const existingRecord = await UserModel.findOne({ email: item.email });

      if (!existingRecord) {
        // Assign the Super Admin role_id to user
        item.role_id = superAdminRole._id;

        await UserModel.create(item);
      }
    }
  } catch (err) {
    console.error("Error processing data:", err);
  }
};

module.exports = UserSeederData;
