const express = require("express");
const Permission = require("../models/permission.model");
const fs = require("fs");

const seedData = async () => {
  try {
    const permissionData = fs.readFileSync(
      "seed/json_data/permission.json",
      "utf8"
    );
    const parsedData = JSON.parse(permissionData);

    for (const item of parsedData) {
      const existingRecord = await Permission.findOne({ name: item.name });

      if (!existingRecord) {
        await Permission.create(item);
      }
    }
  } catch (err) {
    console.error("Error processing data:", err);
  }
};

module.exports = { seedData };
