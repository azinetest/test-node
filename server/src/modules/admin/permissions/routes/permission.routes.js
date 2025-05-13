const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");

// Routes
router.post("/", permissionController.create); // Create a new permission
router.get("/", permissionController.getPermissions); // Get all permissions
router.get("/:id", permissionController.getPermissionById); // Get permission by ID
router.put("/:id", permissionController.update); // Update an existing permission

module.exports = router;