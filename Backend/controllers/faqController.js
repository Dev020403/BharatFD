const FAQ = require('../models/faqSchema');
const { translate } = require('@vitalets/google-translate-api');
const { getCache, setCache, clearCache } = require('../utils/cacheService');

// Fetch all FAQs with language support
exports.getFAQs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const cacheKey = `faqs:${lang}`;
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        const faqs = await FAQ.find();
        const translatedFAQs = await Promise.all(
            faqs.map(async (faq) => await faq.getTranslatedText(lang))
        );

        await setCache(cacheKey, JSON.stringify(translatedFAQs));
        res.status(200).json(translatedFAQs);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
    }
};

// Helper function to update cache after DB changes
const updateCache = async () => {
    await clearCache('faqs:*');  // Clears all cached FAQ entries
};

// Create a new FAQ
exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }

        const translations = {
            hi: {
                question: (await translate(question, { to: 'hi' })).text,
                answer: (await translate(answer, { to: 'hi' })).text
            },
            bn: {
                question: (await translate(question, { to: 'bn' })).text,
                answer: (await translate(answer, { to: 'bn' })).text
            }
        };

        const newFAQ = new FAQ({ question, answer, translations });
        await newFAQ.save();

        await updateCache();
        res.status(201).json(newFAQ);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ message: 'Error creating FAQ', error: error.message });
    }
};

// Update an existing FAQ
exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }

        const translations = {
            hi: {
                question: (await translate(question, { to: 'hi' })).text,
                answer: (await translate(answer, { to: 'hi' })).text
            },
            bn: {
                question: (await translate(question, { to: 'bn' })).text,
                answer: (await translate(answer, { to: 'bn' })).text
            }
        };

        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id,
            { question, answer, translations },
            { new: true }
        );

        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        await updateCache();
        res.status(200).json(updatedFAQ);
    } catch (error) {
        console.error('Error updating FAQ:', error);
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

        await updateCache();
        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
    }
};
