const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const validate = require("../../../../middlewares/validate");
const {validationSchema} = require("../validator/role.validator");

// Routes
router.post("/",validate(validationSchema), roleController.create); // Create a new Role
router.get("/", roleController.getRoles); // Get all Roles
router.get("/:id", roleController.getRoleById); // Get Role by ID
// router.put("/:id", roleController.update); // Update an existing Role

module.exports = router;