import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [openIndex, setOpenIndex] = useState(null);

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "bn", label: "Bengali" },
  ];

  const fetchFAQs = async (lang) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/faqs?lang=${lang}`);
      if (!response.ok) throw new Error("Failed to fetch FAQs");
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs(selectedLang);
  }, [selectedLang]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="relative max-w-5xl mx-auto px-4 py-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Hero Section */}
        <div className="relative text-center mb-16 space-y-4">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-fade-in">
            How can we help?
          </h1>
          <p className="text-xl text-gray-600 animate-fade-in animation-delay-200">
            Find answers to commonly asked questions about our services
          </p>
        </div>

        {/* Language Selector */}
        <div className="relative z-10 mb-12 flex justify-center">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="px-6 py-3 bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl
                     border-2 border-white border-opacity-40 shadow-lg
                     text-gray-700 font-medium
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     transition-all duration-300 ease-out
                     hover:shadow-xl hover:scale-105"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value} className="text-gray-700">
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content Section */}
        <div className="relative space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="p-8 bg-red-50 bg-opacity-90 backdrop-blur-lg rounded-3xl border border-red-100 shadow-lg">
              <p className="text-red-600 text-center font-medium">{error}</p>
            </div>
          ) : faqs.length === 0 ? (
            <div className="p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl border border-white border-opacity-40 shadow-lg">
              <p className="text-gray-600 text-center font-medium">No FAQs available in this language.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id || index}
                  className="group bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl
                           border-2 border-white border-opacity-40 shadow-lg
                           transition-all duration-500 ease-out
                           hover:shadow-xl hover:bg-opacity-90"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 flex justify-between items-center text-left"
                  >
                    <span className="text-xl font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span
                      className={`ml-4 flex-shrink-0 p-2 rounded-full border-2 border-purple-100
                                transition-all duration-500 ease-out transform
                                group-hover:border-purple-200 group-hover:bg-purple-50
                                ${openIndex === index ? "rotate-45 bg-purple-50" : "rotate-0"}`}
                    >
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 6v12m6-6H6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-500 ease-out overflow-hidden
                              ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="p-8 border-t border-purple-100">
                      <div
                        className="prose prose-lg max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;