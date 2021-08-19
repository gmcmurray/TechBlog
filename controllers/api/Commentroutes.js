const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Prevent non logged in users from viewing the homepage
router.post('/',  withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
        title: req.body.title,
        content: req.body.content,
        commentor:  req.session.user_id,
        PostRef: req.body.PostRef
    });
    
    return res.json(newComment)
 
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.put('/:id',  withAuth, async (req, res) => {
  try {
    const updateComment = await Comments.update(
      { title: req.body.title,
        content: req.body.content,
        commentor:  req.session.user_id,
        PostRef: req.body.PostRef},
      {where: {
        id: req.params.id}
  });
    
    return res.json(updateComment)
 
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const oldComment = await Comments.destroy({
      where: {
        id: req.params.id
      }
    });
    
    return res.json(oldComment)

  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.get('/',  withAuth, async (req, res) => {
  try {
    const newComments = await Comments.findAll({
       
    });
    
    return res.json(newComments)
 
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

router.get('/:id',  withAuth, async (req, res) => {
  try {
    const newComment = await Comments.findByPk(req.params.id,{
       
    });
    
    return res.json(newComment)
 
  } catch (err) {
    console.log(err)
   
    res.status(500).json(err);
  }
});

module.exports=router