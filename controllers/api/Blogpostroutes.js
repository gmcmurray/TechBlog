const router = require('express').Router();
const {  BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');
// withAuth,
// Prevent non logged in users from viewing the homepage
router.post('/',  withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        creator:  req.session.user_id
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
    const updateBlog = await BlogPost.update(
      { title: req.body.title,
        content: req.body.content,
        creator:  req.session.user_id},
      {where: {
        id: req.params.id}
  });
    
    return res.json(updateBlog)
 
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const oldBlog = await BlogPost.destroy({
      where: {
        id: req.params.id
      }
    });
    
    return res.json(oldBlog)
 
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const oldBlog = await BlogPost.findByPk(req.params.id,{
    });
    
    return res.json(oldBlog)

  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.get('/',  withAuth, async (req, res) => {
  try {
    const newBlog = await BlogPost.findAll({

    });
    
    return res.json(newBlog)
 
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

module.exports=router