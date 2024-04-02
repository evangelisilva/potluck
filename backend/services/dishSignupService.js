const DishSignup = require('../models/DishSignup');
const User = require('../models/User');
const Dish = require('../models/Dish');

// Service function to create a new dish signup
exports.createDishSignup = async (dishSignupData) => {
    try {
        const dishSignup = await DishSignup.create(dishSignupData);
        return dishSignup;
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

exports.getDishSignupsByEvent = async (eventId) => {
    try {
        let query = {};
        query.event = eventId; 

        const dishSignups = await DishSignup.find(query);
        const formattedDishSignups = await formatDishSignups(eventId, dishSignups);
        return formattedDishSignups;
    } catch (error) {
        console.log(error);
        throw new Error('Could not retrieve dish signups');
    }
};

const formatDishSignups = async (eventId, dishSignups) => {
    try {
        let formattedData = {
            event: eventId,
            signups: []
        };

        // Group dish signups by dish category
        let groupedByCategory = {};
        for (const signup of dishSignups) {
            if (!groupedByCategory[signup.dishCategory]) {
                groupedByCategory[signup.dishCategory] = [];
            }

            // Fetch user details by ID
            const user = await User.findById(signup.user);
            if (user) {
                const { firstName, lastName } = user;

                // Fetch dish details by ID
                const dish = await Dish.findById(signup.dish);
                if (dish) {
                    const { dishName, description, allergens, dietaryRestrictions } = dish;
                    groupedByCategory[signup.dishCategory].push({
                        user: signup.user,
                        dish: signup.dish,
                        userFirstName: firstName,
                        userLastName: lastName,
                        dishName: dishName,
                        description: description,
                        allergens: allergens,
                        dietaryRestrictions: dietaryRestrictions
                    });
                }
            }
        }

        // Format grouped data into the desired format
        Object.keys(groupedByCategory).forEach(category => {
            const categoryData = groupedByCategory[category];
            formattedData.signups.push({
                [category]: categoryData,
                taken: categoryData.length // Append length information
            });
        });

        return formattedData;
    } catch (error) {
        throw new Error('Could not format dish signups data');
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
