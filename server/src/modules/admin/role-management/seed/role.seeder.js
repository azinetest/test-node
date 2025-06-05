const path = require("path");
const fs = require("fs");
const RoleModel = require("../models/role.model");

const RoleSeederData = async () => {
  try {
    const roleData = fs.readFileSync(
      path.join(__dirname, "role.json"),
      "utf8"
    );
    const parsedData = JSON.parse(roleData);

    for (const item of parsedData) {
      const existingRecord = await RoleModel.findOne({ name: item.name });

      if (!existingRecord) {
        await RoleModel.create(item);
      }
    }
  } catch (err) {
    console.error("Error processing data:", err);
  }
};

module.exports = RoleSeederData;