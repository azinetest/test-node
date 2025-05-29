const mongoose = require("mongoose");
const PermissionSeederData = require("./admin/permissions/seed/permission.seeder");
const ServicesSeederData = require("./admin/service-management/seed/service.seeder");
const connectDB = require("../config/db.config");
require('dotenv').config();

const seedData = async () => {
  try {
    await PermissionSeederData();
    console.log("Permission seeder run successfully");
  } catch (err) {
    console.error("Permission seeder run error:", err);
  }

  try {
    await ServicesSeederData();
    console.log("Service seeder run successfully");
  } catch (err) {
    console.error("Service seeder run error:", err);
  }
};

if (require.main === module) {
  connectDB()
    .then(() => seedData())
    .then(() => {
      console.log("All seeders finished.");
      mongoose.disconnect();
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error running seeders:", error);
      mongoose.disconnect();
      process.exit(1);
    });
}

module.exports = seedData;