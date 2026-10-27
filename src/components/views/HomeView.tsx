import React, { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  BookOpen,
  Calendar,
  Volume2,
  Copy,
  Share2,
  ChevronRight,
  Compass,
  Bell,
  Sparkles,
  Check,
  Settings,
  Sun,
  Sunrise,
  Sunset,
  Moon,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PrayerTimesData, NextPrayerInfo, ReadingHistoryItem } from '../../types';
import { DAILY_VERSES } from '../../data/sampleSurahs';
import { NavTab } from '../Navigation';

interface HomeViewProps {
  prayerTimes: PrayerTimesData;
  nextPrayer: NextPrayerInfo;
  onNavigate: (tab: NavTab) => void;
  onOpenLocation: () => void;
  onOpenAdzan: () => void;
  onOpenQibla: () => void;
  onPlayAyah: (surahNumber: number, ayahNumber: number, surahName: string) => void;
  onOpenSurah: (surahNumber: number, ayahNumber?: number) => void;
  lastRead: ReadingHistoryItem | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  prayerTimes,
  nextPrayer,
  onNavigate,
  onOpenLocation,
  onOpenAdzan,
  onOpenQibla,
  onPlayAyah,
  onOpenSurah,
  lastRead,
}) => {
  const { t, language, formatDate } = useLanguage();
  const [copySuccess, setCopySuccess] = useState(false);
  const [dailyIndex, setDailyIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time ticking clock for "Waktu Sekarang: HH:mm:ss"
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigitalTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatIndoDate = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const dailyVerse = DAILY_VERSES[dailyIndex] || DAILY_VERSES[0];
  const dailyTranslation =
    dailyVerse.translations[language] || dailyVerse.translations['id-ID'] || dailyVerse.translations['en-US'];

  const handleCopyVerse = () => {
    const textToCopy = `${dailyVerse.textArabic}\n\n"${dailyTranslation}"\n(QS. ${dailyVerse.surahName}: ${dailyVerse.ayahNumber}) — Jay’z Qur’an`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const handleShareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: `Jay’z Qur’an: QS. ${dailyVerse.surahName}: ${dailyVerse.ayahNumber}`,
        text: `${dailyVerse.textArabic}\n\n"${dailyTranslation}"\n(QS. ${dailyVerse.surahName}: ${dailyVerse.ayahNumber})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyVerse();
    }
  };

  // 7 Prayer items corresponding exactly to mockup
  const prayerSlots = [
    {
      key: 'imsak',
      name: 'Imsak',
      time: prayerTimes.imsak,
      icon: <Moon className="w-4 h-4 text-[#A7F3D0]" />,
      isNext: nextPrayer.name === 'imsak',
    },
    {
      key: 'fajr',
      name: 'Subuh',
      time: prayerTimes.fajr,
      icon: <Sunrise className="w-4 h-4 text-[#FDE047]" />,
      isNext: nextPrayer.name === 'fajr',
    },
    {
      key: 'sunrise',
      name: 'Terbit',
      time: prayerTimes.sunrise,
      icon: <Sun className="w-4 h-4 text-[#F59E0B]" />,
      isNext: nextPrayer.name === 'sunrise',
    },
    {
      key: 'dhuhr',
      name: 'Dzuhur',
      time: prayerTimes.dhuhr,
      icon: <Sun className="w-4 h-4 text-[#FDE047]" />,
      isNext: nextPrayer.name === 'dhuhr',
    },
    {
      key: 'asr',
      name: 'Ashar',
      time: prayerTimes.asr,
      icon: <Sun className="w-4 h-4 text-[#2DD4BF]" />,
      isNext: nextPrayer.name === 'asr',
    },
    {
      key: 'maghrib',
      name: 'Maghrib',
      time: prayerTimes.maghrib,
      icon: <Sunset className="w-4 h-4 text-[#F97316]" />,
      isNext: nextPrayer.name === 'maghrib',
    },
    {
      key: 'isha',
      name: 'Isya',
      time: prayerTimes.isha,
      icon: <Moon className="w-4 h-4 text-[#38BDF8]" />,
      isNext: nextPrayer.name === 'isha',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden animate-fadeIn pb-20 md:pb-6">
      {/* =========================================================================
          1. HERO CARD: MOSQUE SILHOUETTE, LIVE CLOCK & NEXT PRAYER TIMER
         ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#2DD4BF]/25 bg-gradient-to-b from-[#063826] via-[#042419] to-[#02130D] text-[#FFFDF5] p-4 sm:p-6 lg:p-7 w-full">
        {/* Cinematic Mosque Silhouette & Twilight Sky Background */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-0">
          {/* Radial ambient lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2DD4BF]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E9B949]/15 rounded-full blur-3xl" />

          {/* SVG Silhouette of Grand Mosque with Domes, Minarets, and Illuminated Windows */}
          <svg
            className="absolute bottom-0 right-0 w-full sm:w-[680px] h-[220px] sm:h-[260px] opacity-25 object-cover pointer-events-none"
            viewBox="0 0 800 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grand Central Dome */}
            <path
              d="M 400 120 C 370 70 380 40 400 15 C 420 40 430 70 400 120 Z"
              fill="#F5D485"
              opacity="0.9"
            />
            <path
              d="M 330 200 C 330 110 470 110 470 200 Z"
              fill="#021A11"
            />
            {/* Crescent moon finial */}
            <circle cx="400" cy="12" r="5" fill="#F5D485" />

            {/* Left Flanking Dome */}
            <path
              d="M 280 200 C 280 140 350 140 350 200 Z"
              fill="#032418"
            />
            <path
              d="M 315 140 C 300 110 305 90 315 80 C 325 90 330 110 315 140 Z"
              fill="#F5D485"
              opacity="0.8"
            />

            {/* Right Flanking Dome */}
            <path
              d="M 450 200 C 450 140 520 140 520 200 Z"
              fill="#032418"
            />
            <path
              d="M 485 140 C 470 110 475 90 485 80 C 495 90 500 110 485 140 Z"
              fill="#F5D485"
              opacity="0.8"
            />

            {/* Left Minaret */}
            <rect x="230" y="70" width="18" height="230" fill="#021A11" rx="4" />
            <path d="M 226 70 L 239 30 L 252 70 Z" fill="#063D2A" />
            <circle cx="239" cy="28" r="3" fill="#F5D485" />
            <rect x="228" y="110" width="22" height="6" fill="#F5D485" rx="2" />
            <rect x="228" y="150" width="22" height="6" fill="#F5D485" rx="2" />

            {/* Right Minaret */}
            <rect x="550" y="70" width="18" height="230" fill="#021A11" rx="4" />
            <path d="M 546 70 L 559 30 L 572 70 Z" fill="#063D2A" />
            <circle cx="559" cy="28" r="3" fill="#F5D485" />
            <rect x="548" y="110" width="22" height="6" fill="#F5D485" rx="2" />
            <rect x="548" y="150" width="22" height="6" fill="#F5D485" rx="2" />

            {/* Illuminated Mosque Arches */}
            <path d="M 380 200 C 380 180 420 180 420 200 Z" fill="#FDE047" opacity="0.8" />
            <path d="M 350 200 C 350 185 375 185 375 200 Z" fill="#FDE047" opacity="0.6" />
            <path d="M 425 200 C 425 185 450 185 450 200 Z" fill="#FDE047" opacity="0.6" />

            {/* Palm silhouettes on edges */}
            <path d="M 680 180 Q 720 160 760 190 Q 710 170 680 200" stroke="#04281B" strokeWidth="6" />
            <path d="M 690 190 Q 740 180 770 210 Q 730 190 690 210" stroke="#04281B" strokeWidth="5" />
            <path d="M 120 190 Q 80 170 50 200 Q 90 180 120 210" stroke="#04281B" strokeWidth="6" />
          </svg>

          {/* Golden Stars in Twilight */}
          <div className="absolute top-6 left-1/3 w-1 h-1 bg-[#FDE047] rounded-full animate-ping opacity-60" />
          <div className="absolute top-12 left-1/2 w-1.5 h-1.5 bg-[#FFF] rounded-full opacity-70" />
          <div className="absolute top-8 right-1/4 w-1 h-1 bg-[#2DD4BF] rounded-full opacity-80" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col justify-between space-y-4 sm:space-y-5">
          {/* Top Row: "WAKTU SHALAT >" Badge & Calligraphy Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5 text-start">
              {/* Gold Pill Badge */}
              <button
                onClick={() => onNavigate('prayers')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#09251B] text-[11px] font-extrabold uppercase tracking-wide shadow-md hover:brightness-110 transition active:scale-95"
              >
                <span>🕌</span>
                <span>WAKTU SHALAT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Assalamu'alaikum & Blessing */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
                Assalamu’alaikum
              </h2>
              <p className="text-xs sm:text-sm text-[#A7F3D0] font-medium flex items-center gap-1.5">
                <span>Semoga hari ini penuh keberkahan</span>
                <span>🍃</span>
              </p>

              {/* Gregorian + Hijri Date Row */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#E2E8F0] pt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#E9B949] flex-shrink-0" />
                <span className="font-medium">
                  {formatIndoDate(currentTime)} • {prayerTimes.dateHijri.formatted}
                </span>
              </div>
            </div>

            {/* Right Islamic Arch Frame with Quran Quote: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ" */}
            <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-2xl bg-[#02130D]/70 backdrop-blur-md border border-[#E9B949]/35 text-center max-w-[220px] shadow-lg">
              <p className="font-arabic text-lg sm:text-xl text-[#F5D485] font-bold leading-relaxed">
                وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
              </p>
              <p className="text-[10px] text-[#CBD5E1] italic mt-1 leading-snug">
                "Dan tidak ada keberhasilan kecuali dengan pertolongan Allah."
              </p>
              <span className="text-[9px] text-[#A7F3D0] font-semibold mt-0.5">
                (QS. Hud: 88)
              </span>
            </div>
          </div>

          {/* Inner Floating Glass Timer Card (2 Columns: Waktu Sekarang & Next Prayer) */}
          <div className="rounded-2xl bg-[#031E15]/90 backdrop-blur-md border border-[#2DD4BF]/30 p-3.5 sm:p-4 shadow-xl grid grid-cols-2 gap-3 divide-x divide-[#2DD4BF]/20">
            {/* Left Column: Ticking Live Clock */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-start">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#E9B949]/15 border border-[#E9B949]/40 text-[#E9B949] flex items-center justify-center shadow-inner flex-shrink-0">
                <Clock className="w-5 h-5 text-[#E9B949]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#A7F3D0] font-bold uppercase tracking-wider">
                  Waktu Sekarang
                </p>
                <p className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-wider leading-none my-1">
                  {formatDigitalTime(currentTime)}
                </p>
                <p className="text-[10px] text-[#94A3B8] font-medium">
                  Zona: WIB
                </p>
              </div>
            </div>

            {/* Right Column: Next Prayer & Countdown */}
            <div className="ps-3 flex items-center justify-between text-start">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] flex items-center justify-center shadow-inner flex-shrink-0">
                  <Sunset className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-white capitalize truncate">
                    {t.prayers[nextPrayer.name as keyof typeof t.prayers] || nextPrayer.name}
                  </p>
                  <p className="font-mono text-base sm:text-xl font-black text-[#F59E0B] leading-none my-0.5">
                    {nextPrayer.timeStr}
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#F59E0B] text-[#09251B] text-[9px] font-extrabold uppercase tracking-wide">
                    Berikutnya
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. JADWAL SHALAT CARD: 7 PRAYER BOXES & QUICK LOCATION/FULL SCHEDULE PILLS
         ========================================================================= */}
      <div className="rounded-3xl bg-[#042017]/90 backdrop-blur-md border border-[#2DD4BF]/25 p-4 sm:p-5 shadow-2xl w-full text-start">
        {/* Header with Mosque Icon & "Lihat Semua >" Pill */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2DD4BF]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D97706] to-[#F59E0B] p-0.5 flex items-center justify-center text-[#09251B] shadow">
              <span className="text-sm">🕌</span>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Jadwal Shalat
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#A7F3D0]/80">
                Hari ini, {formatIndoDate(currentTime)}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('prayers')}
            className="px-3 py-1 rounded-full bg-[#031A12] hover:bg-[#062D20] border border-[#2DD4BF]/30 text-xs font-semibold text-[#2DD4BF] hover:text-white transition active:scale-95 flex items-center gap-1 shadow-sm"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 7 Prayer Slots Grid (Horizontal Scroll on Mobile, 7 cols on tablet/desktop) */}
        <div className="flex sm:grid sm:grid-cols-7 gap-2 overflow-x-auto py-3 no-scrollbar w-full">
          {prayerSlots.map((slot) => {
            return (
              <div
                key={slot.key}
                className={`flex-1 min-w-[74px] sm:min-w-0 p-2.5 rounded-2xl transition-all duration-300 text-center flex-shrink-0 flex flex-col items-center justify-between ${
                  slot.isNext
                    ? 'border-2 border-[#2DD4BF] bg-gradient-to-b from-[#0A4432] to-[#062D20] shadow-[0_0_18px_rgba(45,212,191,0.45)] scale-[1.03] text-white'
                    : 'border border-[#2DD4BF]/20 bg-[#031A12]/90 hover:border-[#2DD4BF]/40 text-[#CBD5E1]'
                }`}
              >
                <div className="mb-1">{slot.icon}</div>
                <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight ${slot.isNext ? 'text-[#2DD4BF]' : 'text-[#A7F3D0]/80'}`}>
                  {slot.name}
                </p>
                <p className="font-mono text-xs sm:text-sm font-black mt-1 tracking-tight text-white">
                  {slot.time}
                </p>
                <div className="h-1.5 flex items-center justify-center mt-1">
                  {slot.isNext && <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] shadow-[0_0_6px_#2DD4BF]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Action Pills: "Ganti Kota / Koordinat" & "Lihat Jadwal Lengkap" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
          <button
            onClick={onOpenLocation}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#02170F]/80 hover:bg-[#05261B] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-start transition active:scale-95 group shadow-sm"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[#E9B949]/15 border border-[#E9B949]/40 flex items-center justify-center text-[#E9B949] flex-shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#A7F3D0]/70 font-semibold uppercase tracking-wider">
                  Ganti Kota / Koordinat
                </p>
                <p className="text-xs font-bold text-white truncate">
                  {prayerTimes.locationName || 'Jakarta'} (WIB)
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A7F3D0]/60 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('prayers')}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#02170F]/80 hover:bg-[#05261B] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-start transition active:scale-95 group shadow-sm"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[#2DD4BF]/15 border border-[#2DD4BF]/40 flex items-center justify-center text-[#2DD4BF] flex-shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-[#A7F3D0]/70 font-semibold uppercase tracking-wider">
                  Lihat Jadwal Lengkap
                </p>
                <p className="text-xs font-bold text-white truncate">
                  Terdapat 7 waktu shalat
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A7F3D0]/60 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          3. QUICK ACCESS MENU: 6 SQUIRCLE GLASS CARDS
         ========================================================================= */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full">
        {/* 1. Baca Al-Qur'an */}
        <button
          onClick={() => onNavigate('quran')}
          className="p-3 sm:p-4 rounded-2xl bg-[#031D14]/90 hover:bg-[#062D20] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-center flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-lg"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#084832] to-[#032317] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="font-bold text-xs sm:text-sm text-white group-hover:text-[#2DD4BF] transition leading-tight">
            Baca Al-Qur'an
          </p>
          <ChevronRight className="w-3 h-3 text-[#A7F3D0]/50 mt-1" />
        </button>

        {/* 2. Tafsir & Terjemah */}
        <button
          onClick={() => onNavigate('quran')}
          className="p-3 sm:p-4 rounded-2xl bg-[#031D14]/90 hover:bg-[#062D20] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-center flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-lg"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#084832] to-[#032317] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-bold text-xs sm:text-sm text-white group-hover:text-[#2DD4BF] transition leading-tight">
            Tafsir & Terjemah
          </p>
          <ChevronRight className="w-3 h-3 text-[#A7F3D0]/50 mt-1" />
        </button>

        {/* 3. Jadwal Shalat */}
        <button
          onClick={() => onNavigate('prayers')}
          className="p-3 sm:p-4 rounded-2xl bg-[#031D14]/90 hover:bg-[#062D20] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-center flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-lg"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#084832] to-[#032317] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <span className="text-lg">🕌</span>
          </div>
          <p className="font-bold text-xs sm:text-sm text-white group-hover:text-[#2DD4BF] transition leading-tight">
            Jadwal Shalat
          </p>
          <ChevronRight className="w-3 h-3 text-[#A7F3D0]/50 mt-1" />
        </button>

        {/* 4. Adzan */}
        <button
          onClick={onOpenAdzan}
          className="p-3 sm:p-4 rounded-2xl bg-[#031D14]/90 hover:bg-[#062D20] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-center flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-lg"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#084832] to-[#032317] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <Bell className="w-5 h-5" />
          </div>
          <p className="font-bold text-xs sm:text-sm text-white group-hover:text-[#2DD4BF] transition leading-tight">
            Adzan
          </p>
          <ChevronRight className="w-3 h-3 text-[#A7F3D0]/50 mt-1" />
        </button>

        {/* 5. Kalender Hijriah */}
        <button
          onClick={() => onNavigate('calendar')}
          className="p-3 sm:p-4 rounded-2xl bg-[#031D14]/90 hover:bg-[#062D20] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-center flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-lg"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#084832] to-[#032317] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="font-bold text-xs sm:text-sm text-white group-hover:text-[#2DD4BF] transition leading-tight">
            Kalender Hijriah
          </p>
          <ChevronRight className="w-3 h-3 text-[#A7F3D0]/50 mt-1" />
        </button>

        {/* 6. Pengaturan */}
        <button
          onClick={() => onNavigate('settings')}
          className="p-3 sm:p-4 rounded-2xl bg-[#031D14]/90 hover:bg-[#062D20] border border-[#2DD4BF]/20 hover:border-[#2DD4BF]/50 text-center flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-lg"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#084832] to-[#032317] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center mb-2 group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_10px_rgba(45,212,191,0.2)]">
            <Settings className="w-5 h-5" />
          </div>
          <p className="font-bold text-xs sm:text-sm text-white group-hover:text-[#2DD4BF] transition leading-tight">
            Pengaturan
          </p>
          <ChevronRight className="w-3 h-3 text-[#A7F3D0]/50 mt-1" />
        </button>
      </div>

      {/* =========================================================================
          4. AYAT HARI INI BANNER: NOBLE QURAN RIHAL IN WARM SUNLIGHT + ARABIC CALLIGRAPHY
         ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2DD4BF]/25 shadow-2xl bg-gradient-to-r from-[#05281C] via-[#041E15] to-[#02130D] p-4 sm:p-6 w-full text-start flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side Artistic Illustration of Quran on Wooden Rihal in Mosque Light */}
        <div className="flex items-center gap-4 min-w-0 w-full md:w-auto">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-[#E9B949]/20 via-[#063323] to-[#02130D] border border-[#E9B949]/40 flex-shrink-0 flex items-center justify-center shadow-lg">
            {/* Wooden Rihal & Quran Artwork SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none">
              {/* Warm window sunlight ray */}
              <path d="M 0 0 L 100 100 L 70 100 L 0 30 Z" fill="#FDE047" opacity="0.12" />
              {/* Wooden Rihal Stand */}
              <path d="M 20 85 L 50 55 L 80 85" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
              <path d="M 80 85 L 50 55 L 20 85" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="55" r="4" fill="#E9B949" />
              {/* Open Holy Quran Pages */}
              <path d="M 50 50 C 35 45 25 48 18 54 C 25 40 38 38 50 44 Z" fill="#FFFDF5" />
              <path d="M 50 50 C 65 45 75 48 82 54 C 75 40 62 38 50 44 Z" fill="#FFFDF5" />
              {/* Quran Book Spine & Gold Edges */}
              <path d="M 49 44 L 49 52" stroke="#E9B949" strokeWidth="2" />
              <path d="M 18 54 L 50 50 L 82 54" stroke="#E9B949" strokeWidth="1.5" />
              {/* Mini Arabic lines */}
              <line x1="28" y1="46" x2="44" y2="44" stroke="#064B32" strokeWidth="1" opacity="0.6" />
              <line x1="26" y1="49" x2="44" y2="47" stroke="#064B32" strokeWidth="1" opacity="0.6" />
              <line x1="56" y1="44" x2="72" y2="46" stroke="#064B32" strokeWidth="1" opacity="0.6" />
              <line x1="56" y1="47" x2="74" y2="49" stroke="#064B32" strokeWidth="1" opacity="0.6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02130D]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="space-y-1.5 min-w-0">
            {/* Gold Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#09251B] text-[10px] font-extrabold uppercase tracking-wider shadow">
                <span>📖</span>
                <span>AYAT HARI INI</span>
              </span>
            </div>

            {/* Arabic Calligraphy Verse */}
            <p className="font-arabic text-lg sm:text-2xl text-white font-bold leading-relaxed">
              {dailyVerse.textArabic}
            </p>

            {/* Translation & Reference */}
            <p className="text-xs sm:text-sm text-[#CBD5E1] italic leading-snug">
              "{dailyTranslation}"
            </p>
            <p className="text-[10px] text-[#2DD4BF] font-semibold">
              (QS. {dailyVerse.surahName}: {dailyVerse.ayahNumber})
            </p>
          </div>
        </div>

        {/* Action Button: "Baca & Tafsir >" */}
        <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={() => onPlayAyah(dailyVerse.surahNumber, dailyVerse.ayahNumber, dailyVerse.surahName)}
            className="p-2 rounded-full bg-[#031A12] hover:bg-[#062D20] border border-[#2DD4BF]/30 text-[#2DD4BF] transition active:scale-95"
            title="Dengarkan Murottal"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopyVerse}
            className="p-2 rounded-full bg-[#031A12] hover:bg-[#062D20] border border-[#2DD4BF]/30 text-[#2DD4BF] transition active:scale-95"
            title="Salin Ayat"
          >
            {copySuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleShareVerse}
            className="p-2 rounded-full bg-[#031A12] hover:bg-[#062D20] border border-[#2DD4BF]/30 text-[#2DD4BF] transition active:scale-95"
            title="Bagikan Ayat"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenSurah(dailyVerse.surahNumber, dailyVerse.ayahNumber)}
            className="px-4 py-2 rounded-full bg-[#084832] hover:bg-[#0B5C3D] border border-[#2DD4BF]/40 text-xs font-bold text-white shadow-lg transition active:scale-95 flex items-center gap-1.5"
          >
            <span>Baca & Tafsir</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          5. LAST READ QUICK RESUME (IF AVAILABLE)
         ========================================================================= */}
      {lastRead && (
        <div className="rounded-2xl bg-[#031D14]/90 border border-[#E9B949]/35 p-3.5 sm:p-4 flex items-center justify-between gap-3 text-start shadow-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#064B32] to-[#021A11] border border-[#E9B949]/50 text-[#E9B949] flex items-center justify-center flex-shrink-0 shadow">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-bold text-[#E9B949]">
                Terakhir Dibaca
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                Surah {lastRead.surahName} • Ayat {lastRead.ayahNumber}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenSurah(lastRead.surahNumber, lastRead.ayahNumber)}
            className="px-3 py-1.5 rounded-full bg-[#064B32] hover:bg-[#08784F] border border-[#2DD4BF]/40 text-white text-xs font-bold shadow transition active:scale-95 flex items-center gap-1 flex-shrink-0"
          >
            <span>Lanjutkan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

