const router = require('express').Router();
const { User } = require('../../models');

// User login
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log("userdata", userData)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("logging in here")
    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in userlo
    req.session.save(() => {
      req.session.user_name = userData.name;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.logininfo = { usid: userData.id, loginstatus: true };


      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// User signup
router.post('/', async (req, res) => {

  try {
      const userData = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password});
      
// Adds info to enable login
        req.session.save(() => {
          req.session.user_name = userData.name;
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          req.session.logininfo = { usid: userData.id, loginstatus: true };
    
    
          res.json({ user: userData, message: 'You are now logged in!' });
        });
      res.status(200).json(userData);

  } catch (error) {
      console.error(error);
      res.status(500).json(error)
  }

});

module.exports = router;

