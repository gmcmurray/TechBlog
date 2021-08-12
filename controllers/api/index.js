const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postroutes = require("./postroutes");

router.use('/users', userRoutes);
router.use('/posts',postroutes)

module.exports = router;
