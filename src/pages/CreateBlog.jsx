import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  PenSquare, 
  Image as ImageIcon, 
  Tag, 
  Folder, 
  Bold, 
  Italic, 
  Code, 
  List, 
  Quote, 
  Heading1, 
  Heading2, 
  Link, 
  Eye, 
  Send, 
  Save, 
  Sparkles,
  X,
  Plus
} from 'lucide-react';

const COVER_PRESETS = [
  { label: 'Coding / IDE', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'AI & Neural', url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cloud Infrastructure', url: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Minimalist Tech', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' }
];

export const CreateBlog = () => {
  const { categories, createPost, navigateTo } = useBlog();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [tags, setTags] = useState(['React', 'JavaScript', 'TailwindCSS']);
  const [tagInput, setTagInput] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [status, setStatus] = useState('published'); // 'published' | 'draft'
  const [errors, setErrors] = useState({});

  // Calculate estimated read time
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 180)) + ' min read';

  // Tag management
  const handleAddTag = (e) => {
    e.preventDefault();
    const cleanTag = tagInput.trim().replace(/^#/, '');
    if (cleanTag && !tags.includes(cleanTag)) {
      setTags([...tags, cleanTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Markdown formatting toolbar helper
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('blog-content-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || 'text';
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    // Restore focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Submit Handler
  const handleSubmit = (targetStatus) => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Article title is required';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!content.trim()) {
      newErrors.content = 'Article content cannot be empty';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalExcerpt = excerpt.trim() || content.trim().substring(0, 160) + '...';

    createPost({
      title: title.trim(),
      excerpt: finalExcerpt,
      content: content.trim(),
      category,
      tags,
      coverImage: customImageUrl.trim() || coverImage,
      readTime: estimatedReadTime,
      status: targetStatus,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Create New Article
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Write, format with markdown, and publish high-quality technical content.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{isPreviewMode ? 'Editor View' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('published')}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-102"
          >
            <Send className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {!isPreviewMode ? (
        /* Editor Mode */
        <div className="space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Article Title
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {title.length} characters
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. Architecting Distributed Systems with Kafka and ClickHouse"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              className={`w-full px-5 py-3.5 text-lg sm:text-xl font-bold rounded-2xl bg-white dark:bg-slate-900 border ${
                errors.title ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-800'
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-['Plus_Jakarta_Sans'] shadow-sm`}
            />
            {errors.title && <p className="text-xs text-rose-500 font-medium">{errors.title}</p>}
          </div>

          {/* Category & Tags Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-indigo-500" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
              >
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-500" />
                Tags (Press Enter to add)
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Architecture, Rust..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag(e);
                    }
                  }}
                  className="flex-1 px-4 py-2 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  Add
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-rose-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Cover Image Picker */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                Cover Banner Image
              </label>
              <span className="text-xs text-slate-400">Select preset or enter custom URL</span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COVER_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setCoverImage(preset.url);
                    setCustomImageUrl('');
                  }}
                  className={`group relative rounded-xl overflow-hidden aspect-[16/9] border-2 transition-all ${
                    coverImage === preset.url && !customImageUrl
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="text-[11px] font-semibold text-white truncate">{preset.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom URL Input */}
            <div>
              <input
                type="url"
                placeholder="Or paste external Unsplash/CDN image URL..."
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Short Excerpt Summary */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Short Summary / Excerpt
            </label>
            <textarea
              rows={2}
              placeholder="A brief hook that summarizes the core takeaway of this article..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          {/* Markdown Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Article Body (Markdown Supported)
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {wordCount} words • ~{estimatedReadTime}
              </span>
            </div>

            {/* Markdown Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 rounded-t-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => insertFormatting('**', '**')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('*', '*')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-600 mx-1" />
              <button
                type="button"
                onClick={() => insertFormatting('### ')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Heading"
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('```javascript\n', '\n```')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Code block"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('> ')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Blockquote"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('- ')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('[Link Title](', ')')}
                className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                title="Add link"
              >
                <Link className="w-4 h-4" />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              id="blog-content-textarea"
              rows={16}
              placeholder="Write your article here using markdown formatting...

### Introduction
Start with a strong architectural hook and overview.

```javascript
const answer = 42;
```

### Deep Dive
Elaborate on performance characteristics, trade-offs, and benchmarks."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors({ ...errors, content: null });
              }}
              className={`w-full px-5 py-4 text-sm font-mono rounded-b-xl bg-white dark:bg-slate-900 border ${
                errors.content ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-200 dark:border-slate-800'
              } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm leading-relaxed`}
            />
            {errors.content && <p className="text-xs text-rose-500 font-medium">{errors.content}</p>}
          </div>

        </div>
      ) : (
        /* Live Preview Mode */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              {category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{estimatedReadTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
            {title || 'Untitled Draft Article'}
          </h1>

          {(customImageUrl || coverImage) && (
            <div className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100">
              <img
                src={customImageUrl || coverImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {excerpt && (
            <p className="text-base text-slate-600 dark:text-slate-300 italic border-l-4 border-indigo-500 pl-4">
              "{excerpt}"
            </p>
          )}

          <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 space-y-4 pt-4">
            {content ? (
              content.split('\n\n').map((para, i) => {
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-xl font-bold text-slate-900 dark:text-white pt-2">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }
                if (para.startsWith('```')) {
                  const cleaned = para.replace(/```[a-z]*\n?/g, '');
                  return (
                    <div key={i} className="rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto">
                      <pre><code>{cleaned}</code></pre>
                    </div>
                  );
                }
                return <p key={i}>{para}</p>;
              })
            ) : (
              <p className="text-slate-400 italic">No content written yet. Switch to Editor view to begin writing.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
