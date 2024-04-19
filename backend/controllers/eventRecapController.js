/* TODO: no model or services required, and therefore just configure the S3 STUFF HERE */

const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto');

const FileMetadata = require('../models/FileMetadata');



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
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

        const userId = req.body.userId;

        // Before returning, also get the metadata, and find metadata corresponding to the contens
        const allMetadata = await FileMetadata.find({});
        const metaDataArray = [];
        const userMatchArray = [];
        
        s3.listObjects(params, (err, data) => {
        if (err) {
            res.status(400).json({ message: error.message });
        } else {
            console.log('Objects in bucket:', data.Contents);

            // append to the metadata array in order
            for (let i = 0; i < data.Contents.length; i++){
                // Find the match of the metadata
                for (let j = 0; j < allMetadata.length; j++){
                    
                    if (data.Contents[i].Key === allMetadata[j].fileKey){
                        // once you have this match, append BOTH the metadata, and whether the user is false
                        metaDataArray.push(allMetadata[j]);
                        if (allMetadata[j].user === userId){
                            userMatchArray.push(true);
                        }
                        else{
                            userMatchArray.push(false); 
                        }


                    }

                }
            }

            res.status(201).json({Objects : data.Contents, metaData : metaDataArray, users : userMatchArray})
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
