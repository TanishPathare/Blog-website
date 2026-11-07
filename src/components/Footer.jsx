import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { BookOpen, Rss, ArrowRight, Heart, Send, Globe, MessageSquare } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory, showToast } = useBlog();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! You will receive our weekly engineering digest.', 'success');
    setNewsletterEmail('');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigateTo('home');
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-['Plus_Jakarta_Sans']">
                DevScribe
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An open publication and engineering hub dedicated to deep technical insights, modern web architectures, cloud infrastructure, and AI engineering.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              {/* GitHub SVG */}
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              {/* Twitter / X SVG */}
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all" aria-label="X / Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Web / Globe */}
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
              {/* RSS */}
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all" aria-label="RSS Feed">
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Featured Articles
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Creator Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('create-blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Write an Article
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Member Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
              Topics
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => handleCategoryClick('Web Development')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Web Development
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Artificial Intelligence')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Artificial Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Cloud & DevOps')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Cloud & DevOps
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('System Design')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  System Design
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-4">
              Weekly Digest
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Get the top 3 curated engineering articles in your inbox every Monday.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="your.email@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  aria-label="Submit newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-slate-400">Zero spam. Unsubscribe anytime.</span>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© 2026 DevScribe Blog Platform. Built with React & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            Engineered for fast, clean, responsive reading
          </p>
        </div>
      </div>
    </footer>
  );
};
