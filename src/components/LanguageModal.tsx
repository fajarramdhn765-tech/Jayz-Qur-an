import React, { useState } from 'react';
import { X, Check, Globe, Search } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import { AppLanguage } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, followDevice, setFollowDevice, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredOptions = LANGUAGE_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opt.nativeLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opt.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLanguage = (code: AppLanguage) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0E3326] shadow-2xl border border-[#E9B949]/30 overflow-hidden text-start">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#064B32] to-[#08784F] text-[#FFFDF5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[#E9B949]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide">{t.settings.appLanguage}</h2>
              <p className="text-xs text-[#FFF4D6]/80">{t.settings.appLanguageDesc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#DCE5DD] dark:border-[#1E4E3B] bg-[#F5F7F2]/50 dark:bg-[#133D2E]/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute start-3 top-3 text-[#52665B] dark:text-[#A3BAAD]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.common.search}
              className="w-full ps-9 pe-4 py-2 text-sm rounded-xl bg-white dark:bg-[#09251B] border border-[#DCE5DD] dark:border-[#1E4E3B] text-[#09251B] dark:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#08784F]"
            />
          </div>
        </div>

        {/* Options List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-1.5">
          {filteredOptions.map((opt) => {
            const isSelected = !followDevice && language === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => handleSelectLanguage(opt.code)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-2 border-[#08784F] dark:border-[#E9B949]'
                    : 'hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={opt.label}>
                    {opt.flag}
                  </span>
                  <div className="text-start">
                    <p className="text-sm font-semibold text-[#09251B] dark:text-[#FFFDF5]">
                      {opt.nativeLabel}
                    </p>
                    <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                      {opt.label} ({opt.code}) {opt.isRTL ? '• RTL' : ''}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#064B32] dark:bg-[#E9B949] text-white dark:text-[#09251B] flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}

          {/* Follow Device Toggle */}
          <div className="pt-2 border-t border-[#DCE5DD] dark:border-[#1E4E3B] mt-2">
            <button
              onClick={() => {
                setFollowDevice(!followDevice);
                if (!followDevice) onClose();
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                followDevice
                  ? 'bg-[#E9B949]/20 border-2 border-[#E9B949]'
                  : 'hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E]'
              }`}
            >
              <div className="flex items-center gap-3 text-start">
                <div className="w-8 h-8 rounded-lg bg-[#064B32]/10 dark:bg-white/10 flex items-center justify-center text-[#064B32] dark:text-[#E9B949]">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#09251B] dark:text-[#FFFDF5]">
                    {t.settings.followDevice}
                  </p>
                  <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                    Otomatis sesuaikan dengan bahasa HP/Browser
                  </p>
                </div>
              </div>

              {followDevice && (
                <div className="w-6 h-6 rounded-full bg-[#E9B949] text-[#09251B] flex items-center justify-center shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F7F2] dark:bg-[#133D2E] border-t border-[#DCE5DD] dark:border-[#1E4E3B] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-[#FFFDF5] text-xs font-semibold transition"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
