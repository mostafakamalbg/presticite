// client/src/pages/CheckoutPage.js
import React, { useState, useEffect } from 'react';

const CheckoutPage = ({ language }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Stripe'); // ডিফল্ট পেমেন্ট পদ্ধতি
  const [orderItems, setOrderItems] = useState([]); // অর্ডারের আইটেম

  // এই টোকেনটি শুধুমাত্র পরীক্ষার উদ্দেশ্যে ব্যবহৃত হচ্ছে।
  // একটি বাস্তব অ্যাপ্লিকেশনে, এটি ব্যবহারকারী লগইন করার পর ডাইনামিকভাবে প্রাপ্ত হবে।
  // এখানে একটি সাধারণ ব্যবহারকারী টোকেন ব্যবহার করা হচ্ছে, অ্যাডমিন টোকেন নয়।
  const USER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBjY2Q0MTk3YjE1YjQ4ZTAwMDAwMCIsImlhdCI6MTcyMjYwNDY0NCwiZXhwIjoxNzI1MTk2NjQ0fQ.YOUR_ACTUAL_USER_JWT_TOKEN_HERE"; // আপনার আসল ব্যবহারকারী JWT টোকেন এখানে দিন

  // ডামি অর্ডার আইটেম লোড করুন (বাস্তব অ্যাপে এটি কার্ট থেকে আসবে)
  useEffect(() => {
    // এখানে আপনি আপনার কার্ট থেকে পণ্য লোড করতে পারেন।
    // আপাতত, আমরা কিছু ডামি পণ্য ব্যবহার করছি।
    setOrderItems([
      {
        product: '60c72b2f9c1d44001c8c44c1', // একটি বিদ্যমান পণ্যের আইডি (আপনার ডাটাবেস থেকে)
        name: language === 'en' ? 'Organic Fertilizer' : 'জৈব সার',
        quantity: 2,
        price: 150.00,
        image: 'https://placehold.co/50x50/34D399/FFFFFF?text=Product',
      },
      {
        product: '60c72b2f9c1d44001c8c44c2', // আরেকটি বিদ্যমান পণ্যের আইডি
        name: language === 'en' ? 'High-Yield Seeds' : 'উচ্চ ফলনশীল বীজ',
        quantity: 1,
        price: 250.00,
        image: 'https://placehold.co/50x50/34D399/FFFFFF?text=Product',
      },
    ]);
  }, [language]);

  // শিপিং ঠিকানা পরিবর্তনের হ্যান্ডলার
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // পেমেন্ট পদ্ধতি পরিবর্তনের হ্যান্ডলার
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // অর্ডার তৈরি করার হ্যান্ডলার
  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // মোট মূল্য গণনা
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50; // উদাহরণ: 500 টাকার বেশি অর্ডারে ফ্রি শিপিং
    const taxPrice = itemsPrice * 0.10; // উদাহরণ: 10% ট্যাক্স
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const orderData = {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice: parseFloat(taxPrice.toFixed(2)),
      shippingPrice: parseFloat(shippingPrice.toFixed(2)),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${USER_TOKEN}`, // প্রমাণীকরণ হেডার
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to place order');
      }

      const data = await response.json();
      setSuccessMessage(language === 'en' ? `Order placed successfully! Order ID: ${data._id}. Now proceeding to payment...` : `অর্ডার সফলভাবে স্থাপন করা হয়েছে! অর্ডার আইডি: ${data._id}. এখন পেমেন্টের দিকে অগ্রসর হচ্ছে...`);

      // এখানে আপনি পেমেন্ট গেটওয়ে ইন্টিগ্রেশনের জন্য পরবর্তী ধাপ শুরু করতে পারেন
      // যেমন, Stripe Checkout বা SSLCommerz রিডাইরেক্ট।
      // এই ডেমোতে, আমরা কেবল একটি সিমুলেটেড পেমেন্ট সফল বার্তা দেখাবো।
      setTimeout(() => {
        // সিমুলেটেড পেমেন্ট সফল হলে, অর্ডারের পেমেন্ট স্ট্যাটাস আপডেট করুন
        handleSimulatedPaymentSuccess(data._id);
      }, 2000); // 2 সেকেন্ড পর সিমুলেটেড পেমেন্ট

    } catch (err) {
      setError(err.message);
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  // সিমুলেটেড পেমেন্ট সফলতার হ্যান্ডলার
  const handleSimulatedPaymentSuccess = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${USER_TOKEN}`,
        },
        body: JSON.stringify({
          id: `simulated_payment_${Date.now()}`,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'user@example.com',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update payment status');
      }

      setSuccessMessage(language === 'en' ? `Order ${orderId} successfully paid and confirmed!` : `অর্ডার ${orderId} সফলভাবে পরিশোধিত এবং নিশ্চিত করা হয়েছে!`);
      // অর্ডার সফলভাবে সম্পন্ন হলে কার্ট খালি করুন বা অন্য কোনো রিডাইরেক্ট করুন
      setOrderItems([]); // ডামি কার্ট খালি করুন
      setShippingAddress({ address: '', city: '', postalCode: '', country: '' });
      setPaymentMethod('Stripe');

    } catch (err) {
      setError(err.message);
      console.error('Error updating payment status:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-10">
      <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          {language === 'en' ? 'Checkout' : 'চেকআউট'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Error!' : 'ত্রুটি!'}</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Success!' : 'সফল!'}</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}

        <form onSubmit={placeOrder} className="space-y-6">
          {/* Order Summary */}
          <div className="border p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Order Summary' : 'অর্ডার সারাংশ'}
            </h2>
            {orderItems.length === 0 ? (
              <p className="text-gray-600">{language === 'en' ? 'Your cart is empty.' : 'আপনার কার্ট খালি।'}</p>
            ) : (
              <>
                <ul className="space-y-2 mb-4">
                  {orderItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-center text-gray-700">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>৳{(item.quantity * item.price).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4 text-lg font-bold text-gray-800 flex justify-between">
                  <span>{language === 'en' ? 'Total:' : 'মোট:'}</span>
                  <span>
                    ৳{orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Shipping Address */}
          <div className="border p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Shipping Address' : 'শিপিং ঠিকানা'}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Address' : 'ঠিকানা'}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleShippingChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                    {language === 'en' ? 'City' : 'শহর'}
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">
                    {language === 'en' ? 'Postal Code' : 'পোস্টাল কোড'}
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleShippingChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Country' : 'দেশ'}
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleShippingChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border p-4 rounded-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {language === 'en' ? 'Payment Method' : 'পেমেন্ট পদ্ধতি'}
            </h2>
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-600"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={handlePaymentMethodChange}
                />
                <span className="ml-2 text-gray-700">Stripe (Credit Card)</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  className="form-radio text-green-600"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={paymentMethod === 'CashOnDelivery'}
                  onChange={handlePaymentMethodChange}
                />
                <span className="ml-2 text-gray-700">
                  {language === 'en' ? 'Cash on Delivery' : 'ক্যাশ অন ডেলিভারি'}
                </span>
              </label>
              {/* অন্যান্য পেমেন্ট পদ্ধতি এখানে যোগ করা যেতে পারে */}
            </div>
          </div>

          {/* Place Order Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={loading || orderItems.length === 0}
            >
              {loading
                ? (language === 'en' ? 'Processing...' : 'প্রসেস হচ্ছে...')
                : (language === 'en' ? 'Place Order' : 'অর্ডার করুন')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
