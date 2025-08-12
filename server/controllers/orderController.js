// server/controllers/orderController.js
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য
const Order = require('../models/Order'); // Order মডেল ইম্পোর্ট করুন
const Product = require('../models/Product'); // Product মডেল ইম্পোর্ট করুন (স্টক আপডেটের জন্য)
const Inventory = require('../models/Inventory'); // Inventory মডেল ইম্পোর্ট করুন (স্টক আপডেটের জন্য)
const sendEmail = require('../utils/sendEmail'); // ***নতুন: ইমেল পাঠানোর ইউটিলিটি ইম্পোর্ট করুন***

// @desc    নতুন অর্ডার তৈরি করুন
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // প্রতিটি অর্ডার আইটেমের জন্য স্টক যাচাই এবং আপডেট করুন
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item.name}`);
      }

      const inventory = await Inventory.findOne({ product: item.product });
      if (!inventory || inventory.quantity < item.quantity) {
        res.status(400);
        throw new Error(`Insufficient stock for product: ${item.name}. Available: ${inventory ? inventory.quantity : 0}`);
      }

      // স্টক আপডেট করুন
      inventory.quantity -= item.quantity;
      await inventory.save();
    }

    const order = new Order({
      user: req.user._id, // প্রমাণীকৃত ব্যবহারকারীর আইডি
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save(); // অর্ডার সেভ করুন

    // ***নতুন: অর্ডার নিশ্চিতকরণ ইমেল পাঠান***
    const emailMessage = `
      <h1>Order Confirmation</h1>
      <p>Dear ${req.user.name},</p>
      <p>Your order with ID: <strong>${createdOrder._id}</strong> has been successfully placed.</p>
      <p><strong>Order Summary:</strong></p>
      <ul>
        ${createdOrder.orderItems.map(item => `<li>${item.name} (x${item.quantity}) - Price: ৳${item.price.toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Total Amount:</strong> ৳${createdOrder.totalPrice.toFixed(2)}</p>
      <p><strong>Shipping Address:</strong><br/>
      ${createdOrder.shippingAddress.address}, ${createdOrder.shippingAddress.city}, ${createdOrder.shippingAddress.postalCode}, ${createdOrder.shippingAddress.country}</p>
      <p>Thank you for your purchase!</p>
      <p>BG Agro Limited</p>
    `;

    try {
      await sendEmail({
        email: req.user.email,
        subject: `Order Confirmation - BG Agro Limited #${createdOrder._id}`,
        message: emailMessage,
      });
      console.log('Order confirmation email sent successfully.');
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // ইমেল পাঠাতে ব্যর্থ হলেও অর্ডার তৈরি হওয়া উচিত, তাই এখানে ত্রুটি থ্রো করা হচ্ছে না।
    }

    res.status(201).json(createdOrder); // 201 Created স্ট্যাটাস সহ তৈরি করা অর্ডার পাঠান
  }
});

// @desc    লগইন করা ব্যবহারকারীর সমস্ত অর্ডার পান করুন
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // প্রমাণীকৃত ব্যবহারকারীর আইডি দ্বারা অর্ডার খুঁজুন
  const orders = await Order.find({ user: req.user._id }).populate(
    'user',
    'name email'
  );
  res.status(200).json(orders); // 200 OK স্ট্যাটাস সহ অর্ডারগুলি JSON ফরম্যাটে পাঠান
});

// @desc    একটি নির্দিষ্ট অর্ডার আইডি দ্বারা পান করুন
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // অর্ডার আইডি দ্বারা অর্ডার খুঁজুন এবং ব্যবহারকারীর বিবরণ পপুলেট করুন
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // নিশ্চিত করুন যে অর্ডারটি হয় লগইন করা ব্যবহারকারীর অথবা অ্যাডমিনের
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to view this order');
  }

  res.status(200).json(order); // 200 OK স্ট্যাটাস সহ অর্ডারটি JSON ফরম্যাটে পাঠান
});

// @desc    অর্ডারের পেমেন্ট স্ট্যাটাস আপডেট করুন
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // পেমেন্ট ডেটা আপডেট করুন
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save(); // অর্ডার সেভ করুন

  res.json(updatedOrder); // আপডেট করা অর্ডার পাঠান
});

// @desc    অর্ডারের ডেলিভারি স্ট্যাটাস আপডেট করুন (শুধুমাত্র অ্যাডমিন)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // ডেলিভারি স্ট্যাটাস আপডেট করুন
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  order.orderStatus = 'Delivered'; // অর্ডারের অবস্থা 'Delivered' এ সেট করুন

  const updatedOrder = await order.save(); // অর্ডার সেভ করুন

  res.json(updatedOrder); // আপডেট করা অর্ডার পাঠান
});

// @desc    সমস্ত অর্ডার পান করুন (শুধুমাত্র অ্যাডমিন)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // সমস্ত অর্ডার খুঁজুন এবং ব্যবহারকারীর বিবরণ পপুলেট করুন
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders); // 200 OK স্ট্যাটাস সহ অর্ডারগুলি JSON ফরম্যাটে পাঠান
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
