import { Link } from 'react-router-dom';
import { quickCommercePlatforms } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function QuickCommerceMainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="pb-16 pt-24">
        <div className="bg-orange-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Quick Commerce</span>
              <span className="block text-orange-600">Execution built for the 10-minute economy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-500 sm:text-xl">
              We help brands enter and scale inside quick commerce with stronger onboarding, sharper assortment logic, and operational systems that support speed.
            </p>
          </div>
        </div>

        <div className="prose prose-lg prose-orange mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2>Why quick commerce matters now</h2>
          <p>
            Quick commerce has changed what convenience means for shoppers. Brands are no longer competing only on visibility and price. They are also competing on availability, speed, and the ability to win within hyper-local demand windows.
          </p>
          <p>
            That creates a major opportunity, but it also creates a different execution challenge than traditional ecommerce. Assortment planning, dark-store availability, platform onboarding, and speed-first catalog readiness all matter more here.
          </p>

          <h3>Where most brands lose momentum</h3>
          <p>
            Many brands enter quick commerce without the operational structure required to sustain it. Product selection is too broad, inventory planning is reactive, or platform setup is slow and inconsistent. The result is missed availability, weak visibility, and underwhelming sales velocity.
          </p>
          <p>
            Click Commerce Hub helps solve those issues early by treating quick commerce as a commercial system, not just another listing exercise.
          </p>

          <h3>How we support quick commerce growth</h3>
          <p>
            We help brands choose the right assortment, accelerate onboarding, and strengthen execution across catalog, pricing, inventory readiness, and promotional visibility. That work is designed to improve platform fit and reduce the friction that slows growth after launch.
          </p>
          <p>
            Beyond launch, we help brands evaluate what is working, where demand is forming, and how to improve sell-through without losing operational control. That is what turns quick commerce from an experiment into a repeatable revenue channel.
          </p>
        </div>

        <div className="mx-auto max-w-7xl rounded-3xl bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Supported quick commerce platforms</h2>
            <p className="mt-4 text-lg text-gray-500">Explore platform-specific support built for faster onboarding and stronger operational readiness.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickCommercePlatforms.map((platform) => (
              <Link
                key={platform.id}
                to={`/${platform.slug}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-orange-50 p-4 transition-colors group-hover:bg-orange-100">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-orange-600">
                  {platform.name}
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                  Build a stronger launch path and a more reliable presence on {platform.name}.
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
