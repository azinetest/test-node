const express = require('express');
const router = express.Router();
const amlRoutes = require('./routes/aml.routes');
const socialRoutes = require('./routes/social.routes');
const trustRoutes = require('./routes/trust.routes');

router.use('/aml', amlRoutes);
router.use('/social', socialRoutes);
router.use('/trust', trustRoutes);

module.exports = router;