import { Link, useLocation } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Linkedin, Globe } from 'lucide-react';
import { platforms } from '../data';
import { siteConfig, whatsappUrl } from '../siteConfig';

const socialItems = [
  { name: 'YouTube', href: siteConfig.socialLinks.youtube, icon: Youtube },
  { name: 'Instagram', href: siteConfig.socialLinks.instagram, icon: Instagram },
  { name: 'IndiaMART', href: siteConfig.socialLinks.indiamart, icon: Globe },
  { name: 'LinkedIn', href: siteConfig.socialLinks.linkedin, icon: Linkedin },
  { name: 'Facebook', href: siteConfig.socialLinks.facebook, icon: Facebook },
];

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="border-t border-gray-200 bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 xl:grid-cols-[1.2fr_1.8fr]">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                className="h-14 w-auto rounded-2xl bg-white/10 p-1"
                src="https://raw.githubusercontent.com/sexyspy001/clickcommercehub_logo/4ab5caadb309169d25eab1f33ca1beab7177f861/cch-logoog%20(2).png"
                alt="Click Commerce Hub"
              />
              <div>
                <p className="text-lg font-semibold">Click Commerce Hub</p>
                <p className="text-sm text-gray-400">Premium ecommerce growth partner</p>
              </div>
            </Link>
            <p className="max-w-xl text-sm leading-7 text-gray-400">
              We engineer scalable marketplace growth across Amazon, Flipkart, Meesho, quick commerce, and modern digital acquisition channels.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <a href={`mailto:${siteConfig.email}`} className="block hover:text-white">{siteConfig.email}</a>
              <a href={whatsappUrl(siteConfig.whatsappPrimary)} target="_blank" rel="noreferrer" className="block hover:text-white">WhatsApp: +91 62000 17130</a>
              <a href={whatsappUrl(siteConfig.whatsappSecondary)} target="_blank" rel="noreferrer" className="block hover:text-white">WhatsApp: +91 82522 65832</a>
            </div>
            <div className="flex flex-wrap gap-3">
              {socialItems.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-gray-300 transition-all hover:border-orange-400/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <a href={isHome ? '#pricing' : '/#pricing'} className="hover:text-white">Pricing</a>
              <a href={isHome ? '#regions' : '/#regions'} className="hover:text-white">Regions</a>
              <Link to="/blog" className="hover:text-white">Insights</Link>
              <Link to="/contact-click-commerce-hub" className="hover:text-white">Contact</Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">Company</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/services" className="hover:text-white">All Services</Link></li>
                <li><Link to="/ai-tools" className="hover:text-white">AI Tools</Link></li>
                <li><Link to="/contact-click-commerce-hub" className="hover:text-white">Get Consultation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">Platforms</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                {platforms.slice(0, 6).map((platform) => (
                  <li key={platform.id}>
                    <Link to={`/${platform.slug}`} className="hover:text-white">
                      {platform.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">Growth Areas</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                <li><Link to="/amazon-cataloging-service" className="hover:text-white">Amazon Cataloging</Link></li>
                <li><Link to="/flipkart-account-management-service" className="hover:text-white">Flipkart Management</Link></li>
                <li><Link to="/marketplace-ppc-management" className="hover:text-white">Marketplace PPC</Link></li>
                <li><Link to="/ecommerce-business-consulting" className="hover:text-white">Ecommerce Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-300">Legal</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-400">
                <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Click Commerce Hub. All rights reserved.</p>
          <p className="mt-2 max-w-3xl leading-6">
            Privacy-first operations. We do not misuse client credentials or seller data and keep all account access restricted to service delivery and support.
          </p>
        </div>
      </div>
    </footer>
  );
}
