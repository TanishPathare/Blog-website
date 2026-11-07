import React, { useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { BlogCard } from '../components/BlogCard';
import { 
  PenSquare, 
  Eye, 
  Heart, 
  Bookmark, 
  FileText, 
  Trash2, 
  ExternalLink, 
  Edit3, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  Search,
  Filter
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    currentUser, 
    posts, 
    deletePost, 
    updatePost, 
    bookmarks, 
    openPostDetail, 
    navigateTo, 
    createPost,
    showToast 
  } = useBlog();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'published' | 'drafts' | 'bookmarks' | 'analytics'
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [quickTitle, setQuickTitle] = useState('');

  // Filter posts created by this author or all if none
  const userPosts = useMemo(() => {
    return posts.filter((p) => {
      if (!currentUser) return true;
      return p.author?.name === currentUser.name || p.author?.name === 'Alex Rivera';
    });
  }, [posts, currentUser]);

  // Aggregate stats
  const totalViews = useMemo(() => {
    return userPosts.reduce((acc, curr) => acc + (curr.views || 0), 0);
  }, [userPosts]);

  const totalLikes = useMemo(() => {
    return userPosts.reduce((acc, curr) => acc + (curr.likes || 0), 0);
  }, [userPosts]);

  const publishedCount = useMemo(() => {
    return userPosts.filter((p) => p.status !== 'draft').length;
  }, [userPosts]);

  const draftCount = useMemo(() => {
    return userPosts.filter((p) => p.status === 'draft').length;
  }, [userPosts]);

  // Bookmarked posts list
  const bookmarkedPosts = useMemo(() => {
    return posts.filter((p) => bookmarks.includes(p.id));
  }, [posts, bookmarks]);

  // Current tab items
  const displayPosts = useMemo(() => {
    let list = userPosts;
    if (activeTab === 'published') list = userPosts.filter((p) => p.status !== 'draft');
    if (activeTab === 'drafts') list = userPosts.filter((p) => p.status === 'draft');
    if (activeTab === 'bookmarks') list = bookmarkedPosts;

    if (dashboardSearch.trim()) {
      const q = dashboardSearch.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return list;
  }, [userPosts, bookmarkedPosts, activeTab, dashboardSearch]);

  const handleToggleStatus = (post) => {
    const nextStatus = post.status === 'draft' ? 'published' : 'draft';
    updatePost(post.id, { status: nextStatus });
    showToast(`Article is now ${nextStatus === 'draft' ? 'saved as Draft' : 'Published live!'}`);
  };

  const handleQuickDraft = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    createPost({
      title: quickTitle.trim(),
      excerpt: 'Quick draft outline captured from dashboard.',
      content: 'Write the introduction, code snippets, and architecture conclusions here...',
      category: 'Web Development',
      tags: ['Ideas', 'Draft'],
      status: 'draft',
      readTime: '3 min read',
      coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    });

    setQuickTitle('');
    setActiveTab('drafts');
  };

  const handleDeleteConfirm = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePost(id);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Profile Header Card */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={currentUser?.name || 'Author'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                  {currentUser?.name || 'Alex Rivera'}
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800">
                  Author & Creator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                @{currentUser?.username || 'alexrivera_dev'} • {currentUser?.role || 'Senior Software Engineer'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl line-clamp-2 pt-1">
                {currentUser?.bio || 'Building open-source tools and writing deep dives into full-stack architectures and AI engineering.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigateTo('create-blog')}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-102"
            >
              <PenSquare className="w-4 h-4" />
              <span>Create Blog</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Stats Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Articles
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {userPosts.length}
            </div>
            <div className="text-[11px] text-slate-500">
              {publishedCount} published • {draftCount} drafts
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Impressions
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" />
              +14.2% this month
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Likes
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalLikes.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">
              Community appreciation
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Saved Bookmarks
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {bookmarks.length}
            </div>
            <div className="text-[11px] text-slate-500">
              Articles for later
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Bookmark className="w-6 h-6" />
          </div>
        </div>

      </section>

      {/* Quick Idea Capture Bar */}
      <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 border border-indigo-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider shrink-0">
          <Sparkles className="w-4 h-4" />
          Quick Draft:
        </div>
        <form onSubmit={handleQuickDraft} className="flex-1 flex w-full gap-2">
          <input
            type="text"
            placeholder="Jot down a new article title or concept..."
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            className="flex-1 px-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!quickTitle.trim()}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shrink-0 shadow-sm transition-colors"
          >
            Save Draft
          </button>
        </form>
      </section>

      {/* Main Post Management Section */}
      <section className="space-y-6">
        
        {/* Navigation Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Posts ({userPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'published'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'drafts'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Drafts ({draftCount})
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'bookmarks'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Bookmarks ({bookmarkedPosts.length})
            </button>
          </div>

          {/* Filter Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={dashboardSearch}
              onChange={(e) => setDashboardSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Post Items Table / Cards */}
        {displayPosts.length > 0 ? (
          <div className="space-y-4">
            {displayPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={post.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80'}
                    alt={post.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => openPostDetail(post)}
                  />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {post.category}
                      </span>

                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          post.status === 'draft'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {post.status || 'published'}
                      </span>
                    </div>

                    <h3
                      onClick={() => openPostDetail(post)}
                      className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors line-clamp-1 font-['Plus_Jakarta_Sans']"
                    >
                      {post.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views || 0}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500" /> {post.likes || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                  
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleToggleStatus(post)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {post.status === 'draft' ? 'Publish' : 'Make Draft'}
                  </button>

                  {/* View Full Post */}
                  <button
                    onClick={() => openPostDetail(post)}
                    className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Preview article"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteConfirm(post.id, post.title)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No articles in this section
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't written any articles for this tab yet. Start writing your next masterpiece!
            </p>
            <button
              onClick={() => navigateTo('create-blog')}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow"
            >
              Write First Article
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
