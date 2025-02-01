const FAQ = require('../models/faqSchema');
const {translate} = require('@vitalets/google-translate-api');

// Fetch all FAQs with language support
exports.getFAQs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const faqs = await FAQ.find();
        const translatedFAQs = faqs.map(faq => faq.getTranslatedText(lang));
        res.status(200).json(translatedFAQs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
    }
};

// Create a new FAQ
exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const translations = {};

        const hindiQuestion = await translate(question, { to: 'hi' });
        const hindiAnswer = await translate(answer, { to: 'hi' });

        const bengaliQuestion = await translate(question, { to: 'bn' });
        const bengaliAnswer = await translate(answer, { to: 'bn' });

        translations.hi = { question: hindiQuestion.text, answer: hindiAnswer.text };
        translations.bn = { question: bengaliQuestion.text, answer: bengaliAnswer.text };

        const newFAQ = new FAQ({ question, answer, translations });
        await newFAQ.save();
        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({ message: 'Error creating FAQ', error: error.message });
    }
};

// Update an existing FAQ
exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer, translations } = req.body;
        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id,
            { question, answer, translations },
            { new: true } // Return the updated document
        );
        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(updatedFAQ);
    } catch (error) {
        res.status(500).json({ message: 'Error updating FAQ', error: error.message });
    }
};

// Delete an FAQ
exports.deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
    }
};