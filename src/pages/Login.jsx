import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Check } from 'lucide-react';

export const Login = () => {
  const { login, navigateTo } = useBlog();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const handleDemoFill = () => {
    setEmail('alex.rivera@example.com');
    setPassword('DevScribe2026!');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login(email, password);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-1">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Welcome back
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your dashboard, published articles, and bookmarks.
          </p>
        </div>

        {/* 1-Click Demo Credential Filler */}
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between gap-2">
          <div className="text-xs text-indigo-950 dark:text-indigo-300">
            <strong>Quick Preview:</strong> Test account ready
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span>Auto Fill</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="alex.rivera@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                  errors.email 
                    ? 'border-rose-500 focus:ring-rose-500/20' 
                    : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                  errors.password 
                    ? 'border-rose-500 focus:ring-rose-500/20' 
                    : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Remember me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
              Keep me signed in for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <span>Sign In to DevScribe</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleDemoFill()}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <span>GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoFill()}
            className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <span>Google</span>
          </button>
        </div>

        {/* Footer Navigation link */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
          Don't have an account yet?{' '}
          <button
            type="button"
            onClick={() => navigateTo('register')}
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Create an account
          </button>
        </p>

      </div>
    </div>
  );
};
