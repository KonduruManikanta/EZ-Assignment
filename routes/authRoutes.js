

// In routes/authRoutes.js
const express = require('express');
const { signup, login, verifyEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify-email/:verification_code', verifyEmail); // Add this line for verification

module.exports = router;
