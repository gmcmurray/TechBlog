const router = require('express').Router();
const { User, BlogPost } = require('../models');
const withAuth = require('../utils/auth');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userBlogs = await BlogPost.findAll({ 
    where:{creator:req.session.user_id}
    });
    
    let blogs = userBlogs.map(c => c.get({ plain: true }));
    
    // let bloggs = blogs.filter((u)=>u.creator ===req.session.user_id)
    // console.log(bloggs)
    res.render('blogposts', {
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