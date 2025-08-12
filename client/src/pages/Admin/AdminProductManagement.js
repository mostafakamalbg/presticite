// client/src/pages/Admin/AdminProductManagement.js
import React, { useState, useEffect } from 'react';

const AdminProductManagement = ({ language }) => {
  const [products, setProducts] = useState([]); // পণ্য তালিকা সংরক্ষণের জন্য স্টেট
  const [loading, setLoading] = useState(true); // লোডিং অবস্থা
  const [error, setError] = useState(null); // ত্রুটির বার্তা
  const [showAddForm, setShowAddForm] = useState(false); // নতুন পণ্য যোগ করার ফর্ম দেখানোর জন্য
  const [editingProduct, setEditingProduct] = useState(null); // যে পণ্যটি এডিট করা হচ্ছে
  const [formData, setFormData] = useState({ // ফর্মের ডেটা
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  // এই টোকেনটি শুধুমাত্র পরীক্ষার উদ্দেশ্যে ব্যবহৃত হচ্ছে।
  // একটি বাস্তব অ্যাপ্লিকেশনে, এটি ব্যবহারকারী লগইন করার পর ডাইনামিকভাবে প্রাপ্ত হবে।
  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBjY2Q0MTk3YjE1YjQ4ZTAwMDAwMCIsImlhdCI6MTcyMjYwNDY0NCwiZXhwIjoxNzI1MTk2NjQ0fQ.YOUR_ACTUAL_ADMIN_JWT_TOKEN_HERE"; // আপনার আসল অ্যাডমিন JWT টোকেন এখানে দিন

  // পণ্য আনার ফাংশন
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`, // প্রমাণীকরণ হেডার
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট মাউন্ট হওয়ার সময় পণ্য আনুন
  useEffect(() => {
    fetchProducts();
  }, []);

  // ফর্ম ফিল্ড পরিবর্তনের হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // নতুন পণ্য যোগ করার বা বিদ্যমান পণ্য আপডেট করার হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const productData = {
      ...formData,
      price: parseFloat(formData.price), // সংখ্যায় রূপান্তর
      stock: parseInt(formData.stock, 10), // সংখ্যায় রূপান্তর
    };

    try {
      let response;
      if (editingProduct) {
        // পণ্য আপডেট করুন
        response = await fetch(`/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
          },
          body: JSON.stringify(productData),
        });
      } else {
        // নতুন পণ্য যোগ করুন
        response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`,
          },
          body: JSON.stringify(productData),
        });
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save product');
      }

      // সফল হলে পণ্য তালিকা রিফ্রেশ করুন এবং ফর্ম রিসেট করুন
      await fetchProducts();
      setFormData({ name: '', description: '', price: '', category: '', stock: '' });
      setEditingProduct(null);
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  // পণ্য মুছে ফেলার হ্যান্ডলার
  const handleDelete = async (id) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to delete this product?' : 'আপনি কি নিশ্চিত যে আপনি এই পণ্যটি মুছে ফেলতে চান?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to delete product');
      }
      // সফল হলে পণ্য তালিকা থেকে মুছে ফেলুন
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  // পণ্য এডিট করার জন্য ফর্ম লোড করার হ্যান্ডলার
  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
    });
    setShowAddForm(true); // এডিট করার সময় ফর্ম দেখান
  };

  // এডিট বাতিল করার হ্যান্ডলার
  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', category: '', stock: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          {language === 'en' ? 'Product Management (Admin)' : 'পণ্য ব্যবস্থাপনা (অ্যাডমিন)'}
        </h1>

        {/* ত্রুটি বার্তা */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Error!' : 'ত্রুটি!'}</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* নতুন পণ্য যোগ/এডিট ফর্ম টগল বাটন */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-6 transition-colors duration-200"
        >
          {showAddForm
            ? (language === 'en' ? 'Hide Form' : 'ফর্ম লুকান')
            : (language === 'en' ? 'Add New Product' : 'নতুন পণ্য যোগ করুন')}
        </button>

        {/* নতুন পণ্য যোগ/এডিট ফর্ম */}
        {(showAddForm || editingProduct) && (
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProduct
                ? (language === 'en' ? 'Edit Product' : 'পণ্য সম্পাদনা করুন')
                : (language === 'en' ? 'Add New Product' : 'নতুন পণ্য যোগ করুন')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Product Name' : 'পণ্যের নাম'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Description' : 'বিবরণ'}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Price' : 'মূল্য'}
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Category' : 'ক্যাটাগরি'}
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">
                  {language === 'en' ? 'Stock Quantity' : 'স্টক পরিমাণ'}
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
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
                    : editingProduct
                    ? (language === 'en' ? 'Update Product' : 'পণ্য আপডেট করুন')
                    : (language === 'en' ? 'Add Product' : 'পণ্য যোগ করুন')}
                </button>
                {editingProduct && (
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

        {/* পণ্য তালিকা */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'en' ? 'Existing Products' : 'বিদ্যমান পণ্যসমূহ'}
          </h2>
          {loading ? (
            <p>{language === 'en' ? 'Loading products...' : 'পণ্য লোড হচ্ছে...'}</p>
          ) : products.length === 0 ? (
            <p>{language === 'en' ? 'No products found.' : 'কোনো পণ্য পাওয়া যায়নি।'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Name' : 'নাম'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Category' : 'ক্যাটাগরি'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Price' : 'মূল্য'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Stock' : 'স্টক'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Actions' : 'ক্রিয়াকলাপ'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ৳{product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => startEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          {language === 'en' ? 'Edit' : 'সম্পাদনা করুন'}
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900"
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
      </div>
    </div>
  );
};

export default AdminProductManagement;
