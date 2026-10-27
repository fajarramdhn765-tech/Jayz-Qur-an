import React, { useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../i18n/LanguageContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, show small status indicator or hide
  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#064B32]/10 dark:bg-[#E9B949]/10 text-xs font-medium text-[#064B32] dark:text-[#E9B949] border border-[#064B32]/20 dark:border-[#E9B949]/30">
        <Check className="w-3.5 h-3.5" />
        <span>{t.settings.pwaInstalled}</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#064B32] to-[#08784F] hover:from-[#08784F] hover:to-[#064B32] text-[#FFFDF5] px-3.5 py-1.5 text-xs font-semibold shadow-md transition-all active:scale-95 border border-[#E9B949]/40"
        title={t.settings.pwaInstall}
      >
        <Download className="w-3.5 h-3.5 text-[#E9B949]" />
        <span className="hidden md:inline">{t.settings.pwaInstall}</span>
        <span className="md:hidden">App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-xl bg-[#FFFDF5] dark:bg-[#0E3326] border border-[#064B32]/30 dark:border-[#E9B949]/40 text-[#064B32] dark:text-[#E9B949] px-3 py-1.5 text-xs font-medium hover:bg-[#FFF4D6] dark:hover:bg-[#133D2E] transition-all"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Install iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#0E3326] p-6 shadow-2xl border border-[#E9B949]/30 text-start">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
                <h3 className="font-semibold text-base text-[#09251B] dark:text-[#FFFDF5] flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#E9B949]" />
                  Pasang di iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-[#52665B] dark:text-[#A3BAAD]">
                <p className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#064B32] text-[#FFFDF5] flex items-center justify-center text-xs font-bold">1</span>
                  <span>Buka menu <strong>Bagikan / Share</strong> di bilah bawah browser Safari.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#064B32] text-[#FFFDF5] flex items-center justify-center text-xs font-bold">2</span>
                  <span>Gulir ke bawah dan pilih <strong>Tambahkan ke Layar Utama (Add to Home Screen)</strong>.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#064B32] text-[#FFFDF5] flex items-center justify-center text-xs font-bold">3</span>
                  <span>Tekan <strong>Tambah (Add)</strong> di pojok kanan atas untuk menyelesaikan.</span>
                </p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[#064B32] hover:bg-[#08784F] text-[#FFFDF5] py-2.5 text-sm font-semibold transition"
              >
                {t.common.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
