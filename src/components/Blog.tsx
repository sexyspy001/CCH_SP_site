import { motion } from 'motion/react';
import { HelpCircle, TrendingUp, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    type: 'Guide',
    icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
    title: 'How to Start Selling on Amazon India',
    slug: 'how-to-start-selling-on-amazon-india',
    excerpt: 'Understand the launch sequence, catalog standards, and early growth decisions that shape stronger marketplace performance.',
    date: 'March 10, 2024',
  },
  {
    type: 'Strategy',
    icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    title: 'Quick Commerce Business Model',
    slug: 'quick-commerce-business-model',
    excerpt: 'See how fast-delivery platforms create new demand patterns and what brands need to do to win profitably inside them.',
    date: 'March 5, 2024',
  },
  {
    type: 'SEO',
    icon: <Newspaper className="h-5 w-5 text-purple-500" />,
    title: 'Amazon SEO Strategy Guide',
    slug: 'amazon-seo-strategy-guide',
    excerpt: 'Learn how stronger listing structure, keyword planning, and conversion signals improve organic ranking quality.',
    date: 'February 28, 2024',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">Insights & Knowledge</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Practical insights for brands that want clearer growth decisions
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Explore guides, strategy breakdowns, and marketplace insights that help founders and operators move with more clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-1">
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-600">
                    {article.icon}
                    {article.type}
                  </p>
                  <Link to={`/${article.slug}`} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900 transition-colors hover:text-orange-600">{article.title}</p>
                    <p className="mt-3 text-base text-gray-500">{article.excerpt}</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Click Commerce Hub Team</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
