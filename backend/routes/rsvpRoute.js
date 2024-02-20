const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');

router.get('/view-status/:userId/:eventId', rsvpController.viewRSVPStatus);

router.post('/create/:eventId', rsvpController.createRSVP);

module.exports = router;