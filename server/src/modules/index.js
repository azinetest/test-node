const express = require("express");
const adminRoutes = require("./admin/index");
const authRoutes = require("./auth/routes/auth.routes");
const authMiddleware = require("./auth/middlewares/auth.middleware");
const servicesRoutes = require("./services/index");

const router = express.Router();
router.use("/admin", authMiddleware.Verify, adminRoutes);
router.use("/services", authMiddleware.Verify, servicesRoutes);
router.use("/", authRoutes);

module.exports = router;
