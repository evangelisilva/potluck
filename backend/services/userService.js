const User = require('../models/User');

exports.createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error('Could not create user');
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
  
