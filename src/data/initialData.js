/**
 * Default Seed Data for DevScribe Blog Platform
 * You can easily customize these articles, categories, and author profiles.
 */

export const INITIAL_CATEGORIES = [
  'All',
  'Web Development',
  'Artificial Intelligence',
  'Cloud & DevOps',
  'System Design',
  'UI/UX Design',
  'Career & Insights',
];

export const INITIAL_TAGS = [
  'React', 'JavaScript', 'TypeScript', 'Next.js', 'Python', 'TailwindCSS',
  'Docker', 'AWS', 'LLMs', 'Node.js', 'Architecture', 'CSS', 'PostgreSQL'
];

export const SAMPLE_USER = {
  name: 'Alex Rivera',
  username: 'alexrivera_dev',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'Senior Software Engineer & Tech Writer',
  bio: 'Building open-source tools and writing deep dives into full-stack web architectures, distributed systems, and modern AI engineering.',
  followers: 4820,
  following: 341,
  articlesCount: 8,
};

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    title: 'Architecting Scalable Frontends: Microfrontends vs Modern Monoliths in 2026',
    slug: 'architecting-scalable-frontends-2026',
    excerpt: 'An in-depth analysis of when microfrontends actually make sense for engineering organizations versus modern component-driven monorepos.',
    content: `Building large-scale web applications today requires balancing team velocity with bundle efficiency. In this deep dive, we explore how decoupled component frameworks, module federation, and island architectures compare against unified monorepos.

### The Shift Towards Modular Architecture
For years, teams defaulted to monolithic single-page applications. As engineering teams grew from 5 to 50 engineers, deployment contention became an everyday headache.

\`\`\`javascript
// Example Module Federation snippet
export default {
  name: 'blog_widget',
  filename: 'remoteEntry.js',
  exposes: {
    './BlogCard': './src/components/BlogCard',
  },
};
\`\`\`

### Key Takeaways
1. **Don't prematurely distribute**: Microfrontends solve organizational scaling problems, not performance bottlenecks.
2. **Standardize shared design tokens**: Tailwind CSS and headless components ensure visual harmony across remotes.
3. **Monitor client payload budgets**: Keep total JavaScript parsing times under 200ms on median mobile devices.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Development',
    tags: ['React', 'Architecture', 'TypeScript', 'Web Development'],
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'Staff Engineer',
    },
    publishedAt: '2026-11-04',
    readTime: '6 min read',
    views: 3420,
    likes: 248,
    isFeatured: true,
    status: 'published',
  },
  {
    id: 'post-2',
    title: 'Building Production-Ready Local LLM Agents with Structured Outputs',
    slug: 'production-ready-local-llm-agents',
    excerpt: 'Step-by-step implementation guide to building deterministic, JSON-constrained autonomous agents without vendor lock-in.',
    content: `Local open-weights language models have become fast and lightweight enough to run reasoning tasks entirely within customer VPCs or edge runtimes.

### Why Structured Outputs Matter
Natural language outputs are great for chat, but software workflows require deterministic schemas. By enforcing strict grammar sampling (JSON Schemas, Pydantic, Zod), you eliminate 99% of parsing hallucinations.

\`\`\`python
from pydantic import BaseModel, Field

class AgentDecision(BaseModel):
    action: str = Field(description="Action tool identifier")
    confidence: float = Field(ge=0.0, le=1.0)
    parameters: dict
\`\`\`

By pairing this with prompt engineering and vector indexes, agents execute complex tasks reliably.`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    category: 'Artificial Intelligence',
    tags: ['Artificial Intelligence', 'Python', 'LLMs'],
    author: {
      name: 'Dr. Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      role: 'AI Research Lead',
    },
    publishedAt: '2026-11-02',
    readTime: '8 min read',
    views: 5210,
    likes: 412,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-3',
    title: 'The 2026 DevOps Checklist: Zero-Trust CI/CD and Ephemeral Preview Envs',
    slug: 'devops-checklist-zero-trust-preview-envs',
    excerpt: 'Modern delivery pipelines require automated ephemeral environments, signed build artifacts, and strict short-lived credentials.',
    content: `Deploying code safely in modern distributed organizations requires shifting security left without creating friction for developers.

### Ephemeral Environments
Gone are the days of broken staging servers. Every Pull Request should spin up a completely isolated, lightweight Kubernetes namespace or serverless container that mirrors production.

### Essential Security Guardrails
- Automatic OIDC short-lived tokens instead of long-lived API secrets
- Container image signing with Cosign
- Automated dependency provenance audits`,
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80',
    category: 'Cloud & DevOps',
    tags: ['Cloud & DevOps', 'Docker', 'AWS'],
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      role: 'DevOps Architect',
    },
    publishedAt: '2026-10-29',
    readTime: '5 min read',
    views: 2180,
    likes: 189,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-4',
    title: 'Mastering Modern CSS: Container Queries, Subgrid, and Color Gamut',
    slug: 'mastering-modern-css-container-queries',
    excerpt: 'Modern CSS has evolved tremendously. Explore container queries, subgrid layouts, and P3 high-dynamic color palettes with practical examples.',
    content: `Responsive design is no longer just about viewport width. With component-based development, our components should respond to the size of their parent container.

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 450px) {
  .card-layout {
    display: flex;
    gap: 1.5rem;
  }
}
\`\`\`

Container queries enable genuinely modular components that render perfectly whether placed in a full-width hero or a narrow 300px sidebar.`,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'UI/UX Design',
    tags: ['CSS', 'UI/UX Design', 'TailwindCSS'],
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      role: 'Design Technologist',
    },
    publishedAt: '2026-10-25',
    readTime: '4 min read',
    views: 4190,
    likes: 310,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-5',
    title: 'High-Throughput Event Streaming: Lessons from Processing 10B Daily Events',
    slug: 'high-throughput-event-streaming-lessons',
    excerpt: 'Hard-won engineering lessons on partitioning strategies, backpressure management, and idempotency in Kafka and ClickHouse architectures.',
    content: `When scaling real-time telemetry from thousands to millions of operations per second, subtle issues like partition skew and disk I/O bottlenecks become catastrophic.

### Key Architecture Patterns
- **Idempotent Producers**: Ensure duplicate messages are automatically discarded using sequence IDs.
- **Consumer Group Sizing**: Match partition count with consumer parallelism to avoid idle workers.
- **Batching & Compression**: Compressing batches with Zstandard yields a 4x reduction in network egress costs.`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    category: 'System Design',
    tags: ['System Design', 'Architecture', 'PostgreSQL'],
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'Senior Software Engineer',
    },
    publishedAt: '2026-10-18',
    readTime: '11 min read',
    views: 8930,
    likes: 642,
    isFeatured: false,
    status: 'published',
  },
  {
    id: 'post-6',
    title: 'Demystifying TypeScript 5.8: Const Type Parameters and Decorator Metadata',
    slug: 'demystifying-typescript-5-8',
    excerpt: 'A comprehensive walkthrough of the newest TypeScript features, compiler optimizations, and performance improvements.',
    content: `TypeScript's evolution continues to make type systems more expressive without sacrificing runtime performance. Learn how modern const annotations reduce unnecessary \`as const\` assertions.`,
    coverImage: 'https://images.unsplash.com/photo-1516116211227-bbc13c744a73?auto=format&fit=crop&w=1200&q=80',
    category: 'Web Development',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      role: 'Senior Software Engineer',
    },
    publishedAt: '2026-10-10',
    readTime: '7 min read',
    views: 1840,
    likes: 154,
    isFeatured: false,
    status: 'draft',
  }
];
