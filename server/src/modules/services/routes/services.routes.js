const express = require("express");
const router = express.Router();
const amlController = require("../controllers/aml.controller");
const {amlPersonSchema, amlOrganizationSchema} = require("../validators/aml.validator");
const validate = require("../../../middlewares/validate");

router.post("/aml/person/info",validate(amlPersonSchema), amlController.personInfoRequest);
router.post("/aml/organization/info",validate(amlOrganizationSchema), amlController.organizationInfoRequest);

module.exports = router;