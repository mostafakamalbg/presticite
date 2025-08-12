// server/routes/invoiceRoutes.js
const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট করুন
const router = express.Router(); // Express রাউটার ইনস্ট্যান্স তৈরি করুন
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
} = require('../controllers/invoiceController'); // invoiceController থেকে ফাংশনগুলি ইম্পোর্ট করুন
const { protect, admin } = require('../middleware/authMiddleware'); // authMiddleware থেকে ফাংশনগুলি ইম্পোর্ট করুন (সুরক্ষার জন্য)

// নতুন ইনভয়েস তৈরি করুন (শুধুমাত্র অ্যাডমিন)
router.post('/', protect, admin, createInvoice);

// সমস্ত ইনভয়েস পান করুন (শুধুমাত্র অ্যাডমিন)
router.get('/', protect, admin, getInvoices);

// একটি নির্দিষ্ট ইনভয়েস আইডি দ্বারা পান করুন (শুধুমাত্র অ্যাডমিন)
router.get('/:id', protect, admin, getInvoiceById);

// একটি ইনভয়েসের স্ট্যাটাস আপডেট করুন (শুধুমাত্র অ্যাডমিন)
router.put('/:id/status', protect, admin, updateInvoiceStatus);

// একটি ইনভয়েস মুছে ফেলুন (শুধুমাত্র অ্যাডমিন)
router.delete('/:id', protect, admin, deleteInvoice);

module.exports = router; // রাউটার এক্সপোর্ট করুন
