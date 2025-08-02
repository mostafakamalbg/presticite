import React from 'react';
// client/src/pages/HomePage.js
// client/src/components/Footer.js
const Footer = ({ language }) => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6 md:px-10 rounded-t-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-xl mb-4 text-green-400">BG Agro Limited</h3>
          <p className="text-gray-300 text-sm mb-2">
            {language === 'en'
              ? 'Your Partner for a Green Future.'
              : 'সবুজ ভবিষ্যতের জন্য আপনার অংশীদার।'}
          </p>
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} BG Agro Limited. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-green-300">
            {language === 'en' ? 'Quick Links' : 'দ্রুত লিঙ্ক'}
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-gray-300 hover:text-green-200 text-sm transition-colors duration-200">
                {language === 'en' ? 'Home' : 'হোম'}
              </a>
            </li>
            <li>
              <a href="#products" className="text-gray-300 hover:text-green-200 text-sm transition-colors duration-200">
                {language === 'en' ? 'Products' : 'পণ্যসমূহ'}
              </a>
            </li>
            <li>
              <a href="#news-media" className="text-gray-300 hover:text-green-200 text-sm transition-colors duration-200">
                {language === 'en' ? 'News & Media' : 'সংবাদ ও মিডিয়া'}
              </a>
            </li>
            <li>
              <a href="#career" className="text-gray-300 hover:text-green-200 text-sm transition-colors duration-200">
                {language === 'en' ? 'Career' : 'ক্যারিয়ার'}
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-300 hover:text-green-200 text-sm transition-colors duration-200">
                {language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-300 hover:text-green-200 text-sm transition-colors duration-200">
                {language === 'en' ? 'Contact' : 'যোগাযোগ'}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-green-300">
            {language === 'en' ? 'Contact' : 'যোগাযোগ'}
          </h4>
          <address className="not-italic text-gray-300 text-sm space-y-2">
            <p>
              {language === 'en'
                ? 'House: 01, Road: 02, Block: A, Section: 10, Mirpur, Dhaka-1216'
                : 'বাড়ি: ০১, রোড: ০২, ব্লক: এ, সেকশন: ১০, মিরপুর, ঢাকা-১২১৬'}
            </p>
            <p>
              {language === 'en' ? 'Phone: +880 1234 567890' : 'ফোন: +৮৮০ ১২৩৪ ৫৬৭৮৯০'}
            </p>
            <p>
              {language === 'en' ? 'Email: info@bgagro.com' : 'ইমেইল: info@bgagro.com'}
            </p>
          </address>
          <div className="flex mt-4 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M12 2.04C6.51 2.04 2.04 6.51 2.04 12c0 5.09 3.73 9.3 8.63 9.94v-7.04h-2.34V12h2.34V9.34c0-2.32 1.42-3.59 3.5-3.59 1.02 0 1.9.07 2.16.1v2.54h-1.5c-1.2 0-1.44.57-1.44 1.41V12h2.89l-.47 2.9h-2.42v7.04c4.9-.64 8.63-4.85 8.63-9.94C21.96 6.51 17.49 2.04 12 2.04z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M22.46 6c-.77.34-1.6.56-2.47.67.88-.53 1.56-1.37 1.88-2.37-.83.49-1.75.85-2.72 1.04C18.37 4.5 17.26 4 16 4c-2.37 0-4.3 1.93-4.3 4.3 0 .34.04.67.1.99C8.49 9.07 5.6 7.5 3.65 4.96c-.37.64-.58 1.38-.58 2.18 0 1.49.76 2.81 1.91 3.59-.7-.02-1.35-.21-1.92-.5v.05c0 2.09 1.49 3.83 3.47 4.22-.36.1-.74.15-1.13.15-.27 0-.53-.03-.79-.07.55 1.72 2.14 2.97 4.03 3.01-1.48 1.16-3.35 1.85-5.38 1.85-.35 0-.69-.02-1.03-.06C3.17 20.37 5.33 21 7.55 21c8.08 0 12.49-6.69 12.49-12.49 0-.19-.01-.37-.01-.56.86-.62 1.6-1.39 2.18-2.27z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.955v5.658H9.488V9.452h3.416v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.467v6.225zM7.931 8.237c-1.168 0-2.105-.935-2.105-2.093 0-1.157.937-2.092 2.105-2.092 1.17 0 2.106.935 2.106 2.092 0 1.158-.936 2.093-2.106 2.093zM9.488 20.452H5.934V9.452h3.554v11z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;