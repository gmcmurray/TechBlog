const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userBlogs = await BlogPost.findAll({ 
    where:{creator:req.session.user_id},
    include:[{model:User}]
    });
    
    let blogs = userBlogs.map(c => c.get({ plain: true }));
    
    res.render('dashboard', {
      blogs,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});


module.exports = router;