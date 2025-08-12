// server/config/db.js
const mongoose = require('mongoose');

// MongoDB Atlas এর সাথে সংযোগ স্থাপনকারী ফাংশন
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1); // ত্রুটির ক্ষেত্রে প্রক্রিয়া থেকে প্রস্থান করুন
  }
};

module.exports = connectDB;
