import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import FAQPage from './pages/FAQPage';
import FAQEditor from './pages/FAQEditor';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<FAQPage />} />
                    <Route path="/editor" element={<FAQEditor />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;