// client/src/pages/Admin/AdminDashboardPage.js
import React from 'react';

// অ্যাডমিন ড্যাশবোর্ডের প্রধান পৃষ্ঠা
const AdminDashboardPage = ({ language }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6 md:px-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          {language === 'en' ? 'Welcome to Admin Dashboard' : 'অ্যাডমিন ড্যাশবোর্ডে স্বাগতম'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Card 1: Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {language === 'en' ? 'Total Products' : 'মোট পণ্য'}
            </h3>
            <p className="text-4xl font-bold text-gray-800">150</p>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Currently available in store' : 'বর্তমানে দোকানে উপলব্ধ'}
            </p>
          </div>

          {/* Dashboard Card 2: Total Orders */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {language === 'en' ? 'Total Orders' : 'মোট অর্ডার'}
            </h3>
            <p className="text-4xl font-bold text-gray-800">75</p>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Processed this month' : 'এই মাসে প্রক্রিয়া করা হয়েছে'}
            </p>
          </div>

          {/* Dashboard Card 3: Pending Invoices */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-yellow-700 mb-2">
              {language === 'en' ? 'Pending Invoices' : 'বকেয়া ইনভয়েস'}
            </h3>
            <p className="text-4xl font-bold text-gray-800">12</p>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Awaiting payment' : 'পেমেন্টের অপেক্ষায়'}
            </p>
          </div>

          {/* Dashboard Card 4: Registered Users */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              {language === 'en' ? 'Registered Users' : 'নিবন্ধিত ব্যবহারকারী'}
            </h3>
            <p className="text-4xl font-bold text-gray-800">500+</p>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Active accounts' : 'সক্রিয় অ্যাকাউন্ট'}
            </p>
          </div>

          {/* Dashboard Card 5: Low Stock Items */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              {language === 'en' ? 'Low Stock Items' : 'কম স্টক আইটেম'}
            </h3>
            <p className="text-4xl font-bold text-gray-800">5</p>
            <p className="text-gray-600 mt-2">
              {language === 'en' ? 'Needs immediate restocking' : 'অবিলম্বে পুনরায় স্টক করা প্রয়োজন'}
            </p>
          </div>

          {/* Dashboard Card 6: Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-200 col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'Recent Activity' : 'সাম্প্রতিক কার্যকলাপ'}
            </h3>
            <ul className="text-left text-gray-600 text-sm space-y-2">
              <li>{language === 'en' ? 'New order #1001 placed' : 'নতুন অর্ডার #1001 স্থাপন করা হয়েছে'}</li>
              <li>{language === 'en' ? 'Product "Organic Fertilizer" updated' : 'পণ্য "জৈব সার" আপডেট করা হয়েছে'}</li>
              <li>{language === 'en' ? 'User "John Doe" registered' : 'ব্যবহারকারী "জন ডো" নিবন্ধিত হয়েছে'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
