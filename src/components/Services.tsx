import { motion } from 'motion/react';
import { ShoppingCart, Megaphone, FileText, Box, CheckCircle2 } from 'lucide-react';

const services = [
  {
    category: 'Marketplace Operations',
    icon: <ShoppingCart className="h-6 w-6 text-orange-600" />,
    items: [
      'Amazon and marketplace account management',
      'Cataloging, imaging, and listing optimization',
      'A+ content and brand-store support',
      'Advertising and conversion improvement',
      'Inventory and operational coordination',
      'Team training and launch support',
    ],
  },
  {
    category: 'Fulfillment and Supply Support',
    icon: <Box className="h-6 w-6 text-orange-600" />,
    items: [
      'Domestic and international shipping coordination',
      'FBA prep, packaging, and storage support',
      'Returns planning and fulfilment troubleshooting',
      'Excess inventory handling',
      'Seller-lending assistance',
      'Manufacturing support coordination',
    ],
  },
  {
    category: 'Demand and Brand Growth',
    icon: <Megaphone className="h-6 w-6 text-orange-600" />,
    items: [
      'Marketplace PPC management',
      'Brand digital marketing',
      'Shopify and website development',
      'Google and Meta growth campaigns',
      'Email and WhatsApp marketing',
      'Cross-channel demand strategy',
    ],
  },
  {
    category: 'Compliance and Business Setup',
    icon: <FileText className="h-6 w-6 text-orange-600" />,
    items: [
      'GST registration and compliance execution',
      'VPOB, PPOB, and APOB support',
      'Tax and accounting coordination',
      'IP accelerator guidance',
      'Documentation and marketplace compliance',
      'Sustainability consulting support',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">Our Expertise</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Service architecture built to remove friction and unlock cleaner growth
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Every service is designed to strengthen marketplace execution, improve revenue quality, and give your brand a more dependable path to scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 border-b border-gray-50 bg-orange-50/50 p-6">
                <div className="rounded-lg bg-white p-2 shadow-sm">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{service.category}</h3>
              </div>
              <ul className="space-y-4 p-6">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start text-gray-600">
                    <CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
