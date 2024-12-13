const express = require('express');
const router = express.Router();
const Database = require('../database/fsdb');
const db = new Database('registrations.json');

// POST /api/register
router.post('/register', (req, res) => {
    const { name, email, eventName } = req.body;
    const registrationDate = new Date().toISOString();
    const ticketNumber = db.generateTicketNumber();

    const registration = {
        ticketNumber,
        name,
        email,
        eventName,
        registrationDate
    };

    db.insert(registration);
    res.json(registration);
});

// GET /api/registrations
router.get('/registrations', (req, res) => {
    const registrations = db.findAll();
    res.json(registrations);
});

// GET /api/registrations/byname/:name
router.get('/registrations/byname/:name', (req, res) => {
    const registrations = db.findByName(req.params.name);
    res.json(registrations);
});

// GET /api/registrations/event/:eventName
router.get('/registrations/event/:eventName', (req, res) => {
    const registrations = db.findByEvent(req.params.eventName);
    res.json(registrations);
});

// GET /api/registrations/cancel/:ticketNumber
router.get('/registrations/cancel/:ticketNumber', (req, res) => {
    const success = db.deleteByTicket(req.params.ticketNumber);
    if (success) {
        res.json({ message: 'Registration successfully cancelled' });
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

module.exports = router;