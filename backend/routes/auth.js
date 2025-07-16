const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../middlewares/auth');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, secret, { expiresIn: '8h' });
  res.json({ token, role: user.role, email: user.email });
});

module.exports = router;
