import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { SocialShareModal } from './SocialShareModal';
import { ensureOfficialWebsite } from '../utils/officialWebsiteHelper';
import {
  Share2,
  Sparkles,
  Eye,
  ChevronLeft,
  Globe,
  ExternalLink,
  Trash2,
  Mail,
} from 'lucide-react';

interface BlogDetailViewProps {
  post: BlogPost;
  onBack: () => void;
  onSelectRelatedPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
  isAdminUnlocked?: boolean;
  onDeletePost?: (id: string) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  post,
  onBack,
  onSelectRelatedPost,
  allPosts,
  isAdminUnlocked,
  onDeletePost,
}) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Official Website Details (Guaranteed for every blog post)
  const enhancedPost = ensureOfficialWebsite(post);
  const officialUrl = enhancedPost.officialWebsite?.url || enhancedPost.officialUrl;
  const officialName = enhancedPost.officialWebsite?.name || 'आधिकारिक सरकारी भर्ती बोर्ड';
  const officialDesc = enhancedPost.officialWebsite?.portalDescription || 'भर्ती परीक्षा, परिणाम, उत्तर कुंजी व आधिकारिक अधिसूचना संबंधी सत्यापन हेतु अधिकृत सरकारी पोर्टल';
  const officialHost = officialUrl ? officialUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';


  // Track Reading Scroll Progress
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.id]);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim() || !subEmail.includes('@')) return;
    setSubSuccess(true);
    setSubEmail('');
    setTimeout(() => setSubSuccess(false), 4000);
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'telegram' | 'copy') => {
    const currentUrl = window.location.href;
    const postTitle = post.title;

    if (platform === 'whatsapp') {
      const waText = `📰 *${postTitle}*\n\n👉 सरकारीपल्स पर विस्तृत रिपोर्ट पढ़ें:\n${currentUrl}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
    } else if (platform === 'telegram') {
      const tgText = `📰 *${postTitle}*`;
      window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(tgText)}`, '_blank');
    } else if (platform === 'twitter') {
      const twText = `📰 ${postTitle}`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twText)}&url=${encodeURIComponent(currentUrl)}&hashtags=SarkariPulse,GovtJobs,News`, '_blank');
    } else if (platform === 'copy') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`📰 ${postTitle}\n${currentUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };



  // Select related posts based on matching tags, category, and fallback
  const otherPosts = allPosts.filter((p) => p.id !== post.id);
  const currentTags = post.tags || [];

  const scoredPosts = otherPosts.map((p) => {
    const pTags = p.tags || [];
    const matchingCount = pTags.filter((t) => currentTags.includes(t)).length;
    const sameCategory = p.category === post.category ? 2 : 0;
    return { post: p, score: matchingCount * 3 + sameCategory };
  });

  scoredPosts.sort((a, b) => b.score - a.score);
  const relatedPosts = scoredPosts.slice(0, 3).map((item) => item.post);

  return (
    <div className="space-y-6 max-w-5xl mx-auto relative" key={`blog-detail-${post.id}`}>
      {/* Fixed Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-200 z-50">
        <div
          className="h-full bg-emerald-600 transition-all duration-75 ease-out shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button & Active Staff Delete Button */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs whitespace-nowrap shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>वापस जाएं</span>
        </button>

        {isAdminUnlocked && onDeletePost && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`क्या आप इस पोस्ट को निश्चित रूप से डिलीट करना चाहते हैं?\n"${post.title}"`)) {
                onDeletePost(post.id);
                onBack();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer px-3.5 py-2 rounded-xl shadow-xs shrink-0"
            title="स्टाफ मोड: पोस्ट डिलीट करें"
          >
            <Trash2 className="w-4 h-4 text-white" />
            <span>पोस्ट डिलीट करें</span>
          </button>
        )}
      </div>

      {/* Main Blog Article Container */}
      <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        {/* Unboxed Editorial Category, Meta & Font Size Adjuster */}
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-900 uppercase">
              {post.category}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>प्रकाशित तिथि: {new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <span className="hidden sm:inline">फ़ॉन्ट साइज़:</span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${fontSize === 'normal' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
              title="सामान्य फ़ॉन्ट (A)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${fontSize === 'large' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
              title="बड़ा फ़ॉन्ट (A+)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 rounded-lg border cursor-pointer transition-colors ${fontSize === 'xlarge' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
              title="बहुत बड़ा फ़ॉन्ट (A++)"
            >
              A++
            </button>
          </div>
        </div>

        {/* Editorial Headline & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="text-[18px] text-slate-600 font-normal leading-relaxed">
            {post.subtitle}
          </p>
        </div>

        {/* Key Takeaways Callout Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>मुख्य बिंदु (Key Editorial Takeaways)</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[18px] font-medium text-amber-950">
              {post.keyTakeaways.map((point, i) => (
                <li key={`takeaway-${i}`} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div
          key={`html-content-${post.id}`}
          className={`prose prose-slate max-w-none ${fontSize === 'xlarge' ? 'text-[22px] leading-[1.9]' : fontSize === 'large' ? 'text-[20px] leading-[1.85]' : 'text-[18px] leading-[1.8]'} space-y-4 text-slate-800 font-normal border-b border-slate-100 pb-8`}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />



        {/* Social Share Bar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold text-slate-700">इस समाचार को शेयर करें:</span>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleShare('whatsapp')}
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              व्हाट्सएप (WhatsApp)
            </button>
            <button
              onClick={() => handleShare('telegram')}
              className="px-3 py-1.5 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              टेलीग्राम (Telegram)
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              X / Twitter
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-800 font-bold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copied ? 'कॉपी हुआ!' : 'लिंक कॉपी करें'}
            </button>
          </div>
        </div>




      </article>

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>संबंधित समाचार व मिलते-जुलते लेख (Related Articles)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rp) => (
              <div
                key={rp.id}
                onClick={() => onSelectRelatedPost(rp)}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-bold">{rp.category}</span>
                    <span>{rp.readTime}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {rp.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 font-normal leading-relaxed">
                    {rp.subtitle || rp.summary}
                  </p>
                </div>

                {rp.tags && rp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {rp.tags.slice(0, 2).map((tag, idx) => (
                      <span key={`rtag-${idx}`} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email Newsletter Subscription Box */}
      <div className="p-6 bg-emerald-900 text-white rounded-3xl shadow-lg border border-emerald-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shrink-0 shadow-xs">
            <Mail className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">दैनिक समाचार और अपडेट्स प्राप्त करें</h3>
            <p className="text-xs text-emerald-200">अपने ईमेल पर सबसे पहले ताज़ा समाचार ब्लॉग और संपादकीय अपडेट्स पाएं।</p>
          </div>
        </div>

        {subSuccess ? (
          <div className="p-3 bg-emerald-800 text-emerald-100 rounded-2xl text-xs font-bold text-center animate-in fade-in">
            ✓ बधाई हो! आप समाचारपल्स न्यूज़ अलर्ट्स के लिए सफलतापूर्वक सब्सक्राइब हो गए हैं।
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              placeholder="अपना ईमेल दर्ज करें (Enter your email)..."
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-emerald-700 bg-emerald-950/80 text-white placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-extrabold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            >
              सब्सक्राइब करें
            </button>
          </form>
        )}
      </div>

      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        item={post}
        type="blog"
      />
    </div>
  );
};
