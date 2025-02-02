import React, { useState, useEffect } from "react";
import FAQForm from "../components/FAQForm";
import FAQList from "../components/FAQList";
import StatusMessages from "../components/StatusMessage";

const FAQEditor = () => {
  const [faqs, setFaqs] = useState([]);
  const [faq, setFaq] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchFAQs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/faqs");
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setError("Failed to fetch FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleEdit = (selectedFaq) => {
    setFaq({ question: selectedFaq.question, answer: selectedFaq.answer });
    setSelectedFaq(selectedFaq);
    setEditMode(true);
    setError("");
    setSuccess(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/faqs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete FAQ");

      setSuccess("FAQ deleted successfully");
      setDeleteConfirm(null);
      fetchFAQs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const url = editMode
        ? `http://localhost:8000/api/faqs/${selectedFaq._id}`
        : "http://localhost:8000/api/faqs";

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faq),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to ${editMode ? "update" : "create"} FAQ`
        );
      }

      setSuccess(`FAQ ${editMode ? "updated" : "created"} successfully!`);
      setFaq({ question: "", answer: "" });
      setEditMode(false);
      setSelectedFaq(null);
      fetchFAQs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
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

  const cancelEdit = () => {
    setFaq({ question: "", answer: "" });
    setEditMode(false);
    setSelectedFaq(null);
    setError("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100">
      <div className="relative max-w-5xl mx-auto px-4 py-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative text-center mb-16">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {editMode ? "Edit FAQ" : "Manage FAQs"}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {editMode
              ? "Update your FAQ"
              : "Create and manage frequently asked questions"}
          </p>
        </div>

        <StatusMessages error={error} success={success} />

        <FAQForm
          faq={faq}
          setFaq={setFaq}
          saving={saving}
          editMode={editMode}
          handleSubmit={handleSubmit}
          cancelEdit={cancelEdit}
        />

        {!editMode && (
          <FAQList
            faqs={faqs}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default FAQEditor;
