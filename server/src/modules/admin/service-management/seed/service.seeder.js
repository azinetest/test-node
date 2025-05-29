const path = require("path");
const fs = require("fs");
const Services = require("../models/service.model");

const ServicesSeederData = async () => {
  try {
    const serviceData = fs.readFileSync(
      path.join(__dirname, "services.json"),
      "utf8"
    );
    const parsedData = JSON.parse(serviceData);

    for (const item of parsedData) {
      const existingRecord = await Services.findOne({ name: item.name });

      if (!existingRecord) {
        await Services.create(item);
      }
    }
  } catch (err) {
    console.error("Error processing data:", err);
  }
};

module.exports = ServicesSeederData;