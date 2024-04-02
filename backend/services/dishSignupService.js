const DishSignup = require('../models/DishSignup');
const Event = require('../models/Event');

// Service function to create a new dish signup
exports.createDishSignup = async (dishSignupData) => {
    try {
        const dishSignup = await DishSignup.create(dishSignupData);
        Event.updateOne(
            {_id: dishSignupData.event},
            {$push:{dishes: {dish: dishSignupData.dish, quantity: 1}}}
        ).then((event) => {
            if(!event) return ;
            return dishSignup;
        }).catch((error) => {
            console.error(error);
            throw new Error('Could not create dish signup');
        })
    } catch (error) {
        console.error(error);
        throw new Error('Could not create dish signup');
    }
};

// Service function to update an existing dish signup
exports.updateDishSignup = async (dishSignupId, updatedData) => {
    try {
        const updatedDishSignup = await DishSignup.findByIdAndUpdate(dishSignupId, updatedData, { new: true });
        if (!updatedDishSignup) {
            throw new Error('Dish signup not found');
        }
        return updatedDishSignup;
    } catch (error) {
        throw new Error('Could not update dish signup');
    }
};

// Service function to delete a dish signup
exports.deleteDishSignup = async (dishSignupId) => {
    try {
        const deletedDishSignup = await DishSignup.findByIdAndDelete(dishSignupId);
        if (!deletedDishSignup) {
            throw new Error('Dish signup not found');
        }
    } catch (error) {
        throw new Error('Could not delete dish signup');
    }
};

// Service function to retrieve all dish signups
exports.getAllDishSignups = async () => {
    try {
        const dishSignups = await DishSignup.find();
        return dishSignups;
    } catch (error) {
        throw new Error('Could not retrieve dish signups');
    }
};

// Service function to retrieve a dish signup by ID
exports.getDishSignupById = async (dishSignupId) => {
    try {
        const dishSignup = await DishSignup.findById(dishSignupId);
        if (!dishSignup) {
            throw new Error('Dish signup not found');
        }
        return dishSignup;
    } catch (error) {
        throw new Error('Could not retrieve dish signup by ID');
    }
};
