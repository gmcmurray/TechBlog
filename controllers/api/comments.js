// '/' get, post
const router = require('express').Router();
const { User, BlogPost ,Comments } = require('../models');
const withAuth = require('../utils/auth');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.get('/',  async (req, res) => {
  try {
    const comments = await Comments.findAll();
    
    let comms = comments.map(c => c.get({ plain: true }));
    
    res.render('comment', {
      comms,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});
