// server/routes/authRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// @desc    নতুন ব্যবহারকারী নিবন্ধন করুন
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

// @desc    বিদ্যমান ব্যবহারকারী লগইন করুন
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);

// @desc    লগইন করা ব্যবহারকারীর প্রোফাইল ডেটা পান
// @route   GET /api/auth/me
// @access  Private (প্রটেক্টেড)
router.get('/me', protect, getMe);

module.exports = router;
