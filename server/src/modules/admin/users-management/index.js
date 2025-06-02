const express = require("express");
const UsersRoutes = require("./routes/user.routes");

const router = express.Router();

router.use('/user', UsersRoutes);