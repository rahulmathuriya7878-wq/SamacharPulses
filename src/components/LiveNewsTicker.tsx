import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { Radio, RefreshCw, ChevronRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface LiveNewsTickerProps {
  newsItems: NewsItem[];
  onRefresh?: () => void;
}

export const LiveNewsTicker: React.FC<LiveNewsTickerProps> = ({ newsItems, onRefresh }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(
    new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Auto rotate ticker items every 6 seconds
  useEffect(() => {
    if (!newsItems || newsItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [newsItems]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 800);
  };

  if (!newsItems || newsItems.length === 0) return null;

  const currentItem = newsItems[currentIndex] || newsItems[0];

  return (
    <>
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-2xl p-3.5 sm:p-4 shadow-xl border border-emerald-500/30 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          
          {/* Ticker Header / Live Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <Radio className="w-4 h-4 text-white" />
              <span>ताज़ा लाइव बुलेटिन</span>
            </div>

            <div className="text-[11px] text-slate-300 hidden sm:block font-medium">
              अपडेट: <span className="text-emerald-400 font-bold">{lastRefreshed}</span>
            </div>
          </div>

          {/* Cycling Ticker Content */}
          <div className="flex-1 min-w-0 cursor-pointer group" onClick={() => setSelectedNews(currentItem)}>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-emerald-300 truncate">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase shrink-0">
                {currentItem.category}
              </span>
              <span className="truncate">{currentItem.title}</span>
              <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-bold inline-flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              title="रीफ्रेश लाइव फीड"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">रीफ्रेश</span>
            </button>
          </div>
        </div>
      </div>

      {/* Breaking News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
                  {selectedNews.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {new Date(selectedNews.publishedAt).toLocaleString('hi-IN')}
                </span>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {selectedNews.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedNews.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>स्रोत: {selectedNews.source}</span>
              </div>

              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
