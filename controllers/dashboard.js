
const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userBlogs = await BlogPost.findAll({
      where: { creator: req.session.user_id },
      include: [{ model: User }, { model: Comments }]
    });
    const userComments = await Comments.findAll({
      where: { commentor: req.session.user_id },
      include: [{ model: User }]
    });
    let blogs = userBlogs.map(c => c.get({ plain: true }));
    let comments = userComments.map(c => c.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      comments,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      logininfo: req.session.logininfo
    });
  } catch (err) {
    console.log(err)

    res.status(500).json(err);
  }
});


module.exports = router;