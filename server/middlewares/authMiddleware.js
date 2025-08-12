// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // JWT লাইব্রেরি ইম্পোর্ট করুন
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য
const User = require('../models/User'); // User মডেল ইম্পোর্ট করুন

// সুরক্ষিত রাউটগুলির জন্য প্রমাণীকরণ মিডলওয়্যার
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // রিকোয়েস্ট হেডার্সে Authorization ফিল্ড এবং Bearer টোকেন আছে কিনা তা পরীক্ষা করুন
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // হেডার থেকে টোকেন পান
      token = req.headers.authorization.split(' ')[1];

      // টোকেন যাচাই করুন
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // টোকেন থেকে ব্যবহারকারীর আইডি দ্বারা ব্যবহারকারী খুঁজুন এবং পাসওয়ার্ড ছাড়া ব্যবহারকারীর ডেটা সংযুক্ত করুন
      req.user = await User.findById(decoded.id).select('-password');

      // যদি ব্যবহারকারী না পাওয়া যায়
      if (!req.user) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, user not found');
      }

      next(); // পরবর্তী মিডলওয়্যার বা রাউট হ্যান্ডলারে যান
    } catch (error) {
      console.error(error);
      res.status(401); // Unauthorized
      throw new Error('Not authorized, token failed');
    }
  }

  // যদি কোনো টোকেন না থাকে
  if (!token) {
    res.status(401); // Unauthorized
    throw new Error('Not authorized, no token');
  }
});

// অ্যাডমিন অ্যাক্সেসের জন্য মিডলওয়্যার
const admin = (req, res, next) => {
  // নিশ্চিত করুন যে ব্যবহারকারী লগইন করা আছে এবং তার ভূমিকা 'admin'
  if (req.user && req.user.role === 'admin') {
    next(); // পরবর্তী মিডলওয়্যার বা রাউট হ্যান্ডলারে যান
  } else {
    res.status(403); // Forbidden
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };
