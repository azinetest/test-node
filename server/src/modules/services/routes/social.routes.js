const express = require("express");
const router = express.Router();
const socialController = require("../controllers/social.controller");
const { socialSchema } = require("../validators/social.validator");
const validate = require("../../../middlewares/validate");
const authorize = require("../../../middlewares/authorize.middleware");

router.post(
  "/",
  [authorize("create-social-request"), validate(socialSchema)],
  socialController.socialRequest
);

module.exports = router;
