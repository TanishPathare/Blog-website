import React, { useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogCard } from '../components/BlogCard';
import { 
  Sparkles, 
  TrendingUp, 
  Hash, 
  Users, 
  ArrowRight, 
  Search, 
  SlidersHorizontal,
  Flame,
  CheckCircle,
  BookOpen
} from 'lucide-react';

export const Home = () => {
  const { 
    posts, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    openPostDetail,
    navigateTo 
  } = useBlog();

  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'popular' | 'likes'

  // Filter & Sort logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Don't show drafts on public feed unless search matches
      if (post.status === 'draft') return false;

      // Category match
      const matchesCategory = 
        selectedCategory === 'All' || post.category === selectedCategory;

      // Search match (title, excerpt, tags, author name)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q))) ||
        (post.author && post.author.name.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
      if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0);
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  // Featured post (first featured post or first published post)
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.isFeatured && p.status !== 'draft') || posts[0];
  }, [posts]);

  // Trending sidebar posts
  const trendingPosts = useMemo(() => {
    return [...posts]
      .filter((p) => p.status !== 'draft')
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);
  }, [posts]);

  return (
    <div className="space-y-12">
      
      {/* Hero / Featured Spotlight Banner */}
      {featuredPost && !searchQuery && selectedCategory === 'All' && (
        <section className="relative rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white shadow-xl">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Featured Editorial
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {featuredPost.category}
                </span>
              </div>

              <h1 
                onClick={() => openPostDetail(featuredPost)}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white hover:text-indigo-200 transition-colors cursor-pointer font-['Plus_Jakarta_Sans'] leading-tight"
              >
                {featuredPost.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed max-w-2xl">
                {featuredPost.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author?.avatar}
                    alt={featuredPost.author?.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-400/30"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {featuredPost.author?.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {featuredPost.publishedAt} • {featuredPost.readTime}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openPostDetail(featuredPost)}
                  className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-102"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div 
              onClick={() => openPostDetail(featuredPost)}
              className="lg:col-span-5 rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl cursor-pointer group border border-white/10"
            >
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>
      )}

      {/* Category Pills Filter Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          
          {/* Scrollable category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="popular">Most Viewed</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
        </div>

        {/* Search Results Summary Banner if searching */}
        {searchQuery && (
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-sm">
            <span className="text-slate-700 dark:text-slate-300">
              Showing results for: <strong className="text-indigo-600 dark:text-indigo-400">"{searchQuery}"</strong> ({filteredPosts.length} found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Main Content Layout (Grid + Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Blog Post Grid (8 Cols) */}
        <div className="lg:col-span-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                No articles found
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                No published articles matched your category or query. Try clearing your filters or write a new one!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white shadow"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 Cols) */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Trending Articles Widget */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Flame className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Trending on DevScribe
              </h3>
            </div>

            <div className="space-y-4">
              {trendingPosts.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openPostDetail(item)}
                  className="flex items-start gap-4 cursor-pointer group"
                >
                  <span className="text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-indigo-600 transition-colors font-mono">
                    0{index + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {item.readTime} • {item.views} views
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Topics / Tags Cloud */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Hash className="w-4 h-4 text-indigo-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Explore Popular Tags
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'LLMs', 'Docker', 'Architecture', 'Python', 'TailwindCSS', 'AWS', 'System Design'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Creator Invitation Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <h4 className="text-base font-bold text-indigo-950 dark:text-indigo-200 font-['Plus_Jakarta_Sans']">
              Share your engineering insights
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              DevScribe is community-driven. Publish your software tutorials, architecture deep-dives, and benchmarks to reach thousands of developers.
            </p>
            <button
              onClick={() => navigateTo('create-blog')}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Start Writing Today</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </aside>
      </div>

    </div>
  );
};
