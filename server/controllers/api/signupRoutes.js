const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { signToken } = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log('route posted');
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      businessName,
      businessAddress,
      zipCode,
      city,
      state,
      country,
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      businessName,
      businessAddress,
      zipCode,
      city,
      state,
      country,
    });

    const token = signToken(newUser);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
