const dishSignupService = require('../services/dishSignupService');

// Controller function to create a new dish signup
exports.createDishSignup = async (req, res) => {
    try {
        const dishSignup = await dishSignupService.createDishSignup(req.body);
        res.status(201).json(dishSignup);
    } catch (error) {
        console.error('Error creating dish signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update an existing dish signup
exports.updateDishSignup = async (req, res) => {
    try {
        const dishSignupId = req.params.dishSignupId;
        const updatedDishSignup = await dishSignupService.updateDishSignup(dishSignupId, req.body);
        res.status(200).json(updatedDishSignup);
    } catch (error) {
        console.error('Error updating dish signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to delete a dish signup
exports.deleteDishSignup = async (req, res) => {
    try {
        const dishSignupId = req.params.dishSignupId;
        await dishSignupService.deleteDishSignup(dishSignupId);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting dish signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to retrieve all dish signups
exports.getAllDishSignups = async (req, res) => {
    try {
        const dishSignups = await dishSignupService.getAllDishSignups();
        res.status(200).json(dishSignups);
    } catch (error) {
        console.error('Error retrieving all dish signups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to retrieve a dish signup by ID
exports.getDishSignupById = async (req, res) => {
    try {
        const dishSignupId = req.params.dishSignupId;
        const dishSignup = await dishSignupService.getDishSignupById(dishSignupId);
        res.status(200).json(dishSignup);
    } catch (error) {
        console.error('Error retrieving dish signup by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
