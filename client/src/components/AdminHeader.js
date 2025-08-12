// client/src/components/AdminHeader.js
import React from 'react';

// অ্যাডমিন ড্যাশবোর্ডের জন্য হেডার কম্পোনেন্ট
const AdminHeader = ({ onNavigate, language }) => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md rounded-b-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4 md:mb-0">
          {language === 'en' ? 'Admin Dashboard' : 'অ্যাডমিন ড্যাশবোর্ড'}
        </h2>
        <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {language === 'en' ? 'Dashboard' : 'ড্যাশবোর্ড'}
          </button>
          <button
            onClick={() => onNavigate('admin-products')}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {language === 'en' ? 'Products' : 'পণ্যসমূহ'}
          </button>
          <button
            onClick={() => onNavigate('admin-inventory')}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {language === 'en' ? 'Inventory' : 'ইনভেন্টরি'}
          </button>
          <button
            onClick={() => onNavigate('admin-orders')}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {language === 'en' ? 'Orders' : 'অর্ডারসমূহ'}
          </button>
          <button
            onClick={() => onNavigate('admin-invoices')}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {language === 'en' ? 'Invoices' : 'ইনভয়েসসমূহ'}
          </button>
          <button
            onClick={() => onNavigate('admin-users')}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            {language === 'en' ? 'Users' : 'ব্যবহারকারীগণ'}
          </button>
          <button
            onClick={() => onNavigate('home')} // হোমপেজে ফিরে যাওয়ার জন্য
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 ml-4"
          >
            {language === 'en' ? 'Exit Admin' : 'অ্যাডমিন থেকে প্রস্থান'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
