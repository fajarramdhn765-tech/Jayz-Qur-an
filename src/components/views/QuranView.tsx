import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  BookOpen,
  Play,
  Pause,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Share2,
  Volume2,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SurahMeta, SurahDetail, Ayah, TranslationLanguage, BookmarkItem } from '../../types';
import { SURAH_METADATA } from '../../data/quranMetadata';
import { getSurahDetail, getAyahTranslation } from '../../services/quranApi';
import { TRANSLATION_LANGUAGES } from '../../i18n/translations';

interface QuranViewProps {
  initialSurah?: number;
  initialAyah?: number;
  onPlayAyah: (surahNumber: number, ayahNumber: number, surahName: string) => void;
  isPlayingAudio: boolean;
  currentPlayingAyah: number | null;
  currentPlayingSurah: number | null;
  bookmarks: BookmarkItem[];
  onToggleBookmark: (surahNumber: number, surahName: string, ayah: Ayah) => void;
  onUpdateReadingHistory: (surahNumber: number, surahName: string, ayahNumber: number) => void;
  arabicFontSize: number;
  onChangeArabicFontSize: (size: number) => void;
}

export const QuranView: React.FC<QuranViewProps> = ({
  initialSurah = 1,
  initialAyah,
  onPlayAyah,
  isPlayingAudio,
  currentPlayingAyah,
  currentPlayingSurah,
  bookmarks,
  onToggleBookmark,
  onUpdateReadingHistory,
  arabicFontSize,
  onChangeArabicFontSize,
}) => {
  const { t, language, quranTranslationLang, setQuranTranslationLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(initialSurah);
  const [surahDetail, setSurahDetail] = useState<SurahDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Display toggles
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [activeTafsirAyah, setActiveTafsirAyah] = useState<number | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Fetch Surah Detail when selectedSurahNumber changes
  useEffect(() => {
    if (!selectedSurahNumber) return;

    let isMounted = true;
    setIsLoading(true);

    getSurahDetail(selectedSurahNumber)
      .then((detail) => {
        if (isMounted) {
          setSurahDetail(detail);
          setIsLoading(false);
          // Auto record reading history
          const targetAyah = initialAyah || 1;
          onUpdateReadingHistory(detail.number, detail.nameTransliteration, targetAyah);

          // Scroll to target ayah if provided
          if (initialAyah) {
            setTimeout(() => {
              verseRefs.current[initialAyah]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load surah:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSurahNumber, initialAyah]);

  // Filtered surah list
  const filteredSurahs = useMemo(() => {
    return SURAH_METADATA.filter((s) => {
      const matchSearch =
        s.nameTransliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nameArabic.includes(searchTerm) ||
        String(s.number).includes(searchTerm) ||
        (s.nameTranslation[language] || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchFilter = filterType === 'all' || s.revelationType === filterType;
      return matchSearch && matchFilter;
    });
  }, [searchTerm, filterType, language]);

  // Juz grouped mapping
  const juzList = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => i + 1);
  }, []);

  const handleCopyAyah = (ayah: Ayah) => {
    if (!surahDetail) return;
    const trans = getAyahTranslation(ayah, quranTranslationLang);
    const content = `${ayah.textArabic}\n\n"${trans}"\n(QS. ${surahDetail.nameTransliteration}: ${ayah.numberInSurah})`;
    navigator.clipboard.writeText(content).then(() => {
      setCopiedAyah(ayah.numberInSurah);
      setTimeout(() => setCopiedAyah(null), 2000);
    });
  };

  const isAyahBookmarked = (ayahNumber: number): boolean => {
    if (!selectedSurahNumber) return false;
    return bookmarks.some(
      (b) => b.surahNumber === selectedSurahNumber && b.ayahNumber === ayahNumber
    );
  };

  // 1. SURAH READING DETAIL VIEW
  if (selectedSurahNumber && surahDetail) {
    const isPlayingCurrentSurah = currentPlayingSurah === surahDetail.number && isPlayingAudio;

    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        {/* Navigation Bar / Toolbar */}
        <div className="sticky top-16 sm:top-20 z-20 bg-white/95 dark:bg-[#064B32]/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSurahNumber(null)}
              className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#09251B] text-[#064B32] dark:text-[#E9B949] hover:bg-[#FFF4D6] transition flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.quran.surahTab}</span>
            </button>

            {/* Prev / Next Surah Shortcuts */}
            <button
              disabled={surahDetail.number <= 1}
              onClick={() => setSelectedSurahNumber(surahDetail.number - 1)}
              className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#09251B] text-[#52665B] dark:text-[#A3BAAD] hover:text-[#064B32] disabled:opacity-40 transition"
              title={t.quran.prevSurah}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-extrabold text-[#09251B] dark:text-[#FFFDF5]">
              {surahDetail.number}. {surahDetail.nameTransliteration}
            </span>
            <button
              disabled={surahDetail.number >= 114}
              onClick={() => setSelectedSurahNumber(surahDetail.number + 1)}
              className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#09251B] text-[#52665B] dark:text-[#A3BAAD] hover:text-[#064B32] disabled:opacity-40 transition"
              title={t.quran.nextSurah}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Reader Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Independent Quran Translation Language Selector */}
            <select
              value={quranTranslationLang}
              onChange={(e) => setQuranTranslationLang(e.target.value as TranslationLanguage)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-[#F5F7F2] dark:bg-[#09251B] border border-[#DCE5DD] dark:border-[#1E4E3B] text-[#09251B] dark:text-[#FFFDF5] focus:outline-none"
              title={t.quran.translationLang}
            >
              {TRANSLATION_LANGUAGES.map((tl) => (
                <option key={tl.code} value={tl.code}>
                  {tl.label}
                </option>
              ))}
            </select>

            {/* Font Size Adjuster */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#F5F7F2] dark:bg-[#09251B] border border-[#DCE5DD] dark:border-[#1E4E3B]">
              <span className="text-[10px] text-[#52665B] dark:text-[#A3BAAD] font-bold">A</span>
              <button
                onClick={() => onChangeArabicFontSize(Math.max(22, arabicFontSize - 2))}
                className="px-1.5 py-0.5 rounded text-xs font-bold hover:bg-white dark:hover:bg-white/10"
              >
                -
              </button>
              <span className="text-xs font-mono font-bold text-[#064B32] dark:text-[#E9B949]">
                {arabicFontSize}
              </span>
              <button
                onClick={() => onChangeArabicFontSize(Math.min(48, arabicFontSize + 2))}
                className="px-1.5 py-0.5 rounded text-xs font-bold hover:bg-white dark:hover:bg-white/10"
              >
                +
              </button>
            </div>

            {/* Toggle Latin */}
            <button
              onClick={() => setShowLatin(!showLatin)}
              className={`p-2 rounded-xl text-xs font-bold border transition ${
                showLatin
                  ? 'bg-[#064B32] text-white border-[#064B32]'
                  : 'bg-[#F5F7F2] dark:bg-[#09251B] text-gray-500 border-transparent'
              }`}
              title={t.quran.showLatin}
            >
              Latin
            </button>

            {/* Toggle Translation */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`p-2 rounded-xl text-xs font-bold border transition ${
                showTranslation
                  ? 'bg-[#064B32] text-white border-[#064B32]'
                  : 'bg-[#F5F7F2] dark:bg-[#09251B] text-gray-500 border-transparent'
              }`}
              title={t.quran.showTranslation}
            >
              Arti
            </button>
          </div>
        </div>

        {/* Surah Header Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-[#064B32] via-[#08784F] to-[#09251B] text-[#FFFDF5] text-center shadow-xl border border-[#E9B949]/30 islamic-pattern">
          <div className="relative z-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#E9B949]/20 text-[#FFF4D6] text-xs font-bold uppercase tracking-wider border border-[#E9B949]/40">
              {surahDetail.revelationType === 'Meccan' ? t.quran.revelationMeccan : t.quran.revelationMedinan} • {surahDetail.numberOfVerses} {t.quran.verses} • Juz {surahDetail.juzStart}
            </span>

            <h1 className="text-3xl sm:text-4xl font-arabic font-bold pt-2 text-[#E9B949]">
              {surahDetail.nameArabic}
            </h1>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {surahDetail.nameTransliteration}
            </h2>
            <p className="text-sm text-[#FFF4D6]/90 max-w-md mx-auto">
              "{surahDetail.nameTranslation[language] || surahDetail.nameTranslation['id-ID']}"
            </p>

            {/* Play Whole Surah Button */}
            <div className="pt-3">
              <button
                onClick={() => onPlayAyah(surahDetail.number, 1, surahDetail.nameTransliteration)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E9B949] hover:bg-[#F7D070] text-[#09251B] font-bold text-xs shadow-lg transition active:scale-95"
              >
                {isPlayingCurrentSurah ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlayingCurrentSurah ? t.quran.pauseAudio : t.quran.listenAll}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bismillah Banner (Except Surah 9 At-Tawbah) */}
        {surahDetail.number !== 9 && (
          <div className="py-6 text-center border-y border-[#DCE5DD] dark:border-[#1E4E3B] bg-[#FFF4D6]/30 dark:bg-[#0E3326]/40 rounded-2xl">
            <p className="font-arabic text-2xl sm:text-3xl text-[#064B32] dark:text-[#E9B949] tracking-wider leading-relaxed">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-xs text-[#52665B] dark:text-[#A3BAAD] mt-1.5 italic">
              Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
            </p>
          </div>
        )}

        {/* Verses List */}
        <div className="space-y-4">
          {surahDetail.verses.map((ayah) => {
            const isPlayingThisAyah =
              currentPlayingSurah === surahDetail.number && currentPlayingAyah === ayah.numberInSurah;
            const bookmarked = isAyahBookmarked(ayah.numberInSurah);
            const translationText = getAyahTranslation(ayah, quranTranslationLang);

            return (
              <div
                key={ayah.numberInSurah}
                ref={(el) => {
                  verseRefs.current[ayah.numberInSurah] = el;
                }}
                className={`p-5 sm:p-7 rounded-3xl transition-all duration-300 text-start border ${
                  isPlayingThisAyah
                    ? 'bg-[#064B32]/10 dark:bg-[#08784F]/25 border-2 border-[#E9B949] shadow-lg'
                    : 'bg-white dark:bg-[#0E3326] border-[#DCE5DD] dark:border-[#1E4E3B] hover:shadow-md'
                }`}
              >
                {/* Verse Top Action Ribbon */}
                <div className="flex items-center justify-between pb-4 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
                  {/* Surah : Ayah Badge */}
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#064B32] text-[#FFFDF5] font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                      {ayah.numberInSurah}
                    </span>
                    <span className="text-[11px] font-semibold text-[#52665B] dark:text-[#A3BAAD]">
                      QS. {surahDetail.number}:{ayah.numberInSurah}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => onPlayAyah(surahDetail.number, ayah.numberInSurah, surahDetail.nameTransliteration)}
                      className={`p-2 rounded-xl transition ${
                        isPlayingThisAyah
                          ? 'bg-[#E9B949] text-[#09251B] font-bold shadow'
                          : 'bg-[#F5F7F2] dark:bg-[#133D2E] text-[#064B32] dark:text-[#E9B949] hover:bg-[#FFF4D6]'
                      }`}
                      title={isPlayingThisAyah ? t.quran.pauseAudio : t.quran.playAudio}
                    >
                      {isPlayingThisAyah ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => onToggleBookmark(surahDetail.number, surahDetail.nameTransliteration, ayah)}
                      className={`p-2 rounded-xl transition ${
                        bookmarked
                          ? 'bg-[#E9B949] text-[#09251B]'
                          : 'bg-[#F5F7F2] dark:bg-[#133D2E] text-[#52665B] dark:text-[#A3BAAD] hover:text-[#064B32]'
                      }`}
                      title="Simpan Bookmark"
                    >
                      {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-[#52665B] dark:text-[#A3BAAD] hover:text-[#064B32] transition"
                      title="Salin Ayat"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    {ayah.tafsir && (
                      <button
                        onClick={() =>
                          setActiveTafsirAyah(
                            activeTafsirAyah === ayah.numberInSurah ? null : ayah.numberInSurah
                          )
                        }
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                          activeTafsirAyah === ayah.numberInSurah
                            ? 'bg-[#064B32] text-[#FFFDF5]'
                            : 'bg-[#F5F7F2] dark:bg-[#133D2E] text-[#064B32] dark:text-[#E9B949]'
                        }`}
                      >
                        {t.quran.showTafsir}
                      </button>
                    )}
                  </div>
                </div>

                {/* Arabic Quran Text */}
                <div className="py-6">
                  <p
                    dir="rtl"
                    className="font-arabic leading-[2.5] text-end text-[#064B32] dark:text-[#FFFDF5] selection:bg-[#E9B949]/40 tracking-wide"
                    style={{ fontSize: `${arabicFontSize}px` }}
                  >
                    {ayah.textArabic}
                  </p>
                </div>

                {/* Latin Transliteration */}
                {showLatin && ayah.textLatin && (
                  <p className="text-xs sm:text-sm font-medium text-[#08784F] dark:text-[#E9B949] mb-2 leading-relaxed">
                    {ayah.textLatin}
                  </p>
                )}

                {/* Localized Translation */}
                {showTranslation && (
                  <p className="text-sm text-[#09251B] dark:text-[#FFF4D6] leading-relaxed">
                    {translationText}
                  </p>
                )}

                {/* Tafsir Accordion Drawer */}
                {activeTafsirAyah === ayah.numberInSurah && ayah.tafsir && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#09251B] border-s-4 border-[#08784F] dark:border-[#E9B949] space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E9B949]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#064B32] dark:text-[#E9B949]">
                        {t.quran.tafsirTitle} (Kemenag & Jalalayn)
                      </h4>
                    </div>
                    {ayah.tafsir.kemenag && (
                      <p className="text-xs text-[#52665B] dark:text-[#A3BAAD] leading-relaxed">
                        <strong>Kemenag:</strong> {ayah.tafsir.kemenag}
                      </p>
                    )}
                    {ayah.tafsir.jalalayn && (
                      <p className="text-xs text-[#52665B] dark:text-[#A3BAAD] leading-relaxed">
                        <strong>Jalalayn:</strong> {ayah.tafsir.jalalayn}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Surah Navigation */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#0E3326] border border-[#DCE5DD] dark:border-[#1E4E3B]">
          <button
            disabled={surahDetail.number <= 1}
            onClick={() => {
              setSelectedSurahNumber(surahDetail.number - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.quran.prevSurah}</span>
          </button>

          <button
            onClick={() => {
              setSelectedSurahNumber(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#52665B] dark:text-[#A3BAAD] hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E]"
          >
            {t.quran.surahTab}
          </button>

          <button
            disabled={surahDetail.number >= 114}
            onClick={() => {
              setSelectedSurahNumber(surahDetail.number + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold disabled:opacity-40 transition"
          >
            <span>{t.quran.nextSurah}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. SURAH DIRECTORY & JUZ LIST
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Search & Tabs Header */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-5 sm:p-7 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] text-start space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#09251B] dark:text-[#FFFDF5]">
            {t.quran.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#52665B] dark:text-[#A3BAAD]">
            {t.quran.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute start-3.5 top-3.5 text-[#52665B] dark:text-[#A3BAAD]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.quran.searchPlaceholder}
            className="w-full ps-10 pe-4 py-2.5 text-sm rounded-2xl bg-[#F5F7F2] dark:bg-[#09251B] border border-[#DCE5DD] dark:border-[#1E4E3B] text-[#09251B] dark:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#08784F]"
          />
        </div>

        {/* Tabs & Revelation Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('surah')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'surah'
                  ? 'bg-[#064B32] text-white shadow'
                  : 'bg-[#F5F7F2] dark:bg-[#133D2E] text-[#52665B] dark:text-[#A3BAAD]'
              }`}
            >
              {t.quran.surahTab} (114)
            </button>
            <button
              onClick={() => setActiveTab('juz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'juz'
                  ? 'bg-[#064B32] text-white shadow'
                  : 'bg-[#F5F7F2] dark:bg-[#133D2E] text-[#52665B] dark:text-[#A3BAAD]'
              }`}
            >
              {t.quran.juzTab}
            </button>
          </div>

          {activeTab === 'surah' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filterType === 'all'
                    ? 'bg-[#E9B949] text-[#09251B] font-bold'
                    : 'text-[#52665B] dark:text-[#A3BAAD] hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E]'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType('Meccan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filterType === 'Meccan'
                    ? 'bg-[#E9B949] text-[#09251B] font-bold'
                    : 'text-[#52665B] dark:text-[#A3BAAD] hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E]'
                }`}
              >
                Makkiyyah
              </button>
              <button
                onClick={() => setFilterType('Medinan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filterType === 'Medinan'
                    ? 'bg-[#E9B949] text-[#09251B] font-bold'
                    : 'text-[#52665B] dark:text-[#A3BAAD] hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E]'
                }`}
              >
                Madaniyyah
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Surah Grid */}
      {activeTab === 'surah' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSurahs.map((surah) => {
            const isPlayingThis = currentPlayingSurah === surah.number && isPlayingAudio;
            return (
              <button
                key={surah.number}
                onClick={() => setSelectedSurahNumber(surah.number)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 border text-start group ${
                  isPlayingThis
                    ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-[#08784F] dark:border-[#E9B949] shadow-md'
                    : 'bg-white dark:bg-[#0E3326] border-[#DCE5DD] dark:border-[#1E4E3B] hover:border-[#08784F] dark:hover:border-[#E9B949] hover:shadow-sm'
                }`}
              >
                {/* Number & Name info */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#064B32] text-[#E9B949] font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#09251B] dark:text-[#FFFDF5]">
                      {surah.nameTransliteration}
                    </h3>
                    <p className="text-xs text-[#52665B] dark:text-[#A3BAAD] truncate max-w-[150px]">
                      {surah.nameTranslation[language] || surah.nameTranslation['id-ID']}
                    </p>
                    <span className="text-[10px] text-[#52665B] dark:text-[#A3BAAD]">
                      {surah.revelationType === 'Meccan' ? t.quran.revelationMeccan : t.quran.revelationMedinan} • {surah.numberOfVerses} {t.quran.verses}
                    </span>
                  </div>
                </div>

                {/* Arabic Calligraphy Name */}
                <div className="text-end">
                  <p className="font-arabic text-xl text-[#064B32] dark:text-[#E9B949] font-bold">
                    {surah.nameArabic}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Juz 1 to 30 Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {juzList.map((juzNum) => {
            const firstSurah = SURAH_METADATA.find((s) => s.juzStart === juzNum) || SURAH_METADATA[0];
            return (
              <button
                key={juzNum}
                onClick={() => setSelectedSurahNumber(firstSurah.number)}
                className="p-4 rounded-2xl bg-white dark:bg-[#0E3326] border border-[#DCE5DD] dark:border-[#1E4E3B] hover:border-[#08784F] dark:hover:border-[#E9B949] transition shadow-sm text-start"
              >
                <div className="w-8 h-8 rounded-lg bg-[#064B32] text-[#E9B949] font-bold text-xs flex items-center justify-center mb-2">
                  {juzNum}
                </div>
                <p className="font-bold text-sm text-[#09251B] dark:text-[#FFFDF5]">
                  Juz {juzNum}
                </p>
                <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                  Mulai: {firstSurah.nameTransliteration}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
