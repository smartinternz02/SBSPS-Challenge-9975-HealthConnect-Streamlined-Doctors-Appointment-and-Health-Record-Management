const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');
const otpService = require('../services/otpService');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //generate otp 
    const otp = otpService.generateOTP();

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, role,otp });
    await newUser.save();

    // Send OTP to user's email
    sendVerificationEmail(email, otp);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user in the database based on the email
    const user = await User.findOne({ email });

    // Check if the user exists and the OTP is valid
    if (!user || !otpService.validateOTP(otp, user.otp)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark the user's email as verified
    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verification successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const otp = otpService.generateOTP();
    user.otp = otp;
    await user.save();

    // Send OTP to user's email
    sendVerificationEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to your email. Please reset your password.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find the user in the database based on the email
    const user = await User.findOne({ email });

    // Check if the user exists and the OTP is valid
    if (!user || !otpService.validateOTP(otp, user.otp)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, contactInfo } = req.body;
    const userId = req.userId; 

    // Find the user in the database based on the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile details
    user.name = name;
    user.contactInfo = contactInfo;
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId; 

    // Find the user in the database based on the user ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password is correct
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid current password' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
