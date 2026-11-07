import React from 'react';
import { useBlog } from './context/BlogContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PostDetailModal } from './components/PostDetailModal';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { CreateBlog } from './pages/CreateBlog';

export default function App() {
  const { currentPage } = useBlog();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'dashboard':
        return <Dashboard />;
      case 'create-blog':
        return <CreateBlog />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {renderCurrentPage()}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Reader Modal for any article */}
      <PostDetailModal />

      {/* Floating System Toasts */}
      <Toast />
    </div>
  );
}
