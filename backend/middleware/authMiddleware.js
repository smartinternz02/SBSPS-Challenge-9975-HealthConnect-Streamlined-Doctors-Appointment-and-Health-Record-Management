const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireEmailVerification = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token and decode it to get the user information
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      // Get the userId from the decoded token
      const userId = decodedToken.userId;
      req.userId = userId;

      // Retrieve the user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Check if the user's email is verified
      if (!user.isEmailVerified) {
        return res.status(403).json({ message: 'Email not verified. Please verify your email first.' });
      }

      // If email is verified, allow the user to access the next route handler
      next();
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { requireEmailVerification };
