import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Loader2, Save, AlertCircle } from "lucide-react";

const FAQEditor = () => {
  const [faq, setFaq] = useState({
    question: "",
    answer: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    setError("");
    setSuccess(false);
  };

  const handleAnswerChange = (content) => {
    // Strip HTML tags for validation
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();
    setFaq({ ...faq, answer: content });
    setError("");
    setSuccess(false);
  };

  const validateForm = () => {
    if (!faq.question.trim()) {
      setError("Question is required");
      return false;
    }
    if (!faq.answer.replace(/<[^>]*>/g, "").trim()) {
      setError("Answer is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faq),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create FAQ");
      }

      setSuccess(true);
      setFaq({ question: "", answer: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="relative max-w-3xl mx-auto px-4 py-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Header Section */}
        <div className="relative text-center mb-16">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Create FAQ
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Add a new question and answer to help users
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <p className="text-green-600">FAQ created successfully!</p>
          </div>
        )}

        {/* FAQ Editor Form */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl
                    border-2 border-white border-opacity-40 shadow-lg p-8 space-y-6">
          {/* Question Input */}
          <div className="space-y-2">
            <label className="text-lg font-medium text-gray-700">
              Question
            </label>
            <input
              type="text"
              value={faq.question}
              onChange={handleQuestionChange}
              placeholder="Enter your question here"
              className="w-full px-6 py-3 bg-white bg-opacity-50 rounded-xl
                       border border-gray-200 focus:border-purple-500
                       focus:ring-2 focus:ring-purple-500 focus:outline-none
                       transition-all duration-300"
            />
          </div>

          {/* Answer Editor */}
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full mt-6 inline-flex items-center justify-center px-8 py-3 text-white
                     bg-gradient-to-r from-purple-600 to-blue-600
                     rounded-xl hover:from-purple-700 hover:to-blue-700
                     transition-all duration-300 disabled:opacity-50
                     shadow-lg hover:shadow-xl"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating FAQ...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create FAQ
              </>
            )}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Translations will be automatically generated for Hindi and Bengali
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQEditor;