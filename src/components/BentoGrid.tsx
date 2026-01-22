import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'A Journey Through the Swiss Alps',
    excerpt:
      'Discover the hidden valleys and majestic peaks that make Switzerland a timeless destination for adventurers and dreamers alike.',
    category: 'Adventure',
    date: 'Jan 15, 2026',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Maldives: Paradise Found',
    excerpt: 'Crystal waters and overwater bungalows await in this tropical sanctuary.',
    category: 'Luxury',
    date: 'Jan 10, 2026',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
  },
  {
    id: 3,
    title: 'Street Food in Bangkok',
    excerpt: 'A culinary journey through Thailand\'s vibrant capital.',
    category: 'Culinary',
    date: 'Jan 5, 2026',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
  {
    id: 4,
    title: 'Northern Lights in Iceland',
    excerpt: 'Chasing the aurora borealis across volcanic landscapes.',
    category: 'Nature',
    date: 'Dec 28, 2025',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
  },
  {
    id: 5,
    title: 'Ancient Temples of Kyoto',
    excerpt: 'Finding serenity in Japan\'s cultural heartland.',
    category: 'Culture',
    date: 'Dec 20, 2025',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const BentoGrid = () => {
  const featured = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-background" id="stories">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">Latest Stories</p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Travel Journals
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Featured Post - Takes 2/3 width on large screens */}
          {featured && (
            <motion.article
              variants={itemVariants}
              className="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl hover-lift shadow-elevated"
            >
              <div className="relative h-[400px] lg:h-full min-h-[500px]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Floating Title Card */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-white/20 text-white border-none backdrop-blur-sm"
                  >
                    {featured.category}
                  </Badge>
                  <h3
                    className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-4 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {featured.title}
                  </h3>
                  <p className="text-white/80 text-lg mb-6 max-w-xl line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="text-white/60 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featured.date}
                    </span>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-white font-medium group/link"
                    >
                      Read Story
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Other Posts */}
          {otherPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-card hover-lift shadow-soft"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <Badge
                  variant="secondary"
                  className="absolute top-4 left-4 bg-white/90 text-foreground"
                >
                  {post.category}
                </Badge>
              </div>
              <div className="p-6">
                <span className="text-muted-foreground text-sm flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <h3
                  className="text-xl font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground group/link"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BentoGrid;
