const express = require("express");
const router = express.Router();
const amlController = require("../controllers/aml.controller");
const {amlPersonSchema, amlOrganizationSchema} = require("../validators/aml.validator");
const validate = require("../../../middlewares/validate");
const authorize = require("../../../middlewares/authorize.middleware");

router.post(
  "/person/info",
  [authorize("create-aml-person-info-request"), validate(amlPersonSchema)],
  amlController.personInfoRequest
);
router.post(
  "/organization/info",
  [authorize("create-aml-organization-info-request"), validate(amlOrganizationSchema)],
  amlController.organizationInfoRequest
);

module.exports = router;