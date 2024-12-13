const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const uiRoutes = require('./routes/uiRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/resources', express.static(path.join(__dirname, 'resources')));

// Routes
app.use('/api', apiRoutes);
app.use('/UI', uiRoutes);

// Default route
app.get('/', (req, res) => {
    res.redirect('/UI/registrations/register');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
