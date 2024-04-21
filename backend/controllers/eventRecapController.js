/* TODO: no model or services required, and therefore just configure the S3 STUFF HERE */

const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand, GetObjectCommand }  = require('@aws-sdk/client-s3');
////const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


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


            /*
            for (let i = 0; i < data.Contents.length; i++){
                const currentMetadata = await FileMetadata.findOne({fileKey : data.Contents[i].Key})
                console.log("Event recap controller get all media items - what is the current metadata?: ");
                console.log(currentMetadata);


                if (currentMetadata && (currentMetadata.event.toString() === req.params.eventId)){
                    console.log("FOUND - image that matches the desired event")


                    metaDataArray.push(currentMetadata);

                    // Find the username of the recap through the metadata
                    const currentUser = await User.findById(currentMetadata.user);
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
            */

            const allMetadata = await FileMetadata.find({});
            
            for (let i = 0; i < allMetadata.length; i++){
                const currentMetadata = allMetadata[i];
                console.log("Event recap controller get all media items - what is the current metadata?: ");
                console.log(currentMetadata);


                // Event ID must match
                if (currentMetadata && (currentMetadata.event.toString() === req.params.eventId)){
                    console.log("FOUND - image that matches the desired event")


                    metaDataArray.push(currentMetadata);

                    // Find the username of the recap through the metadata
                    const currentUser = await User.findById(currentMetadata.user);
                    const nameOfUser = currentUser.firstName + " " + currentUser.lastName;
                    userNameArray.push(nameOfUser);

                    // To have a delete button, the metadata must either represent the current user, or the current user must be the event host
                    if (currentMetadata.user.toString() === req.params.userId || req.params.userId === hostId){
                        userMatchArray.push(true);
                    }
                    else{
                        userMatchArray.push(false);
                    }
                }
            }

            res.status(201).json({metaData : metaDataArray, userMatch : userMatchArray, userName : userNameArray});
            
        }
    });

    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// Controller function to add a new item for a given event
exports.createMediaItem = async (req, res) => {
    try {

        // note: if the file name is null, then NO S3 stuff is required (go straght tpo setting the metadata)
        console.log("What is request.file: ", req.file);
        if (req.file === undefined){
            console.log("Inside the req.file undefined - before ");
             // add the metadata into the model
             const metaData = {
                user: req.body.userId,
                event: req.body.eventId,
                caption: req.body.caption
            }
        
            const fileMetaData = new FileMetadata(metaData);
            
            await fileMetaData.save();
            console.log("Inside the req.file undefined - after ");
            res.status(201).json({message : 'File uploaded successfully.'})
        }


        const params = {
            Bucket: 'potluck-planning-app-event-recap'
        };

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

          console.log("Create media item - Before upload");
          s3.upload(uploadParams, async (err, data) => {
            if (err) {
                console.log('Error uploading file: ', err);
            } else {
                ////console.log('File uploaded successfully.');
                 ////s3.send(new PutObjectCommand(uploadParams))
                console.log("Create media item - After upload");

                let imageUrl = '';
                // If the extension is found, then create the imageUrl

                const imageTypes = ['jpg', 'jpeg', 'png', 
                'JPG', 'JPEG', 'PNG', 'SVG']

                console.log("Result for finding the file extension in the image types", imageTypes.indexOf(body.fileExtension))
                console.log("What is the file extension?: ", body.fileExtension)


                if (imageTypes.indexOf(body.fileExtension) !== -1){
                    console.log("Create media item - inside the image processing error")
                    imageUrl = s3.getSignedUrl('getObject', { Bucket: params.Bucket, Key: fileName});
                    console.log("Function for media item creation - did we get anything for the image url?: ", imageUrl)
                }
            
                // add the metadata into the model
                const metaData = {
                    user: req.body.userId,
                    event: req.body.eventId,
                    fileKey: fileName,
                    caption: req.body.caption,
                    imageUrl: imageUrl
                }
            
                const fileMetaData = new FileMetadata(metaData);
                await fileMetaData.save();
                res.status(201).json({message : 'File uploaded successfully.'})
            }
          })

          
         

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteMediaItem = async (req, res) => {
    try {

        console.log("Delete media item - req is ", req)
        console.log("Delete media item - req params are ", req.params)
        console.log("Delete media item - req body is ", req.body)

        const fileMetadata = await FileMetadata.findById(req.params.metadataId);
        const itemCaption = fileMetadata.caption;

        

        // First, delete the items in S3 (if they are defined)

        if (fileMetadata.fileKey !== undefined){

            const objectsToDelete = fileMetadata.fileKey

            const params = {
                Bucket: 'YOUR_BUCKET_NAME',
                Delete: {
                  Objects: [
                    { Key: objectsToDelete},
                    // Add more objects to delete if needed
                  ],
                  // Optionally specify whether to delete the objects quietly (without returning response)
                  // Quiet: false // Set to true if you want to delete quietly
                }
            };
              

            // Delete objects from the specified bucket
            s3.deleteObjects(params, async (err, data) => {
                if (err) {
                  console.error('Error deleting objects:', err);
                } else {
                  console.log('Objects deleted successfully:', data);
                  // next, we must delete the object key of the metadata item
                  await FileMetadata.findByIdAndDelete(req.params.metadataId)
                  // return: the id of the object deletd (should be a technical message)
                  res.status(201).json({message : "Item " + req.params.metadataId + " was deleted."})
                }
              });
        }
        else{
            
            // next, we must delete the object key of the metadata item
            await FileMetadata.findByIdAndDelete(req.params.metadataId)
            // return: the id of the object deletd (should be a technical message)
            res.status(201).json({message : "Item " + req.params.metadataId + " was deleted."})
        }
    
        
       
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
exports.updateMediaItem = async (req, res) => {
    try {
  
    } catch (error) {
      
    }
}