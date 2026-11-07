import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Bookmark, Heart, Clock, Calendar, ArrowUpRight } from 'lucide-react';

export const BlogCard = ({ post, compact = false }) => {
  const { openPostDetail, bookmarks, toggleBookmark, likedPosts, toggleLike } = useBlog();

  const isBookmarked = bookmarks.includes(post.id);
  const isLiked = likedPosts.includes(post.id);

  // Category color accents
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Web Development':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900';
      case 'Artificial Intelligence':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900';
      case 'Cloud & DevOps':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900';
      case 'System Design':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900';
      case 'UI/UX Design':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  return (
    <article className="group flex flex-col bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all duration-300">
      
      {/* Cover Image Container */}
      <div 
        onClick={() => openPostDetail(post)}
        className="relative overflow-hidden aspect-[16/9] cursor-pointer bg-slate-100 dark:bg-slate-800"
      >
        <img
          src={post.coverImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category Pill Overlaid */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full border backdrop-blur-md bg-white/95 dark:bg-slate-900/95 shadow-sm ${getCategoryClass(post.category)}`}>
            {post.category}
          </span>
        </div>

        {/* Status indicator if draft */}
        {post.status === 'draft' && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
              Draft
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Metadata: Read Time & Date */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openPostDetail(post)}
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-2 mb-2 font-['Plus_Jakarta_Sans']"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {!compact && (
            <p className="text-sm text-slate-600 dark:text-slate-300/90 line-clamp-2 leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && !compact && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-[11px] text-slate-400 self-center">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Author & Actions Bar */}
        <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {/* Author Details */}
          <div className="flex items-center gap-2.5">
            <img
              src={post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'}
              alt={post.author?.name || 'Author'}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                {post.author?.name || 'DevScribe Writer'}
              </span>
              <span className="text-[11px] text-slate-400">
                {post.author?.role || 'Contributor'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(post.id);
              }}
              className={`flex items-center gap-1 p-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                isLiked ? 'text-rose-600 dark:text-rose-400' : ''
              }`}
              title="Like this post"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
              <span>{post.likes || 0}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(post.id);
              }}
              className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                isBookmarked ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Read Button */}
            <button
              onClick={() => openPostDetail(post)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400"
              title="Read full article"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
