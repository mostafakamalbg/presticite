
// client/src/pages/ContactPage.js
// যোগাযোগ পৃষ্ঠা কম্পোনেন্ট
import React, { useState } from 'react';
const ContactPage = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে ফর্ম সাবমিট করার লজিক যোগ করুন (যেমন ব্যাকএন্ড API কল)
    console.log('Form data submitted:', formData);
    setSubmissionStatus(language === 'en' ? 'Message sent successfully!' : 'মেসেজ সফলভাবে পাঠানো হয়েছে!');
    setFormData({ name: '', email: '', subject: '', message: '' }); // ফর্ম রিসেট করুন
    // 3 সেকেন্ড পর স্ট্যাটাস মেসেজ সরিয়ে ফেলুন
    setTimeout(() => setSubmissionStatus(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        {language === 'en' ? 'Contact Us' : 'আমাদের সাথে যোগাযোগ করুন'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submissionStatus && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{submissionStatus}</span>
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              {language === 'en' ? 'Name' : 'নাম'}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              {language === 'en' ? 'Email' : 'ইমেইল'}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
              {language === 'en' ? 'Subject' : 'বিষয়'}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              {language === 'en' ? 'Message' : 'বার্তা'}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              {language === 'en' ? 'Send Message' : 'মেসেজ পাঠান'}
            </button>
          </div>
        </form>
        <div className="mt-8 text-center text-gray-700">
          <p className="mb-2">
            {language === 'en' ? 'Alternatively, you can reach us at:' : 'বিকল্পভাবে, আপনি আমাদের সাথে যোগাযোগ করতে পারেন:'}
          </p>
          <p className="font-semibold">
            {language === 'en' ? 'Email: mostafakamalbg@gmail.com' : 'ইমেইল: mostafakamalbg@gmail.com'}
          </p>
          <p className="font-semibold">
            {language === 'en' ? 'Phone: +880 1867 912167 ' : 'ফোন: +৮৮০ ১৮৬৭ ৯১২১৬৭'}
          </p>
          <p className="mt-4">
            {language === 'en' ? 'Our Office Address:' : 'আমাদের অফিসের ঠিকানা:'}
            <br />
            {language === 'en' ? 'House: 01, Road: 01, Uposhohor, Bogura -5800:' : 'হোল্ডিং নম্বর : সিএ#০১, মেইন রোড: ০২, উপশহর, বগুড়া।'}      </p>
        </div>
      </div>
    </div>
  );
};


export default ContactPage;