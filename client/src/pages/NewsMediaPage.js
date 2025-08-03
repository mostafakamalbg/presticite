// client/src/pages/NewsMediaPage.js
// নিউজ ও মিডিয়া পৃষ্ঠা কম্পোনেন্ট
import React from 'react';
const NewsMediaPage = ({ language }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        {language === 'en' ? 'News & Media' : 'সংবাদ ও মিডিয়া'}
      </h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl">
        {language === 'en'
          ? 'Stay updated with our latest news, press releases, and media coverage.'
          : 'আমাদের সর্বশেষ সংবাদ, প্রেস রিলিজ এবং মিডিয়া কভারেজ সম্পর্কে অবগত থাকুন।'}
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample News Card 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {language === 'en' ? 'Company Achieves New Milestone' : 'কোম্পানি নতুন মাইলফলক অর্জন করেছে'}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {language === 'en'
              ? 'We are proud to announce a significant achievement in our journey towards sustainable agriculture.'
              : 'টেকসই কৃষির পথে আমাদের যাত্রায় একটি গুরুত্বপূর্ণ অর্জন ঘোষণা করতে পেরে আমরা গর্বিত।'}
          </p>
          <a href="./HomePage.js" className="text-green-600 hover:text-green-800 font-medium">
            {language === 'en' ? 'Read More' : 'আরও পড়ুন'}
          </a>
        </div>
        {/* Sample News Card 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {language === 'en' ? 'Innovations in Crop Protection' : 'ফসল সুরক্ষায় উদ্ভাবন'}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {language === 'en'
              ? 'Discover our latest advancements in eco-friendly crop protection solutions.'
              : 'পরিবেশ-বান্ধব ফসল সুরক্ষা সমাধানে আমাদের সর্বশেষ অগ্রগতিগুলি আবিষ্কার করুন।'}
          </p>
          <a href="./HomePage.js" className="text-green-600 hover:text-green-800 font-medium">
            {language === 'en' ? 'Read More' : 'আরও পড়ুন'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsMediaPage;