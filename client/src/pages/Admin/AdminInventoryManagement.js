// client/src/pages/Admin/AdminInventoryManagement.js
import React, { useState, useEffect } from 'react';

const AdminInventoryManagement = ({ language }) => {
  const [inventories, setInventories] = useState([]); // ইনভেন্টরি তালিকা সংরক্ষণের জন্য স্টেট
  const [products, setProducts] = useState([]); // পণ্য তালিকা (নতুন ইনভেন্টরি যোগ করার জন্য)
  const [loading, setLoading] = useState(true); // লোডিং অবস্থা
  const [error, setError] = useState(null); // ত্রুটির বার্তা
  const [showForm, setShowForm] = useState(false); // ফর্ম দেখানোর জন্য
  const [editingInventory, setEditingInventory] = useState(null); // যে ইনভেন্টরি এডিট করা হচ্ছে
  const [formData, setFormData] = useState({ // ফর্মের ডেটা
    productId: '',
    quantity: '',
  });

  // এই টোকেনটি শুধুমাত্র পরীক্ষার উদ্দেশ্যে ব্যবহৃত হচ্ছে।
  // একটি বাস্তব অ্যাপ্লিকেশনে, এটি ব্যবহারকারী লগইন করার পর ডাইনামিকভাবে প্রাপ্ত হবে।
  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBjY2Q0MTk3YjE1YjQ4ZTAwMDAwMCIsImlhdCI6MTcyMjYwNDY0NCwiZXhwIjoxNzI1MTk2NjQ0fQ.YOUR_ACTUAL_ADMIN_JWT_TOKEN_HERE"; // আপনার আসল অ্যাডমিন JWT টোকেন এখানে দিন

  // ইনভেন্টরি ডেটা আনার ফাংশন
  const fetchInventories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/inventory', {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`, // প্রমাণীকরণ হেডার
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch inventories');
      }
      const data = await response.json();
      setInventories(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching inventories:', err);
    } finally {
      setLoading(false);
    }
  };

  // পণ্য ডেটা আনার ফাংশন (নতুন ইনভেন্টরি যোগ করার জন্য ড্রপডাউনে ব্যবহার করা হবে)
  const fetchProductsForSelection = async () => {
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch products for selection');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products for selection:', err);
      // এই ত্রুটি UI তে দেখানো নাও হতে পারে, কারণ এটি ইনভেন্টরি লোডিংকে ব্লক করবে না।
    }
  };

  // কম্পোনেন্ট মাউন্ট হওয়ার সময় ডেটা আনুন
  useEffect(() => {
    fetchInventories();
    fetchProductsForSelection();
  }, []);

  // ফর্ম ফিল্ড পরিবর্তনের হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // নতুন ইনভেন্টরি যোগ করার বা বিদ্যমান ইনভেন্টরি আপডেট করার হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const quantityValue = parseInt(formData.quantity, 10);

    if (isNaN(quantityValue) || quantityValue < 0) {
      setError(language === 'en' ? 'Quantity must be a non-negative number.' : 'পরিমাণ একটি অ-নেগেটিভ সংখ্যা হতে হবে।');
      setLoading(false);
      return;
    }

    try {
      let response;
      if (editingInventory) {
        // ইনভেন্টরি আপডেট করুন
        response = await fetch(`/api/inventory/${editingInventory.product._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
          },
          body: JSON.stringify({ quantity: quantityValue }),
        });
      } else {
        // নতুন ইনভেন্টরি যোগ করুন
        response = await fetch('/api/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
          },
          body: JSON.stringify({ productId: formData.productId, quantity: quantityValue }),
        });
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save inventory');
      }

      // সফল হলে ইনভেন্টরি তালিকা রিফ্রেশ করুন এবং ফর্ম রিসেট করুন
      await fetchInventories();
      setFormData({ productId: '', quantity: '' });
      setEditingInventory(null);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
      console.error('Error saving inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // ইনভেন্টরি এন্ট্রি মুছে ফেলার হ্যান্ডলার
  const handleDelete = async (productId) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to delete this inventory entry?' : 'আপনি কি নিশ্চিত যে আপনি এই ইনভেন্টরি এন্ট্রিটি মুছে ফেলতে চান?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/inventory/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to delete inventory entry');
      }
      // সফল হলে ইনভেন্টরি তালিকা থেকে মুছে ফেলুন
      setInventories(inventories.filter((item) => item.product._id !== productId));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // ইনভেন্টরি এডিট করার জন্য ফর্ম লোড করার হ্যান্ডলার
  const startEdit = (inventoryItem) => {
    setEditingInventory(inventoryItem);
    setFormData({
      productId: inventoryItem.product._id,
      quantity: inventoryItem.quantity.toString(),
    });
    setShowForm(true); // এডিট করার সময় ফর্ম দেখান
  };

  // এডিট বাতিল করার হ্যান্ডলার
  const cancelEdit = () => {
    setEditingInventory(null);
    setFormData({ productId: '', quantity: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          {language === 'en' ? 'Inventory Management (Admin)' : 'ইনভেন্টরি ব্যবস্থাপনা (অ্যাডমিন)'}
        </h1>

        {/* ত্রুটি বার্তা */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Error!' : 'ত্রুটি!'}</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* নতুন ইনভেন্টরি যোগ/এডিট ফর্ম টগল বাটন */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-6 transition-colors duration-200"
        >
          {showForm
            ? (language === 'en' ? 'Hide Form' : 'ফর্ম লুকান')
            : (language === 'en' ? 'Add New Inventory' : 'নতুন ইনভেন্টরি যোগ করুন')}
        </button>

        {/* নতুন ইনভেন্টরি যোগ/এডিট ফর্ম */}
        {(showForm || editingInventory) && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingInventory
                ? (language === 'en' ? 'Edit Inventory' : 'ইনভেন্টরি সম্পাদনা করুন')
                : (language === 'en' ? 'Add New Inventory Entry' : 'নতুন ইনভেন্টরি এন্ট্রি যোগ করুন')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="productId" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Product' : 'পণ্য'}
                </label>
                {editingInventory ? (
                  <input
                    type="text"
                    value={editingInventory.product.name}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                ) : (
                  <select
                    id="productId"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">{language === 'en' ? 'Select a product' : 'একটি পণ্য নির্বাচন করুন'}</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Quantity' : 'পরিমাণ'}
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="0"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                  disabled={loading}
                >
                  {loading
                    ? (language === 'en' ? 'Saving...' : 'সেভ হচ্ছে...')
                    : editingInventory
                    ? (language === 'en' ? 'Update Inventory' : 'ইনভেন্টরি আপডেট করুন')
                    : (language === 'en' ? 'Add Inventory' : 'ইনভেন্টরি যোগ করুন')}
                </button>
                {editingInventory && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                    disabled={loading}
                  >
                    {language === 'en' ? 'Cancel Edit' : 'সম্পাদনা বাতিল করুন'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ইনভেন্টরি তালিকা */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'en' ? 'Current Inventory' : 'বর্তমান ইনভেন্টরি'}
          </h2>
          {loading ? (
            <p>{language === 'en' ? 'Loading inventory...' : 'ইনভেন্টরি লোড হচ্ছে...'}</p>
          ) : inventories.length === 0 ? (
            <p>{language === 'en' ? 'No inventory items found.' : 'কোনো ইনভেন্টরি আইটেম পাওয়া যায়নি।'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Product Name' : 'পণ্যের নাম'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Category' : 'ক্যাটাগরি'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Current Stock' : 'বর্তমান স্টক'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Actions' : 'ক্রিয়াকলাপ'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventories.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.product ? item.product.name : 'Unknown Product'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.product ? item.product.category : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => startEdit(item)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          {language === 'en' ? 'Edit Stock' : 'স্টক সম্পাদনা করুন'}
                        </button>
                        <button
                          onClick={() => handleDelete(item.product._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {language === 'en' ? 'Delete Entry' : 'এন্ট্রি মুছে ফেলুন'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryManagement;
