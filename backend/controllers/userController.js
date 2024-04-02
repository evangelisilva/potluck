const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const token = await userService.signup(firstName, lastName, email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password }= req.body;
    const token = await userService.signin(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserByEmail = async (req, res) => {
    try {
      const userEmail = req.params.userEmail;
      const user = await userService.getUserByEmail(userEmail);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error retrieving user by email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

