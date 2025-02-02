import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Save, Loader2, ArrowLeft } from "lucide-react";

const FAQForm = ({ faq, setFaq, saving, editMode, handleSubmit, cancelEdit }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const handleQuestionChange = (e) => {
    setFaq({ ...faq, question: e.target.value });
  };

  const handleAnswerChange = (content) => {
    setFaq({ ...faq, answer: content });
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl border-2 border-white border-opacity-40 shadow-lg p-8 space-y-6 mb-8">
      {editMode && (
        <button
          onClick={cancelEdit}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to FAQ List
        </button>
      )}

      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-700">Question</label>
        <input
          type="text"
          value={faq.question}
          onChange={handleQuestionChange}
          placeholder="Enter your question here"
          className="w-full px-6 py-3 bg-white bg-opacity-50 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-700">Answer</label>
        <div className="prose max-w-none">
          <ReactQuill
            value={faq.answer}
            onChange={handleAnswerChange}
            modules={modules}
            className="bg-white rounded-xl"
            theme="snow"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={saving}
        className="w-full mt-6 inline-flex items-center justify-center px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
      >
        {saving ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {editMode ? 'Updating FAQ...' : 'Creating FAQ...'}
          </>
        ) : (
          <>
            <Save className="w-5 h-5 mr-2" />
            {editMode ? 'Update FAQ' : 'Create FAQ'}
          </>
        )}
      </button>
    </div>
  );
};

export default FAQForm;
