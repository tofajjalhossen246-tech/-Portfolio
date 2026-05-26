import { Profile, Skill, Project, Service, ContactMessage } from './types';

export const DEFAULT_PROFILE: Profile = {
  name: 'Alex Mercer',
  title: 'Senior WordPress Developer & Core Plugin Engineer',
  tagline: 'Architecting high-performance, secure, and modern WordPress ecosystems.',
  bio: 'With over 8 years of dedicated experience in the WordPress landscape, I specialize in engineering bespoke solutions that push WordPress past its traditional limits. From writing custom enterprise-tier Gutenberg blocks with React to developing headless WooCommerce storefronts using WPGraphQL & Next.js, I blend clean modern code with WordPress standards. I actively contribute to WordPress Core and custom open-source themes.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop', // A professional developer portrait URL
  email: 'alex.mercer@wp-architect.com',
  phone: '+1 (555) 732-8849',
  location: 'San Francisco, CA (Available for Remote Global Work)',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  yearsOfExperience: 8,
  completedProjects: 142,
  happyClients: 96,
};

export const DEFAULT_SKILLS: Skill[] = [
  // Core WordPress
  { id: 'sk-1', name: 'Plugin Architecture & APIs', category: 'Core WordPress', proficiency: 98 },
  { id: 'sk-2', name: 'Theme Engineering (FSE & Timber)', category: 'Core WordPress', proficiency: 95 },
  { id: 'sk-3', name: 'WooCommerce Core Customization', category: 'Core WordPress', proficiency: 92 },
  { id: 'sk-4', name: 'Database Queries & WPDB Optimizations', category: 'Core WordPress', proficiency: 88 },
  
  // Gutenberg & React
  { id: 'sk-5', name: 'Custom React Gutenberg Blocks', category: 'Gutenberg & React', proficiency: 94 },
  { id: 'sk-6', name: 'Headless WordPress (WPGraphQL)', category: 'Gutenberg & React', proficiency: 90 },
  { id: 'sk-7', name: 'Vite / Webpack WP Build pipelines', category: 'Gutenberg & React', proficiency: 85 },
  
  // Languages
  { id: 'sk-8', name: 'PHP (OOP, Namespaces, PSR standards)', category: 'Languages', proficiency: 96 },
  { id: 'sk-9', name: 'JavaScript (ES6+, TypeScript, React)', category: 'Languages', proficiency: 90 },
  { id: 'sk-10', name: 'SQL & Database Schemas', category: 'Languages', proficiency: 85 },
  { id: 'sk-11', name: 'Tailwind CSS & SCSS', category: 'Languages', proficiency: 92 },

  // Tools & Workflows
  { id: 'sk-12', name: 'Core Web Vitals & Redis Caching', category: 'Tools & Workflows', proficiency: 94 },
  { id: 'sk-13', name: 'WP-CLI & Composer Automation', category: 'Tools & Workflows', proficiency: 89 },
  { id: 'sk-14', name: 'Git & Multi-Environment Deployments', category: 'Tools & Workflows', proficiency: 95 },
  { id: 'sk-15', name: 'REST APIs & Webhooks Integration', category: 'Tools & Workflows', proficiency: 91 },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'pr-1',
    title: 'Headless WooCommerce Storefront',
    subtitle: 'Lightning-fast React App fueled by WordPress GraphQL API',
    description: 'Designed and built a complete headless commerce web application with WordPress serving as the backend engine. Leveraging WPGraphQL, next-generation caching strategies, and a tailored React checkout experience, page load speeds dropped to sub-0.5s with a 240% surge in user conversions.',
    techStack: ['WordPress', 'WPGraphQL', 'React', 'Apollo Client', 'Tailwind CSS', 'WooCommerce API'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=650&auto=format&fit=crop',
    liveUrl: 'https://demo.example.com/headless',
    githubUrl: 'https://github.com',
    isFeatured: true,
    completionDate: '2025-11',
  },
  {
    id: 'pr-2',
    title: 'Enterprise Dental LMS custom Plugin',
    subtitle: 'Bespoke Courseware, Quizzing & Progress Tracker Engine',
    description: 'Developed a robust, modular Learning Management System plugin from the ground up for a corporate medical training academy. Implemented strict object-oriented PHP architecture, custom custom post types (CPTs), a secure custom REST API endpoint wrapper, and interactive SVG progress widgets.',
    techStack: ['PHP OOP', 'WP REST API', 'React Admin Console', 'Webpack/Babel', 'Alpine.js', 'MariaDB'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=650&auto=format&fit=crop',
    liveUrl: 'https://demo.example.com/lms-plugin',
    githubUrl: 'https://github.com',
    isFeatured: true,
    completionDate: '2026-02',
  },
  {
    id: 'pr-3',
    title: 'The Apex Full-Site Editing Theme',
    subtitle: 'Ultra-lightweight theme passing all green on Core Web Vitals',
    description: 'An open-source Full-Site Editing (FSE) block theme designed for visual creators. Avoids jQuery, bulky page builders, or inline assets. It is highly optimized, weighing under 40kb loaded and scores a perfect 100/100 on Google PageSpeed Insights right out of the box.',
    techStack: ['WordPress FSE', 'Gutenberg Blocks', 'theme.json', 'Tailwind CLI', 'JavaScript ESM'],
    imageUrl: 'https://images.unsplash.com/photo-1541462608141-2f58c5100267?q=80&w=650&auto=format&fit=crop',
    liveUrl: 'https://demo.example.com/apex-theme',
    githubUrl: 'https://github.com',
    isFeatured: false,
    completionDate: '2025-08',
  },
  {
    id: 'pr-4',
    title: 'High-Volume News Pipeline Integration',
    subtitle: 'Automated syndicated feeds & custom Redis caching',
    description: 'Engaged by a global crypto news network to rewrite their content syndication pipelines. Scaled WordPress to sustain over 120,000 requests per minute by implementing granular Redis page caching, offloading static media and assets to Cloudflare R2, and streamlining SQL queries.',
    techStack: ['WordPress Core', 'Redis Caching', 'Cloudflare CDN', 'WP-CLI', 'PHP Hooks & Cron'],
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=650&auto=format&fit=crop',
    liveUrl: 'https://demo.example.com/news-portal',
    githubUrl: 'https://github.com',
    isFeatured: true,
    completionDate: '2026-04',
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'sv-1',
    title: 'Bespoke Plugin Development',
    iconName: 'Puzzle',
    description: 'Clean-room OOP PHP plugins aligned with legal standard security filters to append complex checkout flows, custom payment gateway APIs, SaaS subscriptions, or dynamic systems securely to your dashboard.',
    priceEstimate: 'Starts at $2,500',
    deliveryTime: '2-4 Weeks',
  },
  {
    id: 'sv-2',
    title: 'Block Theme Engineering (FSE)',
    iconName: 'Layout',
    description: 'Developing ultra-fast, modern block-based or full-site editing (FSE) themes containing customized Tailwind styling, eliminating heavy site builders to guarantee beautiful editor alignments and swift updates.',
    priceEstimate: 'Starts at $4,000',
    deliveryTime: '3-5 Weeks',
  },
  {
    id: 'sv-3',
    title: 'Headless WordPress Architectures',
    iconName: 'Cpu',
    description: 'Setting up headless configurations of WP using React or Next.js with modern frontends, utilizing secure WPGraphQL queries to deliver immediate load times while maintaining the editor dashboard.',
    priceEstimate: 'Starts at $6,000',
    deliveryTime: '4-6 Weeks',
  },
  {
    id: 'sv-4',
    title: 'WordPress Speed & Security Audit',
    iconName: 'ShieldAlert',
    description: 'Comprehensive code profiling, database optimization audits, server configurations, object caches (Redis/Memcached), and comprehensive security hardening to turn sluggish, vulnerable pipelines rock-solid.',
    priceEstimate: 'Starts at $1,200',
    deliveryTime: '5-7 Days',
  }
];

export const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah@webcreative.io',
    subject: 'Need custom Headless WooCommerce help',
    message: 'Hello Alex! We love your work with Headless WooCommerce storefronts. We are looking to migrate our current Shopify store with 500+ products to a custom React frontend with WordPress back-end. Do you have availability for a project next month? Let\'s jump on a call.',
    timestamp: 'May 25, 2026, 10:15 AM',
    isRead: false,
  },
  {
    id: 'msg-2',
    name: 'Robert Vanderpool',
    email: 'robert@apex-properties.com',
    subject: 'Custom Filter plugin for Real Estate client',
    message: 'We need building a secure filtering add-on for a real estate directory site. It uses WP REST API to pull records dynamically without reloading the page. Saw your portfolio CPT work and we want to hire you on a contract basis.',
    timestamp: 'May 24, 2026, 03:40 PM',
    isRead: true,
  }
];
