
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
import './App.css'; // Import your Tailwind CSS 
// styles here or in index.css
// client/src/App.js
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en'); // Global language state

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Simple routing logic based on hash or state
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
    handleHashChange(); // Set initial page

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage language={language} />;
      case 'products':
        return <ProductListPage language={language} />;
      // Add more cases for other pages (News & media, Career, About, Contact)
      // For now, they will just show a placeholder or redirect to home
      case 'news-media':
      case 'career':
      case 'about':
      case 'contact':
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800">
              {language === 'en' ? `${currentPage} Page (Coming Soon)` : `${currentPage} পৃষ্ঠা (শীঘ্রই আসছে)`}
            </h1>
          </div>
        );
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
