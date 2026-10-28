import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  ChevronDown,
  Sun,
  Moon,
  Download,
  Github,
} from 'lucide-react';
import { JobCategory } from '../types';

interface HeaderProps {
  activeTab: 'blogs' | 'results' | 'eligibility' | 'chat';
  setActiveTab: (tab: 'blogs' | 'results' | 'eligibility' | 'chat') => void;
  onOpenMobileMenu: () => void;
  onSelectSectorFilter?: (sector: JobCategory) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const SECTORS: { name: JobCategory; icon: string; hindiName: string }[] = [
  { name: 'UPSC', icon: '🏛️', hindiName: 'संघ लोक सेवा आयोग' },
  { name: 'SSC', icon: '💼', hindiName: 'कर्मचारी चयन आयोग' },
  { name: 'Banking', icon: '🏦', hindiName: 'बैंकिंग व आईबीपीएस' },
  { name: 'Railways', icon: '🚆', hindiName: 'भारतीय रेलवे (RRB)' },
  { name: 'Defense', icon: '🪖', hindiName: 'रक्षा व सेना' },
  { name: 'State PSC', icon: '📍', hindiName: 'राज्य लोक सेवा आयोग' },
  { name: 'Teaching', icon: '📚', hindiName: 'शिक्षक भर्ती (CTET/KVS)' },
  { name: 'PSU', icon: '⚡', hindiName: 'सरकारी उपक्रम (ISRO/GATE)' },
  { name: 'Medical', icon: '🏥', hindiName: 'चिकित्सा व AIIMS' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu,
  onSelectSectorFilter,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Main Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-2 sm:px-3 h-16 flex items-center justify-between gap-3">
        {/* Left: Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            aria-label="नेविगेशन मेनू खोलें"
            title="मुख्य मेनू"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className="flex items-center gap-2 text-left cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-xs group-hover:bg-emerald-700 transition-colors">
              S
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              समाचार<span className="text-emerald-600">पल्स</span>
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
          <button
            onClick={() => setActiveTab('blogs')}
            className="px-3 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 font-extrabold"
          >
            समाचार व ब्लॉग फ़ीड
          </button>

          {/* Mega Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSectorDropdownOpen(!isSectorDropdownOpen)}
              onMouseEnter={() => setIsSectorDropdownOpen(true)}
              className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1 font-bold"
            >
              <span>सरकारी विभाग</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isSectorDropdownOpen && (
              <div
                onMouseLeave={() => setIsSectorDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 grid grid-cols-3 gap-2 animate-in fade-in duration-150"
              >
                {SECTORS.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => {
                      setIsSectorDropdownOpen(false);
                      if (onSelectSectorFilter) onSelectSectorFilter(s.name);
                      setActiveTab('blogs');
                    }}
                    className="p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 border border-slate-100 dark:border-slate-800 text-center transition-colors cursor-pointer space-y-1"
                  >
                    <span className="text-base block">{s.icon}</span>
                    <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 block truncate">{s.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/samacharpulse-source.zip"
            download="samacharpulse-source.zip"
            className="p-2 sm:px-3 py-2 rounded-xl text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 font-extrabold text-xs shadow-xs"
            title="पूरा कोड ZIP फ़ाइल डाउनलोड करें"
          >
            <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">कोड डाउनलोड (ZIP)</span>
          </a>

          <a
            href="https://github.com/rahulmath1911-bit/SamacharPulse"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 font-extrabold text-xs shadow-xs"
            title="GitHub Repository (rahulmath1911-bit/SamacharPulse)"
          >
            <Github className="w-4 h-4 text-slate-800 dark:text-slate-100" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            aria-label="थीम बदलें"
            title={isDarkMode ? "लाइट मोड पर स्विच करें" : "डार्क मोड पर स्विच करें"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
