import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Youtube, Instagram, Facebook, Linkedin, Globe } from 'lucide-react';
import { siteConfig, whatsappUrl } from '../siteConfig';

const socials = [
  { name: 'YouTube', href: siteConfig.socialLinks.youtube, icon: Youtube },
  { name: 'Instagram', href: siteConfig.socialLinks.instagram, icon: Instagram },
  { name: 'IndiaMART', href: siteConfig.socialLinks.indiamart, icon: Globe },
  { name: 'LinkedIn', href: siteConfig.socialLinks.linkedin, icon: Linkedin },
  { name: 'Facebook', href: siteConfig.socialLinks.facebook, icon: Facebook },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">Get in Touch</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Start the conversation with a team built for serious marketplace growth
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Share your current priorities and we will map the service mix, execution focus, and next commercial moves worth making.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                  <div className="mt-1">
                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                  <div className="mt-1">
                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business email</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number / WhatsApp</label>
                <div className="mt-1">
                  <input type="text" name="phone" id="phone" autoComplete="tel" className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500" />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">Priority service area</label>
                <div className="mt-1">
                  <select id="service" name="service" className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                    <option>Ecommerce Management</option>
                    <option>Quick Commerce Onboarding</option>
                    <option>Digital Marketing</option>
                    <option>Legal & Compliance</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">What are you trying to improve?</label>
                <div className="mt-1">
                  <textarea id="message" name="message" rows={4} className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
                </div>
              </div>

              <div>
                <button type="submit" className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  Request Growth Consultation
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">Connect with Click Commerce Hub</h3>
              <p className="mb-8 text-lg text-gray-500">
                Reach us directly by email, phone, WhatsApp, or social channels. We work remotely with brands that want sharper execution and more dependable growth systems.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-orange-100 p-3">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-base text-gray-500 hover:text-orange-600">{siteConfig.email}</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-orange-100 p-3">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-lg font-medium text-gray-900">WhatsApp</p>
                  <a href={whatsappUrl(siteConfig.whatsappPrimary)} target="_blank" rel="noreferrer" className="block text-base text-gray-500 hover:text-orange-600">+91 62000 17130</a>
                  <a href={whatsappUrl(siteConfig.whatsappSecondary)} target="_blank" rel="noreferrer" className="block text-base text-gray-500 hover:text-orange-600">+91 82522 65832</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-orange-100 p-3">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-lg font-medium text-gray-900">Call us</p>
                  <a href="tel:+916200017130" className="block text-base text-gray-500 hover:text-orange-600">+91 62000 17130</a>
                  <a href="tel:+918252265832" className="block text-base text-gray-500 hover:text-orange-600">+91 82522 65832</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-orange-100 p-3">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">Delivery model</p>
                  <p className="text-base text-gray-500">Remote-first support for brands across India and priority international marketplaces.</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Follow Click Commerce Hub</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-orange-200 hover:text-orange-600 hover:shadow-sm"
                  >
                    <Icon className="h-4 w-4" />
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
