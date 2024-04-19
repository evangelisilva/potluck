/*
fileData.append('userId', userData._id);
            fileData.append('eventId', eventId);
            fileData.append('file', fileList[i]);
            fileData.append('fileExtension', fileNameList[i].split(".")[1]);
            fileData.append('caption', caption);
            */

const mongoose = require('mongoose');
// Define schema for the dataset
const fileMetadataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    fileKey: {type : String, required : true},
    caption: String,
});

// Create and export the model
const FileMetadata = mongoose.model('FileMetadata', fileMetadataSchema);
module.exports = FileMetadata;
            
