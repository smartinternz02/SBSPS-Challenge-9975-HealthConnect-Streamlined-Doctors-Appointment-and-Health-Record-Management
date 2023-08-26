const express = require('express');
const router = express.Router();
const {requireEmailVerification} = require('../middleware/authMiddleware');
const {getRecommendedDoctors} = require('../controllers/appointmentController');

router.get('/recommended-doctors', requireEmailVerification, getRecommendedDoctors);

module.exports = router;