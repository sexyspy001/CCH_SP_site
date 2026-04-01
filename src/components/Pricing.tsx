import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">Pricing Approach</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Commercial scope shaped around your stage, complexity, and growth objective
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            We structure pricing around the operational load, growth ambition, and platform mix required to move your business forward with clarity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl"
        >
          <div className="px-6 py-12 sm:p-10 sm:pb-6">
            <div className="flex justify-center">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-orange-600">
                Tailored Engagement
              </span>
            </div>
            <div className="mt-4 flex justify-center text-6xl font-extrabold text-gray-900">Custom Scope</div>
            <p className="mt-5 text-center text-lg text-gray-500">
              Book a consultation and we will map the service mix, delivery model, and commercial scope that fits your brand.
            </p>
          </div>
          <div className="bg-gray-50 px-6 pb-8 pt-6 sm:p-10 sm:pt-6">
            <ul className="space-y-4">
              {[
                'Service structure aligned to your growth stage',
                'Flexible scope across operations, ads, and compliance',
                'Dedicated strategic ownership',
                'Transparent reporting and review rhythm',
                'Clear commercials without hidden surprises',
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#contact"
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-orange-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-orange-700 hover:shadow-xl"
              >
                Request Custom Proposal
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
