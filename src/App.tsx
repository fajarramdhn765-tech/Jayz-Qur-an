import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { LanguageModal } from './components/LanguageModal';
import { LocationModal } from './components/LocationModal';
import { AdzanModal } from './components/AdzanModal';
import { QiblaModal } from './components/QiblaModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { HomeView } from './components/views/HomeView';
import { QuranView } from './components/views/QuranView';
import { PrayersView } from './components/views/PrayersView';
import { CalendarView } from './components/views/CalendarView';
import { BookmarksView } from './components/views/BookmarksView';
import { SettingsView } from './components/views/SettingsView';
import {
  PRESET_LOCATIONS,
  LocationPreset,
  calculateAstronomicalTimes,
  getNextPrayer,
} from './services/prayerService';
import { getAyahAudioUrl, stopAdzanSound } from './services/audioService';
import { Ayah, BookmarkItem, ReadingHistoryItem } from './types';
import { SURAH_METADATA } from './data/quranMetadata';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { WifiOff, Check } from 'lucide-react';

const STORAGE_THEME_KEY = 'jayz_quran_theme';
const STORAGE_LOCATION_KEY = 'jayz_quran_location';
const STORAGE_METHOD_KEY = 'jayz_quran_method';
const STORAGE_QARI_KEY = 'jayz_quran_qari';
const STORAGE_FONT_SIZE_KEY = 'jayz_quran_arabic_font_size';
const STORAGE_BOOKMARKS_KEY = 'jayz_quran_bookmarks';
const STORAGE_HISTORY_KEY = 'jayz_quran_last_read';
const STORAGE_KHATAM_KEY = 'jayz_quran_khatam_today';
const STORAGE_SOUND_KEY = 'jayz_quran_adzan_sound';
const STORAGE_ALARMS_KEY = 'jayz_quran_prayer_alarms';

function MainApp() {
  const { t } = useLanguage();
  const isOnline = useOnlineStatus();

  // Tab State
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_THEME_KEY);
      if (stored !== null) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_THEME_KEY, isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);

  // Location & Prayer Method State
  const [location, setLocation] = useState<LocationPreset>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_LOCATION_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return PRESET_LOCATIONS[0]; // Jakarta default
  });

  const [method, setMethod] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_METHOD_KEY);
      if (stored) return stored;
    } catch {}
    return 'KEMENAG';
  });

  const handleSelectLocation = (newLoc: LocationPreset) => {
    setLocation(newLoc);
    try {
      localStorage.setItem(STORAGE_LOCATION_KEY, JSON.stringify(newLoc));
    } catch {}
  };

  const handleSelectMethod = (newMethod: string) => {
    setMethod(newMethod);
    try {
      localStorage.setItem(STORAGE_METHOD_KEY, newMethod);
    } catch {}
  };

  // Prayer Times & Live Countdown Calculation
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = useMemo(() => {
    const pt = calculateAstronomicalTimes(
      currentTime,
      location.latitude,
      location.longitude,
      method,
      undefined,
      location.timezone || 'Asia/Jakarta'
    );
    return {
      ...pt,
      locationName: location.city,
      country: location.country,
    };
  }, [currentTime, location, method]);

  const nextPrayer = useMemo(() => {
    return getNextPrayer(prayerTimes, currentTime);
  }, [prayerTimes, currentTime]);

  // Audio Murottal State
  const [selectedQari, setSelectedQari] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_QARI_KEY) || 'alafasy';
    } catch {
      return 'alafasy';
    }
  });

  const handleSelectQari = (qariId: string) => {
    setSelectedQari(qariId);
    try {
      localStorage.setItem(STORAGE_QARI_KEY, qariId);
    } catch {}
  };

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentPlayingSurah, setCurrentPlayingSurah] = useState<number | null>(null);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null);
  const [currentPlayingSurahName, setCurrentPlayingSurahName] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');

  const handlePlayAyah = (surahNumber: number, ayahNumber: number, surahName: string) => {
    // If clicking same ayah while playing, toggle pause
    if (isPlayingAudio && currentPlayingSurah === surahNumber && currentPlayingAyah === ayahNumber) {
      setIsPlayingAudio(false);
      return;
    }

    const url = getAyahAudioUrl(selectedQari, surahNumber, ayahNumber);
    setCurrentPlayingSurah(surahNumber);
    setCurrentPlayingAyah(ayahNumber);
    setCurrentPlayingSurahName(surahName);
    setAudioUrl(url);
    setIsPlayingAudio(true);
  };

  const handleNextAyah = () => {
    if (!currentPlayingSurah || !currentPlayingAyah) return;
    const meta = SURAH_METADATA.find((s) => s.number === currentPlayingSurah);
    if (!meta) return;

    if (currentPlayingAyah < meta.numberOfVerses) {
      const nextNum = currentPlayingAyah + 1;
      handlePlayAyah(currentPlayingSurah, nextNum, currentPlayingSurahName);
    } else {
      setIsPlayingAudio(false);
    }
  };

  const handlePrevAyah = () => {
    if (!currentPlayingSurah || !currentPlayingAyah || currentPlayingAyah <= 1) return;
    handlePlayAyah(currentPlayingSurah, currentPlayingAyah - 1, currentPlayingSurahName);
  };

  // Arabic Font Size State
  const [arabicFontSize, setArabicFontSize] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_FONT_SIZE_KEY);
      return stored ? parseInt(stored, 10) : 30;
    } catch {
      return 30;
    }
  });

  const handleChangeArabicFontSize = (size: number) => {
    setArabicFontSize(size);
    try {
      localStorage.setItem(STORAGE_FONT_SIZE_KEY, String(size));
    } catch {}
  };

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    // Initial sample bookmark: Al-Fatihah 1
    return [
      {
        id: '1-1',
        surahNumber: 1,
        surahName: 'Al-Fatihah',
        ayahNumber: 1,
        textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
        category: 'favorite',
        createdAt: Date.now(),
      },
    ];
  });

  const handleToggleBookmark = (surahNumber: number, surahName: string, ayah: Ayah) => {
    const id = `${surahNumber}-${ayah.numberInSurah}`;
    const exists = bookmarks.some((b) => b.id === id);

    let updated: BookmarkItem[];
    if (exists) {
      updated = bookmarks.filter((b) => b.id !== id);
      showToast(t.quran.bookmarkRemoved);
    } else {
      const newItem: BookmarkItem = {
        id,
        surahNumber,
        surahName,
        ayahNumber: ayah.numberInSurah,
        textArabic: ayah.textArabic,
        translation: ayah.translations.id || ayah.translations.en,
        category: 'favorite',
        createdAt: Date.now(),
      };
      updated = [newItem, ...bookmarks];
      showToast(t.quran.bookmarkAdded);
    }

    setBookmarks(updated);
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Reading History State
  const [lastRead, setLastRead] = useState<ReadingHistoryItem | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_HISTORY_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { surahNumber: 1, surahName: 'Al-Fatihah', ayahNumber: 1, timestamp: Date.now() };
  });

  const handleUpdateReadingHistory = (surahNumber: number, surahName: string, ayahNumber: number) => {
    const item = { surahNumber, surahName, ayahNumber, timestamp: Date.now() };
    setLastRead(item);
    try {
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(item));
    } catch {}
  };

  // Khatam Tracker State
  const [versesReadToday, setVersesReadToday] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KHATAM_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const todayStr = new Date().toISOString().split('T')[0];
        if (parsed.date === todayStr) {
          return parsed.count;
        }
      }
    } catch {}
    return 35; // Default encouraging starter progress
  });

  const handleIncrementVersesRead = (count: number) => {
    const nextVal = versesReadToday + count;
    setVersesReadToday(nextVal);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KHATAM_KEY, JSON.stringify({ date: todayStr, count: nextVal }));
    } catch {}
  };

  const handleResetKhatam = () => {
    setVersesReadToday(0);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KHATAM_KEY, JSON.stringify({ date: todayStr, count: 0 }));
    } catch {}
  };

  // Adzan Reminder Settings
  const [selectedAdzanSound, setSelectedAdzanSound] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_SOUND_KEY) || 'makkah';
    } catch {
      return 'makkah';
    }
  });

  const handleSelectAdzanSound = (soundId: string) => {
    setSelectedAdzanSound(soundId);
    try {
      localStorage.setItem(STORAGE_SOUND_KEY, soundId);
    } catch {}
  };

  const [prayerAlarms, setPrayerAlarms] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ALARMS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true };
  });

  const handleToggleAlarm = (prayer: string) => {
    const updated = { ...prayerAlarms, [prayer]: !prayerAlarms[prayer] };
    setPrayerAlarms(updated);
    try {
      localStorage.setItem(STORAGE_ALARMS_KEY, JSON.stringify(updated));
    } catch {}
  };

  // Modals
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isAdzanModalOpen, setIsAdzanModalOpen] = useState(false);
  const [isQiblaModalOpen, setIsQiblaModalOpen] = useState(false);

  // Jump to Surah from Home / Bookmark
  const [targetSurah, setTargetSurah] = useState<number>(1);
  const [targetAyah, setTargetAyah] = useState<number | undefined>(undefined);

  const handleOpenSurah = (surahNumber: number, ayahNumber?: number) => {
    setTargetSurah(surahNumber);
    setTargetAyah(ayahNumber);
    setActiveTab('quran');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const totalVersesCurrentSurah = useMemo(() => {
    if (!currentPlayingSurah) return 7;
    const meta = SURAH_METADATA.find((s) => s.number === currentPlayingSurah);
    return meta?.numberOfVerses || 7;
  }, [currentPlayingSurah]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-[#09251B] dark:bg-[#02140D] dark:text-[#F5F7F2] transition-colors duration-200 overflow-x-hidden w-full max-w-full">
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs font-bold py-1.5 px-4 flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.common.offlineMode} — Menggunakan basis data Al-Qur'an & Hisab Salat tersimpan.</span>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenLanguage={() => setIsLanguageModalOpen(true)}
        onOpenLocation={() => setIsLocationModalOpen(true)}
        onOpenAdzan={() => setIsAdzanModalOpen(true)}
        onNavigateSettings={() => setActiveTab('settings')}
        currentCity={location.city}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Navigation Sub-bar */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-x-hidden">
        {activeTab === 'home' && (
          <HomeView
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
            onNavigate={setActiveTab}
            onOpenLocation={() => setIsLocationModalOpen(true)}
            onOpenAdzan={() => setIsAdzanModalOpen(true)}
            onOpenQibla={() => setIsQiblaModalOpen(true)}
            onPlayAyah={handlePlayAyah}
            onOpenSurah={handleOpenSurah}
            lastRead={lastRead}
          />
        )}

        {activeTab === 'quran' && (
          <QuranView
            initialSurah={targetSurah}
            initialAyah={targetAyah}
            onPlayAyah={handlePlayAyah}
            isPlayingAudio={isPlayingAudio}
            currentPlayingAyah={currentPlayingAyah}
            currentPlayingSurah={currentPlayingSurah}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onUpdateReadingHistory={handleUpdateReadingHistory}
            arabicFontSize={arabicFontSize}
            onChangeArabicFontSize={handleChangeArabicFontSize}
          />
        )}

        {activeTab === 'prayers' && (
          <PrayersView
            prayerTimes={prayerTimes}
            nextPrayer={nextPrayer}
            onOpenLocation={() => setIsLocationModalOpen(true)}
            onOpenAdzan={() => setIsAdzanModalOpen(true)}
            onOpenQibla={() => setIsQiblaModalOpen(true)}
            currentMethod={method}
          />
        )}

        {activeTab === 'calendar' && <CalendarView />}

        {activeTab === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            onRemoveBookmark={handleRemoveBookmark}
            onOpenSurah={handleOpenSurah}
            lastRead={lastRead}
            versesReadToday={versesReadToday}
            onIncrementVersesRead={handleIncrementVersesRead}
            onResetKhatam={handleResetKhatam}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            selectedQari={selectedQari}
            onSelectQari={handleSelectQari}
            arabicFontSize={arabicFontSize}
            onChangeArabicFontSize={handleChangeArabicFontSize}
            onOpenAdzan={() => setIsAdzanModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Audio Player */}
      {isPlayingAudio && currentPlayingSurah && (
        <AudioPlayerBar
          isPlaying={isPlayingAudio}
          surahNumber={currentPlayingSurah}
          ayahNumber={currentPlayingAyah}
          surahName={currentPlayingSurahName}
          totalVerses={totalVersesCurrentSurah}
          audioUrl={audioUrl}
          qariId={selectedQari}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
          onNextAyah={handleNextAyah}
          onPrevAyah={handlePrevAyah}
          onClose={() => setIsPlayingAudio(false)}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 start-1/2 -translate-x-1/2 z-50 bg-[#064B32] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-[#E9B949] flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-[#E9B949]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentCity={location.city}
        currentMethod={method}
        onSelectLocation={handleSelectLocation}
        onSelectMethod={handleSelectMethod}
      />

      <AdzanModal
        isOpen={isAdzanModalOpen}
        onClose={() => setIsAdzanModalOpen(false)}
        selectedSound={selectedAdzanSound}
        onSelectSound={handleSelectAdzanSound}
        prayerAlarms={prayerAlarms}
        onToggleAlarm={handleToggleAlarm}
      />

      <QiblaModal
        isOpen={isQiblaModalOpen}
        onClose={() => setIsQiblaModalOpen(false)}
        latitude={location.latitude}
        longitude={location.longitude}
        cityName={location.city}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
