const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');

// withAuth,
// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    const userBlogs = await User.findAll( 
      // include: [{ all: true, nested: true }]
      // attributes: ['blogpost.*', 'comments.*', [Sequelize.fn('COUNT', 'comments.PostRef'), 'CommentCount']],
    //   include: [{model: User}, {model: Comments}]
    );

    const users = userBlogs.map(c => c.get({ plain: true }));
    console.log('users',users);
    res.render('users', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
      logged_in_name: req.session.user_name
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


module.exports = router;
