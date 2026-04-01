import { Link } from 'react-router-dom';
import { allServicePages } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, BarChart3, CheckCircle2, Layers3 } from 'lucide-react';
import { useEffect } from 'react';

interface PlatformPageProps {
  platform: { id: string; name: string; slug: string };
}

export default function PlatformPage({ platform }: PlatformPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [platform.slug]);

  const platformServices = allServicePages.filter((s) => s.platformId === platform.id);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-orange-600">Services</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{platform.name}</span>
        </div>

        <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <div>
              <div className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                Proven marketplace expertise
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                {platform.name} growth services built for brands that want measurable scale
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">
                We optimize your entire revenue engine on {platform.name}, from catalog quality and account operations to paid growth, compliance, and expansion planning.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact-click-commerce-hub" className="rounded-full bg-orange-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-700 hover:shadow-lg">
                  Get Free Consultation
                </Link>
                <Link to="/services" className="rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                'Trusted by growing brands that need stronger marketplace execution',
                'Performance-driven strategies for ranking, conversion, and profitability',
                'Structured service delivery that keeps your account, catalog, and ads aligned',
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
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Layers3 className="h-6 w-6 text-orange-600" />,
                title: 'Full-funnel execution',
                text: `From setup to scaling, we build a tighter ${platform.name} operating system.`
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
                title: 'Commercial clarity',
                text: 'We focus on visibility, conversion efficiency, and margin-aware growth.'
              },
              {
                icon: <CheckCircle2 className="h-6 w-6 text-orange-600" />,
                title: 'Execution discipline',
                text: 'You get structured workflows instead of reactive marketplace management.'
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
                <div className="mb-4 inline-flex rounded-2xl bg-orange-50 p-3">{item.icon}</div>
                <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold text-gray-900">What we manage on {platform.name}</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Every service below is designed to remove commercial friction, improve platform visibility, and give your team a stronger base for repeatable growth.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {platformServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/${service.slug}`}
                  className="group rounded-3xl border border-gray-200 bg-gray-50 p-6 transition-all hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">{platform.name}</p>
                      <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-orange-700">{service.name}</h3>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-500" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    Strategic execution for sellers who want stronger visibility, more reliable operations, and better conversion performance.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-orange-600 px-6 py-12 text-center text-white shadow-xl sm:px-10 sm:py-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to scale on {platform.name} with a stronger system?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-orange-100">
              Book a consultation and we will map the gaps in your current account, identify the fastest opportunities, and recommend the right service mix.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/contact-click-commerce-hub"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-orange-600 transition-all hover:bg-orange-50"
              >
                Book Your Free Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
