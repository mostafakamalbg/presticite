// server/routes/productRoutes.js
const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট করুন
const router = express.Router(); // Express রাউটার ইনস্ট্যান্স তৈরি করুন
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController'); // productController থেকে ফাংশনগুলি ইম্পোর্ট করুন
const { protect, admin } = require('../middlewares/authMiddleware'); // authMiddleware থেকে ফাংশনগুলি ইম্পোর্ট করুন (সুরক্ষার জন্য)

// সমস্ত পণ্য পাওয়ার এবং নতুন পণ্য তৈরি করার জন্য রাউট
router.route('/').get(getProducts).post(createProduct);

// একটি নির্দিষ্ট পণ্য আইডি দ্বারা পাওয়ার, আপডেট করার এবং মুছে ফেলার জন্য রাউট
router.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router; // রাউটার এক্সপোর্ট করুন
