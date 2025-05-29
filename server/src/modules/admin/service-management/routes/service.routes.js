const express = require("express");
const router = express.Router();
const SerivceController = require("../controllers/service.controller");
const {
  validationSchema,
} = require("../validators/service.validator");
const validate = require("../../../../middlewares/validate");

// Routes
router.post("/", validate(validationSchema), SerivceController.create); // Create a new service
router.get("/", SerivceController.getServices); // Get all services
router.get("/:id", SerivceController.getServiceById); // Get service by ID
router.put("/:id", validate(validationSchema), SerivceController.update); // Update an existing service

module.exports = router;
