// server/controllers/inventoryController.js
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য
const Inventory = require('../models/Inventory'); // Inventory মডেল ইম্পোর্ট করুন
const Product = require('../models/Product'); // Product মডেল ইম্পোর্ট করুন (ইনভেন্টরি তৈরি করার সময় পণ্য যাচাইয়ের জন্য)

// @desc    সমস্ত ইনভেন্টরি আইটেম পান করুন
// @route   GET /api/inventory
// @access  Public (অথবা Private, অ্যাডমিন)
const getInventories = asyncHandler(async (req, res) => {
  // সমস্ত ইনভেন্টরি আইটেম খুঁজুন এবং তাদের সম্পর্কিত পণ্যের বিবরণ পপুলেট করুন
  const inventories = await Inventory.find().populate('product', 'name price category');
  res.status(200).json(inventories); // 200 OK স্ট্যাটাস সহ ইনভেন্টরিগুলি JSON ফরম্যাটে পাঠান
});

// @desc    একটি নির্দিষ্ট পণ্যের জন্য ইনভেন্টরি পান করুন
// @route   GET /api/inventory/:productId
// @access  Public (অথবা Private, অ্যাডমিন)
const getInventoryByProductId = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findOne({ product: req.params.productId }).populate('product', 'name price category');

  if (!inventory) {
    // যদি ইনভেন্টরি না পাওয়া যায়, 404 Not Found স্ট্যাটাস পাঠান
    res.status(404);
    throw new Error('Inventory for this product not found');
  }

  res.status(200).json(inventory); // 200 OK স্ট্যাটাস সহ ইনভেন্টরি আইটেমটি JSON ফরম্যাটে পাঠান
});

// @desc    একটি নতুন ইনভেন্টরি এন্ট্রি তৈরি করুন
// @route   POST /api/inventory
// @access  Private/Admin
const createInventory = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // ডেটা যাচাই করুন
  if (!productId || quantity === undefined || quantity < 0) {
    res.status(400); // 400 Bad Request স্ট্যাটাস পাঠান
    throw new Error('Please provide product ID and a valid quantity');
  }

  // পণ্যটি বিদ্যমান কিনা তা যাচাই করুন
  const productExists = await Product.findById(productId);
  if (!productExists) {
    res.status(404);
    throw new Error('Product not found');
  }

  // ইনভেন্টরি এন্ট্রি ইতিমধ্যে বিদ্যমান কিনা তা পরীক্ষা করুন
  const inventoryExists = await Inventory.findOne({ product: productId });
  if (inventoryExists) {
    res.status(400);
    throw new Error('Inventory entry for this product already exists. Please update instead.');
  }

  // নতুন ইনভেন্টরি এন্ট্রি তৈরি করুন
  const inventory = await Inventory.create({
    product: productId,
    quantity,
  });

  // 201 Created স্ট্যাটাস সহ নতুন তৈরি করা ইনভেন্টরি এন্ট্রিটি পাঠান
  res.status(201).json(inventory);
});

// @desc    একটি ইনভেন্টরি আইটেমের পরিমাণ আপডেট করুন
// @route   PUT /api/inventory/:productId
// @access  Private/Admin
const updateInventory = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  // ডেটা যাচাই করুন
  if (quantity === undefined || quantity < 0) {
    res.status(400);
    throw new Error('Please provide a valid quantity');
  }

  const inventory = await Inventory.findOne({ product: req.params.productId });

  if (!inventory) {
    res.status(404);
    throw new Error('Inventory for this product not found');
  }

  // ইনভেন্টরি পরিমাণ আপডেট করুন
  inventory.quantity = quantity;
  const updatedInventory = await inventory.save(); // সেভ করে আপডেট করুন

  res.status(200).json(updatedInventory); // 200 OK স্ট্যাটাস সহ আপডেট করা ইনভেন্টরি পাঠান
});

// @desc    একটি ইনভেন্টরি এন্ট্রি মুছে ফেলুন
// @route   DELETE /api/inventory/:productId
// @access  Private/Admin
const deleteInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findOne({ product: req.params.productId });

  if (!inventory) {
    res.status(404);
    throw new Error('Inventory for this product not found');
  }

  await Inventory.deleteOne({ _id: inventory._id }); // ইনভেন্টরি এন্ট্রিটি মুছে ফেলুন

  res.status(200).json({ message: 'Inventory entry removed' }); // 200 OK স্ট্যাটাস সহ সফলতার বার্তা পাঠান
});

module.exports = {
  getInventories,
  getInventoryByProductId,
  createInventory,
  updateInventory,
  deleteInventory,
};
