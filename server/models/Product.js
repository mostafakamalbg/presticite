// server/models/Product.js
const mongoose = require('mongoose'); // Mongoose লাইব্রেরি ইম্পোর্ট করুন

// পণ্যের জন্য Mongoose স্কিমা সংজ্ঞায়িত করুন
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'], // পণ্যের নাম আবশ্যক
      trim: true, // নামের শুরুতে বা শেষে অতিরিক্ত স্পেস মুছে ফেলুন
    },
    description: {
      type: String,
      required: [true, 'Please add a description'], // পণ্যের বিবরণ আবশ্যক
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'], // পণ্যের মূল্য আবশ্যক
      default: 0, // ডিফল্ট মূল্য 0
    },
    category: {
      type: String,
      required: [true, 'Please add a category'], // পণ্যের ক্যাটাগরি আবশ্যক
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'], // স্টকের পরিমাণ আবশ্যক
      default: 0, // ডিফল্ট স্টক 0
    },
    // ভবিষ্যতে ছবির URL বা রেফারেন্স এখানে যোগ করা যেতে পারে
    // image: {
    //   type: String,
    //   default: 'no-photo.jpg'
    // }
  },
  {
    timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড যোগ করবে
  }
);

// Product মডেল তৈরি করুন এবং এক্সপোর্ট করুন
module.exports = mongoose.model('Product', productSchema);
