const express = require("express");
const PermissionRoutes = require("./permissions/routes/permission.routes");

const router = express.Router();

router.use('/permission', PermissionRoutes);

module.exports = router;