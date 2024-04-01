const Event = require('../models/Event');
const eventService = require('../services/eventService')
const emailService = require('../services/emailService')
const mongoose = require('mongoose');

// Controller function to create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Controller function to retrieve all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};


// Controller function to retrieve event details by event ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        error: 'Event not found'
      });
    }
    res.json(event);
  } catch (error) {
    console.error('Error retrieving event:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Controller function to edit details of an event
exports.editEvent = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    console.log(req.params);
    console.log(req.body);
    if (!!req.body.dishName) {

      await Event.findOneAndUpdate({
        "dishes.name": req.body.dishName,
        _id: new mongoose.Types.ObjectId(eventId)
      }, {
        $inc: {
          "dishes.$.quantityTaken": 1
        }
      }, {
        new: true
      });

      const updatedEvent = await Event.findOneAndUpdate({
        "dishes.name": req.body.dishName,
        _id: new mongoose.Types.ObjectId(eventId)
      }, {
        $push: {
          "dishes.$.signups": {
            userId: new mongoose.Types.ObjectId(req.body.userId),
            dietaryRestrictions: req.body.dietaryRestrictions,
            allergens: req.body.allergens
          } 
        }
      }, {
        new: true
      }).populate({
        path: 'dishes.$.signups.userId',
        model: 'User',
        select: 'firstName'
      }).exec();;
console.log(updatedEvent);
      res.status(200).json(updatedEvent);
      return;
    }
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true
    });

    // Check if the event is canceled
    if (req.body.status === 'canceled') {
      // Send cancellation email notification
      await eventService.sendCancellationEmail(updatedEvent);
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error editing event:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Controller function to cancel an event
exports.cancelEvent = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const cancelledEvent = await Event.findByIdAndUpdate(eventId, {
      status: 'cancelled'
    }, {
      new: true
    });
    res.status(200).json(cancelledEvent);
  } catch (error) {
    console.error('Error cancelling event:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Controller function to send invitations to guests
exports.sendInvitations = async (req, res) => {
  try {
    const {
      eventId
    } = req.params;
    const {
      event,
      invitedGuests
    } = req.body; // Updated to extract event details
    const sentInvitation = await eventService.sendInvitations(eventId, event, invitedGuests);
    res.status(200).json(sentInvitation);
  } catch (error) {
    console.error('Error sending invitations:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};