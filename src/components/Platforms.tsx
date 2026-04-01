import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { platforms } from '../data';

export default function Platforms() {
  return (
    <section id="platforms" className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">Supported Platforms</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Multi-platform expertise for brands that want wider reach and stronger control
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Build a sharper presence across leading marketplaces and quick commerce ecosystems with one consistent growth system behind every channel.
          </p>
        </div>

        <div className="relative">
          <div className="group flex overflow-hidden space-x-16">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
              className="flex min-w-max items-center space-x-16"
            >
              {[...platforms, ...platforms, ...platforms].map((platform, idx) => (
                <Link
                  key={`${platform.id}-${idx}`}
                  to={`/${platform.slug}`}
                  className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 px-12 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
                >
                  <span className="text-2xl font-bold text-gray-700 transition-colors hover:text-orange-600">{platform.name}</span>
                </Link>
              ))}
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
