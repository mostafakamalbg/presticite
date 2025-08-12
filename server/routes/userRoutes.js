// server/routes/userRoutes.js
const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট করুন
const router = express.Router(); // Express রাউটার ইনস্ট্যান্স তৈরি করুন
const {
  registerUser,
  loginUser,
  getMe,
  getUsers, // নতুন
  updateUserRole, // নতুন
  deleteUser, // নতুন
} = require('../controllers/userController'); // userController থেকে ফাংশনগুলি ইম্পোর্ট করুন
const { protect, admin } = require('../middleware/authMiddleware'); // authMiddleware থেকে ফাংশনগুলি ইম্পোর্ট করুন

// ব্যবহারকারী নিবন্ধন রাউট
router.post('/register', registerUser);

// ব্যবহারকারী লগইন রাউট
router.post('/login', loginUser);

// লগইন করা ব্যবহারকারীর প্রোফাইল ডেটা পাওয়ার রাউট
// এই রাউটটি 'protect' মিডলওয়্যার দ্বারা সুরক্ষিত
router.get('/me', protect, getMe);

// ***নতুন: অ্যাডমিন ব্যবহারকারী ব্যবস্থাপনার রাউটগুলি***
// সমস্ত ব্যবহারকারী পান করুন (শুধুমাত্র অ্যাডমিন)
router.get('/', protect, admin, getUsers);

// ব্যবহারকারীর ভূমিকা আপডেট করুন (শুধুমাত্র অ্যাডমিন)
router.put('/:id/role', protect, admin, updateUserRole);

// ব্যবহারকারী মুছে ফেলুন (শুধুমাত্র অ্যাডমিন)
router.delete('/:id', protect, admin, deleteUser);

module.exports = router; // রাউটার এক্সপোর্ট করুন
