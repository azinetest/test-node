const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/user.validator");
const validate = require("../../../../middlewares/validate");
const authorize = require("../../../../middlewares/authorize.middleware");
const uploadMiddleware = require("../middlewares/multer.middleware");
// Routes
router.post("/", [authorize("create-user"), validate(createUserSchema), uploadMiddleware], userController.create); // Create a new user
router.get("/", [authorize("read-user")], userController.getUsers); // Get all users
router.get("/:id", [authorize("read-user")], userController.getUserById); // Get user by ID
router.put("/:id", [authorize("update-user"), validate(updateUserSchema)], userController.update); // Update an existing user

module.exports = router;