const dishSignupService = require('../services/dishSignupService');
const Dish = require('../models/Dish');


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

// url to access this: localhost:8000/api/dishSignups/recommendDishes
exports.recommendDishes = async (req, res) => {
    try {

        const userId = '65d37b9cf608ce904718e317'

        const fileName = userId + '_dishes.txt'

        console.log("Right before doing the spawning")
        
        const { spawn } = require('child_process');

        // Replace 'python_script.py' with the path to your Python script
        const pythonProcess = spawn('python3', ['python/test_api_fetch.py', 
        '65d37b9cf608ce904718e317', 
        "American, Japanese, Thai, Italian"]);

        console.log("After spawning the python script but before receiving the data back")
        pythonProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });

        /*
        pythonProcess.on('close', async (code) => {
          console.log(`child process exited with code ${code}`);
          // at the end, read from the file by the user id (hardcoded for now)
          const fs = require('fs');
          
          let pythonReturn;
          
          await fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              return;
            }
            console.log('File content:', data);
            pythonReturn = data;
            let dishIds = pythonReturn.split("\n");
            dishIds.pop()
            console.log("the dish ids: ")
            console.log(dishIds);
            res.json({dishesReturned : dishIds})
          })
        })
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
        

        let dishIds;
        function readReturnedData(){
            return new Promise((resolve, reject) => {
                fs.readFile(fileName, 'utf8', (err, data) => {
                    if (err) {
                      console.error('Error reading file:', err);
                      return;
                    }
                    ////console.log('File content:', data);
                    dishIds = data.split("\n");
                    dishIds.pop()
                    ////console.log("the dish ids: ")
                    ////console.log(dishIds);
                    resolve(data)
                })
                
            })   
        }

        await readReturnedData();

        // creating a json object to return for the dishes
        const dishArr = []

        for (let i = 0; i < dishIds.length; i++){
            const dish = await Dish.findById(dishIds[i])
            ////console.log("What is the individual dish found?: ", dish)
            dishArr.push(dish)
        }
        ////console.log("What is the array of dishes found?: ", dishArr)
        res.json({message : "Finished processing the file data", data : dishArr})
        


    } catch (error) {
        console.error('Error recommending dishes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}