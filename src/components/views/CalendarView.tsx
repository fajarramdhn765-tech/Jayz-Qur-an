import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Star,
  Info,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getHijriDate } from '../../services/prayerService';

export const CalendarView: React.FC = () => {
  const { t, formatDate } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentHijri = useMemo(() => getHijriDate(currentDate), [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Days in month calculation
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const calendarDays = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ empty: true, id: `empty-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon, 4 = Thu
      const hijri = getHijriDate(d);

      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day;

      const isAyyamulBidh = hijri.day === 13 || hijri.day === 14 || hijri.day === 15;
      const isMondayThursday = dayOfWeek === 1 || dayOfWeek === 4;

      days.push({
        empty: false,
        id: `day-${day}`,
        dayNumber: day,
        hijriDay: hijri.day,
        hijriMonth: hijri.monthName,
        isToday,
        isAyyamulBidh,
        isMondayThursday,
      });
    }

    return days;
  }, [year, month, daysInMonth, firstDayIndex]);

  const islamicEvents = [
    { title: t.calendar.eventRamadan, hijri: "1 Ramadan 1448 H", desc: "Awal bulan suci berpuasa satu bulan penuh", badge: "Wajib" },
    { title: t.calendar.eventEidFitr, hijri: "1 Syawal 1448 H", desc: "Hari kemenangan Idul Fitri bagi kaum muslimin", badge: "Hari Raya" },
    { title: t.calendar.eventArafah, hijri: "9 Dzulhijjah 1448 H", desc: "Puasa Arafah menghapus dosa setahun lalu dan setahun mendatang", badge: "Sunnah Utama" },
    { title: t.calendar.eventEidAdha, hijri: "10 Dzulhijjah 1448 H", desc: "Hari Raya Qurban dan penyembelihan hewan ternak", badge: "Hari Raya" },
    { title: t.calendar.eventNewYear, hijri: "1 Muharram 1449 H", desc: "Awal tahun penanggalan Hijriah umat Islam", badge: "Peringatan" },
    { title: t.calendar.eventMawlid, hijri: "12 Rabiul Awal 1449 H", desc: "Kelahiran teladan mulia Rasulullah SAW", badge: "Peringatan" },
    { title: t.calendar.eventIsraMiraj, hijri: "27 Rajab 1448 H", desc: "Perjalanan agung Rasulullah dan perintah salat lima waktu", badge: "Peringatan" },
  ];

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#064B32] via-[#08784F] to-[#09251B] text-[#FFFDF5] shadow-xl border border-[#E9B949]/30 text-start islamic-pattern">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#E9B949]/20 text-[#FFF4D6] text-xs font-bold border border-[#E9B949]/40 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E9B949]" />
            {currentHijri.formatted}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.calendar.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#FFF4D6]/90 max-w-xl">
            {t.calendar.subtitle}
          </p>
        </div>
      </div>

      {/* Dual Calendar Container */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-5 sm:p-7 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] text-start">
        {/* Month Header & Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DCE5DD] dark:border-[#1E4E3B]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#09251B] dark:text-[#FFFDF5]">
              {monthNames[month]} {year}
            </h2>
            <p className="text-xs text-[#08784F] dark:text-[#E9B949] font-semibold mt-0.5">
              Bulan Hijriah: {currentHijri.monthName} ({currentHijri.monthArabic}) {currentHijri.year} H
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-[#09251B] dark:text-[#FFFDF5] hover:bg-[#FFF4D6] transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-bold transition"
            >
              Hari Ini
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl bg-[#F5F7F2] dark:bg-[#133D2E] text-[#09251B] dark:text-[#FFFDF5] hover:bg-[#FFF4D6] transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 py-3 text-xs text-[#52665B] dark:text-[#A3BAAD]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E9B949]" />
            <span>Puasa Ayyamul Bidh (13, 14, 15)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#08784F]" />
            <span>Puasa Senin & Kamis</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#064B32] border border-white" />
            <span>Hari Ini</span>
          </div>
        </div>

        {/* Weekday Names */}
        <div className="grid grid-cols-7 gap-2 text-center py-2 text-xs font-bold text-[#52665B] dark:text-[#A3BAAD] uppercase">
          <span>Min</span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((item) => {
            if (item.empty) {
              return <div key={item.id} className="h-16 sm:h-20" />;
            }

            return (
              <div
                key={item.id}
                className={`h-16 sm:h-20 p-2 rounded-2xl border transition-all flex flex-col justify-between ${
                  item.isToday
                    ? 'bg-[#064B32] text-white border-2 border-[#E9B949] shadow-md'
                    : item.isAyyamulBidh
                    ? 'bg-[#E9B949]/15 dark:bg-[#E9B949]/20 border-[#E9B949] text-[#09251B] dark:text-[#FFFDF5]'
                    : item.isMondayThursday
                    ? 'bg-[#08784F]/10 dark:bg-[#08784F]/20 border-[#08784F]/40 text-[#09251B] dark:text-[#FFFDF5]'
                    : 'bg-[#F5F7F2] dark:bg-[#133D2E] border-transparent text-[#09251B] dark:text-[#FFFDF5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-bold ${item.isToday ? 'text-white' : ''}`}>
                    {item.dayNumber}
                  </span>
                  <span className={`text-[10px] font-bold ${item.isToday ? 'text-[#E9B949]' : 'text-[#52665B] dark:text-[#A3BAAD]'}`}>
                    {item.hijriDay}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  {item.isAyyamulBidh && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-[#E9B949] text-[#09251B] truncate">
                      Bidh
                    </span>
                  )}
                  {item.isMondayThursday && !item.isAyyamulBidh && (
                    <span className="text-[9px] font-semibold text-[#08784F] dark:text-[#E9B949] truncate">
                      Sunnah
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Islamic Events List */}
      <div className="bg-white dark:bg-[#0E3326] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#DCE5DD] dark:border-[#1E4E3B] text-start space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#E9B949]" />
          <h2 className="font-bold text-base text-[#09251B] dark:text-[#FFFDF5]">
            {t.calendar.islamicEvents} & Hari-Hari Penting
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {islamicEvents.map((ev, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F5F7F2] dark:bg-[#133D2E] border border-[#DCE5DD] dark:border-[#1E4E3B] space-y-1"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#09251B] dark:text-[#FFFDF5]">
                  {ev.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#064B32] text-[#FFFDF5] text-[10px] font-bold">
                  {ev.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#08784F] dark:text-[#E9B949]">
                {ev.hijri}
              </p>
              <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">
                {ev.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
