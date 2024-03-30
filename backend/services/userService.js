const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwt_secret = crypto.randomBytes(32).toString('hex');

exports.signup = async (firstName, lastName, email, password) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('The email address is already in use. Please use a different email address or sign in if you already have an account.');
    }

    user = new User({ firstName, lastName, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwt_secret, { expiresIn: 3600 });

    return token;
  } catch (error) {
    console.log(error)
    throw new Error(error.message);
  }
};

exports.signin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if(!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwt_secret, { expiresIn: 3600 });
    
    return token;
  } catch {
    console.log(error)
    throw new Error(error.message);
  }
};

exports.extractUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwt_secret);
    return decoded.user.id;
  } catch (error) {
    throw new Error('Invalid token.');
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Could not retrieve users');
  }
};

exports.getUserById = async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Could not retrieve user');
    }
};

exports.getUserByEmail = async (userEmail) => {
    try {
      const user = await User.findOne({ email: userEmail });
      return user;
    } catch (error) {
      throw new Error('Could not retrieve user');
    }
};