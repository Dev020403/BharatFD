import React from "react";
import { Loader2, Pencil, Trash2, Check, X } from "lucide-react";

const FAQList = ({ faqs, loading, handleEdit, handleDelete, deleteConfirm, setDeleteConfirm }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Existing FAQs</h2>
      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center p-12 bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl">
          <p className="text-gray-600">No FAQs available</p>
        </div>
      ) : (
        faqs.map((faq) => (
          <div
            key={faq._id}
            className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl border border-white border-opacity-40 shadow-sm p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{faq.question}</h3>
                <div className="prose text-gray-600" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                {deleteConfirm === faq._id ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(faq._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FAQList;
