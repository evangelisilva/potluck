const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/email/:userEmail', userController.getUserByEmail); // Add this route before the /:userId route
router.get('/:userId', userController.getUserById); 
router.get('/', userController.getAllUsers); // Move this route to the end
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;

