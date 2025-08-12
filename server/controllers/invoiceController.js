// server/controllers/invoiceController.js
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য
const Invoice = require('../models/Invoice'); // Invoice মডেল ইম্পোর্ট করুন
const Order = require('../models/Order'); // Order মডেল ইম্পোর্ট করুন (ইনভয়েস তৈরি করার জন্য)

// @desc    একটি অর্ডারের জন্য ইনভয়েস তৈরি করুন
// @route   POST /api/invoices
// @access  Private/Admin
const createInvoice = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  // অর্ডার আইডি যাচাই করুন
  if (!orderId) {
    res.status(400);
    throw new Error('Please provide an order ID to generate an invoice');
  }

  // অর্ডারটি বিদ্যমান কিনা তা যাচাই করুন
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // ইনভয়েস ইতিমধ্যে বিদ্যমান কিনা তা পরীক্ষা করুন
  const invoiceExists = await Invoice.findOne({ order: orderId });
  if (invoiceExists) {
    res.status(400);
    throw new Error('Invoice for this order already exists');
  }

  // একটি সহজ ইনভয়েস নম্বর তৈরি করুন (প্রোডাকশনে আরও শক্তিশালী লজিক প্রয়োজন হতে পারে)
  const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // নতুন ইনভয়েস তৈরি করুন
  const invoice = new Invoice({
    order: order._id,
    invoiceNumber,
    issueDate: Date.now(),
    totalAmount: order.totalPrice, // অর্ডারের মোট মূল্য ইনভয়েসে ব্যবহার করুন
    status: order.isPaid ? 'Paid' : 'Pending', // অর্ডারের পেমেন্ট স্ট্যাটাস অনুযায়ী ইনভয়েস স্ট্যাটাস সেট করুন
  });

  const createdInvoice = await invoice.save(); // ইনভয়েস সেভ করুন

  res.status(201).json(createdInvoice); // 201 Created স্ট্যাটাস সহ তৈরি করা ইনভয়েস পাঠান
});

// @desc    সমস্ত ইনভয়েস পান করুন
// @route   GET /api/invoices
// @access  Private/Admin
const getInvoices = asyncHandler(async (req, res) => {
  // সমস্ত ইনভয়েস খুঁজুন এবং তাদের সম্পর্কিত অর্ডারের বিবরণ পপুলেট করুন
  const invoices = await Invoice.find({}).populate('order', 'user totalPrice isPaid');
  res.status(200).json(invoices); // 200 OK স্ট্যাটাস সহ ইনভয়েসগুলি JSON ফরম্যাটে পাঠান
});

// @desc    একটি নির্দিষ্ট ইনভয়েস আইডি দ্বারা পান করুন
// @route   GET /api/invoices/:id
// @access  Private/Admin
const getInvoiceById = asyncHandler(async (req, res) => {
  // ইনভয়েস আইডি দ্বারা ইনভয়েস খুঁজুন এবং অর্ডারের বিবরণ পপুলেট করুন
  const invoice = await Invoice.findById(req.params.id).populate('order');

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  res.status(200).json(invoice); // 200 OK স্ট্যাটাস সহ ইনভয়েসটি JSON ফরম্যাটে পাঠান
});

// @desc    একটি ইনভয়েসের স্ট্যাটাস আপডেট করুন
// @route   PUT /api/invoices/:id/status
// @access  Private/Admin
const updateInvoiceStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // নতুন স্ট্যাটাস

  if (!status || !['Pending', 'Paid', 'Cancelled'].includes(status)) {
    res.status(400);
    throw new Error('Invalid invoice status provided');
  }

  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  invoice.status = status; // ইনভয়েসের স্ট্যাটাস আপডেট করুন
  const updatedInvoice = await invoice.save(); // ইনভয়েস সেভ করুন

  res.status(200).json(updatedInvoice); // আপডেট করা ইনভয়েস পাঠান
});

// @desc    একটি ইনভয়েস মুছে ফেলুন
// @route   DELETE /api/invoices/:id
// @access  Private/Admin
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  await Invoice.deleteOne({ _id: req.params.id }); // ইনভয়েসটি মুছে ফেলুন

  res.status(200).json({ message: 'Invoice removed' }); // 200 OK স্ট্যাটাস সহ সফলতার বার্তা পাঠান
});

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
};
