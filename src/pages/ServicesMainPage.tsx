import { Link } from 'react-router-dom';
import { platforms, allServicePages } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function ServicesMainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="pb-16 pt-24">
        <section className="bg-gradient-to-br from-orange-50 via-white to-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm">
                Service architecture built for scale
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Explore the full Click Commerce Hub service stack in one place
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                From marketplace operations and quick commerce onboarding to compliance, ads, and consulting, every service is structured to improve execution quality and support cleaner growth.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                'Service pages shaped around outcomes, not generic descriptions',
                'Platform-specific modules for ecommerce and quick commerce execution',
                'A scalable structure ready for deeper SEO, city pages, and lead flows',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 text-orange-500" />
                    <p className="text-sm leading-6 text-gray-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {platforms.map((platform) => {
              const platformServices = allServicePages.filter((s) => s.platformId === platform.id);
              if (platformServices.length === 0) return null;

              return (
                <div key={platform.id} className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm">
                  <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-950 px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">Platform cluster</p>
                      <h2 className="mt-2 flex items-center gap-3 text-2xl font-bold text-white">
                        <Layers3 className="h-6 w-6 text-orange-500" />
                        {platform.name} Services
                      </h2>
                    </div>
                    <Link
                      to={`/${platform.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
                    >
                      View platform page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid gap-4 p-8 sm:grid-cols-2 xl:grid-cols-4">
                    {platformServices.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/${service.slug}`}
                        className="group rounded-3xl border border-gray-200 bg-gray-50 p-5 transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{platform.name}</p>
                        <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-orange-700">{service.name}</h3>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Strategic service execution built to tighten operations, improve performance quality, and support scalable marketplace growth.
                        </p>
                        <div className="mt-5 inline-flex items-center text-sm font-semibold text-orange-600">
                          View service
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
