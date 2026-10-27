import React from 'react';
import {
  Globe,
  MapPin,
  Moon,
  Sun,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenLanguage: () => void;
  onOpenLocation: () => void;
  onOpenAdzan: () => void;
  onNavigateSettings?: () => void;
  currentCity: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLanguage,
  onOpenLocation,
  onOpenAdzan,
  onNavigateSettings,
  currentCity,
  isDarkMode,
  onToggleTheme,
}) => {
  const { language, t } = useLanguage();
  const currentLangOption = LANGUAGE_OPTIONS.find((l) => l.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#02130D]/95 dark:bg-[#02130D]/95 backdrop-blur-xl border-b border-[#2DD4BF]/20 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand & Logo with Squircle Official Icon as seen in mockup */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl p-1 bg-gradient-to-br from-[#073E2B] to-[#021A11] border border-[#2DD4BF]/40 shadow-lg shadow-black/50 flex items-center justify-center overflow-hidden">
              <img
                src="/assets/aistudio/Jay_z_Quran__1__46d9d22c.png"
                alt="Jay’z Qur’an Official Icon"
                className="w-full h-full object-cover transform scale-110"
              />
            </div>
            <div className="absolute -inset-0.5 rounded-2xl bg-[#2DD4BF]/20 -z-10 blur-sm pointer-events-none" />
          </div>

          <div className="text-start min-w-0">
            <h1 className="font-extrabold text-sm sm:text-lg tracking-tight text-white font-cinzel truncate drop-shadow-sm">
              Jay’z Qur’an
            </h1>
            <p className="text-[10px] sm:text-xs text-[#A7F3D0]/80 truncate font-medium hidden xs:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Right Action Controls: Location Pill, Bell with Red Dot, Settings Gear, Language, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Location Pill Button matching reference */}
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#05261B]/90 hover:bg-[#083827] border border-[#2DD4BF]/30 hover:border-[#2DD4BF]/60 text-xs font-semibold text-[#FFFDF5] shadow-sm transition active:scale-95"
            title={t.home.changeLocation}
          >
            <MapPin className="w-3.5 h-3.5 text-[#E9B949] flex-shrink-0" />
            <span className="max-w-[85px] sm:max-w-[120px] truncate">{currentCity} (WIB)</span>
            <ChevronDown className="w-3 h-3 text-[#A7F3D0]/70" />
          </button>

          {/* Adzan / Notification Bell with Red Dot */}
          <button
            onClick={onOpenAdzan}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#05261B]/90 hover:bg-[#083827] border border-[#2DD4BF]/30 hover:border-[#2DD4BF]/60 flex items-center justify-center text-[#E9B949] transition active:scale-95 shadow-sm"
            title={t.home.adzanAction}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-[#02130D]" />
          </button>

          {/* Settings Gear Button */}
          <button
            onClick={onNavigateSettings}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#05261B]/90 hover:bg-[#083827] border border-[#2DD4BF]/30 hover:border-[#2DD4BF]/60 flex items-center justify-center text-[#A7F3D0] hover:text-white transition active:scale-95 shadow-sm"
            title={t.nav.settings}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Compact Language Selector */}
          <button
            onClick={onOpenLanguage}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#05261B]/90 hover:bg-[#083827] border border-[#2DD4BF]/30 text-white text-xs font-bold transition active:scale-95 shadow-sm"
            title={t.settings.appLanguage}
          >
            <Globe className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>{currentLangOption.code.split('-')[0].toUpperCase()}</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-full bg-[#05261B]/90 hover:bg-[#083827] border border-[#2DD4BF]/30 text-[#E9B949] transition active:scale-95 shadow-sm"
            title="Toggle Light / Dark mode"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* In-App PWA Install Button */}
          <div className="hidden lg:block">
            <PWAInstallButton />
          </div>
        </div>
      </div>
    </header>
  );
};

