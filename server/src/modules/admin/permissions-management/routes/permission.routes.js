const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controller");
const { validationSchema } = require("../validators/permission.validator");
const validate = require("../../../../middlewares/validate");
const authorize = require("../../../../middlewares/authorize.middleware");
// Routes
router.post(
  "/",
  [authorize("create-permission"), validate(validationSchema)],
  permissionController.create
); // Create a new permission

router.get(
  "/",
  [authorize("read-permission")],
  permissionController.getPermissions
); // Get all permissions

router.get(
  "/:id",
  [authorize("read-permission")],
  permissionController.getPermissionById
); // Get permission by ID

router.put(
  "/:id",
  [authorize("update-permission"), validate(validationSchema)],
  permissionController.update
); // Update an existing permission

module.exports = router;
