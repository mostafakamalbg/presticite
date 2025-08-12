// client/src/pages/Admin/AdminUserManagement.js
import React, { useState, useEffect } from 'react';

const AdminUserManagement = ({ language }) => {
  const [users, setUsers] = useState([]); // ব্যবহারকারী তালিকা সংরক্ষণের জন্য স্টেট
  const [loading, setLoading] = useState(true); // লোডিং অবস্থা
  const [error, setError] = useState(null); // ত্রুটির বার্তা

  // এই টোকেনটি শুধুমাত্র পরীক্ষার উদ্দেশ্যে ব্যবহৃত হচ্ছে।
  // একটি বাস্তব অ্যাপ্লিকেশনে, এটি ব্যবহারকারী লগইন করার পর ডাইনামিকভাবে প্রাপ্ত হবে।
  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjBjY2Q0MTk3YjE1YjQ4ZTAwMDAwMCIsImlhdCI6MTcyMjYwNDY0NCwiZXhwIjoxNzI1MTk2NjQ0fQ.YOUR_ACTUAL_ADMIN_JWT_TOKEN_HERE"; // আপনার আসল অ্যাডমিন JWT টোকেন এখানে দিন

  // ব্যবহারকারী আনার ফাংশন
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // এই রাউটটি ব্যাকএন্ডে তৈরি করতে হবে: GET /api/users (শুধুমাত্র অ্যাডমিন)
      const response = await fetch('/api/users', { // সমস্ত ব্যবহারকারী আনার জন্য (অ্যাডমিন রাউট)
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`, // প্রমাণীকরণ হেডার
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // কম্পোনেন্ট মাউন্ট হওয়ার সময় ব্যবহারকারী আনুন
  useEffect(() => {
    fetchUsers();
  }, []);

  // ব্যবহারকারীর ভূমিকা আপডেট করার হ্যান্ডলার
  const handleUpdateUserRole = async (userId, newRole) => {
    if (!window.confirm(language === 'en' ? `Are you sure you want to change this user's role to ${newRole}?` : `আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীর ভূমিকা ${newRole} এ পরিবর্তন করতে চান?`)) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // এই রাউটটি ব্যাকএন্ডে তৈরি করতে হবে: PUT /api/users/:id/role (শুধুমাত্র অ্যাডমিন)
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to update user role');
      }
      // সফল হলে ব্যবহারকারী তালিকা রিফ্রেশ করুন
      await fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error('Error updating user role:', err);
    } finally {
      setLoading(false);
    }
  };

  // ব্যবহারকারী মুছে ফেলার হ্যান্ডলার
  const handleDeleteUser = async (userId) => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to delete this user?' : 'আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীকে মুছে ফেলতে চান?')) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // এই রাউটটি ব্যাকএন্ডে তৈরি করতে হবে: DELETE /api/users/:id (শুধুমাত্র অ্যাডমিন)
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ADMIN_TOKEN}`,
        },
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to delete user');
      }
      // সফল হলে ব্যবহারকারী তালিকা থেকে মুছে ফেলুন
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          {language === 'en' ? 'User Management (Admin)' : 'ব্যবহারকারী ব্যবস্থাপনা (অ্যাডমিন)'}
        </h1>

        {/* ত্রুটি বার্তা */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">{language === 'en' ? 'Error!' : 'ত্রুটি!'}</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* ব্যবহারকারী তালিকা */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {language === 'en' ? 'All Users' : 'সকল ব্যবহারকারী'}
          </h2>
          {loading ? (
            <p>{language === 'en' ? 'Loading users...' : 'ব্যবহারকারী লোড হচ্ছে...'}</p>
          ) : users.length === 0 ? (
            <p>{language === 'en' ? 'No users found.' : 'কোনো ব্যবহারকারী পাওয়া যায়নি।'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'ID' : 'আইডি'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Name' : 'নাম'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Email' : 'ইমেইল'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Role' : 'ভূমিকা'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'en' ? 'Actions' : 'ক্রিয়াকলাপ'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <select
                          className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700"
                          value={user.role}
                          onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                          disabled={loading || user._id === "YOUR_ADMIN_USER_ID"} // অ্যাডমিন নিজেকে এডিট করতে পারবে না
                        >
                          <option value="user">{language === 'en' ? 'User' : 'ব্যবহারকারী'}</option>
                          <option value="admin">{language === 'en' ? 'Admin' : 'অ্যাডমিন'}</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={loading || user._id === "YOUR_ADMIN_USER_ID"} // অ্যাডমিন নিজেকে মুছে ফেলতে পারবে না
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

export default AdminUserManagement;
