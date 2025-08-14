// server/routes/inventoryRoutes.js
const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট করুন
const router = express.Router(); // Express রাউটার ইনস্ট্যান্স তৈরি করুন
const {
  getInventories,
  getInventoryByProductId,
  createInventory,
  updateInventory,
  deleteInventory,
} = require('../controllers/inventoryController'); // inventoryController থেকে ফাংশনগুলি ইম্পোর্ট করুন
const { protect, admin } = require('../middlewares/authMiddleware'); // authMiddleware থেকে ফাংশনগুলি ইম্পোর্ট করুন (সুরক্ষার জন্য)

// সমস্ত ইনভেন্টরি আইটেম পাওয়ার এবং নতুন ইনভেন্টরি এন্ট্রি তৈরি করার জন্য রাউট
// এই রাউটগুলি 'protect' এবং 'admin' মিডলওয়্যার দ্বারা সুরক্ষিত
router.route('/')
  .get(protect, admin, getInventories) // GET রিকোয়েস্ট: সমস্ত ইনভেন্টরি পান
  .post(protect, admin, createInventory); // POST রিকোয়েস্ট: নতুন ইনভেন্টরি তৈরি করুন

// একটি নির্দিষ্ট পণ্যের জন্য ইনভেন্টরি পাওয়ার, আপডেট করার এবং মুছে ফেলার জন্য রাউট
// এই রাউটগুলিও 'protect' এবং 'admin' মিডলওয়্যার দ্বারা সুরক্ষিত
router.route('/:productId')
  .get(protect, admin, getInventoryByProductId) // GET রিকোয়েস্ট: একটি নির্দিষ্ট পণ্যের ইনভেন্টরি পান
  .put(protect, admin, updateInventory) // PUT রিকোয়েস্ট: একটি ইনভেন্টরি আইটেম আপডেট করুন
  .delete(protect, admin, deleteInventory); // DELETE রিকোয়েস্ট: একটি ইনভেন্টরি এন্ট্রি মুছে ফেলুন

module.exports = router; // রাউটার এক্সপোর্ট করুন
