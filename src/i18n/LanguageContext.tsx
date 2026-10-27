import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { AppLanguage, TranslationLanguage } from '../types';
import { translations, TranslationDictionary, LANGUAGE_OPTIONS } from './translations';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  followDevice: boolean;
  setFollowDevice: (follow: boolean) => void;
  t: TranslationDictionary;
  isRTL: boolean;
  quranTranslationLang: TranslationLanguage;
  setQuranTranslationLang: (lang: TranslationLanguage) => void;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
}

const STORAGE_LANG_KEY = 'jayz_quran_app_language';
const STORAGE_FOLLOW_DEVICE_KEY = 'jayz_quran_follow_device';
const STORAGE_QURAN_TRANSLATION_KEY = 'jayz_quran_translation_lang';

function detectBestLanguage(): AppLanguage {
  if (typeof navigator === 'undefined') return 'id-ID';
  const browserLangs = navigator.languages || [navigator.language];
  for (const bl of browserLangs) {
    const lower = bl.toLowerCase();
    if (lower.startsWith('id')) return 'id-ID';
    if (lower.startsWith('en')) return 'en-US';
    if (lower.startsWith('ar')) return 'ar';
    if (lower.startsWith('ms')) return 'ms-MY';
    if (lower.startsWith('ur')) return 'ur';
    if (lower.startsWith('tr')) return 'tr-TR';
  }
  return 'id-ID'; // Default fallback specified in prompt
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [followDevice, setFollowDeviceState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_FOLLOW_DEVICE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const storedFollow = localStorage.getItem(STORAGE_FOLLOW_DEVICE_KEY) === 'true';
      if (storedFollow) {
        return detectBestLanguage();
      }
      const stored = localStorage.getItem(STORAGE_LANG_KEY) as AppLanguage;
      if (stored && translations[stored]) {
        return stored;
      }
      return detectBestLanguage();
    } catch {
      return 'id-ID';
    }
  });

  const [quranTranslationLang, setQuranTranslationLangState] = useState<TranslationLanguage>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_QURAN_TRANSLATION_KEY) as TranslationLanguage;
      if (stored) return stored;
      // Default to match initial app language if possible
      const initial = detectBestLanguage();
      if (initial === 'en-US') return 'en';
      if (initial === 'ms-MY') return 'ms';
      if (initial === 'ur') return 'ur';
      if (initial === 'tr-TR') return 'tr';
      if (initial === 'ar') return 'ar_tafsir';
      return 'id';
    } catch {
      return 'id';
    }
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    setFollowDeviceState(false);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
      localStorage.setItem(STORAGE_FOLLOW_DEVICE_KEY, 'false');
    } catch (e) {
      console.warn('Could not persist language preference:', e);
    }
  };

  const setFollowDevice = (follow: boolean) => {
    setFollowDeviceState(follow);
    try {
      localStorage.setItem(STORAGE_FOLLOW_DEVICE_KEY, follow ? 'true' : 'false');
      if (follow) {
        const detected = detectBestLanguage();
        setLanguageState(detected);
        localStorage.setItem(STORAGE_LANG_KEY, detected);
      }
    } catch (e) {
      console.warn('Could not persist follow device preference:', e);
    }
  };

  const setQuranTranslationLang = (lang: TranslationLanguage) => {
    setQuranTranslationLangState(lang);
    try {
      localStorage.setItem(STORAGE_QURAN_TRANSLATION_KEY, lang);
    } catch (e) {
      console.warn('Could not persist quran translation language:', e);
    }
  };

  // Synchronize across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_LANG_KEY && e.newValue && translations[e.newValue as AppLanguage]) {
        setLanguageState(e.newValue as AppLanguage);
      }
      if (e.key === STORAGE_FOLLOW_DEVICE_KEY) {
        setFollowDeviceState(e.newValue === 'true');
      }
      if (e.key === STORAGE_QURAN_TRANSLATION_KEY && e.newValue) {
        setQuranTranslationLangState(e.newValue as TranslationLanguage);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update HTML tag dir and lang attributes dynamically
  const isRTL = useMemo(() => {
    const opt = LANGUAGE_OPTIONS.find((l) => l.code === language);
    return opt?.isRTL || false;
  }, [language]);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = isRTL ? 'rtl' : 'ltr';
    if (isRTL) {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [language, isRTL]);

  const t = useMemo(() => {
    return translations[language] || translations['id-ID'];
  }, [language]);

  const formatDate = (date: Date): string => {
    try {
      return new Intl.DateTimeFormat(language, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch {
      return date.toLocaleDateString();
    }
  };

  const formatTime = (date: Date): string => {
    try {
      return new Intl.DateTimeFormat(language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(date);
    } catch {
      return date.toLocaleTimeString();
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        followDevice,
        setFollowDevice,
        t,
        isRTL,
        quranTranslationLang,
        setQuranTranslationLang,
        formatDate,
        formatTime,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
