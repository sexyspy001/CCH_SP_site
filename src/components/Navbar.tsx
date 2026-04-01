import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Ecommerce', href: '/ecommerce' },
    { name: 'Quick Commerce', href: '/quick-commerce' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Contact', href: '/contact-click-commerce-hub' },
  ];

  const quickLinks = [
    { name: 'Pricing', href: isHome ? '#pricing' : '/#pricing' },
    { name: 'Regions', href: isHome ? '#regions' : '/#regions' },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            className="h-11 w-auto rounded-xl bg-white/70 p-1 shadow-sm"
            src="https://raw.githubusercontent.com/sexyspy001/clickcommercehub_logo/4ab5caadb309169d25eab1f33ca1beab7177f861/cch-logoog%20(2).png"
            alt="Click Commerce Hub"
          />
          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-base font-semibold text-gray-900">Click Commerce Hub</p>
            <p className="truncate text-xs uppercase tracking-[0.24em] text-gray-500">Marketplace Growth Partner</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${location.pathname === link.href ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:bg-gray-100 hover:text-orange-600'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/contact-click-commerce-hub"
            className="inline-flex items-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 hover:shadow-md"
          >
            Get Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors hover:text-gray-900 xl:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gray-100 bg-white/95 px-4 py-4 shadow-lg xl:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-3 px-2 pt-2 text-sm text-gray-500">
              {quickLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-gray-900">
                  {link.name}
                </a>
              ))}
            </div>
            <Link
              to="/contact-click-commerce-hub"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700"
            >
              Get Free Consultation
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
