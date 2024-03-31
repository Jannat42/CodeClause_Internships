const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend','event.html')));

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/eventManagementSystem';
mongoose.connect(uri).then(() => {
    console.log('Connected to MongoDB');
    // Start the server once connected to the database
    const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);

// Route handler for the root URL ("/") to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'event.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});
