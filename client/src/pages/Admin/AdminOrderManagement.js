// client/src/pages/Admin/AdminOrderManagement.js
import React, { useState, useEffect } from 'react';

const AdminOrderManagement = ({ language }) => {
  const [orders, setOrders] = useState([]); // অর্ডার তালিকা সংরক্ষণের জন্য স্টেট
  const [loading, setLoading] = useState(true); // লোডিং অবস্থা
  const [error, setError] = useState(null); // ত্রুটির বার্তা
  const [selectedOrder, setSelectedOrder] = useState(null); // নির্বাচিত অর্ডার (বিস্তারিত দেখার জন্য)
  const [showOrderDetails, setShowOrderDetails] = useState(false); // অর্ডার বিস্তারিত দেখানোর জন্য

  // এই টোকেনটি শুধুমাত্র পরীক্ষার উদ্দেশ্যে ব্যবহৃত হচ্ছে।
  // একটি বাস্তব অ্যাপ্লিকেশনে, এটি ব্যবহারকারী লগইন করার পর ডাইনামিকভাবে প্রাপ্ত হবে।
  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBjY2Q0MTk3YjE1YjQ4ZTAwMDAwMCIsImlhdCI6MTcyMjYwNDY0NCwiZXhwIjoxNzI1MTk2NjQ0fQ.YOUR_ACTUAL_ADMIN_JWT_TOKEN_HERE"; // আপনার আসল অ্যাডমিন JWT টোকেন এখানে দিন

  // অর্ডার আনার ফাংশন
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/orders', { // সমস্ত অর্ডার আনার জন্য (অ্যাডমিন রাউট)
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`, // প্রমাণীকরণ হেডার
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট মাউন্ট হওয়ার সময় অর্ডার আনুন
  useEffect(() => {
    fetchOrders();
  }, []);

  // অর্ডার বিস্তারিত দেখার হ্যান্ডলার
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // অর্ডার বিস্তারিত বন্ধ করার হ্যান্ডলার
  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setShowOrderDetails(false);
  };

  // অর্ডারের ডেলিভারি স্ট্যাটাস আপডেট করার হ্যান্ডলার
  const handleDeliverOrder = async (orderId) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to mark this order as delivered?' : 'আপনি কি নিশ্চিত যে আপনি এই অর্ডারটি ডেলিভারি হয়েছে বলে চিহ্নিত করতে চান?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update order status');
      }
      // সফল হলে অর্ডার তালিকা রিফ্রেশ করুন
      await fetchOrders();
      // যদি নির্বাচিত অর্ডার আপডেট হয়, তাহলে তার বিবরণও রিফ্রেশ করুন
      if (selectedOrder && selectedOrder._id === orderId) {
        const updatedOrder = await response.json(); // বা পুনরায় fetch করে আনতে পারেন
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error updating order status:', err);
    } finally {
      setLoading(false);
    }
  };

  // অর্ডারের পেমেন্ট স্ট্যাটাস আপডেট করার হ্যান্ডলার (যদি প্রয়োজন হয়)
  // এই ফাংশনটি শুধুমাত্র অ্যাডমিন ড্যাশবোর্ডে ম্যানুয়ালি পেমেন্ট স্ট্যাটাস আপডেট করার জন্য।
  // সাধারণত পেমেন্ট গেটওয়ে ইন্টিগ্রেশনের মাধ্যমে এটি স্বয়ংক্রিয়ভাবে ঘটে।
  const handleMarkAsPaid = async (orderId) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to mark this order as paid?' : 'আপনি কি নিশ্চিত যে আপনি এই অর্ডারটি পরিশোধিত হয়েছে বলে চিহ্নিত করতে চান?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${orderId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
        body: JSON.stringify({
          id: `manual_payment_${Date.now()}`, // ডামি পেমেন্ট আইডি
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'admin@example.com' // ডামি ইমেইল
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to mark order as paid');
      }
      await fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        const updatedOrder = await response.json();
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error marking order as paid:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          {language === 'en' ? 'Order Management (Admin)' : 'অর্ডার ব্যবস্থাপনা (অ্যাডমিন)'}
        </h1>

        {/* ত্রুটি বার্তা */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Error!' : 'ত্রুটি!'}</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* অর্ডার তালিকা */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'en' ? 'All Orders' : 'সকল অর্ডার'}
          </h2>
          {loading ? (
            <p>{language === 'en' ? 'Loading orders...' : 'অর্ডার লোড হচ্ছে...'}</p>
          ) : orders.length === 0 ? (
            <p>{language === 'en' ? 'No orders found.' : 'কোনো অর্ডার পাওয়া যায়নি।'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Order ID' : 'অর্ডার আইডি'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'User' : 'ব্যবহারকারী'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Total' : 'মোট'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Paid' : 'পরিশোধিত'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Delivered' : 'ডেলিভারি হয়েছে'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Date' : 'তারিখ'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Actions' : 'ক্রিয়াকলাপ'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.user ? order.user.name : 'N/A'} ({order.user ? order.user.email : 'N/A'})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ৳{order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.isPaid ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {language === 'en' ? 'Yes' : 'হ্যাঁ'}
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {language === 'en' ? 'No' : 'না'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.isDelivered ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {language === 'en' ? 'Yes' : 'হ্যাঁ'}
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {language === 'en' ? 'No' : 'না'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                        </button>
                        {!order.isDelivered && (
                          <button
                            onClick={() => handleDeliverOrder(order._id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            {language === 'en' ? 'Mark as Delivered' : 'ডেলিভারি হয়েছে চিহ্নিত করুন'}
                          </button>
                        )}
                        {!order.isPaid && (
                          <button
                            onClick={() => handleMarkAsPaid(order._id)}
                            className="text-blue-600 hover:text-blue-900 ml-3"
                          >
                            {language === 'en' ? 'Mark as Paid' : 'পরিশোধিত চিহ্নিত করুন'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* অর্ডার বিস্তারিত মডাল */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative p-8 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'en' ? 'Order Details' : 'অর্ডারের বিবরণ'} ({selectedOrder._id})
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>{language === 'en' ? 'User:' : 'ব্যবহারকারী:'}</strong>{' '}
                  {selectedOrder.user ? `${selectedOrder.user.name} (${selectedOrder.user.email})` : 'N/A'}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Total Price:' : 'মোট মূল্য:'}</strong> ৳{selectedOrder.totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Payment Method:' : 'পেমেন্ট পদ্ধতি:'}</strong> {selectedOrder.paymentMethod}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Paid:' : 'পরিশোধিত:'}</strong>{' '}
                  {selectedOrder.isPaid ? (
                    <span className="text-green-600">{language === 'en' ? 'Yes' : 'হ্যাঁ'}</span>
                  ) : (
                    <span className="text-red-600">{language === 'en' ? 'No' : 'না'}</span>
                  )}
                  {selectedOrder.paidAt && ` (${new Date(selectedOrder.paidAt).toLocaleDateString()})`}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Delivered:' : 'ডেলিভারি হয়েছে:'}</strong>{' '}
                  {selectedOrder.isDelivered ? (
                    <span className="text-green-600">{language === 'en' ? 'Yes' : 'হ্যাঁ'}</span>
                  ) : (
                    <span className="text-red-600">{language === 'en' ? 'No' : 'না'}</span>
                  )}
                  {selectedOrder.deliveredAt && ` (${new Date(selectedOrder.deliveredAt).toLocaleDateString()})`}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Order Status:' : 'অর্ডারের অবস্থা:'}</strong> {selectedOrder.orderStatus}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Shipping Address:' : 'শিপিং ঠিকানা:'}</strong>{' '}
                  {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city},{' '}
                  {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}
                </p>

                <h4 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                  {language === 'en' ? 'Order Items:' : 'অর্ডার আইটেমসমূহ:'}
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedOrder.orderItems.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item.name} (x{item.quantity}) - ৳{(item.quantity * item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={closeOrderDetails}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  {language === 'en' ? 'Close' : 'বন্ধ করুন'}
                </button>
                {!selectedOrder.isDelivered && (
                  <button
                    onClick={() => handleDeliverOrder(selectedOrder._id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading
                      ? (language === 'en' ? 'Updating...' : 'আপডেট হচ্ছে...')
                      : (language === 'en' ? 'Mark as Delivered' : 'ডেলিভারি হয়েছে চিহ্নিত করুন')}
                  </button>
                )}
                {!selectedOrder.isPaid && (
                  <button
                    onClick={() => handleMarkAsPaid(selectedOrder._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading
                      ? (language === 'en' ? 'Updating...' : 'আপডেট হচ্ছে...')
                      : (language === 'en' ? 'Mark as Paid' : 'পরিশোধিত চিহ্নিত করুন')}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderManagement;
