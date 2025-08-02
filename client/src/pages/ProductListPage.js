// client/src/pages/ProductListPage.js
import React from 'react';
// ProductListPage component to display products
const ProductListPage = ({ language }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">
        {language === 'en' ? 'Products Page (Coming Soon)' : 'পণ্য পৃষ্ঠা (শীঘ্রই আসছে)'}
      </h1>
    </div>
  );
};

export default ProductListPage;