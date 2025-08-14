// server/server.js
const express = require('express'); // Express ফ্রেমওয়ার্ক ইম্পোর্ট করুন
const dotenv = require('dotenv').config(); // .env ফাইল থেকে পরিবেশ ভেরিয়েবল লোড করুন
const colors = require('colors'); // কনসোল আউটপুটকে রঙিন করতে
const connectDB = require('./config/db'); // ডাটাবেস সংযোগ ফাংশন ইম্পোর্ট করুন
const productRoutes = require('./routes/productRoutes'); // পণ্য রাউট ইম্পোর্ট করুন
const userRoutes = require('./routes/userRoutes'); // ব্যবহারকারী রাউট ইম্পোর্ট করুন
const inventoryRoutes = require('./routes/inventoryRoutes'); // ইনভেন্টরি রাউট ইম্পোর্ট করুন
const orderRoutes = require('./routes/orderRoutes'); // ***নতুন: অর্ডার রাউট ইম্পোর্ট করুন***
const invoiceRoutes = require('./routes/invoiceRoutes'); // ***নতুন: ইনভয়েস রাউট ইম্পোর্ট করুন***
const { errorHandler } = require('./middlewares/errorMiddleware'); // ত্রুটি হ্যান্ডলার ইম্পোর্ট করুন

// MongoDB Atlas এর সাথে সংযোগ স্থাপন করুন
connectDB();

const app = express(); // Express অ্যাপ্লিকেশন শুরু করুন

// মিডলওয়্যার
// JSON বডি পার্স করার জন্য
app.use(express.json());
// URL-encoded বডি পার্স করার জন্য (যেমন ফর্ম ডেটা)
app.use(express.urlencoded({ extended: false }));

// প্রাথমিক রাউট
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to BG Agro Limited API' });
});

// পণ্য রাউট ব্যবহার করুন
app.use('/api/products', productRoutes);
// ব্যবহারকারী রাউট ব্যবহার করুন
app.use('/api/users', userRoutes);
// ইনভেন্টরি রাউট ব্যবহার করুন
app.use('/api/inventory', inventoryRoutes);
// ***নতুন: অর্ডার রাউট ব্যবহার করুন***
app.use('/api/orders', orderRoutes);
// ***নতুন: ইনভয়েস রাউট ব্যবহার করুন***
app.use('/api/invoices', invoiceRoutes);


// ত্রুটি হ্যান্ডলিং মিডলওয়্যার ব্যবহার করুন
app.use(errorHandler);

// সার্ভার পোর্ট
const PORT = process.env.PORT || 5000;

// সার্ভার চালু করুন
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
