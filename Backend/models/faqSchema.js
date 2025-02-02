import mongoose from 'mongoose';

// Schema for FAQ
const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
        hi: { question: String, answer: String },
        bn: { question: String, answer: String },
    },
}, { timestamps: true });

// Method to get translated text
faqSchema.methods.getTranslatedText = function (lang = 'en') {
    if (lang === 'en') {
        return { question: this.question, answer: this.answer };
    }
    return {
        question: this.translations[lang]?.question || this.question,
        answer: this.translations[lang]?.answer || this.answer,
    };
};

export default mongoose.model('FAQ', faqSchema);