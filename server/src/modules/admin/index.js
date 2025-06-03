const express = require("express");
const PermissionRoutes = require("./permissions-management/routes/permission.routes");
const ServicesRoutes = require("./service-management/routes/service.routes");
const UserRoutes = require("./users-management/routes/user.routes");
const RoleRoutes = require("./role-management/routes/role.routes")
const router = express.Router();

router.use("/permission", PermissionRoutes);
router.use("/service", ServicesRoutes);
router.use("/user", UserRoutes);
router.use('/role', RoleRoutes);
module.exports = router;