// client/src/pages/AboutPage.js
// আমাদের সম্পর্কে পৃষ্ঠা কম্পোনেন্ট
import React from 'react';
const AboutPage = ({ language }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        {language === 'en' ? 'About BG Agro Limited' : 'বিজি এগ্রো লিমিটেড সম্পর্কে'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl text-center">
        <img
          src="https://placehold.co/600x300/34D399/FFFFFF?text=Our+Team"
          alt="Our Team"
          className="w-full h-auto rounded-md mb-6"
        />
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {language === 'en'
            ? 'BG Agro Limited is a leading agricultural company dedicated to providing high-quality agro products and solutions to farmers across the nation. Our mission is to empower farmers with the best resources, fostering sustainable agricultural practices and contributing to food security.'
            : 'বিজি এগ্রো লিমিটেড একটি শীর্ষস্থানীয় কৃষি সংস্থা যা সারা দেশের কৃষকদের উচ্চ-মানের কৃষি পণ্য এবং সমাধান প্রদানে নিবেদিত। আমাদের লক্ষ্য হল কৃষকদের সর্বোত্তম সম্পদ দিয়ে ক্ষমতায়ন করা, টেকসই কৃষি পদ্ধতিকে উৎসাহিত করা এবং খাদ্য নিরাপত্তায় অবদান রাখা।'}
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          {language === 'en'
            ? 'With years of experience and a team of dedicated experts, we strive for innovation and excellence in every aspect of our operations. We believe in building strong relationships with our stakeholders and contributing positively to the agricultural community.'
            : 'বছরের পর বছর অভিজ্ঞতা এবং নিবেদিত বিশেষজ্ঞদের একটি দল নিয়ে, আমরা আমাদের কার্যক্রমের প্রতিটি ক্ষেত্রে উদ্ভাবন এবং শ্রেষ্ঠত্বের জন্য চেষ্টা করি। আমরা আমাদের অংশীদারদের সাথে শক্তিশালী সম্পর্ক গড়ে তুলতে এবং কৃষি সম্প্রদায়ে ইতিবাচক অবদান রাখতে বিশ্বাস করি।'}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;