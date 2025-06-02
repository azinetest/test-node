const express = require("express");
const router = express.Router();

const LoginController = require("../controllers/auth.controller");
const validate = require("../../../middlewares/validate");
const { loginSchema } = require("../validators/auth.validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", validate(loginSchema), LoginController.login);
router.post("/logout", authMiddleware.Verify, LoginController.logout);
router.get("/me", authMiddleware.Verify, LoginController.me); // Use GET for /me

module.exports = router;
