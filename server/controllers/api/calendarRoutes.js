const express = require('express');
const router = express.Router();

// Sample events data
let events = [
  {
    id: 'event1',
    title: 'Event 1',
    start: '2023-07-01T10:00:00',
    end: '2023-07-01T12:00:00',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    specialMessage: 'Special instructions: Lorem ipsum dolor sit amet.',
  },
  {
    id: 'event2',
    title: 'Event 2',
    start: '2023-07-02T12:00:00',
    end: '2023-07-02T14:00:00',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '0987654321',
    specialMessage: 'Special instructions: Consectetur adipiscing elit.',
  },
];


// Create a new event
router.post('/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Update an event
router.put('/events/:id', (req, res) => {
  const eventId = req.params.id;
  const updatedEvent = req.body;

  const eventIndex = events.findIndex((event) => event.id === eventId);
  if (eventIndex !== -1) {
    events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
    res.json(events[eventIndex]);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// Delete an event
router.delete('/events/:id', (req, res) => {
  const eventId = req.params.id;

  const eventIndex = events.findIndex((event) => event.id === eventId);
  if (eventIndex !== -1) {
    const deletedEvent = events.splice(eventIndex, 1);
    res.json(deletedEvent[0]);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

module.exports = router;

