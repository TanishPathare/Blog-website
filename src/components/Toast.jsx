import React from 'react';
import { useBlog } from '../context/BlogContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useBlog();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'info':
        return <Info className="w-5 h-5 text-sky-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-800 dark:text-slate-100 text-sm font-medium animate-in slide-in-from-bottom-5 duration-200 max-w-sm">
      {getIcon()}
      <span className="flex-1">{toast.message}</span>
    </div>
  );
};
