import React, { useState } from 'react';
import { X, Twitter, Facebook, Instagram, Send, Check, Copy, ExternalLink, Globe, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BlogPost | null;
  type?: 'blog';
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [activeTab, setActiveTab] = useState<'social' | 'instagram' | 'govt_portal'>('social');

  if (!isOpen || !item) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = item.title;
  const officialUrl = item.officialWebsite?.url || item.officialUrl || 'https://india.gov.in';

  // Social Share Constructs
  const shareText = `📰 *${title}*\n\n👉 समाचारपल्स न्यूज़ ब्लॉग पर विस्तृत रिपोर्ट पढ़ें:`;

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(`${shareText}\n${currentUrl}`);

  // Social URLs with post heading (title)
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`📰 ${title}`)}&url=${encodedUrl}&hashtags=SamacharPulse,News,CurrentAffairs`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(`📰 ${title}`)}`;

  const instagramCaption = `📰 समाचारपल्स न्यूज़ अपडेट 2026 📰\n\n${title}\n\n👉 बायो में दिए गए लिंक से संपूर्ण रिपोर्ट पढ़ें!\n\n#SamacharPulse #NewsUpdate #DailyNews #CurrentAffairs`;

  const handleCopyCaption = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(instagramCaption);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">समाचार शेयर करें</h3>
              <p className="text-xs text-slate-500 font-medium">WhatsApp, Telegram, X & Instagram</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
              activeTab === 'social'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            सोशल नेटवर्क (Share)
          </button>
          <button
            onClick={() => setActiveTab('instagram')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
              activeTab === 'instagram'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            इंस्टाग्राम (Caption)
          </button>
          <button
            onClick={() => setActiveTab('govt_portal')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
              activeTab === 'govt_portal'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            पोर्टल लिंक
          </button>
        </div>

        {/* Tab 1: 1-Click Social Sharing */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-500 block mb-1">समाचार शीर्षक:</span>
              <p className="font-extrabold text-slate-900 dark:text-white line-clamp-2">{title}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <span>व्हाट्सएप (WhatsApp)</span>
              </a>

              <a
                href={telegramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>टेलीग्राम (Telegram)</span>
              </a>

              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-slate-950 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Twitter className="w-4 h-4" />
                <span>X / Twitter</span>
              </a>

              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Facebook className="w-4 h-4" />
                <span>फेसबुक (Facebook)</span>
              </a>
            </div>

            {/* Direct Link Copy Button */}
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <input
                readOnly
                type="text"
                value={currentUrl}
                className="flex-1 bg-transparent text-xs text-slate-600 dark:text-slate-300 font-mono px-2 focus:outline-none truncate"
              />
              <button
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(currentUrl);
                    setCopiedText(true);
                    setTimeout(() => setCopiedText(false), 2000);
                  }
                }}
                className="px-3 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>कॉपी हुआ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>लिंक कॉपी</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Instagram Caption Generator */}
        {activeTab === 'instagram' && (
          <div className="space-y-4">
            <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-2xl border border-pink-200 dark:border-pink-900 text-xs text-pink-900 dark:text-pink-300 space-y-1">
              <span className="font-extrabold flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>इंस्टाग्राम पोस्ट व स्टोरी कैप्शन</span>
              </span>
              <p className="text-[11px] text-pink-800 dark:text-pink-400">
                नीचे दिया गया टेक्स्ट कॉपी करके अपनी इंस्टाग्राम पोस्ट या स्टोरी के कैप्शन में पेस्ट करें।
              </p>
            </div>

            <div className="relative">
              <textarea
                readOnly
                rows={5}
                value={instagramCaption}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
              />
              <button
                onClick={handleCopyCaption}
                className="absolute top-2.5 right-2.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
              >
                {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'कॉपी हुआ!' : 'कैप्शन कॉपी'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Official Govt Portal Links */}
        {activeTab === 'govt_portal' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-extrabold text-emerald-900 dark:text-emerald-300">
                <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>आधिकारिक स्रोत व संदर्भ</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                तथ्यों के सत्यापन हेतु आधिकारिक वेबसाइट पर सीधे जाएं:
              </p>
            </div>

            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 flex items-center justify-between transition-all bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">आधिकारिक पोर्टल</span>
                  <span className="text-[11px] text-slate-400 block truncate max-w-xs">{officialUrl}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
