const express = require("express");
const router = express.Router();
const trustController = require("../controllers/trust.controller");
const {trustSchema} = require("../validators/trust.validator");
const validate = require("../../../middlewares/validate");

router.post("/",validate(trustSchema), trustController.trustRequest);

module.exports = router;