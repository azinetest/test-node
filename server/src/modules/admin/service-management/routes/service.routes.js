const express = require("express");
const router = express.Router();
const SerivceController = require("../controllers/service.controller");
const {
  validationSchema,
} = require("../validators/service.validator");
const validate = require("../../../../middlewares/validate");
const authorize = require("../../../../middlewares/authorize.middleware");

// Routes
router.post("/", [authorize("create-service"), validate(validationSchema)], SerivceController.create); // Create a new service
router.get("/", [authorize("read-service")], SerivceController.getServices); // Get all services
router.get("/:id", [authorize("read-service")], SerivceController.getServiceById); // Get service by ID
router.put("/:id", [authorize("update-service"), validate(validationSchema)], SerivceController.update); // Update an existing service

module.exports = router;
