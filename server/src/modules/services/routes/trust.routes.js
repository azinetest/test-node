const express = require("express");
const router = express.Router();
const trustController = require("../controllers/trust.controller");
const {trustSchema} = require("../validators/trust.validator");
const validate = require("../../../middlewares/validate");
const authorize = require("../../../middlewares/authorize.middleware");

router.post(
  "/",
  [authorize("create-trust-request"), validate(trustSchema)],
  trustController.trustRequest
);

module.exports = router;