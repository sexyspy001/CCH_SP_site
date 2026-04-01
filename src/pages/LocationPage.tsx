import { Link } from 'react-router-dom';
import { locations } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface LocationPageProps {
  service: { platformId: string; name: string; slug: string };
  platform?: { id: string; name: string; slug: string };
  location: string;
}

export default function LocationPage({ service, platform, location }: LocationPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service.slug, location]);

  const platformName = platform ? platform.name : 'Ecommerce';
  const platformSlug = platform ? `/${platform.slug}` : '/ecommerce';
  const capitalizedLocation = location.charAt(0).toUpperCase() + location.slice(1);
  const nearbyLocations = locations.filter((loc) => loc !== location && loc !== 'india').slice(0, 8);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-orange-600">Services</Link>
          <span className="mx-2">/</span>
          <Link to={platformSlug} className="hover:text-orange-600">{platformName}</Link>
          <span className="mx-2">/</span>
          <Link to={`/${service.slug}`} className="hover:text-orange-600">{service.name}</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{capitalizedLocation}</span>
        </div>

        <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <div>
              <Link
                to={`/${service.slug}`}
                className="inline-flex items-center text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {service.name}
              </Link>
              <div className="mt-6 inline-flex items-center rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                <MapPin className="mr-2 h-4 w-4" />
                Local SEO landing page
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                {service.name} in {capitalizedLocation}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
                We help brands in {capitalizedLocation} build stronger {platformName} performance with cleaner execution, sharper conversion systems, and a more reliable marketplace growth strategy.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact-click-commerce-hub" className="rounded-full bg-orange-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-700 hover:shadow-lg">
                  Get {platformName} Expert in {capitalizedLocation}
                </Link>
                <Link to={`/${service.slug}`} className="rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5">
                  View Core Service
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                `City-relevant execution for sellers building presence in ${capitalizedLocation}`,
                `Faster clarity on what is blocking ${platformName} growth right now`,
                'A structured partner instead of scattered freelancer-style support',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-400" />
                    <p className="text-sm leading-6 text-gray-100">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-8">
              <div className="rounded-[2rem] border border-orange-100 bg-orange-50 p-8">
                <h2 className="text-3xl font-extrabold text-gray-900">Why brands in {capitalizedLocation} need this service</h2>
                <p className="mt-5 text-lg leading-8 text-gray-700">
                  Ecommerce growth in {capitalizedLocation} is accelerating, but that also means local sellers face more competition, more price pressure, and less room for weak marketplace execution. If your account structure, listings, ads, or account health are inconsistent, scale becomes expensive and unpredictable.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-700">
                  Our {service.name.toLowerCase()} is designed to give sellers in {capitalizedLocation} a stronger operating system. We focus on the commercial details that usually decide whether a marketplace business stalls or compounds.
                </p>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-extrabold text-gray-900">How Click Commerce Hub supports {capitalizedLocation} sellers</h2>
                <div className="mt-6 space-y-5 text-lg leading-8 text-gray-700">
                  <p>
                    We begin by understanding the current state of your {platformName} business. That includes catalog quality, visibility issues, operational friction, ad inefficiency, and the internal gaps that keep your team in reactive mode.
                  </p>
                  <p>
                    From there, we build a cleaner execution plan for {service.name.toLowerCase()}. Instead of generic marketplace support, you get a more focused strategy tied to growth outcomes, account stability, and commercial performance.
                  </p>
                  <p>
                    For brands in {capitalizedLocation}, that often means faster decision-making, clearer growth priorities, and fewer hidden leaks in the revenue engine.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-3xl font-extrabold text-gray-900">Expected business outcomes</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    'Improved listing clarity and discoverability',
                    'Stronger operational consistency across the account',
                    'Better ad-readiness and conversion quality',
                    'A clearer roadmap for profitable marketplace growth',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex gap-3">
                        <Sparkles className="mt-0.5 h-5 w-5 text-orange-500" />
                        <p className="text-base leading-7 text-gray-700">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-orange-600 p-8 text-white shadow-xl">
                <h2 className="text-3xl font-extrabold">Ready to grow your {capitalizedLocation} business on {platformName}?</h2>
                <p className="mt-4 text-lg leading-7 text-orange-100">
                  If you want a team that can turn weak execution into a more scalable marketplace system, Click Commerce Hub is ready to help.
                </p>
                <div className="mt-8">
                  <Link to="/contact-click-commerce-hub" className="inline-flex rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 transition-all hover:bg-orange-50">
                    Get Free Consultation
                  </Link>
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Explore other cities</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {nearbyLocations.map((loc) => (
                    <Link
                      key={loc}
                      to={`/${service.slug}-${loc}`}
                      className="rounded-full border border-orange-200 px-3 py-2 text-sm font-medium capitalize text-gray-700 transition-colors hover:border-orange-500 hover:text-orange-600"
                    >
                      {loc}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">Need strategic help?</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  We can map your account issues, identify priority fixes, and recommend the right service stack for your next growth phase.
                </p>
                <Link to="/contact-click-commerce-hub" className="mt-5 inline-flex text-sm font-semibold text-orange-600 hover:text-orange-700">
                  Talk to our team
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
