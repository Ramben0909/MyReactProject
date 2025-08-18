const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authcontroller');

// router.post('/signup', signup);
// router.post('/login', login);

// Dummy test route
router.get('/test', async (req, res) => {
  const User = require('../models/user');
  try {
    const dummy = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'dummy' // Not hashed – just for testing
    });
    await dummy.save();
    res.send('Dummy user inserted into MongoDB');
  } catch (err) {
    res.status(500).send('Error inserting dummy user: ' + err.message);
  }
});

module.exports = router;
