const Dish = require('../models/Dish');

// Service function to create a new dish
exports.createDish = async (dishData) => {
    try {
        console.log(dishData)
        const dish = await Dish.create(dishData);
        return dish;
    } catch (error) {
        console.error(error);
        throw new Error('Could not create dish');
    }
};

// Service function to get dish details by dish ID
exports.getDishById = async (dishId) => {
    try {
        const dish = await Dish.findById(dishId);
        return dish;
    } catch (error) {
        throw new Error('Could not retrieve dish details');
    }
};

// Controller function to get all dishes
exports.getAllDishes = async () => {
    try {
        const dishes = await Dish.find();
        return dishes;
    } catch (error) {
        throw new Error('Could not retrieve dishes');
    }
};
