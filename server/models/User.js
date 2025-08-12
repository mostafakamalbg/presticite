// server/models/User.js
const mongoose = require('mongoose'); // Mongoose লাইব্রেরি ইম্পোর্ট করুন
const bcrypt = require('bcryptjs'); // পাসওয়ার্ড হ্যাশ করার জন্য bcryptjs ইম্পোর্ট করুন

// ব্যবহারকারীর জন্য Mongoose স্কিমা সংজ্ঞায়িত করুন
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'], // নাম আবশ্যক
    },
    email: {
      type: String,
      required: [true, 'Please add an email'], // ইমেইল আবশ্যক
      unique: true, // ইমেইল অনন্য হতে হবে
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // ইমেইল ফরম্যাট যাচাই করুন
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'], // পাসওয়ার্ড আবশ্যক
      minlength: [6, 'Password must be at least 6 characters'], // সর্বনিম্ন 6 অক্ষরের পাসওয়ার্ড
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // ভূমিকা 'user' অথবা 'admin' হতে পারে
      default: 'user', // ডিফল্ট ভূমিকা 'user'
    },
  },
  {
    timestamps: true, // স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt ফিল্ড যোগ করবে
  }
);

// পাসওয়ার্ড সেভ করার আগে হ্যাশ করুন (pre-save hook)
userSchema.pre('save', async function (next) {
  // যদি পাসওয়ার্ড পরিবর্তন না হয় বা নতুন না হয়, তাহলে হ্যাশ করবেন না
  if (!this.isModified('password')) {
    next();
  }

  // পাসওয়ার্ড হ্যাশ করুন
  const salt = await bcrypt.genSalt(10); // সল্ট তৈরি করুন
  this.password = await bcrypt.hash(this.password, salt); // পাসওয়ার্ড হ্যাশ করুন
  next();
});

// ব্যবহারকারীর প্রবেশ করা পাসওয়ার্ড হ্যাশ করা পাসওয়ার্ডের সাথে তুলনা করার পদ্ধতি
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// User মডেল তৈরি করুন এবং এক্সপোর্ট করুন
module.exports = mongoose.model('User', userSchema);
