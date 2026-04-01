import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const regions = ['India', 'Singapore', 'United States', 'United Kingdom', 'Canada', 'Australia', 'UAE', 'Netherlands', 'Russia'];

export default function Regions() {
  return (
    <section id="regions" className="relative overflow-hidden bg-gray-900 py-24 text-white">
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-500">Global Reach</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Remote delivery model with marketplace support across key growth regions</p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
            Click Commerce Hub operates remotely so brands can access strategic support, operational guidance, and platform execution without geographic friction.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {regions.map((region, index) => (
            <motion.div
              key={region}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50 p-6 text-center backdrop-blur-sm transition-colors hover:bg-gray-700/50"
            >
              <MapPin className="mb-3 h-8 w-8 text-orange-500" />
              <span className="font-medium">{region}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
