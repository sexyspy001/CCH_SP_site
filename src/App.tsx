/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EcommerceMainPage from './pages/EcommerceMainPage';
import QuickCommerceMainPage from './pages/QuickCommerceMainPage';
import ServicesMainPage from './pages/ServicesMainPage';
import DynamicRouter from './pages/DynamicRouter';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AITools from './pages/AITools';
import BackgroundHeart from './components/BackgroundHeart';

export default function App() {
  return (
    <Router>
      <BackgroundHeart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecommerce" element={<EcommerceMainPage />} />
        <Route path="/quick-commerce" element={<QuickCommerceMainPage />} />
        <Route path="/services" element={<ServicesMainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-click-commerce-hub" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/:slug" element={<DynamicRouter />} />
      </Routes>
    </Router>
  );
}



