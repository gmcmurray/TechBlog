const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboard = require('./dashboard');
const singlepost = require('./singlepost');

router.use('/', homeRoutes);
router.use('/dashboard', dashboard);
router.use('/api', apiRoutes);
router.use('/singlepost', singlepost)


module.exports = router;
