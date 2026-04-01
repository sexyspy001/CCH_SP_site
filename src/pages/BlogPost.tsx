import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useEffect } from 'react';

interface BlogPostProps {
  blog: { title: string; slug: string };
}

export default function BlogPost({ blog }: BlogPostProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog.slug]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />

      <main className="pb-16 pt-24">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-orange-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{blog.title}</span>
        </div>

        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="mb-8 inline-flex items-center font-medium text-orange-600 transition-colors hover:text-orange-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {blog.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>October 24, 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Click Commerce Hub Team</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-orange mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="lead">
            {blog.title} matters because marketplace performance is shaped by execution quality, not just effort. This guide focuses on the decisions that improve visibility, reduce waste, and support stronger commercial outcomes.
          </p>

          <h2>Understanding the landscape</h2>
          <p>
            Every marketplace has its own commercial logic. Ranking signals, conversion expectations, operational rules, and advertising mechanics all influence how quickly a brand can grow. That is why success depends on understanding the system behind the platform, not just the surface checklist.
          </p>

          <h2>What usually separates strong performers</h2>
          <p>
            The brands that grow consistently tend to do three things better than the market average: they keep listing quality high, they make decisions from clean performance signals, and they maintain stronger operational discipline as scale increases.
          </p>
          <ul>
            <li><strong>Data-led execution:</strong> Strong operators respond to real platform behavior, not guesswork.</li>
            <li><strong>Continuous refinement:</strong> Rankings, campaigns, and conversion systems improve when they are reviewed and adjusted regularly.</li>
            <li><strong>Commercial clarity:</strong> Better performance comes from aligning catalog, ads, pricing, and operations around revenue quality.</li>
          </ul>

          <h2>Where brands usually lose momentum</h2>
          <p>
            Growth often slows when teams rely on fragmented actions instead of a connected system. Weak listing structure, inefficient ad spend, reactive inventory management, or poor account control can all reduce performance even when demand exists.
          </p>

          <h2>How Click Commerce Hub approaches this work</h2>
          <p>
            We look at marketplace growth as a business system. That means improving the points where visibility, conversion, operations, and commercial decision-making connect. The goal is not just more activity. The goal is stronger outcomes with more control.
          </p>
          <p>
            <Link to="/contact-click-commerce-hub">Talk to Click Commerce Hub</Link> if you want help translating these ideas into a sharper execution plan for your own brand.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-orange-600 shadow-xl">
            <div className="px-6 py-12 text-center sm:p-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to turn strategy into stronger marketplace performance?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-6 text-orange-100">
                Speak with our team and we will help you identify the right operational fixes, growth priorities, and service mix for your brand.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/contact-click-commerce-hub"
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-white px-8 py-4 text-lg font-medium text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl"
                >
                  Get a Free Consultation
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
