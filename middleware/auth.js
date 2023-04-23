const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config.json');

const authMiddleware = () => async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;