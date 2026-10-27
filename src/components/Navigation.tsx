import React from 'react';
import {
  Home,
  BookOpen,
  Clock,
  Bookmark,
  User,
  Settings,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export type NavTab = 'home' | 'quran' | 'prayers' | 'calendar' | 'bookmarks' | 'settings';

interface NavigationProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop Horizontal Sub-Navigation Tab Bar */}
      <nav className="hidden md:block w-full bg-[#02140D]/90 backdrop-blur-md border-b border-[#2DD4BF]/20 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 py-2">
            {[
              { id: 'home' as NavTab, label: t.nav.home, icon: <Home className="w-4 h-4" /> },
              { id: 'quran' as NavTab, label: t.nav.quran, icon: <BookOpen className="w-4 h-4" /> },
              { id: 'prayers' as NavTab, label: t.nav.prayerTimes, icon: <Clock className="w-4 h-4" /> },
              { id: 'bookmarks' as NavTab, label: t.nav.bookmarks, icon: <Bookmark className="w-4 h-4" /> },
              { id: 'settings' as NavTab, label: t.nav.settings, icon: <Settings className="w-4 h-4" /> },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#073F2B] to-[#04281B] text-white shadow-md border-b-2 border-[#2DD4BF]'
                      : 'text-[#A7F3D0]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={isActive ? 'text-[#2DD4BF]' : ''}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#A7F3D0]/80">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
            <span className="font-medium">Kemenag RI & Uthmanic Canonical Verified</span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Curved Dock with Elevated Center Floating Button matching Mockup */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#02130D]/95 backdrop-blur-xl border-t border-[#2DD4BF]/20 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.7)]">
        <div className="relative flex items-center justify-around h-16 px-2">
          {/* 1. Beranda */}
          <button
            onClick={() => onSelectTab('home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
              activeTab === 'home' ? 'text-[#2DD4BF]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <Home className="w-5 h-5" />
              {activeTab === 'home' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] mt-1" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight">Beranda</span>
          </button>

          {/* 2. Al-Qur'an */}
          <button
            onClick={() => onSelectTab('quran')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
              activeTab === 'quran' ? 'text-[#2DD4BF]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <BookOpen className="w-5 h-5" />
              {activeTab === 'quran' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] mt-1" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight">Al-Qur'an</span>
          </button>

          {/* 3. CENTER ELEVATED CIRCULAR QURAN MEDALLION BUTTON */}
          <div className="relative flex-1 flex justify-center -mt-6">
            <button
              onClick={() => onSelectTab('quran')}
              className="group relative w-14 h-14 rounded-full p-1 bg-gradient-to-b from-[#0B5C3D] to-[#021A11] border-2 border-[#2DD4BF] shadow-[0_0_20px_rgba(45,212,191,0.55)] flex items-center justify-center active:scale-90 transition-all duration-300"
              title="Baca Al-Qur'an"
            >
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#063323]">
                <img
                  src="/assets/aistudio/Jay_z_Quran__1__46d9d22c.png"
                  alt="Al-Qur'an"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="absolute -inset-1 rounded-full bg-[#2DD4BF]/20 -z-10 blur-sm pointer-events-none" />
            </button>
          </div>

          {/* 4. Jadwal Shalat */}
          <button
            onClick={() => onSelectTab('prayers')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
              activeTab === 'prayers' ? 'text-[#2DD4BF]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <Clock className="w-5 h-5" />
              {activeTab === 'prayers' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] mt-1" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight">Jadwal</span>
          </button>

          {/* 5. Bookmark */}
          <button
            onClick={() => onSelectTab('bookmarks')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
              activeTab === 'bookmarks' ? 'text-[#2DD4BF]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <Bookmark className="w-5 h-5" />
              {activeTab === 'bookmarks' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] mt-1" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight">Bookmark</span>
          </button>

          {/* 6. Profil / Pengaturan */}
          <button
            onClick={() => onSelectTab('settings')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 ${
              activeTab === 'settings' ? 'text-[#2DD4BF]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <div className="relative flex flex-col items-center">
              <User className="w-5 h-5" />
              {activeTab === 'settings' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF] mt-1" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight">Profil</span>
          </button>
        </div>
      </nav>
    </>
  );
};

