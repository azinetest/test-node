const PermissionSeederData = require("./admin/permissions/seed/permission.seeder");

const seedData = async () => {
  await PermissionSeederData()
    .then(() => {
      console.log("Permission seeder run successfully");
    })
    .catch((err) => {
      console.error("Permission seeeder run error :" + err);
    });
};

module.exports = seedData;
