const Dish = require('../models/Dish');
const dishService = require('../services/dishService');

// Controller function to create a new dish
exports.createDish = async (req, res) => {
    try {
        const dish = await dishService.createDish(req.body);
        res.status(201).json(dish);
    } catch (error) {
        console.error('Error creating dish:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get all dishes
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await dishService.getAllDishes();
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error retrieving dishes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to get dish details by dish ID
exports.getDishById = async (req, res) => {
    try {
        const dish = await dishService.getDishById(req.params.dishId);
        if (!dish) {
            res.status(404).json({ error: 'Dish not found' });
        } else {
            res.status(200).json(dish);
        }
    } catch (error) {
        console.error('Error retrieving dish:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};