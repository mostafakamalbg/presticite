// server/controllers/productController.js
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য
const Product = require('../models/Product'); // Product মডেল ইম্পোর্ট করুন

// @desc    সমস্ত পণ্য পান করুন
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find(); // ডাটাবেস থেকে সমস্ত পণ্য খুঁজুন
  res.status(200).json(products); // 200 OK স্ট্যাটাস সহ পণ্যগুলি JSON ফরম্যাটে পাঠান
});

// @desc    একটি নির্দিষ্ট পণ্য আইডি দ্বারা পান করুন
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // প্যারামিটারে থাকা আইডি দ্বারা পণ্য খুঁজুন

  if (!product) {
    // যদি পণ্য না পাওয়া যায়, 404 Not Found স্ট্যাটাস পাঠান
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(product); // 200 OK স্ট্যাটাস সহ পণ্যটি JSON ফরম্যাটে পাঠান
});

// @desc    নতুন পণ্য তৈরি করুন
// @route   POST /api/products
// @access  Public (অথবা Private, যদি প্রমাণীকরণ প্রয়োজন হয়)
const createProduct = asyncHandler(async (req, res) => {
  // অনুরোধের বডি থেকে পণ্যের ডেটা নিন
  const { name, description, price, category, stock } = req.body;

  // ডেটা যাচাই করুন
  if (!name || !description || !price || !category || !stock) {
    res.status(400); // 400 Bad Request স্ট্যাটাস পাঠান
    throw new Error('Please fill all fields');
  }

  // নতুন পণ্য তৈরি করুন
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
  });

  // 201 Created স্ট্যাটাস সহ নতুন তৈরি করা পণ্যটি পাঠান
  res.status(201).json(product);
});

// @desc    একটি পণ্য আপডেট করুন
// @route   PUT /api/products/:id
// @access  Public (অথবা Private, যদি প্রমাণীকরণ প্রয়োজন হয়)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // আইডি দ্বারা পণ্য খুঁজুন

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // পণ্য আপডেট করুন এবং আপডেট করা ডকুমেন্টটি ফেরত দিন
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body, // অনুরোধের বডি থেকে আপডেট ডেটা নিন
    {
      new: true, // আপডেট করার পরে নতুন, আপডেট করা ডকুমেন্টটি ফেরত দিন
      runValidators: true, // আপডেটের সময় স্কিমা ভ্যালিডেটর চালান
    }
  );

  res.status(200).json(updatedProduct); // 200 OK স্ট্যাটাস সহ আপডেট করা পণ্যটি পাঠান
});

// @desc    একটি পণ্য মুছে ফেলুন
// @route   DELETE /api/products/:id
// @access  Public (অথবা Private, যদি প্রমাণীকরণ প্রয়োজন হয়)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // আইডি দ্বারা পণ্য খুঁজুন

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await Product.deleteOne({ _id: req.params.id }); // পণ্যটি মুছে ফেলুন

  res.status(200).json({ message: 'Product removed' }); // 200 OK স্ট্যাটাস সহ সফলতার বার্তা পাঠান
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
