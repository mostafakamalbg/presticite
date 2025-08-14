// server/routes/orderRoutes.js
const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট করুন
const router = express.Router(); // Express রাউটার ইনস্ট্যান্স তৈরি করুন
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders, // সমস্ত অর্ডার পাওয়ার জন্য (শুধুমাত্র অ্যাডমিন)
} = require('../controllers/orderController'); // orderController থেকে ফাংশনগুলি ইম্পোর্ট করুন
const { protect, admin } = require('../middlewares/authMiddleware'); // authMiddleware থেকে ফাংশনগুলি ইম্পোর্ট করুন (সুরক্ষার জন্য)

// নতুন অর্ডার তৈরি করুন (লগইন করা ব্যবহারকারী)
router.post('/', protect, createOrder);

// লগইন করা ব্যবহারকারীর সমস্ত অর্ডার পান করুন
router.get('/myorders', protect, getMyOrders);

// একটি নির্দিষ্ট অর্ডার আইডি দ্বারা পান করুন (লগইন করা ব্যবহারকারী বা অ্যাডমিন)
router.get('/:id', protect, getOrderById);

// অর্ডারের পেমেন্ট স্ট্যাটাস আপডেট করুন (লগইন করা ব্যবহারকারী)
router.put('/:id/pay', protect, updateOrderToPaid);

// অর্ডারের ডেলিভারি স্ট্যাটাস আপডেট করুন (শুধুমাত্র অ্যাডমিন)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

// সমস্ত অর্ডার পান করুন (শুধুমাত্র অ্যাডমিন)
router.get('/', protect, admin, getOrders); // এই রাউটটি '/' এর POST এর নিচে থাকতে পারে, অথবা আলাদাভাবে সংজ্ঞায়িত হতে পারে।

module.exports = router; // রাউটার এক্সপোর্ট করুন
