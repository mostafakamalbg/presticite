// server/models/Order.js
const mongoose = require('mongoose'); // Mongoose লাইব্রেরি ইম্পোর্ট করুন

// অর্ডারের জন্য Mongoose স্কিমা সংজ্ঞায়িত করুন
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // এই ফিল্ডটি User মডেলের ObjectId রেফারেন্স করবে
      required: true, // ব্যবহারকারী আবশ্যক
      ref: 'User', // 'User' মডেলের সাথে সম্পর্ক স্থাপন করুন
    },
    orderItems: [
      {
        name: { type: String, required: true }, // পণ্যের নাম
        quantity: { type: Number, required: true }, // পণ্যের পরিমাণ
        image: { type: String }, // পণ্যের ছবি (যদি থাকে)
        price: { type: Number, required: true }, // পণ্যের মূল্য
        product: {
          type: mongoose.Schema.Types.ObjectId, // এই ফিল্ডটি Product মডেলের ObjectId রেফারেন্স করবে
          required: true, // পণ্য আবশ্যক
          ref: 'Product', // 'Product' মডেলের সাথে সম্পর্ক স্থাপন করুন
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true }, // ঠিকানা
      city: { type: String, required: true }, // শহর
      postalCode: { type: String, required: true }, // পোস্টাল কোড
      country: { type: String, required: true }, // দেশ
    },
    paymentMethod: {
      type: String,
      required: true, // পেমেন্ট পদ্ধতি আবশ্যক
    },
    paymentResult: {
      // পেমেন্ট গেটওয়ে থেকে প্রাপ্ত ডেটা (যেমন Stripe, SSLCommerz)
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false, // ডিফল্টভাবে অপরিশোধিত
    },
    paidAt: {
      type: Date, // অর্থ প্রদানের তারিখ
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false, // ডিফল্টভাবে ডেলিভারি হয়নি
    },
    deliveredAt: {
      type: Date, // ডেলিভারির তারিখ
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], // অর্ডারের অবস্থা
      default: 'Pending', // ডিফল্ট অবস্থা 'Pending'
    },
  },
  {
    timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড যোগ করবে
  }
);

// Order মডেল তৈরি করুন এবং এক্সপোর্ট করুন
module.exports = mongoose.model('Order', orderSchema);
