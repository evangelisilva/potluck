const Event = require('../models/Event');
const { sendEmail } = require('./emailService');

// Service function to create a new event
exports.createEvent = async (eventData) => {
  try {
    const event = await Event.create(eventData);
    return event;
  } catch (error) {
    throw new Error('Could not create event');
  }
};

// Service function to retrieve all events
exports.getAllEvents = async () => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw new Error('Could not retrieve events');
  }
};

// Service function to retrieve event details by event ID
exports.getEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    throw new Error('Could not retrieve event details');
  }
};

// Service function to edit details of an event
exports.editEvent = async (eventId, eventData) => {
  try {
    const event = await Event.findByIdAndUpdate(eventId, eventData, { new: true });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    throw new Error('Could not edit event');
  }
};

// Service function to cancel an event
exports.cancelEvent = async (eventId) => {
  try {
    const event = await Event.findByIdAndUpdate(eventId, { status: 'cancelled' }, { new: true });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    throw new Error('Could not cancel event');
  }
};

// Service function to send invitations to guests
exports.sendInvitations = async (eventId, guests) => {
  try {
    // Retrieve event details
    const event = await getEventById(eventId);

    // Send invitations to each guest
    for (const guest of guests) {
      // Construct template data using event details
      const templateData = {
        name: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        host: event.organizer,
        rsvp: 'http://localhost:3000/events/' + eventId + '/rsvp'
      };
      await sendEmail(guest, 'ICSI518-Potluck-InvitationTemplate', templateData);
    }

    return `Invitations sent for event with ID ${eventId}`;
  } catch (error) {
    console.error('Error sending invitations:', error);
    throw new Error('Failed to send invitations');
  }
};
