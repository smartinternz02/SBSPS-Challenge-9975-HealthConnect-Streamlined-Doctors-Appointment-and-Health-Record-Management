const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// verify email
router.post('/verify-email', authController.verifyOTP)

//forgot password
router.post('/forgot-password', authController.forgotPassword)

//reset Password
router.post('/reset-Password', authController.resetPassword)

//forgot password
router.put('/update-Profile', authMiddleware.requireEmailVerification, authController.updateProfile)

//forgot password
router.put('/change-Password',authMiddleware.requireEmailVerification, authController.changePassword)

module.exports = router;
