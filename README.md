# DevScribe - Modern Responsive Blog Application

> A responsive, modern Tech & SaaS Editorial blog platform built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Inspired by platforms like Hashnode, Medium, and Substack.

---

## 🌟 Highlights & Features

- **5 Dedicated Pages**:
  1. 🏠 **Home Page**: Featured editorial spotlight banner, category navigation tabs, search & sort bar (Latest, Most Viewed, Most Liked), responsive article grid with reading time and author metadata, trending sidebar, tags cloud, and newsletter subscription.
  2. 🔐 **Login Page**: Clean card authentication layout with email/password validation, show/hide password toggle, "Remember me" option, and a **1-Click Auto Fill Demo** button for effortless evaluation.
  3. 📝 **Register Page**: User registration with real-time password strength indicator, terms agreement, validation, and 1-Click Auto Fill.
  4. 📊 **Dashboard Page**: Author profile overview, 4 live metric statistics (Total Articles, Total Impressions, Total Likes, Saved Bookmarks), tab filtering (All, Published, Drafts, Bookmarks), quick-idea drafting widget, and article actions (preview, toggle draft/publish, delete).
  5. ✍️ **Create Blog Page**: Rich technical blog editor with title character counters, category selector, dynamic tag chips (press Enter to add), cover image presets or custom URL, live word counter & automatic reading time calculation, markdown formatting toolbar, and a real-time **Live Preview** tab.

- **Bonus Interactive Capabilities**:
  - 🌓 **Dark & Light Mode**: Instant toggle with system preference detection and persistent storage in `localStorage`.
  - 📖 **Interactive Article Reader Modal**: Click any article card to view the complete formatted post with syntax-highlighted code snippets, like button, bookmark toggle, link copying, and an interactive discussion / comments section.
  - 💾 **Full Client Persistence**: All created blogs, draft status changes, bookmarks, likes, and user login state are saved to `localStorage` so your data persists across page refreshes.

---

## 🚀 How to Run the Project

Ensure you have **Node.js** installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:5173
```

### 3. Build for Production
```bash
npm run build
```
The compiled, optimized static files will be generated in the `dist/` directory.

---

## 📂 Project Structure

```text
Blog-website/
├── index.html                   # HTML entry point with Inter & Plus Jakarta Sans fonts
├── package.json                 # Dependencies and npm scripts
├── vite.config.js               # Vite + React + Tailwind CSS configuration
└── src/
    ├── main.jsx                 # React root render
    ├── App.jsx                  # Main application shell & page router
    ├── index.css                # Tailwind CSS imports & custom styling
    ├── context/
    │   └── BlogContext.jsx      # Global state (posts, user auth, theme, bookmarks, likes)
    ├── data/
    │   └── initialData.js       # Initial seed articles, categories, and sample user profile
    ├── components/
    │   ├── Navbar.jsx           # Responsive navbar with search, theme toggle, and mobile drawer
    │   ├── Footer.jsx           # Modern tech footer with newsletter and links
    │   ├── BlogCard.jsx         # Card component with cover image, category badge, and metadata
    │   ├── PostDetailModal.jsx  # Full article reader modal with comments and social sharing
    │   └── Toast.jsx            # Notification toast for user actions
    └── pages/
        ├── Home.jsx             # Home feed, hero spotlight, category pills, search & sidebar
        ├── Login.jsx            # Sign in interface with 1-click test fill
        ├── Register.jsx         # Sign up interface with password strength meter
        ├── Dashboard.jsx        # Creator analytics, statistics, and post management
        └── CreateBlog.jsx       # Blog writer with markdown tools, cover picker, and live preview
```

---

## 🛠️ How to Customize

Since you requested something easy to understand and customize:

1. **Change or Add Initial Blog Posts**:
   Open [`src/data/initialData.js`](src/data/initialData.js) and edit the `INITIAL_POSTS` array. You can adjust titles, excerpts, markdown content, tags, or cover images.

2. **Add New Categories**:
   In [`src/data/initialData.js`](src/data/initialData.js), simply add or edit items in `INITIAL_CATEGORIES`. The navigation filters on the Home page and the category dropdown in the Create Blog page will automatically update!

3. **Change Branding & Platform Name**:
   Search for `DevScribe` in [`src/components/Navbar.jsx`](src/components/Navbar.jsx) and [`index.html`](index.html) to rename it to whatever you like.

4. **Change Colors & Theme**:
   The styling uses Tailwind CSS standard classes (e.g., `indigo-600`, `slate-900`). To change the primary accent color from Indigo to Emerald or Violet, replace `indigo` with `emerald` or `violet`.
