const express = require("express");
const PermissionRoutes = require("./permissions/routes/permission.routes");
const ServicesRoutes = require("./service-management/routes/service.routes");

const router = express.Router();

router.use("/permission", PermissionRoutes);
router.use("/service", ServicesRoutes);
module.exports = router;
