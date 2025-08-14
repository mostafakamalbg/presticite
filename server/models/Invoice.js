// server/models/Invoice.js
const mongoose = require('mongoose'); // Mongoose লাইব্রেরি ইম্পোর্ট করুন

// ইনভয়েসের জন্য Mongoose স্কিমা সংজ্ঞায়িত করুন
const invoiceSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId, // এই ফিল্ডটি Order মডেলের ObjectId রেফারেন্স করবে
      required: true, // অর্ডার আইডি আবশ্যক
      ref: 'Order', // 'Order' মডেলের সাথে সম্পর্ক স্থাপন করুন
      unique: true, // প্রতিটি অর্ডারের জন্য একটি মাত্র ইনভয়েস থাকবে
    },
    invoiceNumber: {
      type: String,
      required: true, // ইনভয়েস নম্বর আবশ্যক
      unique: true, // ইনভয়েস নম্বর অনন্য হতে হবে
    },
    issueDate: {
      type: Date,
      required: true, // ইস্যু তারিখ আবশ্যক
      default: Date.now, // ডিফল্টভাবে বর্তমান তারিখ
    },
    totalAmount: {
      type: Number,
      required: true, // মোট পরিমাণ আবশ্যক
      default: 0.0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'], // ইনভয়েসের অবস্থা
      default: 'Pending', // ডিফল্ট অবস্থা 'Pending'
    },
    // ভবিষ্যতে অন্যান্য ইনভয়েস-সম্পর্কিত ফিল্ড যোগ করা যেতে পারে, যেমন:
    // customerInfo: {
    //   name: String,
    //   email: String,
    // },
    // items: [ // অর্ডারের আইটেমগুলির একটি স্ন্যাপশট
    //   {
    //     productName: String,
    //     quantity: Number,
    //     unitPrice: Number,
    //   }
    // ]
  },
  {
    timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড যোগ করবে
  }
);

// Invoice মডেল তৈরি করুন এবং এক্সপোর্ট করুন
module.exports = mongoose.model('Invoice', invoiceSchema);
