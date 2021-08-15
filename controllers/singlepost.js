const router = require('express').Router();
const { User, BlogPost, Comments } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.get('/:id', async (req, res) => {
  try {
    const catt = await BlogPost.findByPk(req.params.id,{
      // include: [{ all: true, nested: true }]
    //   attributes: ['blogpost.*', 'comments.*', [Sequelize.fn('COUNT', 'comments.PostRef'), 'CommentCount']],
      include: [
         {model: User},
         {model: Comments,
            include : {model:User},
            attributes: { exclude: ['updatedAt'] 
          }}]

    });

    const blog = catt.get({ plain: true });
    
    console.log('Here are session variables',req.session.logininfo,req.session.logged_in,req.session.user_id,req.session.user_name)
    res.render('singlepost', {
      blog,
    //   Pass the logged in flag, user_name and user_id to the template
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

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;