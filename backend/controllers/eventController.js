// controllers/eventController.js

const Event = require('../models/Event');
const eventService = require('../services/eventService');

// Controller function to create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to retrieve all events
exports.getAllEvents = async (req, res) => {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Controller function to retrieve event details by event ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error retrieving event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to edit details of an event
exports.editEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error editing event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to cancel an event
exports.cancelEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const cancelledEvent = await Event.findByIdAndUpdate(eventId, { status: 'cancelled' }, { new: true });
    res.status(200).json(cancelledEvent);
  } catch (error) {
    console.error('Error cancelling event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to send invitations to guests
exports.sendInvitations = async (req, res) => {
  try {
    const { eventId } = req.params;
    // Implement sending invitations logic here
    res.status(200).json({ message: 'Invitations sent successfully' });
  } catch (error) {
    console.error('Error sending invitations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
