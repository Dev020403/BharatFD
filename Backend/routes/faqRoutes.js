const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Fetch all FAQs
router.get('/faqs', faqController.getFAQs);

// Create a new FAQ
router.post('/faqs', faqController.createFAQ);

// Update an FAQ
router.put('/faqs/:id', faqController.updateFAQ);

// Delete an FAQ
router.delete('/faqs/:id', faqController.deleteFAQ);

module.exports = router;