import { motion } from 'motion/react';
import { ArrowRight, Globe2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <div id="home" className="relative overflow-hidden bg-white pb-20 pt-32 lg:pb-32 lg:pt-48">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 -translate-x-1/2 transform rounded-r-full bg-gray-50 opacity-20"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 translate-x-1/2 transform rounded-l-full bg-orange-50 opacity-20"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block xl:inline">Scale Your Brand Across</span>{' '}
            <span className="block text-orange-600 xl:inline">Amazon, Flipkart, Meesho and Quick Commerce</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-gray-500 sm:text-xl"
          >
            Click Commerce Hub engineers marketplace growth systems that strengthen visibility, sharpen conversion, and help ambitious brands scale with more control.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-sm font-semibold uppercase tracking-[0.24em] text-gray-500"
          >
            Helping brands move from early traction to repeatable monthly revenue growth
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="flex w-full items-center justify-center rounded-full border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl md:w-auto md:px-10 md:py-4 md:text-lg"
            >
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#services"
              className="flex w-full items-center justify-center rounded-full border-2 border-gray-200 bg-white px-8 py-3 text-base font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 md:w-auto md:px-10 md:py-4 md:text-lg"
            >
              View Services
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
        >
          {[
            {
              icon: <Globe2 className="h-8 w-8 text-orange-500" />,
              title: 'Multi-platform execution',
              desc: 'Scale across major marketplaces and quick commerce channels with one aligned growth partner.',
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
              title: 'Revenue-focused strategy',
              desc: 'Every listing, ad, and account decision is built to improve visibility, conversion, and commercial efficiency.',
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-orange-500" />,
              title: 'Controlled growth systems',
              desc: 'Protect operational stability with stronger compliance, cleaner reporting, and sharper marketplace discipline.',
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
