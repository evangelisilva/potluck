/* TODO: no model or services required, and therefore just configure the S3 STUFF HERE */

const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto');

const FileMetadata = require('../models/FileMetadata'); 
const Event = require('../models/Event')
const User = require('../models/User')



AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }, 
    region: 'us-east-2' // e.g., 'us-east-1'
  });

const s3 = new AWS.S3();
console.log("Successfully connected to S3");

/*
function fileToBinary(file, callback) {
    const reader = new FileReader();

    // Define a callback function to handle the file reading
    reader.onload = function(event) {
        // Access the binary data
        const binaryData = event.target.result;
        callback(null, binaryData);
    };

    // Handle errors during file reading
    reader.onerror = function(event) {
        callback(event.target.error, null);
    };

    // Read the file as binary data
    reader.readAsBinaryString(file);
}
*/


/* 
s3.listObjects(params, (err, data) => {
        if (err) {
            console.error('Error listing objects:', err);
        } else {
            console.log('Objects in bucket:', data.Contents);
        }
    });
*/

const randomFileName = ( bytes = 16 ) => crypto.randomBytes(bytes).toString('hex')




exports.getAllMediaItems = async (req, res) => {
  
    try {

        const params = {
            Bucket: 'potluck-planning-app-event-recap'
        };


       

        const eventDetails = await Event.findById(req.params.eventId);

        const hostId = eventDetails.organizer.toString();


        // Before returning, also get the metadata, and find metadata corresponding to the contens
        
        const metaDataArray = [];
        const userMatchArray = [];
        const userNameArray = [];
        
        s3.listObjects(params, async (error, data) => {
        if (error) {
            res.status(400).json({ message: error.message });
        } else {
            
            console.log("Event recap controller get all media items - made it into the async function for listing objects")
            
            // new filtering of the data
            // event id of the object must match (metadata must be equal to the param passed in)
            // you must store the user name of the recap
            // if the event id matches, check for the userId of the metadata being that of current user (or if the user ID is the host you just set everything to true)
            // also if the event id matches, add the username of the item to a list
            
            ////console.log('Objects in bucket:', data.Contents);

            // append to the metadata array in order
            for (let i = 0; i < data.Contents.length; i++){
                const currentMetadata = await FileMetadata.findOne({fileKey : data.Contents[i].Key})
                console.log("Event recap controller get all media items - what is the current metadata?: ");
                console.log(currentMetadata);


                if (currentMetadata.event.toString() === req.params.eventId){
                    console.log("FOUND - image that matches the desired event")


                    metaDataArray.push(currentMetadata);

                    // Find the username of the recap through the metadata
                    const currentUser = await User.findById(req.params.userId);
                    const nameOfUser = currentUser.firstName + " " + currentUser.lastName;
                    userNameArray.push(nameOfUser);

                    
                    if (currentMetadata.user.toString() === req.params.userId || req.params.userId === hostId){
                        userMatchArray.push(true);
                    }
                    else{
                        userMatchArray.push(false);
                    }
                }
            }

            res.status(201).json({metaData : metaDataArray, userMatch : userMatchArray, userName : userNameArray});


            /*
            for (let i = 0; i < data.Contents.length; i++){

                


                // Find the match of the metadata
                for (let j = 0; j < allMetadata.length; j++){
                    

                    
                    if (data.Contents[i].Key === allMetadata[j].fileKey){
                        // once you have this match, append BOTH the metadata, and whether the user is false
                        metaDataArray.push(allMetadata[j]);
                        // TODO: also check for the host
                        if (allMetadata[j].user.toString() === userId || allMetadata[j].user.toString() === hostId){
                            userMatchArray.push(true);
                            // TODO: find the user by id, and append their name to an array
                        }
                        else{
                            console.log("The two user ids are not equal. What are they?: ")
                            console.log("Metadata user id: ", allMetadata[j].user.toString())
                            console.log("user id passed in: ", userId)
                            userMatchArray.push(false); 
                        }


                    }

                }
            }
            */

            ////res.status(201).json({Objects : data.Contents, metaData : metaDataArray, users : userMatchArray})
        }
    });

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Controller function to add a new item for a given event
exports.createMediaItem = async (req, res) => {
    try {

        const body = req.body;

        console.log("Test print - create media item - body data contained at the backend - ", body);

        const fileName = randomFileName() + "." + body.fileExtension;
        // Define parameters for the object
        const uploadParams = {
            Bucket: 'potluck-planning-app-event-recap',
            Key: fileName, // Specify the key (filename) under which the object will be stored in the bucket
            // Read the file as a (binary) stream
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        // Upload file to the S3 bucket
        s3.upload(uploadParams, (err, data) => {
            if (err) {
                console.log('Error uploading file: ', err);
            } else {
                console.log('File uploaded successfully.'); 
                res.status(201).json({message : 'File uploaded successfully.', storageLocation : data.Location})
            }
        })

        // add the metadata into the model
        const metaData = {
            user: req.body.userId,
            event: req.body.eventId,
            fileKey: fileName,
            caption: req.body.caption
        }

        const fileMetaData = new FileMetadata(metaData);
        await fileMetaData.save();

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteMediaItem = async (req, res) => {
    try {
  
    } catch (error) {
      
    }
}
exports.updateMediaItem = async (req, res) => {
    try {
  
    } catch (error) {
      
    }
}