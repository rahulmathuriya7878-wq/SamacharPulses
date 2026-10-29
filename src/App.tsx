import React, { useState, useEffect, useMemo } from 'react';
import { NewsItem, BlogPost, JobCategory } from './types';
import { INITIAL_NEWS_ITEMS } from './data/newsData';
import { INITIAL_BLOG_POSTS } from './data/blogData';

import { Header } from './components/Header';
import { BlogCard } from './components/BlogCard';
import { BlogDetailView } from './components/BlogDetailView';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { PolicyModal } from './components/PolicyModal';
import { FastUpdatesGrid } from './components/FastUpdatesGrid';
import { SEOHead } from './components/SEOHead';
import { UrlInspectionModal } from './components/UrlInspectionModal';
import { LiveNewsTicker } from './components/LiveNewsTicker';

import {
  Twitter,
  Facebook,
  Instagram,
  Send,
} from 'lucide-react';

const BLOG_CATEGORIES: string[] = [
  'All Blogs',
  'देश न्यूज़',
  'विदेश न्यूज़',
];

export default function App() {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS_ITEMS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  // Active Selected Blog Post for Full Article View
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<'terms' | 'privacy'>('terms');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('samachar_theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('samachar_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('samachar_theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Category & Sector Filters
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('All Blogs');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<JobCategory | 'All Sectors'>('All Sectors');
  const [isUrlInspectOpen, setIsUrlInspectOpen] = useState(false);

  // Initialize URL Path Route
  useEffect(() => {

    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (path) {
        const match = blogPosts.find((b) => b.slug === path);
        if (match) {
          setSelectedBlog(match);
        }
      }
    }
  }, []);



  const handleDeleteBlog = (blogId: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== blogId));
    if (selectedBlog?.id === blogId) {
      setSelectedBlog(null);
    }
  };

  const handleDeleteAllBlogs = () => {
    setBlogPosts([]);
    setSelectedBlog(null);
  };

  const [isSarkariResultSyncing, setIsSarkariResultSyncing] = useState(false);
  const [isRajasthanSyncing, setIsRajasthanSyncing] = useState(false);

  const handleSyncFromSarkariResult = async () => {
    setIsSarkariResultSyncing(true);
    try {
      const res = await fetch('/api/blog/sync-from-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: 'https://www.sarkariresult.com/' }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          const synced = data.posts[0];
          setBlogPosts((prev) => [synced, ...prev]);
          setSelectedBlog(synced);
        }
      }
    } catch (err) {
      console.error('Error syncing from SarkariResult:', err);
    } finally {
      setIsSarkariResultSyncing(false);
    }
  };

  const handleSyncFromRajasthanVacancy = async () => {
    setIsRajasthanSyncing(true);
    try {
      const res = await fetch('/api/blog/sync-from-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl: 'https://rajasthanvacancy.com/' }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          const synced = data.posts[0];
          setBlogPosts((prev) => [synced, ...prev]);
          setSelectedBlog(synced);
        }
      }
    } catch (err) {
      console.error('Error syncing from RajasthanVacancy:', err);
    } finally {
      setIsRajasthanSyncing(false);
    }
  };

  const handleSyncLiveBulletins = async () => {
    const freshBulletins: NewsItem[] = [
      {
        id: `bulletin-x-${Date.now()}`,
        title: '🔥 Live News: मुख्य परीक्षा तिथियों व अपडेट्स की घोषणा जल्द',
        category: 'करेंट अफेयर्स',
        summary: 'आधिकारिक सूत्रों और प्रेस अपडेट के मुताबिक विभिन्न प्रतियोगी परीक्षाओं की समय-सारणी जारी की जाएगी।',
        content: 'ताज़ा अपडेट के अनुसार परीक्षा तिथियों की समय-सारणी तैयार है।',
        source: 'PIB Live Feed',
        publishedAt: new Date().toISOString(),
        readTime: '1 मिनट अध्ययन',
        tags: ['Updates', 'Exam Dates'],
      },
      {
        id: `bulletin-sarkari-${Date.now()}`,
        title: '📢 पोर्टल अपडेट: सिविल सेवा एवं प्रशासनिक परीक्षा हेतु ऑनलाइन रजिस्ट्रेशन शुरू',
        category: 'देश',
        summary: 'आधिकारिक आयोग ने प्रारंभिक परीक्षा का नया विज्ञापन जारी कर दिया है। योग्य उम्मीदवार पोर्टल पर आवेदन करें।',
        content: 'पोर्टल पर लाइव सिंक डेटा के अनुसार रिक्तियों की कुल संख्या घोषित की गई है।',
        source: 'Official Portal',
        publishedAt: new Date().toISOString(),
        readTime: '2 मिनट अध्ययन',
        tags: ['UPSC', 'Civil Services'],
      },
    ];

    setNews((prev) => [...freshBulletins, ...prev]);
  };

  const openPolicyModalTab = (tab: 'terms' | 'privacy') => {
    setPolicyTab(tab);
    setIsPolicyOpen(true);
  };

  // Filter Blog Posts List with useMemo
  const filteredBlogPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (selectedBlogCategory !== 'All Blogs' && post.category !== selectedBlogCategory) return false;
      if (selectedSectorFilter !== 'All Sectors' && post.jobCategory !== selectedSectorFilter) return false;
      return true;
    });
  }, [blogPosts, selectedBlogCategory, selectedSectorFilter]);

  const featuredHeroBlog = useMemo(() => {
    return blogPosts.find((p) => p.isFeatured) || blogPosts[0];
  }, [blogPosts]);

  const regularBlogPosts = useMemo(() => {
    return filteredBlogPosts.filter((p) => p.id !== featuredHeroBlog?.id);
  }, [filteredBlogPosts, featuredHeroBlog]);



  // Dynamic SEO metadata calculation for current view
  const currentSeoMeta = useMemo(() => {
    if (selectedBlog) {
      return {
        title: `${selectedBlog.title} | SamacharPulse News`,
        description: selectedBlog.summary || selectedBlog.subtitle,
        canonicalUrl: typeof window !== 'undefined' ? `${window.location.origin}/${selectedBlog.slug}` : undefined,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          'headline': selectedBlog.title,
          'description': selectedBlog.summary || selectedBlog.subtitle,
          'datePublished': selectedBlog.publishedAt,
          'author': {
            '@type': 'Organization',
            'name': selectedBlog.author?.name || 'SamacharPulse Bureau'
          }
        }
      };
    }
    return {
      title: 'SamacharPulse - Daily News Blogs & Live Bulletins 2026',
      description: 'Real-time news blogs, official website links, live breaking news ticker, exam syllabus summaries & cutoff analysis.',
      canonicalUrl: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
    };
  }, [selectedBlog]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <SEOHead
        title={currentSeoMeta.title}
        description={currentSeoMeta.description}
        canonicalUrl={currentSeoMeta.canonicalUrl}
        jsonLd={currentSeoMeta.jsonLd}
      />

      {/* Top Navigation Bar */}
      <Header
        activeTab="blogs"
        setActiveTab={() => setSelectedBlog(null)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onSelectSectorFilter={(sector) => {
          setSelectedSectorFilter(sector);
          setSelectedBlog(null);
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />



      {/* Main Container */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-2 sm:px-3 py-3 space-y-4">
        {selectedBlog ? (
          <BlogDetailView
            post={selectedBlog}
            onBack={() => setSelectedBlog(null)}
            onSelectRelatedPost={(p) => setSelectedBlog(p)}
            allPosts={blogPosts}
          />
        ) : (
          <div className="space-y-6">
            <LiveNewsTicker newsItems={news} onRefresh={handleSyncLiveBulletins} />

            {/* Category Filter Tabs & Trending Tags */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                  {BLOG_CATEGORIES.map((cat) => (
                    <button
                      key={`cat-tab-${cat}`}
                      onClick={() => setSelectedBlogCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedBlogCategory === cat
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {selectedSectorFilter !== 'All Sectors' && (
                  <button
                    onClick={() => setSelectedSectorFilter('All Sectors')}
                    className="px-3 py-1.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>सेक्टर: {selectedSectorFilter} ✕</span>
                  </button>
                )}
              </div>
            </div>

            {/* Lead Story / Featured Hero Blog Card */}
            {featuredHeroBlog && (
              <BlogCard
                key={`hero-${featuredHeroBlog.id}`}
                post={featuredHeroBlog}
                onSelectPost={(p) => setSelectedBlog(p)}
                isFeaturedHero
              />
            )}

            <FastUpdatesGrid 
              regularBlogPosts={regularBlogPosts} 
              setSelectedBlog={setSelectedBlog} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 text-slate-400 border-t border-slate-800 py-6 px-3 text-xs">
        <div className="max-w-[1600px] mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            {/* Brand & Tagline */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                S
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                समाचार<span className="text-emerald-500">पल्स</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300 font-medium">दैनिक समाचार एवं संपादकीय ब्लॉग</span>
            </div>

            {/* Policy Links */}
            <div className="flex items-center gap-4 text-slate-300 font-bold">
              <button
                onClick={() => openPolicyModalTab('terms')}
                className="hover:text-emerald-400 transition-colors cursor-pointer underline decoration-slate-700 underline-offset-4"
              >
                नियम व शर्तें
              </button>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                onClick={() => openPolicyModalTab('privacy')}
                className="hover:text-emerald-400 transition-colors cursor-pointer underline decoration-slate-700 underline-offset-4"
              >
                गोपनीयता नीति
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-xs">
            <p>© 2026 समाचारपल्स (SamacharPulse). सर्वाधिकार सुरक्षित।</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">आधिकारिक सोशल मीडिया:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-800 hover:bg-black text-sky-400 rounded-lg transition-colors cursor-pointer"
                  title="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-800 hover:bg-blue-600 text-blue-400 rounded-lg transition-colors cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-800 hover:bg-pink-600 text-pink-400 rounded-lg transition-colors cursor-pointer"
                  title="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-slate-800 hover:bg-sky-600 text-sky-300 rounded-lg transition-colors cursor-pointer"
                  title="Telegram"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        initialTab={policyTab}
      />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab="blogs"
        setActiveTab={() => setSelectedBlog(null)}
        onSelectSectorFilter={(s) => {
          setSelectedSectorFilter(s);
          setSelectedBlog(null);
        }}
      />


      <UrlInspectionModal
        isOpen={isUrlInspectOpen}
        onClose={() => setIsUrlInspectOpen(false)}
        initialSlug={selectedBlog ? selectedBlog.slug : ''}
      />
    </div>
  );
}
