const Event = require('../models/Event');
const eventService = require('../services/eventService')
const emailService = require('../services/emailService')
const Rsvp = require('../models/Rsvp');
const Conversation = require('../models/Conversation');

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
      console.error('Error retrieving events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Controller function to retrieve event details by event ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await eventService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error retrieving event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEventsByUserId= async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await eventService.getEventsByUserId(userId);
    if (!events) {
      return res.status(404).json({ error: 'Events not found' });
    }
    res.json(events);
  } catch (error) {
    console.error('Error retrieving event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateTakenQuantity = async (req, res) => {
  const { eventId, categoryName } = req.params;
  try {
    const updatedEvent = await eventService.incrementTaken(eventId, categoryName);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to edit details of an event
exports.editEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });

    // Check if the event is canceled
    if (req.body.status === 'Canceled') {
      // Send cancellation email notification
      await eventService.sendCancellationEmail(updatedEvent);
    }

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
    const cancelledEvent = await Event.findByIdAndUpdate(eventId, { status: 'Canceled' }, { new: true });
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
        const { event, invitedGuests } = req.body; // Updated to extract event details
        const eventbyId = await Event.findById(eventId);
        const sentInvitation = await eventService.sendInvitations(eventId, eventbyId, invitedGuests);
        res.status(200).json(sentInvitation);
    } catch (error) {
        console.error('Error sending invitations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.getEventParticipants = async (req, res) => {
    try {
      const { eventId } = req.params;
      const filteredUsers = await Rsvp.find({ event: eventId }).populate('user', '-password');
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getting users for the chat: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
};


exports.getConversationId = async (req, res) => {
  try {
    const { eventId, senderId, receiverId } = req.params;
    // const { sender, receiver } = req.body;

    console.log(eventId, senderId, receiverId);

    // Check if a conversation already exists with the given sender and receiver
    let conversation = await Conversation.findOne({
      event: eventId,
      participants: { $all: [senderId, receiverId] } // Find conversations where both sender and receiver are participants
    });

    // If no conversation found, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
      event: eventId,
      participants: [senderId, receiverId]
    });
    }

    res.status(200).json({ conversationId: conversation._id });
   
  } catch (error) {
    console.error('Error finding or creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
