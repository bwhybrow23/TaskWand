const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/user');
const config = require('../config.json');

router.get('/login', (req, res) => {
  res.render('pages/auth/login.ejs');
});

router.post('/login', async (req, res) => {
  
  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // Validate user in DB
  const user = await User.findOne({ email });

  if(!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare password with DB
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user._id, userEmail: user.email }, config.jwt_secret, { expiresIn: '1h' });

  // Set cookie
  res.cookie('token', token, { httpOnly: true, secure: true });

  // Update DB with last login and IP
  user.lastLogin = Date.now();
  user.lastLoginIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  await user.save();

  // Redirect to task page
  res.redirect('/tasks');

});

router.get('/register', (req, res) => {
  res.render('pages/register.ejs');
});

router.post('/register', async (req, res) => {
  
  // Get User Input
  const { name, email, password, password2 } = req.body;

  // Validate User Input
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  if (password !== password2) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // See if User already exists
  let user;
  user = await User.findOne({ email });
  if(user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new User
  user = await new User({
    name: name,
    email: email,
    password: password
  });
  await user.save();

  // Send Verification Email
  // TODO

  // Create JWT token
  const token = jwt.sign({ userId: user._id, userEmail: user.email }, config.jwt_secret, { expiresIn: '1h' });

  // Set cookie
  res.cookie('token', token, { httpOnly: true, secure: true });

  // Redirect to task page
  res.redirect('/tasks');

});

module.exports = router;