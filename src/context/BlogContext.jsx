import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_POSTS, INITIAL_CATEGORIES, SAMPLE_USER } from '../data/initialData';

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('devscribe_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Posts state with localStorage persistence
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('devscribe_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse posts from localStorage', e);
      }
    }
    return INITIAL_POSTS;
  });

  // User auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('devscribe_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    // Default logged in with sample user so they can immediately test Dashboard & Create Blog
    return SAMPLE_USER;
  });

  // Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('devscribe_bookmarks');
    return saved ? JSON.parse(saved) : ['post-1', 'post-3'];
  });

  // Liked posts
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('devscribe_likes');
    return saved ? JSON.parse(saved) : ['post-1'];
  });

  // Navigation: 'home' | 'login' | 'register' | 'dashboard' | 'create-blog'
  const [currentPage, setCurrentPage] = useState('home');

  // Currently viewing full article modal
  const [selectedPost, setSelectedPost] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('devscribe_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('devscribe_theme', 'light');
    }
  }, [darkMode]);

  // Sync posts to localStorage
  useEffect(() => {
    localStorage.setItem('devscribe_posts', JSON.stringify(posts));
  }, [posts]);

  // Sync user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('devscribe_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('devscribe_user');
    }
  }, [currentUser]);

  // Sync bookmarks & likes
  useEffect(() => {
    localStorage.setItem('devscribe_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('devscribe_likes', JSON.stringify(likedPosts));
  }, [likedPosts]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create Post
  const createPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      slug: postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      publishedAt: new Date().toISOString().split('T')[0],
      views: 1,
      likes: 0,
      author: {
        name: currentUser ? currentUser.name : 'Guest Contributor',
        avatar: currentUser ? currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
        role: currentUser ? currentUser.role : 'Writer',
      },
      ...postData,
    };

    setPosts((prev) => [newPost, ...prev]);
    showToast(newPost.status === 'draft' ? 'Draft saved successfully!' : 'Article published live!');
    navigateTo('dashboard');
    return newPost;
  };

  // Update Post
  const updatePost = (id, updatedFields) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updatedFields } : post))
    );
    showToast('Post updated successfully!');
  };

  // Delete Post
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Post removed successfully!', 'info');
  };

  // Bookmark toggle
  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from bookmarks' : 'Added to bookmarks', 'info');
      return updated;
    });
  };

  // Like toggle
  const toggleLike = (id) => {
    setLikedPosts((prev) => {
      const isLiked = prev.includes(id);
      const updated = isLiked ? prev.filter((item) => item !== id) : [...prev, id];
      
      // Update the like count on the post
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              likes: isLiked ? Math.max(0, post.likes - 1) : post.likes + 1,
            };
          }
          return post;
        })
      );

      return updated;
    });
  };

  // Auth methods
  const login = (email, password) => {
    // Simulated authentication
    const user = {
      ...SAMPLE_USER,
      email: email || SAMPLE_USER.email,
    };
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
    navigateTo('dashboard');
  };

  const register = (data) => {
    const newUser = {
      name: data.name || 'New Creator',
      username: data.username || 'creator_' + Math.floor(Math.random() * 1000),
      email: data.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      role: 'Technology Writer',
      bio: 'Enthusiastic developer sharing insights and tutorials on modern software engineering.',
      followers: 12,
      following: 5,
      articlesCount: 0,
    };
    setCurrentUser(newUser);
    showToast('Account created successfully! Welcome to DevScribe.');
    navigateTo('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.');
    navigateTo('home');
  };

  const openPostDetail = (post) => {
    setSelectedPost(post);
    // Increment view count gently
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p))
    );
  };

  const closePostDetail = () => setSelectedPost(null);

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories: INITIAL_CATEGORIES,
        currentUser,
        darkMode,
        toggleDarkMode,
        currentPage,
        navigateTo,
        selectedPost,
        openPostDetail,
        closePostDetail,
        bookmarks,
        likedPosts,
        toggleBookmark,
        toggleLike,
        createPost,
        updatePost,
        deletePost,
        login,
        register,
        logout,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        toast,
        showToast,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
