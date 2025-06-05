const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const validate = require("../../../../middlewares/validate");
const {validationSchema} = require("../validator/role.validator");
const authorize = require("../../../../middlewares/authorize.middleware");
// Routes
router.post("/", [authorize("create-role"), validate(validationSchema)], roleController.create); // Create a new Role
router.get("/", [authorize("read-role")], roleController.getRoles); // Get all Roles
router.get("/:id", [authorize("read-role")], roleController.getRoleById); // Get Role by ID
// router.put("/:id", roleController.update); // Update an existing Role

module.exports = router;