const dishSignupService = require('../services/dishSignupService');
const Dish = require('../models/Dish');
const User = require('../models/User');
const Event = require('../models/Event')


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
        const eventId = req.query.event;

        let dishSignups;

        if (eventId) {
            dishSignups = await dishSignupService.getDishSignupsByEvent(eventId);
        } else {
            dishSignups = await dishSignupService.getAllDishSignups();
        }

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

// url to access this: localhost:8000/api/dishSignups/recommendDishes
exports.recommendDishes = async (req, res) => {
    try {        
        const { spawn } = require('child_process');

        // Call of spawn - with the body arguments
        const pythonProcess = spawn('python', ['python/dish_recommendation_algorithm.py',
        // userId: will be req.params later
        req.params.userId, 
        // Event id
        req.body.eventId,
        req.body.mealCourse,
        req.body.preferredPrepTime.toString(),
        req.body.preferredComplexity,
        req.body.preferredPopularity
    ]);

        /*
        pythonProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        */

        function waitForEvent() {
            return new Promise((resolve, reject) => {
                pythonProcess.on('close', async (code) => {
                console.log(`child process exited with code ${code}`);
                resolve(code)
            });
          });
        }

        await waitForEvent()
        // After waiting for the event, we must: 
        // get the data assigned from the event
        const fs = require('fs');
        
        const fileName = req.params.userId + '_dishes.txt'
        let dishIds;
        function readReturnedData(){
            return new Promise((resolve, reject) => {
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) {
                      console.error('Error reading file:', err);
                      return;
                    }
                    dishIds = data.split("\n");
                    resolve(data)
                })
                
            })   
        }

        await readReturnedData();

        // After reading the data, delete the file, since it's only for a single usage (any given time the recommendation API is called)
        // Delete the file
        fs.unlink(fileName, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            return;
          }
          console.log('File deleted successfully.');
        });


        // creating a json object to return for the dishes
        const dishArr = []
        // store whether the cuisines are matching - at the dish by index
        const cuisinesMatch = []

        for (let i = 0; i < dishIds.length; i++){
            const dish = await Dish.findById(dishIds[i])
            const event = await Event.findById(req.body.eventId)
            dishArr.push(dish)
            // Check if the cuisines match those of the event
            // for all the cusines in dish.cuisines, check all the cusines in the event.cuisines

            const commonCuisines = []
            dish.cuisines.forEach((dishCuisine) => {
                 event.cuisines.forEach((eventCuisine) => {
                     if (dishCuisine == eventCuisine){
                        commonCuisines.push(dishCuisine)
                     }
                 })
                 
                 // After checking all the event cuisines, set up the cuisnes match array
                 if (commonCuisines.length == 0){
                    cuisinesMatch.push(false);
                 }
                 else {
                    cuisinesMatch.push(true);
                 }
                }

            )




        }

        // Before returning, get the name of the user
        const user = await User.findById(req.params.userId)

        res.json({message : `Dishes recommended to ${user.firstName} ${user.lastName}`, data : dishArr, cuisinesMatch : cuisinesMatch})
        


    } catch (error) {
        console.error('Error recommending dishes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
