import React, { useState, useEffect } from 'react';

// কম্পোনেন্ট ইম্পোর্ট করুন
import Header from './components/Header';
import Footer from './components/Footer';
import AdminHeader from './components/AdminHeader';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import NewsMediaPage from './pages/NewsMediaPage';
import CareerPage from './pages/CareerPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage'; // ***নতুন: চেকআউট পৃষ্ঠা ইম্পোর্ট করুন***

// অ্যাডমিন পৃষ্ঠাগুলি ইম্পোর্ট করুন
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import AdminProductManagement from './pages/Admin/AdminProductManagement';
import AdminInventoryManagement from './pages/Admin/AdminInventoryManagement';
import AdminOrderManagement from './pages/Admin/AdminOrderManagement';
import AdminInvoiceManagement from './pages/Admin/AdminInvoiceManagement';
import AdminUserManagement from './pages/Admin/AdminUserManagement';


// client/src/App.js
// প্রধান অ্যাপ্লিকেশন কম্পোনেন্ট
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en'); // গ্লোবাল ভাষা স্টেট
  const [isAdminMode, setIsAdminMode] = useState(false); // অ্যাডমিন মোড স্টেট

  // ভাষা পরিবর্তনের হ্যান্ডলার
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // পৃষ্ঠা পরিবর্তনের হ্যান্ডলার
  const handleNavigate = (page) => {
    setCurrentPage(page);
    // অ্যাডমিন মোডে প্রবেশ বা প্রস্থান করার জন্য
    if (page.startsWith('admin-') && !isAdminMode) {
      setIsAdminMode(true);
    } else if (!page.startsWith('admin-') && isAdminMode) {
      setIsAdminMode(false);
    }
    window.location.hash = page; // URL হ্যাশ আপডেট করুন
  };

  // হ্যাশ পরিবর্তনের উপর ভিত্তি করে সাধারণ রাউটিং লজিক
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setCurrentPage(hash);
        if (hash.startsWith('admin-')) {
          setIsAdminMode(true);
        } else {
          setIsAdminMode(false);
        }
      } else {
        setCurrentPage('home');
        setIsAdminMode(false);
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
      case 'checkout': // ***নতুন: চেকআউট পৃষ্ঠা যোগ করুন***
        return <CheckoutPage language={language} />;
      // অ্যাডমিন পৃষ্ঠাগুলি
      case 'admin-dashboard':
        return <AdminDashboardPage language={language} />;
      case 'admin-products':
        return <AdminProductManagement language={language} />;
      case 'admin-inventory':
        return <AdminInventoryManagement language={language} />;
      case 'admin-orders':
        return <AdminOrderManagement language={language} />;
      case 'admin-invoices':
        return <AdminInvoiceManagement language={language} />;
      case 'admin-users':
        return <AdminUserManagement language={language} />;
      default:
        return <HomePage language={language} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* অ্যাডমিন মোডে থাকলে AdminHeader, অন্যথায় Header */}
      {isAdminMode ? (
        <AdminHeader onNavigate={handleNavigate} language={language} />
      ) : (
        <Header onLanguageChange={handleLanguageChange} />
      )}
      <main className="flex-grow">{renderPage()}</main>
      <Footer language={language} />
    </div>
  );
};

export default App;
