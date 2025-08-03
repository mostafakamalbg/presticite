// client/src/pages/CareerPage.js
// ক্যারিয়ার পৃষ্ঠা কম্পোনেন্ট
import React from 'react';
const CareerPage = ({ language }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        {language === 'en' ? 'Career Opportunities' : 'ক্যারিয়ার সুযোগ'}
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-12">
        {language === 'en'
          ? 'Join our dynamic team and contribute to a greener future. Explore our open positions below.'
          : 'আমাদের গতিশীল দলে যোগ দিন এবং একটি সবুজ ভবিষ্যতে অবদান রাখুন। নিচে আমাদের খোলা পদগুলি দেখুন।'}
      </p>
      <div className="w-full max-w-3xl space-y-6">
        {/* Sample Job Opening 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {language === 'en' ? 'Agricultural Scientist' : 'কৃষি বিজ্ঞানী'}
          </h3>
          <p className="text-gray-600 mb-3">
            {language === 'en' ? 'Location: Dhaka, Bangladesh' : 'অবস্থান: ঢাকা, বাংলাদেশ'}
          </p>
          <p className="text-gray-700 mb-4">
            {language === 'en'
              ? 'We are looking for an experienced Agricultural Scientist to lead our research and development initiatives.'
              : 'আমরা আমাদের গবেষণা ও উন্নয়ন উদ্যোগের নেতৃত্ব দেওয়ার জন্য একজন অভিজ্ঞ কৃষি বিজ্ঞানী খুঁজছি।'}
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-200">
            {language === 'en' ? 'Apply Now' : 'এখনই আবেদন করুন'}
          </button>
        </div>
        {/* Sample Job Opening 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {language === 'en' ? 'Sales Executive' : 'সেলস এক্সিকিউটিভ'}
          </h3>
          <p className="text-gray-600 mb-3">
            {language === 'en' ? 'Location: Rajshahi, Bangladesh' : 'অবস্থান: রাজশাহী, বাংলাদেশ'}
          </p>
          <p className="text-gray-700 mb-4">
            {language === 'en'
              ? 'Seeking a dynamic Sales Executive to expand our market reach in the northern region.'
              : 'উত্তর অঞ্চলে আমাদের বাজার প্রসারিত করার জন্য একজন গতিশীল সেলস এক্সিকিউটিভ খুঁজছি।'}
          </p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-200">
            {language === 'en' ? 'Apply Now' : 'এখনই আবেদন করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default CareerPage;