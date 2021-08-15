const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.post('/',  withAuth, async (req, res) => {
  try {
    const newBlog = await Comments.create({
        title: req.body.title,
        content: req.body.content,
        commentor:  req.session.user_id
    });
    
    return res.json(newBlog)
 
    // });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.put('/:id',  withAuth, async (req, res) => {
  try {
    const updateBlog = await Comments.update(
      {title: req.body.title,
        content: req.body.content,
        commentor:  req.session.user_id},
      {where: {
        id: req.params.id}
  });
    
    return res.json(updateBlog)
 
    // });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const oldBlog = await Comments.destroy({
      where: {
        id: req.params.id
      }
    });
    
    return res.json(oldBlog)
 
    // });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.get('/',  withAuth, async (req, res) => {
  try {
    const newBlog = await Comments.findAll({
       
    });
    
    return res.json(newBlog)
 
    // });
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});
module.exports=router