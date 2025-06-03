const express = require("express");
const adminRoutes = require("./admin/index");
const authRoutes = require("./auth/routes/auth.routes");
const authMiddleware = require("./auth/middlewares/auth.middleware");

const router = express.Router();
router.use("/admin",  adminRoutes);
router.use("/", authRoutes);

module.exports = router;