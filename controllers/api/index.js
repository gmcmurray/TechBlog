const router = require('express').Router();
const userRoutes = require('./userRoutes');
const Blogpostroutes = require("./Blogpostroutes");
const Ccomments = require("./Commentroutes");

router.use('/users', userRoutes);
router.use('/blogposts',Blogpostroutes);
router.use('/comments', Ccomments);

module.exports = router;
