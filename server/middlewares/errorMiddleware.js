// server/middleware/errorMiddleware.js
// ত্রুটি হ্যান্ডলিং মিডলওয়্যার

// এই ফাংশনটি Express এর ডিফল্ট ত্রুটি হ্যান্ডলারকে ওভাররাইড করবে।
// এটি চারটি আর্গুমেন্ট নেয়: err, req, res, next।
const errorHandler = (err, req, res, next) => {
  // HTTP স্ট্যাটাস কোড সেট করুন। যদি রেসপন্সে স্ট্যাটাস কোড সেট করা না থাকে (যেমন 200 OK),
  // তাহলে 500 (Internal Server Error) ব্যবহার করুন।
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode); // সেট করা স্ট্যাটাস কোড সহ রেসপন্স স্ট্যাটাস সেট করুন

  // JSON ফরম্যাটে ত্রুটির বিবরণ পাঠান
  res.json({
    message: err.message, // ত্রুটির বার্তা
    // ডেভেলপমেন্ট মোডে স্ট্যাক ট্রেস পাঠান, প্রোডাকশন মোডে নয়।
    // এটি ডিবাগিংয়ের জন্য সহায়ক কিন্তু নিরাপত্তা কারণে প্রোডাকশনে লুকানো উচিত।
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
