const express = require('express');
const router = express.Router();
const eventRecapController = require('../controllers/eventRecapController');

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Retrieve all media items
router.get('/:userId/:eventId', eventRecapController.getAllMediaItems);

// Create a new media item
router.post('/', upload.single('file'), eventRecapController.createMediaItem);

// Delete a media item
router.delete('/:objectKey', eventRecapController.deleteMediaItem);



// Update an existing media item
router.put('/:objectKey', eventRecapController.updateMediaItem);


module.exports = router;
