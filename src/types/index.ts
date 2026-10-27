export type AppLanguage = 'id-ID' | 'en-US' | 'ar' | 'ms-MY' | 'ur' | 'tr-TR';

export type TranslationLanguage = 'id' | 'en' | 'ms' | 'ur' | 'tr' | 'ar_tafsir';

export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameTransliteration: string;
  nameTranslation: Record<AppLanguage, string>;
  numberOfVerses: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationOrder: number;
  juzStart: number;
  pageNumber: number;
}

export interface Ayah {
  numberInSurah: number;
  numberInQuran: number;
  juz: number;
  page: number;
  textArabic: string;
  textLatin: string;
  translations: {
    id: string;
    en: string;
    ms: string;
    ur: string;
    tr: string;
    ar_tafsir?: string;
  };
  tafsir?: {
    kemenag?: string;
    jalalayn?: string;
  };
  audioUrl?: string;
}

export interface SurahDetail extends SurahMeta {
  bismillah?: {
    textArabic: string;
    textLatin: string;
    translation: Record<AppLanguage, string>;
  };
  verses: Ayah[];
}

export interface NextPrayerInfo {
  name: 'imsak' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  timeStr: string;
  remainingSeconds: number;
  remainingFormatted: string;
  progressPercent: number;
}

export interface PrayerTimesData {
  imsak: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  dateGregorian: string;
  dateHijri: {
    day: number;
    monthName: string;
    monthArabic: string;
    year: number;
    formatted: string;
  };
  timezone: string;
  locationName: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface BookmarkItem {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  textArabic: string;
  translation: string;
  category: 'favorite' | 'daily' | 'memorization' | 'general';
  createdAt: number;
}

export interface ReadingHistoryItem {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

export interface AudioPlaybackState {
  isPlaying: boolean;
  surahNumber: number | null;
  ayahNumber: number | null;
  surahName: string;
  qariId: string;
  playbackRate: number;
  currentTime: number;
  duration: number;
}

export interface QariOption {
  id: string;
  name: string;
  subname: string;
  bitrate: string;
}
