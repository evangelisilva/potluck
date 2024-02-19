const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById); 
router.get('/email/:userEmail', userController.getUserByEmail);

module.exports = router;
