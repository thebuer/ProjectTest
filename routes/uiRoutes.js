const express = require('express');
const router = express.Router();
const path = require('path');

// GET /UI/registrations/register
router.get('/registrations/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../resources/views/register.html'));
});

// GET /UI/registrations/view
router.get('/registrations/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../resources/views/view.html'));
});

module.exports = router;