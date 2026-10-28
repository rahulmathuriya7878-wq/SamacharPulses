import React, { useState, useEffect } from 'react';
import { X, FileText, Lock, Scale } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'privacy';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-extrabold text-base text-white">Legal & General Policies (नियम व नीतियाँ)</h3>
              <p className="text-xs text-slate-400">नियम व शर्तें एवं गोपनीयता नीति</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Header */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-emerald-600 text-emerald-700 bg-white font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>नियम व शर्तें</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-700 bg-white font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>गोपनीयता नीति</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed font-normal">
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">नियम व शर्तें (Terms of Use)</h4>
              <p>
                समाचारपल्स (SamacharPulse) न्यूज़ ब्लॉग और पोर्टल का उपयोग करते समय आप निम्नलिखित संपादकीय नियमों और शर्तों से सहमत होते हैं:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">1. केवल सूचनात्मक एवं शैक्षणिक उद्देश्य (Informational Purpose Only)</h5>
                  <p className="text-slate-600 text-xs">
                    इस साइट की सामग्री सामान्य मार्गदर्शन, करेंट अफेयर्स और करियर संबंधी जानकारी के लिए प्रदान की जाती है।
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">2. पाठक टिप्पणियाँ और चर्चा नियम (Discussion Rules)</h5>
                  <p className="text-slate-600 text-xs">
                    टिप्पणी अनुभाग का उपयोग करने वाले पाठक स्पैम, आपत्तिजनक भाषा या असत्यापित अफवाहें पोस्ट न करने के लिए सहमत हैं।
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">3. बौद्धिक संपदा (Intellectual Property)</h5>
                  <p className="text-slate-600 text-xs">
                    सभी मूल ब्लॉग लेख, संपादकीय विश्लेषण और एआई सारांश विवरण संपादकीय कॉपीराइट द्वारा सुरक्षित हैं।
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">गोपनीयता नीति (Privacy Policy)</h4>
              <p>
                समाचारपल्स पाठक डेटा गोपनीयता का सम्मान करने के लिए प्रतिबद्ध है। यहां बताया गया है कि आपके डेटा को कैसे संभाला जाता है:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">1. स्थानीय उपकरण भंडारण (Local Device Storage)</h5>
                  <p className="text-slate-600 text-xs">
                    आपकी पसंदीदा सेटिंग्स आपके ब्राउज़र डिवाइस पर LocalStorage का उपयोग करके स्थानीय रूप से सहेजी जाती हैं। हम आपकी व्यक्तिगत ब्राउजिंग हिस्ट्री को ट्रैक नहीं करते हैं।
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">2. बाह्य वेब लिंक्स (External Links)</h5>
                  <p className="text-slate-600 text-xs">
                    पोर्टल पर दिए गए आधिकारिक वेबसाइट लिंक्स केवल पाठकों की सुगमता हेतु उपलब्ध कराए गए हैं।
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            समझ लिया (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
