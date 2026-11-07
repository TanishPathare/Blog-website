import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Send,
  Eye,
  CheckCircle2,
  Copy
} from 'lucide-react';

export const PostDetailModal = () => {
  const { 
    selectedPost, 
    closePostDetail, 
    bookmarks, 
    toggleBookmark, 
    likedPosts, 
    toggleLike,
    currentUser,
    showToast
  } = useBlog();

  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      date: '2 hours ago',
      text: 'Fantastic breakdown! The architectural trade-offs between isolated micro-frontends and monorepos are often misunderstood.',
    },
    {
      id: 2,
      author: 'Dr. Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      date: 'Yesterday',
      text: 'Great point about deterministic schemas in LLM outputs. Looking forward to reading your next article!',
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedPost) return null;

  const isBookmarked = bookmarks.includes(selectedPost.id);
  const isLiked = likedPosts.includes(selectedPost.id);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: currentUser ? currentUser.name : 'Guest Reader',
      avatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      date: 'Just now',
      text: newComment.trim(),
    };

    setComments((prev) => [commentObj, ...prev]);
    setNewComment('');
    showToast('Your comment was posted!');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Article link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
              {selectedPost.category}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-500 hidden sm:inline">{selectedPost.readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Copy link"
            >
              {copiedLink ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
            </button>

            {/* Like */}
            <button
              onClick={() => toggleLike(selectedPost.id)}
              className={`p-2 rounded-full transition-colors ${
                isLiked 
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Like post"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(selectedPost.id)}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Save to bookmarks"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close */}
            <button
              onClick={closePostDetail}
              className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors ml-2"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-8">
          
          {/* Post Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author info & Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPost.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'}
                  alt={selectedPost.author?.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {selectedPost.author?.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedPost.author?.role || 'Staff Writer'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {selectedPost.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {selectedPost.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-slate-400" />
                  {selectedPost.views} views
                </span>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          {selectedPost.coverImage && (
            <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100 dark:bg-slate-800 shadow-sm">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Excerpt Lead */}
          <div className="text-lg text-slate-600 dark:text-slate-300 font-medium italic border-l-4 border-indigo-500 pl-4 py-1">
            "{selectedPost.excerpt}"
          </div>

          {/* Content area */}
          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-5">
            {selectedPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-slate-900 dark:text-white pt-4 pb-1">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                const cleaned = paragraph.replace(/```[a-z]*\n?/g, '');
                return (
                  <div key={index} className="my-4 rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                    <pre><code>{cleaned}</code></pre>
                  </div>
                );
              }
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags list */}
          {selectedPost.tags && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Tagged with
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                Discussion ({comments.length})
              </h3>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-3 items-start">
              <img
                src={currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80'}
                alt="Your avatar"
                className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Share your thoughts or feedback..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex gap-3.5">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {comment.author}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
