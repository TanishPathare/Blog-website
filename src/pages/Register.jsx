import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { BookOpen, User, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const Register = () => {
  const { register, navigateTo } = useBlog();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});

  const handleDemoFill = () => {
    setFormData({
      name: 'Jordan Miller',
      username: 'jordan_dev',
      email: 'jordan.miller@example.com',
      password: 'DevSecurePass2026!',
      agreeTerms: true,
    });
    setErrors({});
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    register(formData);
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-1">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Create DevScribe Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Join thousands of software engineers publishing deep tech content.
          </p>
        </div>

        {/* Demo Fill Banner */}
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between gap-2">
          <div className="text-xs text-indigo-950 dark:text-indigo-300">
            <strong>Quick evaluation:</strong> Fill sample account
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Jordan Miller"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                    errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">@</span>
                <input
                  type="text"
                  placeholder="jordan_dev"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    if (errors.username) setErrors({ ...errors, username: null });
                  }}
                  className={`w-full pl-8 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                    errors.username ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
              </div>
              {errors.username && <p className="text-xs text-rose-500">{errors.username}</p>}
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="jordan.miller@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                  errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                  errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500">{errors.password}</p>}

            {/* Password strength bar */}
            {formData.password && (
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength <= 25
                        ? 'w-1/4 bg-rose-500'
                        : strength <= 50
                        ? 'w-2/4 bg-amber-500'
                        : strength <= 75
                        ? 'w-3/4 bg-blue-500'
                        : 'w-full bg-emerald-500'
                    }`}
                  />
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Password strength</span>
                  <span>{strength >= 75 ? 'Strong' : strength >= 50 ? 'Medium' : 'Weak'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="space-y-1 pt-1">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => {
                  setFormData({ ...formData, agreeTerms: e.target.checked });
                  if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: null });
                }}
                className="mt-0.5 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                I agree to the <a href="#" className="text-indigo-600 dark:text-indigo-400 underline">Terms of Service</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 underline">Privacy Policy</a>.
              </label>
            </div>
            {errors.agreeTerms && <p className="text-xs text-rose-500">{errors.agreeTerms}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Navigation link */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => navigateTo('login')}
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Sign In here
          </button>
        </p>

      </div>
    </div>
  );
};
