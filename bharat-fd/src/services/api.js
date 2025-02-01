import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your backend URL

export const createFAQ = async (data) => {
    return axios.post(`${API_URL}/faqs`, data);
};

export const getFAQs = async (lang = 'en') => {
    return axios.get(`${API_URL}/faqs`, { params: { lang } });
};