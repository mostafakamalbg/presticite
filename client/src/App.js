
// client/src/App.css
// You would typically import Tailwind CSS here or in index.css
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsMediaPage from './pages/NewsMediaPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CareerPage from './pages/CareerPage';

import './App.css'; // Import your Tailwind CSS 
// styles here or in index.css
// client/src/App.js
// client/src/App.js
// প্রধান অ্যাপ্লিকেশন কম্পোনেন্ট
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en'); // গ্লোবাল ভাষা স্টেট

  // ভাষা পরিবর্তনের হ্যান্ডলার
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // হ্যাশ পরিবর্তনের উপর ভিত্তি করে সাধারণ রাউটিং লজিক
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // প্রাথমিক পৃষ্ঠা সেট করুন

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // বর্তমান পৃষ্ঠা রেন্ডার করার ফাংশন
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage language={language} />;
      case 'products':
        return <ProductListPage language={language} />;
      case 'news-media':
        return <NewsMediaPage language={language} />;
      case 'career':
        return <CareerPage language={language} />;
      case 'about':
        return <AboutPage language={language} />;
      case 'contact':
        return <ContactPage language={language} />;
      default:
        return <HomePage language={language} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLanguageChange={handleLanguageChange} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer language={language} />
    </div>
  );
};

export default App;
