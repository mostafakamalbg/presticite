
// client/src/pages/HomePage.js
import React from 'react';
const HomePage = ({ language }) => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20 md:py-32 flex items-center justify-center rounded-b-lg overflow-hidden"
        style={{
          minHeight: '400px',
        }}
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://placehold.co/1200x600/34D399/FFFFFF?text=Hero+Image+Field')" }}></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            {language === 'en' ? 'Valid Agro Products LTD' : 'ভ্যালিড এগ্রো প্রোডাক্টস লিমিটেড'}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            {language === 'en' ? 'Your Partner for a Green Future' : 'সবুজ ভবিষ্যতের জন্য আপনার অংশীদার'}
          </p>
          <button className="bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
            {language === 'en' ? 'View Our Products' : 'আমাদের পণ্য দেখুন'}
          </button>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
              {language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {language === 'en'
                ? 'Valid Agro Products LTD is committed to promoting sustainable agriculture and a thriving agricultural sector. We help farmers enhance productivity and crop quality by supplying high-quality seeds, fertilizers, and pesticides.'
                : 'ভ্যালিড এগ্রো প্রোডাক্টস লিমিটেড টেকসই কৃষি ও একটি সমৃদ্ধ কৃষি খাত প্রচারে প্রতিশ্রুতিবদ্ধ। আমরা উচ্চ-মানের বীজ, সার এবং কীটনাশক সরবরাহ করে কৃষকদের উৎপাদনশীলতা এবং ফসলের গুণমান বৃদ্ধিতে সহায়তা করি।'}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {language === 'en'
                ? 'Our goal is to promote sustainable agricultural practices while maintaining ecological balance. We invest in research and development so that our products can meet the needs of farmers and contribute to food security.'
                : 'আমাদের লক্ষ্য হল পরিবেশগত ভারসাম্য বজায় রেখে টেকসই কৃষি পদ্ধতির প্রচার করা। আমরা গবেষণা ও উন্নয়নে বিনিয়োগ করি যাতে আমাদের পণ্য কৃষকদের চাহিদা পূরণ করতে পারে এবং খাদ্য নিরাপত্তায় অবদান রাখতে পারে।'}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {language === 'en'
                ? 'Our manufacturing plants follow modern production processes, ensuring the highest quality of our products.'
                : 'আমাদের উৎপাদন কেন্দ্রগুলি আধুনিক উৎপাদন প্রক্রিয়া অনুসরণ করে, যা আমাদের পণ্যের সর্বোচ্চ গুণমান নিশ্চিত করে।'}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
              <img
                src="https://placehold.co/400x300/C6F6D5/2F855A?text=Farm+Landscape"
                alt="Farm Landscape"
                className="w-full h-auto rounded-md mb-4"
              />
              <p className="text-green-800 font-semibold">
                {language === 'en' ? 'Farm Landscape' : 'খামার ল্যান্ডস্কেপ'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section id="products" className="py-16 md:py-24 px-6 md:px-10 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
            {language === 'en' ? 'Our Products' : 'আমাদের পণ্যসমূহ'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Card 1: Seeds */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <div className="text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 8h.01M5 12h.01M5 16h.01M9 8h.01M9 12h.01M9 16h.01M13 8h.01M13 12h.01M13 16h.01M17 8h.01M17 12h.01M17 16h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {language === 'en' ? 'Seeds' : 'বীজ'}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {language === 'en'
                  ? 'High-quality seeds for better yield and disease resistance.'
                  : 'উচ্চ ফলনশীল এবং রোগ প্রতিরোধক উন্নত মানের বীজ।'}
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-200">
                {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
              </button>
            </div>

            {/* Product Card 2: Fertilizers */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <div className="text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 11.5V14m0-2.5V12m0 0h2.5M7 12h-2.5M17 12h2.5M17 11.5V14m0-2.5V12m0 0h-2.5m-10-4.5h15c1.105 0 2 .895 2 2v10c0 1.105-.895 2-2 2H7c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {language === 'en' ? 'Fertilizers' : 'সার'}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {language === 'en'
                  ? 'Nutrient-rich fertilizers for optimal plant growth and health.'
                  : 'উদ্ভিদের সর্বোত্তম বৃদ্ধি ও স্বাস্থ্যের জন্য পুষ্টি সমৃদ্ধ সার।'}
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-200">
                {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
              </button>
            </div>

            {/* Product Card 3: Pesticides */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <div className="text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14v4m0 0h-2m2 0h2m-2-4V6m0 0h-2m2 0h2m-2-4V2m0 0h-2m2 0h2M7 10h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {language === 'en' ? 'Pesticides' : 'কীটনাশক'}
              </h3>
              <p className="text-gray-600 text-center mb-6">
                {language === 'en'
                  ? 'Effective pesticides for controlling harmful pests and diseases in crops.'
                  : 'ফসলের ক্ষতিকারক পোকামাকড় ও রোগ নিয়ন্ত্রণে কার্যকর কীটনাশক।'}
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-200">
                {language === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Manufacturing Plants Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
            {language === 'en' ? 'Our Manufacturing Plants' : 'আমাদের উৎপাদন কেন্দ্র'}
          </h2>
          <div className="bg-green-700 p-8 rounded-lg shadow-lg text-white max-w-4xl mx-auto">
            <img
              src="https://placehold.co/800x400/34D399/FFFFFF?text=Manufacturing+Plant+Image"
              alt="Manufacturing Plant"
              className="w-full h-auto rounded-md mb-6"
            />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'en'
                ? 'Our Manufacturing Plants: Enriched with Modern Manufacturing Technology'
                : 'আমাদের উৎপাদন কেন্দ্র: আধুনিক উৎপাদন প্রযুক্তিতে সমৃদ্ধ'}
            </h3>
            <p className="text-lg mb-8">
              {language === 'en'
                ? 'We utilize state-of-the-art technology and processes to ensure the highest quality and efficiency in our production.'
                : 'আমরা আমাদের উৎপাদনে সর্বোচ্চ গুণমান এবং দক্ষতা নিশ্চিত করতে অত্যাধুনিক প্রযুক্তি এবং প্রক্রিয়া ব্যবহার করি।'}
            </p>
            <button className="bg-white text-green-700 hover:bg-green-100 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
              {language === 'en' ? 'Learn More' : 'আরও জানুন'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
