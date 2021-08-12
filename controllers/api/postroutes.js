const router = require('express').Router();
const { User, BlogPost ,Comments } = require('../../models');
const withAuth = require('../../utils/auth');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.post('/',  async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        creator:  req.session.user_id
    });
    
    // let comms = comments.map(c => c.get({ plain: true }));
    return res.json(newBlog)
    // res.render('comment', {
    //   comms,
    //   // Pass the logged in flag to the template
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

module.exports=router