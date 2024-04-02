const express = require('express');
const router = express.Router();
const dishSignupController = require('../controllers/dishSignupController');

// Create a new dish signup
router.post('/', dishSignupController.createDishSignup);

// Update an existing dish signup
router.put('/:dishSignupId', dishSignupController.updateDishSignup);

// Delete a dish signup
router.delete('/:dishSignupId', dishSignupController.deleteDishSignup);

// Retrieve all dish signups
router.get('/', dishSignupController.getAllDishSignups);

// Retrieve a dish signup by ID
router.get('/:dishSignupId', dishSignupController.getDishSignupById);

// Recommend dishes
router.post('/recommendDishes/:userId', dishSignupController.recommendDishes);

module.exports = router;
