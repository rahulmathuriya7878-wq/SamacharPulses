import React, { useState } from 'react';
import { X, Search, BookOpen, ExternalLink, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  blogs: BlogPost[];
  onSelectBlog: (blog: BlogPost) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  blogs,
  onSelectBlog,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredBlogs = blogs.filter((blog) => {
    if (!q) return true;
    return (
      blog.title.toLowerCase().includes(q) ||
      blog.subtitle.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q) ||
      blog.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 overflow-hidden">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          </div>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="समाचार, देश, विदेश, राजनीतिक विश्लेषण खोजें..."
            className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
            >
              साफ करें
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Count Header */}
        <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>समाचार व ब्लॉग परिणाम ({filteredBlogs.length})</span>
          {q && <span>खोज: &quot;{query}&quot;</span>}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">कोई समाचार नहीं मिला</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                कृपया अपनी खोजशब्द (Keyword) बदलें या अन्य समाचार श्रेणी चुनें।
              </p>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(q)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google पर खोजें</span>
              </a>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={`search-blog-${blog.id}`}
                onClick={() => {
                  onSelectBlog(blog);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase">
                      {blog.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {blog.readTime}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 font-normal">
                    {blog.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 self-end sm:self-center">
                  <span>पढ़ें</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
