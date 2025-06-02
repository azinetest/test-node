const express = require("express");
const PermissionRoutes = require("./permissions-management/routes/permission.routes");
const ServicesRoutes = require("./service-management/routes/service.routes");
const UserRoutes = require("./users-management/routes/user.routes");

const router = express.Router();

router.use("/permission", PermissionRoutes);
router.use("/service", ServicesRoutes);
router.use("/user", UserRoutes);
module.exports = router;
