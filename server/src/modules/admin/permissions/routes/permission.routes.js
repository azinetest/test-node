const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");
const {
  validationSchema,
} = require("../validators/permission.validator");
const validate = require("../../../../middlewares/validate");

// Routes
router.post("/", validate(validationSchema), permissionController.create); // Create a new permission
router.get("/", permissionController.getPermissions); // Get all permissions
router.get("/:id", permissionController.getPermissionById); // Get permission by ID
router.put("/:id", validate(validationSchema), permissionController.update); // Update an existing permission

module.exports = router;
