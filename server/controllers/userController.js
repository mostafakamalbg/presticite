// server/controllers/userController.js
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য
const User = require('../models/User'); // User মডেল ইম্পোর্ট করুন
const jwt = require('jsonwebtoken'); // JSON Web Token (JWT) ইম্পোর্ট করুন

// JWT টোকেন তৈরি করার ফাংশন
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // টোকেন 30 দিনের জন্য বৈধ থাকবে
  });
};

// @desc    নতুন ব্যবহারকারী নিবন্ধন করুন
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // সমস্ত ক্ষেত্র পূরণ করা হয়েছে কিনা তা যাচাই করুন
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // ব্যবহারকারী ইতিমধ্যে বিদ্যমান কিনা তা পরীক্ষা করুন
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // নতুন ব্যবহারকারী তৈরি করুন
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user', // যদি ভূমিকা নির্দিষ্ট না করা হয়, ডিফল্ট 'user' হবে
  });

  if (user) {
    // ব্যবহারকারী সফলভাবে তৈরি হলে
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // JWT টোকেন তৈরি করে পাঠান
    });
  } else {
    // ব্যবহারকারী তৈরি করতে ব্যর্থ হলে
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    ব্যবহারকারী লগইন করুন
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ইমেইল দ্বারা ব্যবহারকারী খুঁজুন
  const user = await User.findOne({ email });

  // ব্যবহারকারী বিদ্যমান কিনা এবং পাসওয়ার্ড মেলে কিনা তা পরীক্ষা করুন
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // JWT টোকেন তৈরি করে পাঠান
    });
  } else {
    // প্রমাণীকরণ ব্যর্থ হলে
    res.status(401); // 401 Unauthorized
    throw new Error('Invalid credentials');
  }
});

// @desc    ব্যবহারকারীর প্রোফাইল ডেটা পান করুন
// @route   GET /api/users/me
// @access  Private (প্রমাণীকরণ প্রয়োজন)
const getMe = asyncHandler(async (req, res) => {
  // req.user অবজেক্টটি authMiddleware দ্বারা পপুলেট করা হবে
  // এটি লগইন করা ব্যবহারকারীর ডেটা ধারণ করবে
  res.status(200).json(req.user);
});

// @desc    সমস্ত ব্যবহারকারী পান করুন (শুধুমাত্র অ্যাডমিন)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password'); // পাসওয়ার্ড ছাড়া সমস্ত ব্যবহারকারী খুঁজুন
  res.status(200).json(users);
});

// @desc    ব্যবহারকারীর ভূমিকা আপডেট করুন (শুধুমাত্র অ্যাডমিন)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body; // নতুন ভূমিকা
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // নিশ্চিত করুন যে ভূমিকা 'user' অথবা 'admin'
  if (!['user', 'admin'].includes(role)) {
    res.status(400);
    throw new Error('Invalid role specified');
  }

  user.role = role; // ভূমিকা আপডেট করুন
  const updatedUser = await user.save(); // ব্যবহারকারী সেভ করুন

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

// @desc    ব্যবহারকারী মুছে ফেলুন (শুধুমাত্র অ্যাডমিন)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // অ্যাডমিন নিজেকে মুছে ফেলতে পারবে না
  if (user._id.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error('Cannot delete yourself');
  }

  await User.deleteOne({ _id: req.params.id }); // ব্যবহারকারী মুছে ফেলুন

  res.status(200).json({ message: 'User removed' });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers, // নতুন
  updateUserRole, // নতুন
  deleteUser, // নতুন
};
