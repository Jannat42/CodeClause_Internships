// authMiddleware.js

// Import required dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Define middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        // Extract the JWT token from the request headers
        const token = req.headers.authorization?.split(' ')[1];

        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, 'your-secret-key');

        // Check if user exists in database
        const user = await User.findById(decodedToken.userId);

        // Check if user is found
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Attach user object to request for further use
        req.user = user;

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Export the middleware function
module.exports = authenticateUser;
