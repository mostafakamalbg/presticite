// server/utils/sendEmail.js
const nodemailer = require('nodemailer'); // Nodemailer ইম্পোর্ট করুন
const asyncHandler = require('express-async-handler'); // অ্যাসিঙ্ক্রোনাস ত্রুটি হ্যান্ডলিংয়ের জন্য

// ইমেল পাঠানোর ফাংশন
const sendEmail = asyncHandler(async (options) => {
  // ট্রান্সপোর্টার তৈরি করুন (SMTP সার্ভার কনফিগারেশন)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // যদি পোর্ট 587 হয় তাহলে false, 465 হলে true
    auth: {
      user: process.env.EMAIL_USER, // আপনার ইমেল ঠিকানা
      pass: process.env.EMAIL_PASS, // আপনার অ্যাপ পাসওয়ার্ড
    },
    tls: {
      rejectUnauthorized: false // কিছু হোস্টিং এনভায়রনমেন্টের জন্য প্রয়োজন হতে পারে
    }
  });

  // ইমেল অপশন সংজ্ঞায়িত করুন
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`, // প্রেরকের ঠিকানা
    to: options.email, // প্রাপকের ঠিকানা
    subject: options.subject, // ইমেলের বিষয়
    html: options.message, // HTML ফরম্যাটে ইমেলের বডি
  };

  // ইমেল পাঠান
  await transporter.sendMail(mailOptions);

  console.log(`Email sent to: ${options.email}`);
});

module.exports = sendEmail;
