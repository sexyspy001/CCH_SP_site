import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { siteConfig } from '../siteConfig';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-lg prose-orange">
          <h1>Terms of Service</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            Welcome to Click Commerce Hub. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Click Commerce Hub if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2>Services</h2>
          <p>
            Click Commerce Hub provides ecommerce management, quick commerce onboarding, digital marketing, and compliance services. We act as an authorized service provider for various platforms.
          </p>
          <h2>User Responsibilities</h2>
          <p>
            You must provide accurate and complete information when engaging our services. You are responsible for maintaining the confidentiality of any account credentials provided to us.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Click Commerce Hub, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website or our services.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at {siteConfig.email}.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
