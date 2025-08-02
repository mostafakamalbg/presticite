import React, { useState, useEffect } from 'react';

// client/src/components/Header.js
// হেডার কম্পোনেন্ট: নেভিগেশন, লোগো এবং ভাষা পরিবর্তনের বিকল্প অন্তর্ভুক্ত।
const Header = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // ডিফল্ট ভাষা ইংরেজি

  // মোবাইল মেনু টগল করার ফাংশন
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // ভাষা পরিবর্তনের হ্যান্ডলার
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    onLanguageChange(newLang); // App.js-কে ভাষা পরিবর্তনের তথ্য পাঠানো
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-10 flex items-center justify-between flex-wrap rounded-b-lg">
      <div className="flex items-center flex-shrink-0 text-green-700 mr-6">
        {/* আপনার আসল লোগো বা SVG দিয়ে এটি প্রতিস্থাপন করুন */}
        <span className="font-bold text-2xl tracking-tight">BG Agro Limited</span>
      </div>
      <div className="block lg:hidden">
        {/* মোবাইল মেনু টগল বাটন */}
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-green-600 border-green-400 hover:text-green-800 hover:border-green-600"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {/* নেভিগেশন মেনু */}
      <nav
        className={`${
          isOpen ? 'block' : 'hidden'
        } w-full flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="#home"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-700 hover:text-green-900 mr-4 p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            {language === 'en' ? 'Home' : 'হোম'}
          </a>
          <a
            href="#products"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-700 hover:text-green-900 mr-4 p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            {language === 'en' ? 'Products' : 'পণ্যসমূহ'}
          </a>
          <a
            href="#news-media"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-700 hover:text-green-900 mr-4 p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            {language === 'en' ? 'News & Media' : 'সংবাদ ও মিডিয়া'}
          </a>
          <a
            href="#career"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-700 hover:text-green-900 mr-4 p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            {language === 'en' ? 'Career' : 'ক্যারিয়ার'}
          </a>
          <a
            href="#about"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-700 hover:text-green-900 mr-4 p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            {language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
          </a>
          <a
            href="#contact"
            className="block mt-4 lg:inline-block lg:mt-0 text-green-700 hover:text-green-900 p-2 rounded-md hover:bg-green-100 transition-colors duration-200"
          >
            {language === 'en' ? 'Contact' : 'যোগাযোগ'}
          </a>
        </div>
        {/* ভাষা পরিবর্তন ড্রপডাউন */}
        <div className="relative inline-block text-gray-700">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;