const express = require("express");
const router = express.Router();
const socialController = require("../controllers/social.controller");
const {socialSchema} = require("../validators/social.validator");
const validate = require("../../../middlewares/validate");

router.post("/",validate(socialSchema), socialController.socialRequest);

module.exports = router;