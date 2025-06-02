const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/user.validator");
const validate = require("../../../../middlewares/validate");

// Routes
router.post("/", validate(createUserSchema), userController.create); // Create a new user
router.get("/", userController.getUsers); // Get all users
router.get("/:id", userController.getUserById); // Get user by ID
router.put("/:id", validate(updateUserSchema), userController.update); // Update an existing user

module.exports = router;