const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');

// View status of RSVP for given user and event
router.get('/view-status/:userId/:eventId', rsvpController.viewRSVPStatus);

// Create an RSVP record
router.post('/create/:eventId', rsvpController.createRSVP);

// Update an already-existing RSVP record
router.put('/update/:rsvpId', rsvpController.updateRSVP);

router.get('/:userId', rsvpController.getRSvpByUserId);


module.exports = router;