import express from 'express';
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from '../controllers/faqController.js';

const router = express.Router();

// Fetch all FAQs
router.get('/faqs', getFAQs);

// Create a new FAQ
router.post('/faqs', createFAQ);

// Update an FAQ
router.put('/faqs/:id', updateFAQ);

// Delete an FAQ
router.delete('/faqs/:id', deleteFAQ);

export default router;