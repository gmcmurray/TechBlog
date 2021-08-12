const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    const userBlogs = await BlogPost.findAll({ 
      // include: [{ all: true, nested: true }]
      // attributes: ['blogpost.*', 'comments.*', [Sequelize.fn('COUNT', 'comments.PostRef'), 'CommentCount']],
      include: [{model: User}, {model: Comments}]
    });

    const blogs = userBlogs.map(c => c.get({ plain: true }));
    console.log(blogs);
    res.render('homepage', {
      blogs,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;