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

    // Fetch role_ids
    const superAdminRole = await RoleModel.findOne({ slug: "super-admin" });
    const guestRole = await RoleModel.findOne({ slug: "guest" });

    if (!superAdminRole || !guestRole) {
      throw new Error("Required roles not found in the roles collection.");
    }

    for (const item of parsedData) {
      const existingRecord = await UserModel.findOne({ email: item.email });

      if (!existingRecord) {
        // Assign role based on the user's username
        if (item.username === "superAdmin") {
          item.role_id = superAdminRole._id;
        } else {
          item.role_id = guestRole._id;
        }

        await UserModel.create(item);
      }
    }
  } catch (err) {
    console.error("Error processing data:", err);
  }
};

module.exports = UserSeederData;