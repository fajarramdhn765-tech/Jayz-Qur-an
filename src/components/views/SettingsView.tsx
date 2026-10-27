import React from 'react';
import {
  Globe,
  Palette,
  Volume2,
  Sliders,
  Bell,
  ShieldCheck,
  Check,
  Sparkles,
  Smartphone,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LANGUAGE_OPTIONS, TRANSLATION_LANGUAGES } from '../../i18n/translations';
import { QARI_LIST } from '../../services/audioService';
import { AppLanguage, TranslationLanguage } from '../../types';
import { PWAInstallButton } from '../PWAInstallButton';

interface SettingsViewProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  selectedQari: string;
  onSelectQari: (qariId: string) => void;
  arabicFontSize: number;
  onChangeArabicFontSize: (size: number) => void;
  onOpenAdzan: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  onToggleTheme,
  selectedQari,
  onSelectQari,
  arabicFontSize,
  onChangeArabicFontSize,
  onOpenAdzan,
}) => {
  const {
    language,
    setLanguage,
    followDevice,
    setFollowDevice,
    t,
    quranTranslationLang,
    setQuranTranslationLang,
  } = useLanguage();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16 text-start max-w-4xl mx-auto">
      {/* Settings Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#064B32] via-[#08784F] to-[#09251B] text-[#FFFDF5] shadow-xl border border-[#E9B949]/30 islamic-pattern">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#E9B949]/20 text-[#FFF4D6] text-xs font-bold border border-[#E9B949]/40 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />
            Kustomisasi Lengkap
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.settings.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#FFF4D6]/90 max-w-xl">
            {t.settings.subtitle}
          </p>
        </div>
      </div>

      {/* 1. APPLICATION LANGUAGE SECTION (Core Prompt Requirement) */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              {t.settings.appLanguage}
            </h2>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
              {t.settings.appLanguageDesc}
            </p>
          </div>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = !followDevice && language === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => setLanguage(opt.code)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-start ${
                  isSelected
                    ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-2 border-[#08784F] dark:border-[#E9B949]'
                    : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent hover:border-[#DCE5DD]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={opt.label}>
                    {opt.flag}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-[#09251B] dark:text-[#FFFDF5]">
                      {opt.nativeLabel}
                    </p>
                    <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                      {opt.label} ({opt.code}) {opt.isRTL ? '• RTL' : ''}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#064B32] dark:bg-[#E9B949] text-white dark:text-[#09251B] flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Follow Device Language Toggle */}
        <button
          onClick={() => setFollowDevice(!followDevice)}
          className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
            followDevice
              ? 'bg-[#E9B949]/20 border-2 border-[#E9B949]'
              : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent hover:border-[#DCE5DD]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#064B32] text-[#E9B949] flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#09251B] dark:text-[#FFFDF5]">
                {t.settings.followDevice}
              </p>
              <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                Deteksi otomatis bahasa HP/Browser
              </p>
            </div>
          </div>

          {followDevice && (
            <div className="w-6 h-6 rounded-full bg-[#E9B949] text-[#09251B] flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 font-bold" />
            </div>
          )}
        </button>
      </div>

      {/* 2. INDEPENDENT QURAN TRANSLATION LANGUAGE */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              {t.settings.quranTranslation}
            </h2>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
              {t.settings.quranTranslationDesc}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {TRANSLATION_LANGUAGES.map((tl) => {
            const isSelected = quranTranslationLang === tl.code;
            return (
              <button
                key={tl.code}
                onClick={() => setQuranTranslationLang(tl.code as TranslationLanguage)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-start ${
                  isSelected
                    ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-2 border-[#08784F] dark:border-[#E9B949]'
                    : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent hover:border-[#DCE5DD]'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-[#09251B] dark:text-[#FFFDF5]">
                    {tl.label}
                  </p>
                  <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                    Sumber Resmi: {tl.source}
                  </p>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#064B32] dark:bg-[#E9B949] text-white dark:text-[#09251B] flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. THEME & APPEARANCE */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] flex items-center justify-center">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              {t.settings.appearance}
            </h2>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
              Warna resmi Emerald & Gold dan latar Warm Ivory / Forest Dark
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              if (isDarkMode) onToggleTheme();
            }}
            className={`p-4 rounded-2xl border text-start transition ${
              !isDarkMode
                ? 'bg-[#FFF4D6] border-2 border-[#064B32] shadow-sm'
                : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-[#DCE5DD] mb-2 flex items-center justify-center text-[#064B32]">
              ☀️
            </div>
            <p className="font-bold text-sm text-[#09251B]">
              {t.settings.themeLight}
            </p>
            <p className="text-xs text-[#52665B]">Warm Ivory & Emerald</p>
          </button>

          <button
            onClick={() => {
              if (!isDarkMode) onToggleTheme();
            }}
            className={`p-4 rounded-2xl border text-start transition ${
              isDarkMode
                ? 'bg-[#08784F]/30 border-2 border-[#E9B949] shadow-sm'
                : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#09251B] border border-[#1E4E3B] mb-2 flex items-center justify-center text-[#E9B949]">
              🌙
            </div>
            <p className="font-bold text-sm text-[#09251B] dark:text-[#FFFDF5]">
              {t.settings.themeDark}
            </p>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">Forest Dark & Royal Gold</p>
          </button>
        </div>
      </div>

      {/* 4. AUDIO & QARI SELECTION */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              {t.settings.quranAudio}
            </h2>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
              Pilih qari murottal resmi dengan audio kualitas tinggi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {QARI_LIST.map((q) => {
            const isSelected = selectedQari === q.id;
            return (
              <button
                key={q.id}
                onClick={() => onSelectQari(q.id)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-start ${
                  isSelected
                    ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-2 border-[#08784F] dark:border-[#E9B949]'
                    : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent hover:border-[#DCE5DD]'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-[#09251B] dark:text-[#FFFDF5]">
                    {q.name}
                  </p>
                  <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                    {q.subname} • {q.bitrate}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#064B32] dark:bg-[#E9B949] text-white dark:text-[#09251B] flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ARABIC FONT SIZE ADJUSTMENT */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              {t.settings.readingExperience}
            </h2>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
              Sesuaikan kenyamanan ukuran teks khat Al-Qur'an
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#52665B] dark:text-[#A3BAAD]">
              {t.settings.arabicFontSize}: {arabicFontSize}px
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onChangeArabicFontSize(Math.max(22, arabicFontSize - 2))}
                className="px-3 py-1 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-xs font-bold hover:bg-[#FFF4D6]"
              >
                Kecilkan (-)
              </button>
              <button
                onClick={() => onChangeArabicFontSize(Math.min(48, arabicFontSize + 2))}
                className="px-3 py-1 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold"
              >
                Besarkan (+)
              </button>
            </div>
          </div>

          <input
            type="range"
            min={22}
            max={48}
            step={2}
            value={arabicFontSize}
            onChange={(e) => onChangeArabicFontSize(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#F5F7F2] dark:bg-[#09251B] rounded-lg appearance-none cursor-pointer accent-[#08784F] dark:accent-[#E9B949]"
          />

          {/* Live Preview Box */}
          <div className="p-6 rounded-2xl bg-[#FFFDF5] dark:bg-[#09251B] border border-[#DCE5DD] dark:border-[#1E4E3B] text-center">
            <p className="text-xs font-bold text-[#52665B] dark:text-[#A3BAAD] mb-2 uppercase">
              Pratinjau Huruf:
            </p>
            <p
              dir="rtl"
              className="font-arabic text-[#064B32] dark:text-[#E9B949] leading-loose"
              style={{ fontSize: `${arabicFontSize}px` }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>
      </div>

      {/* 6. PWA INSTALL & APP ABOUT */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
                {t.settings.about}
              </h2>
              <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                {t.settings.version}
              </p>
            </div>
          </div>
          <PWAInstallButton />
        </div>

        <p className="text-xs sm:text-sm text-[#52665B] dark:text-[#A3BAAD] leading-relaxed">
          {t.settings.developedForUmmah}
        </p>

        <div className="p-4 rounded-2xl bg-[#F5F7F2] dark:bg-[#133D2E] text-xs text-[#52665B] dark:text-[#A3BAAD] space-y-1.5">
          <p><strong>Brand:</strong> Jay’z Qur’an</p>
          <p><strong>Tagline:</strong> “Dekat dengan Al-Qur’an, Setiap Waktu”</p>
          <p><strong>Rasm:</strong> Utsmani Standar Madinah & Kemenag RI</p>
          <p><strong>Akurasi Salat:</strong> Hisab Astronomis Solar Zenith Formula</p>
        </div>
      </div>
    </div>
  );
};
