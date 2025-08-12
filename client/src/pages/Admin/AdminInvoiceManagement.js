// client/src/pages/Admin/AdminInvoiceManagement.js
import React, { useState, useEffect } from 'react';

const AdminInvoiceManagement = ({ language }) => {
  const [invoices, setInvoices] = useState([]); // ইনভয়েস তালিকা সংরক্ষণের জন্য স্টেট
  const [loading, setLoading] = useState(true); // লোডিং অবস্থা
  const [error, setError] = useState(null); // ত্রুটির বার্তা
  const [selectedInvoice, setSelectedInvoice] = useState(null); // নির্বাচিত ইনভয়েস (বিস্তারিত দেখার জন্য)
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false); // ইনভয়েস বিস্তারিত দেখানোর জন্য

  // এই টোকেনটি শুধুমাত্র পরীক্ষার উদ্দেশ্যে ব্যবহৃত হচ্ছে।
  // একটি বাস্তব অ্যাপ্লিকেশনে, এটি ব্যবহারকারী লগইন করার পর ডাইনামিকভাবে প্রাপ্ত হবে।
  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBjY2Q0MTk3YjE1YjQ4ZTAwMDAwMCIsImlhdCI6MTcyMjYwNDY0NCwiZXhwIjoxNzI1MTk2NjQ0fQ.YOUR_ACTUAL_ADMIN_JWT_TOKEN_HERE"; // আপনার আসল অ্যাডমিন JWT টোকেন এখানে দিন

  // ইনভয়েস আনার ফাংশন
  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/invoices', { // সমস্ত ইনভয়েস আনার জন্য (অ্যাডমিন রাউট)
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`, // প্রমাণীকরণ হেডার
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট মাউন্ট হওয়ার সময় ইনভয়েস আনুন
  useEffect(() => {
    fetchInvoices();
  }, []);

  // ইনভয়েস বিস্তারিত দেখার হ্যান্ডলার
  const viewInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  // ইনভয়েস বিস্তারিত বন্ধ করার হ্যান্ডলার
  const closeInvoiceDetails = () => {
    setSelectedInvoice(null);
    setShowInvoiceDetails(false);
  };

  // ইনভয়েসের স্ট্যাটাস আপডেট করার হ্যান্ডলার
  const handleUpdateInvoiceStatus = async (invoiceId, newStatus) => {
    if (!window.confirm(language === 'en' ? `Are you sure you want to change invoice status to ${newStatus}?` : `আপনি কি নিশ্চিত যে আপনি ইনভয়েসের স্ট্যাটাস ${newStatus} এ পরিবর্তন করতে চান?`)) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update invoice status');
      }
      // সফল হলে ইনভয়েস তালিকা রিফ্রেশ করুন
      await fetchInvoices();
      // যদি নির্বাচিত ইনভয়েস আপডেট হয়, তাহলে তার বিবরণও রিফ্রেশ করুন
      if (selectedInvoice && selectedInvoice._id === invoiceId) {
        const updatedInvoice = await response.json();
        setSelectedInvoice(updatedInvoice);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error updating invoice status:', err);
    } finally {
      setLoading(false);
    }
  };

  // ইনভয়েস মুছে ফেলার হ্যান্ডলার
  const handleDeleteInvoice = async (invoiceId) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to delete this invoice?' : 'আপনি কি নিশ্চিত যে আপনি এই ইনভয়েসটি মুছে ফেলতে চান?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to delete invoice');
      }
      // সফল হলে ইনভয়েস তালিকা থেকে মুছে ফেলুন
      setInvoices(invoices.filter((invoice) => invoice._id !== invoiceId));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          {language === 'en' ? 'Invoice Management (Admin)' : 'ইনভয়েস ব্যবস্থাপনা (অ্যাডমিন)'}
        </h1>

        {/* ত্রুটি বার্তা */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Error!' : 'ত্রুটি!'}</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* ইনভয়েস তালিকা */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'en' ? 'All Invoices' : 'সকল ইনভয়েস'}
          </h2>
          {loading ? (
            <p>{language === 'en' ? 'Loading invoices...' : 'ইনভয়েস লোড হচ্ছে...'}</p>
          ) : invoices.length === 0 ? (
            <p>{language === 'en' ? 'No invoices found.' : 'কোনো ইনভয়েস পাওয়া যায়নি।'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Invoice ID' : 'ইনভয়েস আইডি'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Order ID' : 'অর্ডার আইডি'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Issue Date' : 'ইস্যু তারিখ'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Total Amount' : 'মোট পরিমাণ'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Status' : 'স্ট্যাটাস'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Actions' : 'ক্রিয়াকলাপ'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.order ? invoice.order._id : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.issueDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ৳{invoice.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewInvoiceDetails(invoice)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
                        </button>
                        <select
                          className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 mr-3"
                          value={invoice.status}
                          onChange={(e) => handleUpdateInvoiceStatus(invoice._id, e.target.value)}
                          disabled={loading}
                        >
                          <option value="Pending">{language === 'en' ? 'Pending' : 'বকেয়া'}</option>
                          <option value="Paid">{language === 'en' ? 'Paid' : 'পরিশোধিত'}</option>
                          <option value="Cancelled">{language === 'en' ? 'Cancelled' : 'বাতিল'}</option>
                        </select>
                        <button
                          onClick={() => handleDeleteInvoice(invoice._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading}
                        >
                          {language === 'en' ? 'Delete' : 'মুছে ফেলুন'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ইনভয়েস বিস্তারিত মডাল */}
        {showInvoiceDetails && selectedInvoice && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative p-8 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'en' ? 'Invoice Details' : 'ইনভয়েসের বিবরণ'} ({selectedInvoice.invoiceNumber})
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>{language === 'en' ? 'Invoice Number:' : 'ইনভয়েস নম্বর:'}</strong> {selectedInvoice.invoiceNumber}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Order ID:' : 'অর্ডার আইডি:'}</strong> {selectedInvoice.order ? selectedInvoice.order._id : 'N/A'}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Issue Date:' : 'ইস্যু তারিখ:'}</strong> {new Date(selectedInvoice.issueDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Total Amount:' : 'মোট পরিমাণ:'}</strong> ৳{selectedInvoice.totalAmount.toFixed(2)}
                </p>
                <p>
                  <strong>{language === 'en' ? 'Status:' : 'স্ট্যাটাস:'}</strong>{' '}
                  <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                    selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                    selectedInvoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedInvoice.status}
                  </span>
                </p>
                {/* অর্ডারের বিস্তারিত তথ্য (যদি পপুলেট করা থাকে) */}
                {selectedInvoice.order && (
                  <>
                    <h4 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                      {language === 'en' ? 'Associated Order Details:' : 'সম্পর্কিত অর্ডারের বিবরণ:'}
                    </h4>
                    <p>
                      <strong>{language === 'en' ? 'Order Total:' : 'অর্ডার মোট:'}</strong> ৳{selectedInvoice.order.totalPrice.toFixed(2)}
                    </p>
                    <p>
                      <strong>{language === 'en' ? 'Order Paid:' : 'অর্ডার পরিশোধিত:'}</strong>{' '}
                      {selectedInvoice.order.isPaid ? (
                        <span className="text-green-600">{language === 'en' ? 'Yes' : 'হ্যাঁ'}</span>
                      ) : (
                        <span className="text-red-600">{language === 'en' ? 'No' : 'না'}</span>
                      )}
                    </p>
                    <p>
                      <strong>{language === 'en' ? 'Order User:' : 'অর্ডার ব্যবহারকারী:'}</strong>{' '}
                      {selectedInvoice.order.user ? `${selectedInvoice.order.user.name} (${selectedInvoice.order.user.email})` : 'N/A'}
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={closeInvoiceDetails}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                >
                  {language === 'en' ? 'Close' : 'বন্ধ করুন'}
                </button>
                <select
                  className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700"
                  value={selectedInvoice.status}
                  onChange={(e) => handleUpdateInvoiceStatus(selectedInvoice._id, e.target.value)}
                  disabled={loading}
                >
                  <option value="Pending">{language === 'en' ? 'Pending' : 'বকেয়া'}</option>
                  <option value="Paid">{language === 'en' ? 'Paid' : 'পরিশোধিত'}</option>
                  <option value="Cancelled">{language === 'en' ? 'Cancelled' : 'বাতিল'}</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInvoiceManagement;
