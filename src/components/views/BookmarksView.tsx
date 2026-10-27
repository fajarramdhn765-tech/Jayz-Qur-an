import React, { useState } from 'react';
import {
  Bookmark,
  Trash2,
  BookOpen,
  ChevronRight,
  Flame,
  Award,
  Plus,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../i18n/LanguageContext';
import { BookmarkItem, ReadingHistoryItem } from '../../types';

interface BookmarksViewProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onOpenSurah: (surahNumber: number, ayahNumber?: number) => void;
  lastRead: ReadingHistoryItem | null;
  versesReadToday: number;
  onIncrementVersesRead: (count: number) => void;
  onResetKhatam: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  onOpenSurah,
  lastRead,
  versesReadToday,
  onIncrementVersesRead,
  onResetKhatam,
}) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredBookmarks = bookmarks.filter((b) => {
    if (selectedCategory === 'all') return true;
    return b.category === selectedCategory;
  });

  // 6236 total verses in Quran. 30-day challenge target ~208 verses/day
  const TOTAL_VERSES = 6236;
  const targetPerDay = 208;
  const progressPercent = Math.min(100, Math.round((versesReadToday / targetPerDay) * 100));

  const handleAddRead = (count: number) => {
    onIncrementVersesRead(count);
    if (versesReadToday + count >= targetPerDay) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#064B32', '#E9B949', '#08784F', '#F7D070'],
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12 text-start">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#064B32] via-[#08784F] to-[#09251B] text-[#FFFDF5] shadow-xl border border-[#E9B949]/30 islamic-pattern">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#E9B949]/20 text-[#FFF4D6] text-xs font-bold border border-[#E9B949]/40 inline-flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-[#E9B949]" />
            {bookmarks.length} Ayat Tersimpan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.bookmarks.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#FFF4D6]/90 max-w-xl">
            {t.bookmarks.subtitle}
          </p>
        </div>
      </div>

      {/* Khatam 30-Day Tracker Challenge */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E9B949]/20 text-[#064B32] dark:text-[#E9B949] flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-[#09251B] dark:text-[#FFFDF5]">
                {t.bookmarks.khatamTracker} (30 Hari)
              </h2>
              <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                Target harian: ~{targetPerDay} ayat (1 Juz/hari)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddRead(5)}
              className="px-3 py-1.5 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-[#064B32] dark:text-[#E9B949] text-xs font-bold hover:bg-[#FFF4D6] transition"
            >
              +5 Ayat
            </button>
            <button
              onClick={() => handleAddRead(20)}
              className="px-3 py-1.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold shadow transition"
            >
              +20 Ayat (1 Ruku')
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-[#09251B] dark:text-[#FFFDF5]">
            <span>Hari ini: {versesReadToday} / {targetPerDay} ayat</span>
            <span className="text-[#08784F] dark:text-[#E9B949] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#F5F7F2] dark:bg-[#09251B] h-3 rounded-full overflow-hidden border border-[#DCE5DD] dark:border-[#1E4E3B]">
            <div
              className="bg-gradient-to-r from-[#08784F] to-[#E9B949] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {progressPercent >= 100 && (
          <div className="p-3 rounded-xl bg-[#E9B949]/20 border border-[#E9B949]/40 text-xs font-bold text-[#064B32] dark:text-[#E9B949] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>{t.bookmarks.congratulations}</span>
          </div>
        )}
      </div>

      {/* Last Read Verse */}
      {lastRead && (
        <div className="bg-gradient-to-r from-[#064B32]/10 via-[#E9B949]/15 to-[#08784F]/10 dark:from-[#0E3326] dark:to-[#133D2E] rounded-3xl p-5 sm:p-6 border border-[#E9B949]/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#064B32] text-[#E9B949] flex items-center justify-center flex-shrink-0 shadow">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-extrabold text-[#064B32] dark:text-[#E9B949]">
                {t.bookmarks.lastRead}
              </p>
              <h3 className="text-base sm:text-lg font-black text-[#09251B] dark:text-[#FFFDF5]">
                Surah {lastRead.surahName} • Ayat {lastRead.ayahNumber}
              </h3>
            </div>
          </div>
          <button
            onClick={() => onOpenSurah(lastRead.surahNumber, lastRead.ayahNumber)}
            className="px-4 py-2 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold shadow flex items-center gap-1.5 transition"
          >
            <span>Buka Ayat</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: t.bookmarks.categories.all },
          { key: 'favorite', label: t.bookmarks.categories.favorite },
          { key: 'daily', label: t.bookmarks.categories.daily },
          { key: 'memorization', label: t.bookmarks.categories.memorization },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              selectedCategory === cat.key
                ? 'bg-[#064B32] text-white shadow'
                : 'bg-white dark:bg-[#0E3326] text-[#52665B] dark:text-[#A3BAAD] border border-[#DCE5DD] dark:border-[#1E4E3B]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Bookmarks List */}
      {filteredBookmarks.length > 0 ? (
        <div className="space-y-3">
          {filteredBookmarks.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#0E3326] border border-[#DCE5DD] dark:border-[#1E4E3B] hover:shadow-md transition space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#064B32] text-[#FFFDF5] font-mono text-xs font-bold flex items-center justify-center">
                    {b.ayahNumber}
                  </span>
                  <span className="font-bold text-sm text-[#09251B] dark:text-[#FFFDF5]">
                    QS. {b.surahName}: {b.ayahNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#E9B949]/20 text-[#064B32] dark:text-[#E9B949] text-[10px] font-bold uppercase">
                    {b.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenSurah(b.surahNumber, b.ayahNumber)}
                    className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-[#064B32] dark:text-[#E9B949] hover:bg-[#FFF4D6] transition"
                    title="Buka di Mushaf"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(b.id)}
                    className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                    title="Hapus Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic preview */}
              <p
                dir="rtl"
                className="font-arabic text-xl text-end text-[#064B32] dark:text-[#FFFDF5] leading-loose"
              >
                {b.textArabic}
              </p>

              {/* Translation */}
              <p className="text-xs text-[#52665B] dark:text-[#A3BAAD] line-clamp-2">
                "{b.translation}"
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-white dark:bg-[#0E3326] border border-dashed border-[#DCE5DD] dark:border-[#1E4E3B] text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F5F7F2] dark:bg-[#133D2E] text-[#52665B] dark:text-[#A3BAAD] flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
            {t.bookmarks.noBookmarks}
          </h3>
          <p className="text-xs text-[#52665B] dark:text-[#A3BAAD] max-w-sm mx-auto">
            {t.bookmarks.noBookmarksDesc}
          </p>
        </div>
      )}
    </div>
  );
};
