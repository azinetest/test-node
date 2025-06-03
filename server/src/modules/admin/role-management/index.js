const express = require('express');
const router = express.Router();
const roleRoutes = require('./routes/role.routes');

// Import the role routes
router.use('/roles', roleRoutes); // Use the role routes under the /roles path