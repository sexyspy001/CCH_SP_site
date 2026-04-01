import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
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
              <span className="block">About</span>
              <span className="block text-orange-600">Click Commerce Hub</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-500 sm:text-xl">
              We operate as a strategic ecommerce growth partner for brands that want stronger marketplace execution, clearer commercial decisions, and more dependable scale.
            </p>
          </div>
        </div>

        <div className="prose prose-lg prose-orange mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2>Why Click Commerce Hub exists</h2>
          <p>
            Marketplace growth is rarely limited by ambition alone. Most brands lose momentum because execution becomes fragmented across listings, ads, operations, quick commerce, and compliance. Click Commerce Hub was built to solve that problem with a more integrated, commercially disciplined approach.
          </p>
          <p>
            We help brands create stronger control across Amazon, Flipkart, Meesho, quick commerce platforms, and supporting growth channels so performance is easier to improve and easier to protect.
          </p>

          <h2>What makes our model different</h2>
          <p>
            We are not positioned as freelancers or disconnected service vendors. We work as an extension of the business, bringing together strategic planning, day-to-day marketplace execution, and the operational discipline needed to keep revenue growth stable.
          </p>
          <p>
            That means our work is not limited to isolated tasks. We look at the full growth system: catalog quality, discoverability, advertising efficiency, account health, fulfillment readiness, and the reporting clarity leadership needs to make better decisions.
          </p>

          <h2>How we think about growth</h2>
          <p>
            Sustainable ecommerce performance comes from stronger systems, not surface-level activity. We focus on the details that affect ranking quality, conversion strength, margin discipline, and execution reliability across channels.
          </p>
          <ul>
            <li><strong>Data-led decisions:</strong> We use account signals, platform behavior, and commercial outcomes to prioritize the work that matters most.</li>
            <li><strong>Tailored roadmaps:</strong> Every brand has a different category, price architecture, and stage of maturity. Our recommendations are built around that reality.</li>
            <li><strong>Trust through clarity:</strong> We believe strong partnerships come from transparent communication, clean reporting, and accountable execution.</li>
          </ul>

          <h2>Who we work best with</h2>
          <p>
            We work especially well with founders, operators, and brand teams who are serious about scaling but want a more structured partner behind that growth. Some need help launching the right way. Others need a stronger operating system after growth has become messy or expensive.
          </p>
          <p>
            In both cases, the goal is the same: stronger marketplace execution, more commercial clarity, and a business that can scale with fewer hidden leaks.
          </p>

          <h2>What you can expect from us</h2>
          <p>
            Expect strategic input, execution discipline, and a team that treats marketplace growth as a business system rather than a list of tasks. We are here to help brands move faster with more confidence and less operational noise.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gray-900 shadow-xl">
            <div className="px-6 py-12 text-center sm:p-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to build a stronger marketplace growth system?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-6 text-gray-300">
                Speak with our team and we will help you identify the execution gaps, commercial priorities, and next moves that can unlock cleaner scale.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact-click-commerce-hub"
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-white px-8 py-4 text-lg font-medium text-gray-900 shadow-lg transition-all hover:bg-orange-50"
                >
                  Talk to Click Commerce Hub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
