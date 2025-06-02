const express = require("express");
const PermissionRoutes = require("./routes/permission.routes");

const router = express.Router();

router.use('/permission', PermissionRoutes);