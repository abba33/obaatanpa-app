const express = require('express');
const router = express.Router();
const {
  signup,
  verifyEmail,
  login,
  chatbot,
  trackSymptom,
  getJournalEntries,
  bookAppointment,
  getUserAppointments,
  getMe
} = require('../controllers/userController');
const { protect, requireVerification } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/verify', verifyEmail);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/chatbot', protect, chatbot);
router.post('/symptom-tracking', protect, trackSymptom);
router.get('/journal', protect, getJournalEntries);
router.post('/book-appointment', protect, bookAppointment);
router.get('/appointments', protect, getUserAppointments);

module.exports = router; 