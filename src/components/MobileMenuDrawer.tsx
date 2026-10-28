import React from 'react';
import {
  X,
  Newspaper,
  ChevronRight,
} from 'lucide-react';
import { JobCategory } from '../types';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'blogs' | 'results' | 'eligibility' | 'chat';
  setActiveTab: (tab: 'blogs' | 'results' | 'eligibility' | 'chat') => void;
  onSelectSectorFilter?: (sector: JobCategory) => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (tab: 'blogs' | 'results' | 'eligibility' | 'chat') => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-start">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xs h-full shadow-2xl flex flex-col border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
        {/* Menu Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
              S
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block">
                समाचार<span className="text-emerald-400">पल्स</span> मेनू
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">समाचार ब्लॉग व अपडेट पोर्टल</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-5 text-xs font-bold text-slate-700 dark:text-slate-200">
          {/* Main Sections */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 px-2">
              मुख्य अनुभाग (Main Sections)
            </span>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigate('blogs')}
                className="w-full p-2.5 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-extrabold"
              >
                <div className="flex items-center gap-2.5">
                  <Newspaper className="w-4 h-4 text-emerald-600" />
                  <span>समाचार व ब्लॉग फ़ीड</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 text-slate-400 text-xs border-t border-slate-800 text-center font-medium">
          <p>© 2026 समाचारपल्स (SamacharPulse)</p>
        </div>
      </div>
    </div>
  );
};
