import { Link } from 'react-router-dom';
import { locations } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle2, MapPin, BarChart3, ShieldCheck, PackageSearch, Users2, Zap } from 'lucide-react';
import { useEffect } from 'react';

interface ServicePageProps {
  service: { platformId: string; name: string; slug: string };
  platform?: { id: string; name: string; slug: string };
}

type ContentBlock = {
  badge: string;
  intro: string;
  painPoints: string[];
  process: string[];
  deliverables: string[];
  why: string[];
  caseStudy: string[];
  cta: string;
};

function getContent(serviceName: string, platformName: string): ContentBlock {
  const lower = serviceName.toLowerCase();

  if (lower.includes('catalog')) {
    return {
      badge: 'Catalog Growth Engine',
      intro: `Our ${platformName} ${serviceName.toLowerCase()} helps brands build stronger discoverability, cleaner structure, and better conversion by turning scattered product uploads into a ranking-ready catalog system.`,
      painPoints: [
        'Catalogs are uploaded without search-intent planning',
        'Important attributes and backend fields are incomplete',
        'Variation structure is weak and hurts discoverability',
        'Listings are live but fail to drive quality traffic or sales',
      ],
      process: [
        `Audit the current ${platformName} catalog and identify visibility gaps`,
        'Map keywords to buyer intent and SKU priorities',
        'Rewrite titles, bullets, descriptions, and attributes',
        'Improve variation logic, category fit, and catalog consistency',
        'Refine based on ranking, click-through, and conversion signals',
      ],
      deliverables: [
        'SEO-aware listing architecture',
        'Stronger keyword and attribute alignment',
        'Cleaner catalog hygiene',
        'Better conversion readiness for ads and organic traffic',
      ],
      why: [
        `Most sellers underestimate how much catalog structure affects ranking, traffic quality, and conversion on ${platformName}. Weak cataloging creates invisible friction that hurts every growth metric.`,
        `Click Commerce Hub treats cataloging as a revenue lever, not a data-entry task. We optimize the structure buyers and marketplace algorithms actually evaluate.`,
      ],
      caseStudy: [
        `A typical seller comes to us with a large live catalog but weak naming, inconsistent attributes, and low visibility. The products exist, but the commercial system behind them is broken.`,
        `Once we rebuild the catalog around buyer intent and marketplace standards, the same account becomes easier to scale through organic ranking, better conversion, and more efficient ad spend.`,
      ],
      cta: `Build a stronger ${platformName} catalog that is designed to rank and convert`,
    };
  }

  if (lower.includes('listing')) {
    return {
      badge: 'Listing Conversion System',
      intro: `Our ${platformName} ${serviceName.toLowerCase()} helps brands create product pages that improve clarity, trust, discoverability, and conversion at the same time.`,
      painPoints: [
        'Listings are not written for real buyer questions',
        'Copy and visuals fail to explain the value proposition quickly',
        'Search visibility is weak because the content lacks intent alignment',
        'Traffic lands on pages that are not persuasive enough to convert',
      ],
      process: [
        `Review current ${platformName} listing quality and conversion gaps`,
        'Clarify product story, positioning, and trust triggers',
        'Rewrite content with stronger buying clarity',
        'Align listing visuals and messaging with platform expectations',
        'Refine for keyword intent and conversion quality',
      ],
      deliverables: [
        'Optimized titles and bullets',
        'Sharper descriptions and feature framing',
        'Conversion-first listing messaging',
        'More persuasive product-page structure',
      ],
      why: [
        `A weak listing wastes every other effort. Even if traffic arrives, poor structure and messaging cause buyers to hesitate, compare, or leave.`,
        `That is why Click Commerce Hub builds listings to support the whole customer journey from click to purchase, not just to satisfy a publishing checklist.`,
      ],
      caseStudy: [
        `Brands often think they have a traffic problem when the deeper issue is conversion. Once the listing is rebuilt around buyer intent, the same traffic can produce better commercial results.`,
        `We do not just make the page look cleaner. We make the page work harder.`,
      ],
      cta: `Turn your ${platformName} product pages into stronger conversion assets`,
    };
  }

  if (lower.includes('account management')) {
    return {
      badge: 'Operational Control Layer',
      intro: `Our ${platformName} ${serviceName.toLowerCase()} is built for brands that need consistent execution, better issue resolution, and a sharper operating rhythm across daily marketplace activity.`,
      painPoints: [
        'No consistent ownership of day-to-day marketplace operations',
        'Issues are handled reactively instead of systematically',
        'Reporting is too weak to support decisions',
        'Growth stalls because the account layer is unstable',
      ],
      process: [
        `Audit the current ${platformName} workflow and recurring blockers`,
        'Create a daily, weekly, and monthly management cadence',
        'Monitor suppressions, pricing, inventory, and listing issues',
        'Coordinate fixes and commercial priorities',
        'Report on actions, findings, and next steps',
      ],
      deliverables: [
        'Daily account oversight',
        'Issue tracking and escalation support',
        'Operational reporting rhythm',
        'More stable execution for scale',
      ],
      why: [
        `Marketplace brands often focus on growth tactics while neglecting the operational layer that keeps revenue stable. That is where account management becomes critical.`,
        `Click Commerce Hub optimizes your entire revenue engine, including the part that protects growth from operational leakage.`,
      ],
      caseStudy: [
        `A founder-led account can work in the beginning, then become chaotic as SKUs, ads, and platforms grow. We create the structure that lets the business scale without losing control.`,
        `That means fewer avoidable fires, clearer reporting, and a much better view of what actually drives growth.`,
      ],
      cta: `Get structured ${platformName} account management built for scale`,
    };
  }

  if (lower.includes('advertising') || lower.includes('ppc')) {
    return {
      badge: 'Paid Growth Accelerator',
      intro: `Our ${platformName} ${serviceName.toLowerCase()} focuses on turning paid traffic into profitable marketplace growth through better structure, cleaner targeting, and stronger commercial discipline.`,
      painPoints: [
        'Ad budgets are spent without enough structure',
        'Campaigns are not aligned with listing quality or margin reality',
        'Search terms are not analyzed deeply enough',
        'Reporting focuses on vanity metrics instead of commercial outcomes',
      ],
      process: [
        `Audit current ${platformName} ad structure and spend quality`,
        'Segment campaigns by discovery, ranking, and profitability goals',
        'Refine targeting, bids, and keyword control',
        'Connect listing quality to campaign decisions',
        'Optimize continuously toward revenue quality and scalable returns',
      ],
      deliverables: [
        'Campaign restructuring strategy',
        'Keyword and search-term refinement',
        'Budget and bidding recommendations',
        'Performance reporting tied to growth decisions',
      ],
      why: [
        `Marketplace advertising is not just a traffic tool. It is a capital-allocation system. Every campaign decision should be tied to visibility, conversion, and margin logic.`,
        `We help you scale from 0 to Rs 10L+/month by bringing discipline to the paid-growth layer, not just tweaking bids.`,
      ],
      caseStudy: [
        `When campaign structure is rebuilt around intent, keyword role, and profitability, sellers get a clearer picture of where scale is possible and where spend is leaking.`,
        `That clarity creates better decisions across both advertising and listing optimization.`,
      ],
      cta: `Build a more profitable ${platformName} advertising engine`,
    };
  }

  if (lower.includes('reinstatement') || lower.includes('suspension')) {
    return {
      badge: 'Account Recovery Support',
      intro: `Our ${platformName} ${serviceName.toLowerCase()} is built for sellers facing urgent account-health issues, suspension risk, or live restrictions that threaten revenue continuity.`,
      painPoints: [
        'Sellers respond without enough evidence or structure',
        'The root cause is not clearly identified',
        'Repeated mistakes weaken the platform response',
        'Revenue stalls while the account remains unstable',
      ],
      process: [
        `Review the ${platformName} notice and risk context`,
        'Identify likely root-cause issues and supporting evidence',
        'Structure the corrective-action or appeal narrative',
        'Strengthen documents and recovery steps',
        'Support the business in stabilizing the account after submission',
      ],
      deliverables: [
        'Recovery-action guidance',
        'Issue root-cause framing',
        'Appeal structure support',
        'Post-recovery stability recommendations',
      ],
      why: [
        `A suspension or account restriction is rarely solved by a rushed response. The platform needs to see clarity, ownership, and a believable corrective plan.`,
        `Click Commerce Hub brings structure, calm, and strategy to a high-pressure situation so the business can move toward recovery faster.`,
      ],
      caseStudy: [
        `We begin by simplifying the problem: what happened, why it happened, what evidence supports that explanation, and what operational changes will prevent it from happening again.`,
        `Once those answers are clear, the submission becomes stronger and the business is better prepared for what comes next.`,
      ],
      cta: `Need urgent ${platformName} recovery support?`,
    };
  }

  if (lower.includes('seo') || lower.includes('content') || lower.includes('social') || lower.includes('email')) {
    return {
      badge: 'Demand and Brand Growth',
      intro: `Our ${serviceName.toLowerCase()} helps ecommerce brands build stronger demand, better messaging, and more consistent customer journeys beyond the product page alone.`,
      painPoints: [
        'Demand generation is inconsistent or unfocused',
        'The brand relies too heavily on one traffic source',
        'Content and campaigns do not support a full growth system',
        'Marketing execution lacks commercial clarity',
      ],
      process: [
        'Audit the current acquisition and retention landscape',
        'Clarify the growth objective and conversion pathway',
        'Build a sharper content or media structure',
        'Align messaging with offers, products, and buying intent',
        'Refine based on performance and customer behavior',
      ],
      deliverables: [
        'Channel-specific strategy support',
        'Stronger messaging direction',
        'Performance-oriented execution recommendations',
        'A more connected growth system',
      ],
      why: [
        `Brands that want scalable growth need more than isolated campaigns. They need a clearer demand engine that connects acquisition, conversion, and retention.`,
        `Click Commerce Hub brings a commercial lens to that work so the output supports real revenue growth, not just surface-level activity.`,
      ],
      caseStudy: [
        `Once the brand message, audience targeting, and conversion pathway are aligned, the business usually sees clearer traction and better-quality customers.`,
        `That alignment is where strategic growth work becomes much more powerful than disconnected execution.`,
      ],
      cta: `Build a stronger ecommerce demand engine with Click Commerce Hub`,
    };
  }

  return {
    badge: 'Marketplace Growth Service',
    intro: `Our ${platformName} ${serviceName.toLowerCase()} helps brands improve execution, reduce friction, and create a stronger system for profitable marketplace growth.`,
    painPoints: [
      'Execution is active but not strategic enough',
      'Growth decisions are disconnected from outcomes',
      'Important tasks are handled without a wider system',
      'The business needs structure to scale more confidently',
    ],
    process: [
      `Audit current ${platformName} performance and workflow issues`,
      'Identify the biggest commercial and operational gaps',
      'Create a more focused plan for execution',
      'Improve the service layer supporting visibility and conversion',
      'Refine based on commercial performance signals',
    ],
    deliverables: ['Strategic recommendations', 'Execution support', 'Commercial clarity', 'A stronger growth framework'],
    why: [
      `Marketplace growth is usually limited by weak systems, not a lack of activity. That is why service quality matters.`,
      `Click Commerce Hub brings strategic discipline to the work so sellers can move faster with more confidence.`,
    ],
    caseStudy: [
      `When the underlying service execution gets stronger, the business becomes easier to scale because visibility, operations, and decision-making all improve together.`,
      `That is the core advantage of working with a team focused on marketplace growth as a system.`,
    ],
    cta: `Ready to improve your ${platformName} ${serviceName.toLowerCase()}?`,
  };
}

export default function ServicePage({ service, platform }: ServicePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service.slug]);

  const platformName = platform ? platform.name : 'Ecommerce';
  const platformSlug = platform ? `/${platform.slug}` : '/ecommerce';
  const content = getContent(service.name, platformName);
  const relatedLocations = locations.filter((loc) => loc !== 'india').slice(0, 10);

  const faqItems = [
    {
      question: `How long does ${service.name.toLowerCase()} usually take to show results?`,
      answer: `The first gains usually appear in visibility, conversion quality, and process clarity within the first few weeks. Larger revenue outcomes depend on the current state of your ${platformName} account and how quickly improvements are implemented.`,
    },
    {
      question: `Is this service customized for each ${platformName} seller?`,
      answer: `Yes. We build the approach around your category, pricing, competitive landscape, current account condition, and stage of growth.`,
    },
    {
      question: `Can this service connect with other growth work?`,
      answer: `Absolutely. The strongest marketplace outcomes happen when catalog, advertising, account management, and compliance work together as one system.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/services" className="hover:text-orange-600">Our Services</Link>
          <span className="mx-2">/</span>
          <Link to={platformSlug} className="hover:text-orange-600">{platformName} Services</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{service.name}</span>
        </div>

        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-orange-950 py-16 sm:py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={platformSlug} className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium mb-8 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to {platformName} Services
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <div className="inline-flex items-center rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
                  <Zap className="mr-2 h-4 w-4" />
                  {content.badge}
                </div>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="block text-orange-500">{platformName}</span>
                  <span className="block">{service.name}</span>
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">{content.intro}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact-click-commerce-hub" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg inline-block">
                    Get a Free Audit
                  </Link>
                  <Link to={platformSlug} className="border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors inline-block">
                    Explore More {platformName} Services
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {content.deliverables.slice(0, 4).map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-400" />
                      <p className="text-sm font-medium leading-6 text-gray-100">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="space-y-8">
              <section className="rounded-3xl border border-orange-100 bg-orange-50 p-8">
                <h2 className="text-2xl font-bold text-gray-900">Why sellers usually need this service</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {content.painPoints.map((point) => (
                    <div key={point} className="rounded-2xl bg-white p-5 shadow-sm border border-orange-100">
                      <p className="text-base leading-7 text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                  <h2 className="text-3xl font-extrabold text-gray-900">Our process for {service.name}</h2>
                </div>
                <div className="mt-8 space-y-4">
                  {content.process.map((step, index) => (
                    <div key={step} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 font-bold text-white">{index + 1}</div>
                      <p className="text-base leading-7 text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-orange-600" />
                  <h2 className="text-3xl font-extrabold text-gray-900">Why Click Commerce Hub is different</h2>
                </div>
                <div className="mt-6 space-y-5 text-lg leading-8 text-gray-700">
                  {content.why.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <PackageSearch className="h-6 w-6 text-orange-600" />
                  <h2 className="text-3xl font-extrabold text-gray-900">How this service drives business outcomes</h2>
                </div>
                <div className="mt-6 space-y-5 text-lg leading-8 text-gray-700">
                  {content.caseStudy.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-orange-600 p-8 text-white shadow-xl">
                <h2 className="text-3xl font-extrabold">{content.cta}</h2>
                <p className="mt-4 text-lg leading-7 text-orange-100">
                  If you want a strategic growth partner instead of scattered execution, Click Commerce Hub can build a tailored roadmap for your {platformName} business.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact-click-commerce-hub" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-orange-600 text-lg font-bold hover:bg-orange-50 transition-all">
                    Book Your Free Consultation
                  </Link>
                </div>
              </section>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Users2 className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-bold text-gray-900">What you can expect</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {content.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-orange-600" />
                      <p className="text-sm leading-6 text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-bold text-gray-900">Available locations</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {relatedLocations.map((loc) => (
                    <Link key={loc} to={`/${service.slug}-${loc}`} className="rounded-full border border-orange-200 px-3 py-2 text-sm font-medium capitalize text-gray-700 hover:border-orange-500 hover:text-orange-600 transition-colors">
                      {loc}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{item.question}</h3>
                <p className="mt-2 text-gray-600 leading-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

