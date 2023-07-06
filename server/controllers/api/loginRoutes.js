const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { signToken } = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase(); // Convert email to lowercase

    const user = await User.findOne({ email });

    if (!user || !user.isCorrectPassword(password)) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = signToken({ email: user.email, id: user._id });

    res.json({ token, user: { _id: user._id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
