const express = require('express');
const router = express.Router();
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
router.post('/update-Profile', authController.updateProfile)

//forgot password
router.post('/change-Password', authController.changePassword)

module.exports = router;
