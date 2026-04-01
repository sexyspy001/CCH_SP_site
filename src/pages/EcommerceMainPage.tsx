import { Link } from 'react-router-dom';
import { ecommercePlatforms } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, ShoppingCart, Package, TrendingUp, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';

export default function EcommerceMainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      title: 'Amazon Launch Foundation',
      icon: <Package className="h-6 w-6 text-orange-600" />,
      description: 'A focused launch stack covering account readiness, brand setup, catalog structure, and early operational execution.',
      cta: 'Request Launch Plan',
    },
    {
      title: 'Paid Growth Acceleration',
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      description: 'Campaign structure, keyword strategy, and ongoing optimisation built to improve traffic quality and commercial efficiency.',
      cta: 'See Growth Support',
    },
    {
      title: 'Managed Marketplace Operations',
      icon: <ShieldCheck className="h-6 w-6 text-orange-600" />,
      description: 'A strategic operating layer for brands that need stronger execution across listings, ads, inventory, and account health.',
      cta: 'Talk to Our Team',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="pb-16 pt-24">
        <div className="bg-orange-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Ecommerce Services</span>
              <span className="block text-orange-600">Built for stronger marketplace performance</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-500 sm:text-xl">
              We build the operational and commercial systems brands need to grow across major marketplaces with more visibility, cleaner execution, and better control.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Core engagement tracks</h2>
            <p className="mt-4 text-lg text-gray-500">Structured support designed around launch, growth, and day-to-day marketplace control.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.title} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center gap-3 border-b border-gray-50 bg-orange-50/50 p-6">
                  <div className="rounded-lg bg-white p-2 shadow-sm">{pkg.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900">{pkg.title}</h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-6 flex-1 text-gray-600">{pkg.description}</p>
                  <Link
                    to="/contact-click-commerce-hub"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-orange-600 px-4 py-2 font-medium text-orange-600 transition-colors hover:bg-orange-50"
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-lg prose-orange mx-auto max-w-4xl border-t border-gray-100 px-4 py-16 sm:px-6 lg:px-8">
          <h2>Why ecommerce growth becomes difficult</h2>
          <p>
            Most brands do not struggle because marketplaces lack opportunity. They struggle because execution becomes inconsistent across too many moving parts at once. Listings are under-optimized, ads become expensive, inventory decisions lag, and operational issues quietly reduce performance quality.
          </p>
          <p>
            Click Commerce Hub is built to solve that problem with a more connected operating model. We bring together catalog quality, account management, advertising strategy, fulfillment coordination, and compliance support so the business can grow on stronger foundations.
          </p>

          <h3>What we improve for marketplace brands</h3>
          <p>
            We focus on the underlying systems that affect visibility, conversion, account stability, and profitability. That means sharper catalog execution, cleaner campaign structure, stronger operational rhythm, and reporting that helps leadership move faster.
          </p>
          <p>
            Instead of treating growth as a collection of unrelated activities, we build a clearer commercial engine that supports better ranking strength, better conversion performance, and fewer avoidable execution leaks.
          </p>

          <h3>Why brands work with Click Commerce Hub</h3>
          <p>
            Brands choose Click Commerce Hub when they want more than task completion. They want a team that understands how marketplace decisions connect to revenue quality, cost control, and long-term scale.
          </p>
          <p>
            That is why our approach combines strategy and execution. We do not just keep accounts active. We help businesses create stronger systems that are easier to scale and easier to manage.
          </p>
        </div>

        <div className="mx-auto max-w-7xl rounded-3xl bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Supported ecommerce platforms</h2>
            <p className="mt-4 text-lg text-gray-500">Choose a platform to explore the service stack built for that marketplace.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ecommercePlatforms.map((platform) => (
              <Link
                key={platform.id}
                to={`/${platform.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-orange-50 p-4 transition-colors group-hover:bg-orange-100">
                  <ShoppingCart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                  {platform.name}
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  Strategic support for sellers who want cleaner execution, stronger visibility, and better marketplace discipline.
                </p>
                <div className="mt-auto flex items-center text-sm font-medium text-orange-600">
                  View Services <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
