const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create a new event
router.post('/', eventController.createEvent);

// Retrieve all events
router.get('/', eventController.getAllEvents);

// Retrieve event details by event ID
router.get('/:eventId', eventController.getEventById);

router.get('/u/:userId', eventController.getEventsByUserId);

// Edit an existing event
router.put('/:eventId', eventController.editEvent);

// Cancel an event
router.delete('/:eventId', eventController.cancelEvent);

// Send invitations for an event
router.post('/:eventId/invite', eventController.sendInvitations);

// PUT request to update "taken" quantity for a category in an event
router.put('/:eventId/update-taken/:categoryName', eventController.updateTakenQuantity);

router.get("/chat/:eventId", eventController.getEventParticipants);

router.get("/conversation/:eventId/:senderId/:receiverId", eventController.getConversationId);

module.exports = router;
