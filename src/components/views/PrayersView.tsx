import React, { useState, useMemo } from 'react';
import {
  Clock,
  MapPin,
  Compass,
  Bell,
  Calendar,
  Volume2,
  ChevronRight,
  Sparkles,
  Settings,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { PrayerTimesData, NextPrayerInfo } from '../../types';
import { calculateAstronomicalTimes, calculateQiblaDirection, CALCULATION_METHODS } from '../../services/prayerService';

interface PrayersViewProps {
  prayerTimes: PrayerTimesData;
  nextPrayer: NextPrayerInfo;
  onOpenLocation: () => void;
  onOpenAdzan: () => void;
  onOpenQibla: () => void;
  currentMethod: string;
}

export const PrayersView: React.FC<PrayersViewProps> = ({
  prayerTimes,
  nextPrayer,
  onOpenLocation,
  onOpenAdzan,
  onOpenQibla,
  currentMethod,
}) => {
  const { t, formatDate } = useLanguage();
  const [selectedMonthOffset, setSelectedMonthOffset] = useState(0);

  const qiblaAngle = calculateQiblaDirection(prayerTimes.latitude, prayerTimes.longitude);

  const prayers = [
    { key: 'imsak', name: t.prayers.imsak, time: prayerTimes.imsak, isNext: nextPrayer.name === 'imsak' },
    { key: 'fajr', name: t.prayers.fajr, time: prayerTimes.fajr, isNext: nextPrayer.name === 'fajr' },
    { key: 'sunrise', name: t.prayers.sunrise, time: prayerTimes.sunrise, isNext: nextPrayer.name === 'sunrise' },
    { key: 'dhuhr', name: t.prayers.dhuhr, time: prayerTimes.dhuhr, isNext: nextPrayer.name === 'dhuhr' },
    { key: 'asr', name: t.prayers.asr, time: prayerTimes.asr, isNext: nextPrayer.name === 'asr' },
    { key: 'maghrib', name: t.prayers.maghrib, time: prayerTimes.maghrib, isNext: nextPrayer.name === 'maghrib' },
    { key: 'isha', name: t.prayers.isha, time: prayerTimes.isha, isNext: nextPrayer.name === 'isha' },
  ];

  // Generate 30 days monthly schedule for the selected location
  const monthlySchedule = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let day = 1; day <= 30; day++) {
      const d = new Date(today.getFullYear(), today.getMonth() + selectedMonthOffset, day);
      const times = calculateAstronomicalTimes(
        d,
        prayerTimes.latitude,
        prayerTimes.longitude,
        currentMethod,
        undefined,
        prayerTimes.timezone || 'Asia/Jakarta'
      );
      list.push({
        dayNumber: day,
        dateStr: d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' }),
        hijriStr: `${times.dateHijri.day} ${times.dateHijri.monthName}`,
        times,
      });
    }
    return list;
  }, [prayerTimes.latitude, prayerTimes.longitude, currentMethod, selectedMonthOffset]);

  const methodName = CALCULATION_METHODS[currentMethod]?.name || currentMethod;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Card: Live Countdown & Location */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#064B32] via-[#08784F] to-[#09251B] text-[#FFFDF5] shadow-xl border border-[#E9B949]/30 text-start relative overflow-hidden islamic-pattern">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#E9B949]/20 text-[#FFF4D6] text-xs font-bold border border-[#E9B949]/40 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E9B949]" />
                {prayerTimes.locationName}, {prayerTimes.country}
              </span>
              <button
                onClick={onOpenLocation}
                className="text-xs text-[#E9B949] hover:underline font-semibold"
              >
                Ganti Lokasi
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.prayers.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#FFF4D6]/90 max-w-xl">
              Metode: {methodName} • {prayerTimes.dateHijri.formatted}
            </p>
          </div>

          {/* Countdown timer badge */}
          <div className="rounded-2xl bg-black/30 backdrop-blur-md p-4 sm:p-5 border border-[#E9B949]/40 min-w-[260px]">
            <p className="text-xs text-[#FFF4D6]/80 font-bold uppercase tracking-wider">
              {t.prayers.nextIn} {t.prayers[nextPrayer.name as keyof typeof t.prayers] || nextPrayer.name} ({nextPrayer.timeStr})
            </p>
            <p className="font-mono text-3xl font-black text-[#E9B949] my-1">
              {nextPrayer.remainingFormatted}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[#E9B949] h-full rounded-full transition-all duration-500"
                style={{ width: `${nextPrayer.progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule Cards */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] text-start">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#08784F] dark:text-[#E9B949]" />
            <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              Waktu Salat Hari Ini • {formatDate(new Date())}
            </h2>
          </div>
          <button
            onClick={onOpenAdzan}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold transition shadow-sm"
          >
            <Bell className="w-3.5 h-3.5 text-[#E9B949]" />
            <span>Pengaturan Adzan</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {prayers.map((p) => {
            return (
              <div
                key={p.key}
                className={`p-4 rounded-2xl transition-all duration-200 border text-center ${
                  p.isNext
                    ? 'bg-gradient-to-b from-[#064B32] to-[#08784F] text-[#FFFDF5] shadow-lg border-2 border-[#E9B949] scale-105'
                    : 'bg-[#F5F7F2] dark:bg-[#133D2E] text-[#09251B] dark:text-[#FFFDF5] border-[#DCE5DD] dark:border-[#1E4E3B]'
                }`}
              >
                <p className={`text-xs font-bold uppercase ${p.isNext ? 'text-[#FFF4D6]' : 'text-[#52665B] dark:text-[#A3BAAD]'}`}>
                  {p.name}
                </p>
                <p className="font-mono text-xl sm:text-2xl font-black mt-1.5 tracking-tight">
                  {p.time}
                </p>
                {p.isNext && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#E9B949] text-[#09251B] text-[10px] font-bold mt-2">
                    Berikutnya
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Qibla Direction Shortcut Banner */}
      <div className="bg-gradient-to-r from-[#064B32] to-[#08784F] text-[#FFFDF5] rounded-3xl p-6 shadow-md border border-[#E9B949]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E9B949] text-[#09251B] flex items-center justify-center font-bold text-xl shadow flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base">{t.prayers.qiblaDirection}</h3>
            <p className="text-xs text-[#FFF4D6]/90 mt-0.5">
              {qiblaAngle}° {t.prayers.towardKaaba} ({prayerTimes.locationName})
            </p>
          </div>
        </div>
        <button
          onClick={onOpenQibla}
          className="px-5 py-2.5 rounded-xl bg-[#FFFDF5] hover:bg-[#FFF4D6] text-[#064B32] font-bold text-xs shadow-md transition active:scale-95 flex-shrink-0"
        >
          Buka Kompas Kiblat
        </button>
      </div>

      {/* Full Monthly Schedule Table */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] text-start">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#08784F] dark:text-[#E9B949]" />
            <h3 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
              {t.prayers.monthlySchedule}
            </h3>
          </div>
          <span className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
            Hisab Astronomis Terverifikasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-[#DCE5DD] dark:border-[#1E4E3B] text-[#52665B] dark:text-[#A3BAAD] uppercase font-bold text-[10px]">
                <th className="py-2.5 px-3">Tgl</th>
                <th className="py-2.5 px-3">Hijriah</th>
                <th className="py-2.5 px-3">Imsak</th>
                <th className="py-2.5 px-3">Subuh</th>
                <th className="py-2.5 px-3">Terbit</th>
                <th className="py-2.5 px-3">Zuhur</th>
                <th className="py-2.5 px-3">Asar</th>
                <th className="py-2.5 px-3">Magrib</th>
                <th className="py-2.5 px-3">Isya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE5DD]/60 dark:divide-[#1E4E3B]/60">
              {monthlySchedule.map((row) => (
                <tr
                  key={row.dayNumber}
                  className="hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E] transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-[#09251B] dark:text-[#FFFDF5]">
                    {row.dateStr}
                  </td>
                  <td className="py-2.5 px-3 text-[#52665B] dark:text-[#A3BAAD]">
                    {row.hijriStr}
                  </td>
                  <td className="py-2.5 px-3 font-mono">{row.times.imsak}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#064B32] dark:text-[#E9B949]">
                    {row.times.fajr}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-gray-500">{row.times.sunrise}</td>
                  <td className="py-2.5 px-3 font-mono">{row.times.dhuhr}</td>
                  <td className="py-2.5 px-3 font-mono">{row.times.asr}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-[#064B32] dark:text-[#E9B949]">
                    {row.times.maghrib}
                  </td>
                  <td className="py-2.5 px-3 font-mono">{row.times.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
