// server/models/Invoice.js
const mongoose = require('mongoose'); // Mongoose লাইব্রেরি ইম্পোর্ট

// ইনভয়েসের জন্য Mongoose স্কিমা সংজ্ঞায়িত
const invoiceSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId, // Order মডেলের ObjectId রেফারেন্স
      required: true, // অর্ডার আইডি আবশ্যক
      ref: 'Order', // 'Order' মডেলের সাথে সম্পর্ক
      unique: true, // প্রতিটি অর্ডারের জন্য একটি মাত্র ইনভয়েস
    },
    invoiceNumber: {
      type: String,
      required: true, // ইনভয়েস নম্বর আবশ্যক
      unique: true, // ইনভয়েস নম্বর অনন্য
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
      default: 'Pending', // ডিফল্ট অবস্থা
    },
    // ভবিষ্যতে অন্যান্য ইনভয়েস-সম্পর্কিত ফিল্ড যোগ করা যেতে পারে
    // customerInfo: {
    //   name: String,
    //   email: String,
    // },
    // items: [
    //   {
    //     productName: String,
    //     quantity: Number,
    //     unitPrice: Number,
    //   }
    // ]
  },
  {
    timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড
  }
);

// Nodemon / Hot-reload safe মডেল এক্সপোর্ট
// যদি মডেল আগে থেকেই compile থাকে, সেটা ব্যবহার করবে
// না হলে নতুন মডেল compile করবে
const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice; // মডেল এক্সপোর্ট
