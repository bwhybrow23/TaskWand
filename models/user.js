const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'member'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCode: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastLoginIP: {
    type: String,
  }
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
