import { PrayerTimesData, NextPrayerInfo } from '../types';

export interface LocationPreset {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  defaultMethod: string;
}

export const PRESET_LOCATIONS: LocationPreset[] = [
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456, timezone: 'Asia/Jakarta', defaultMethod: 'KEMENAG' },
  { city: 'Makkah', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262, timezone: 'Asia/Riyadh', defaultMethod: 'UMM_AL_QURA' },
  { city: 'Madinah', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6111, timezone: 'Asia/Riyadh', defaultMethod: 'UMM_AL_QURA' },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur', defaultMethod: 'MWL' },
  { city: 'Istanbul', country: 'Türkiye', latitude: 41.0082, longitude: 28.9784, timezone: 'Europe/Istanbul', defaultMethod: 'MWL' },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo', defaultMethod: 'EGYPT' },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', defaultMethod: 'ISNA' },
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York', defaultMethod: 'ISNA' },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011, timezone: 'Asia/Karachi', defaultMethod: 'KARACHI' },
  { city: 'Singapore', country: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore', defaultMethod: 'MWL' },
  { city: 'Bandung', country: 'Indonesia', latitude: -6.9175, longitude: 107.6191, timezone: 'Asia/Jakarta', defaultMethod: 'KEMENAG' },
  { city: 'Surabaya', country: 'Indonesia', latitude: -7.2575, longitude: 112.7521, timezone: 'Asia/Jakarta', defaultMethod: 'KEMENAG' },
  { city: 'Makassar', country: 'Indonesia', latitude: -5.1477, longitude: 119.4327, timezone: 'Asia/Makassar', defaultMethod: 'KEMENAG' },
];

export interface CalculationMethod {
  id: string;
  name: string;
  fajrAngle: number;
  ishaAngle: number;
  ishaInterval?: number; // Minutes after maghrib (e.g. Umm Al-Qura)
}

export const CALCULATION_METHODS: Record<string, CalculationMethod> = {
  KEMENAG: { id: 'KEMENAG', name: 'Kemenag RI (Indonesia)', fajrAngle: 20, ishaAngle: 18 },
  MWL: { id: 'MWL', name: 'Muslim World League (MWL)', fajrAngle: 18, ishaAngle: 17 },
  UMM_AL_QURA: { id: 'UMM_AL_QURA', name: 'Umm Al-Qura (Makkah)', fajrAngle: 18.5, ishaAngle: 0, ishaInterval: 90 },
  EGYPT: { id: 'EGYPT', name: 'Egyptian General Authority', fajrAngle: 19.5, ishaAngle: 17.5 },
  ISNA: { id: 'ISNA', name: 'ISNA (North America)', fajrAngle: 15, ishaAngle: 15 },
  KARACHI: { id: 'KARACHI', name: 'Univ. of Islamic Sciences, Karachi', fajrAngle: 18, ishaAngle: 18 },
};

// Ka'aba Coordinates in Makkah
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export function calculateQiblaDirection(lat: number, lng: number): number {
  const phiK = (KAABA_LAT * Math.PI) / 180.0;
  const lambdaK = (KAABA_LNG * Math.PI) / 180.0;
  const phi = (lat * Math.PI) / 180.0;
  const lambda = (lng * Math.PI) / 180.0;

  const y = Math.sin(lambdaK - lambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
  let qibla = (Math.atan2(y, x) * 180.0) / Math.PI;
  return Math.round((qibla + 360) % 360);
}

// Convert Julian Day to Hijri Date
export function getHijriDate(date: Date = new Date()): {
  day: number;
  monthName: string;
  monthArabic: string;
  year: number;
  formatted: string;
} {
  const hijriMonths = [
    { en: 'Muharram', ar: 'مُحَرَّم' },
    { en: 'Safar', ar: 'صَفَر' },
    { en: "Rabi' al-Awwal", ar: 'رَبِيع ٱلأَوَّل' },
    { en: "Rabi' al-Thani", ar: 'رَبِيع ٱلآخِر' },
    { en: 'Jumada al-Awwal', ar: 'جُمَادَىٰ ٱلأُولَىٰ' },
    { en: 'Jumada al-Thani', ar: 'جُمَادَىٰ ٱلآخِرَة' },
    { en: 'Rajab', ar: 'رَجَب' },
    { en: "Sha'ban", ar: 'شَعْبَان' },
    { en: 'Ramadan', ar: 'رَمَضَان' },
    { en: 'Shawwal', ar: 'شَوَّال' },
    { en: "Dhu al-Qi'dah", ar: 'ذُو ٱلْقَعْدَة' },
    { en: 'Dhu al-Hijjah', ar: 'ذُو ٱلْحِجَّة' },
  ];

  try {
    // Modern browsers Intl with islamic-umalqura calendar
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const day = parseInt(parts.find((p) => p.type === 'day')?.value || '1', 10);
    const monthIdx = parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10) - 1;
    const year = parseInt(parts.find((p) => p.type === 'year')?.value || '1448', 10);

    const safeMonthIdx = Math.max(0, Math.min(11, monthIdx));
    const m = hijriMonths[safeMonthIdx];

    return {
      day,
      monthName: m.en,
      monthArabic: m.ar,
      year,
      formatted: `${day} ${m.en} ${year} H`,
    };
  } catch {
    return {
      day: 15,
      monthName: 'Jumada al-Awwal',
      monthArabic: 'جُمَادَىٰ ٱلأُولَىٰ',
      year: 1448,
      formatted: '15 Jumada al-Awwal 1448 H',
    };
  }
}

export function getTimezoneOffsetFromLocation(timezoneStr: string, date: Date = new Date()): number {
  try {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezoneStr }));
    return (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  } catch {
    if (timezoneStr.includes('Jakarta') || timezoneStr.includes('Bangkok')) return 7;
    if (timezoneStr.includes('Makassar') || timezoneStr.includes('Singapore') || timezoneStr.includes('Kuala_Lumpur')) return 8;
    if (timezoneStr.includes('Riyadh')) return 3;
    if (timezoneStr.includes('Istanbul')) return 3;
    if (timezoneStr.includes('Cairo')) return 2;
    if (timezoneStr.includes('Karachi')) return 5;
    if (timezoneStr.includes('London')) return 0;
    if (timezoneStr.includes('New_York')) return -5;
    return 7;
  }
}

// Astronomical Prayer Times Calculation Engine
export function calculateAstronomicalTimes(
  date: Date,
  lat: number,
  lng: number,
  methodId: string = 'KEMENAG',
  timezoneOffsetHours?: number,
  timezoneStr: string = 'Asia/Jakarta'
): PrayerTimesData {
  const method = CALCULATION_METHODS[methodId] || CALCULATION_METHODS.KEMENAG;

  // Day of year and Julian calculations
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Offset in hours relative to UTC
  const tzOffset = timezoneOffsetHours !== undefined 
    ? timezoneOffsetHours 
    : getTimezoneOffsetFromLocation(timezoneStr, date);

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  const d = jd - 2451545.0; // Days since J2000.0

  // Mean anomaly and solar longitude
  const q = 280.459 + 0.98564736 * d;
  const g = ((357.529 + 0.98560028 * d) * Math.PI) / 180;
  const L = ((q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * Math.PI) / 180;

  // Obliquity of ecliptic
  const e = (23.439 - 0.00000036 * d) * (Math.PI / 180);

  // Right ascension and Declination
  const sinDec = Math.sin(e) * Math.sin(L);
  const cosDec = Math.cos(Math.asin(sinDec));
  const dec = Math.asin(sinDec);

  const RA = (Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)) * 180) / Math.PI;
  const EqT = q / 15 - RA / 15; // Equation of time in hours

  // Solar noon
  const noon = 12 + tzOffset - lng / 15 - EqT;

  const deg2rad = Math.PI / 180;
  const rad2deg = 180 / Math.PI;

  const sunAngle = (angle: number): number => {
    const val = (-Math.sin(angle * deg2rad) - Math.sin(lat * deg2rad) * sinDec) / (Math.cos(lat * deg2rad) * cosDec);
    if (val > 1 || val < -1) return 0;
    return (Math.acos(val) * rad2deg) / 15;
  };

  // Asr calculation (Shafi'i: shadow factor = 1)
  const asrShadow = (shadowFactor: number = 1): number => {
    const val = Math.sin(Math.atan(1 / (shadowFactor + Math.tan(Math.abs((lat * deg2rad) - dec)))));
    const cosH = (val - Math.sin(lat * deg2rad) * sinDec) / (Math.cos(lat * deg2rad) * cosDec);
    if (cosH > 1 || cosH < -1) return 0;
    return (Math.acos(cosH) * rad2deg) / 15;
  };

  const fajrDiff = sunAngle(method.fajrAngle);
  const sunriseDiff = sunAngle(0.833);
  const maghribDiff = sunAngle(0.833);
  const asrDiff = asrShadow(1);

  const fajrTime = noon - fajrDiff;
  const sunriseTime = noon - sunriseDiff;
  const dhuhrTime = noon + (2 / 60); // 2 minutes ihtiyat
  const asrTime = noon + asrDiff;
  const maghribTime = noon + maghribDiff;

  let ishaTime: number;
  if (method.ishaInterval) {
    ishaTime = maghribTime + (method.ishaInterval / 60);
  } else {
    ishaTime = noon + sunAngle(method.ishaAngle);
  }

  // Imsak is 10 minutes before Fajr
  const imsakTime = fajrTime - (10 / 60);

  const formatHours = (hours: number): string => {
    let normalized = ((hours % 24) + 24) % 24;
    const h = Math.floor(normalized);
    const m = Math.floor((normalized - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const hijri = getHijriDate(date);

  return {
    imsak: formatHours(imsakTime),
    fajr: formatHours(fajrTime),
    sunrise: formatHours(sunriseTime),
    dhuhr: formatHours(dhuhrTime),
    asr: formatHours(asrTime),
    maghrib: formatHours(maghribTime),
    isha: formatHours(ishaTime),
    dateGregorian: date.toISOString().split('T')[0],
    dateHijri: hijri,
    timezone: timezoneStr,
    locationName: 'Jakarta',
    country: 'Indonesia',
    latitude: lat,
    longitude: lng,
  };
}

export function getNextPrayer(times: PrayerTimesData, now: Date = new Date()): NextPrayerInfo {
  // Convert now into location's timezone local time
  let currentHours: number;
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: times.timezone,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const h = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const m = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const s = parseInt(parts.find((p) => p.type === 'second')?.value || '0', 10);
    currentHours = (h % 24) + m / 60 + s / 3600;
  } catch {
    currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  }

  const toHours = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return ((h % 24) + 24) % 24 + (m || 0) / 60;
  };

  const schedule: { name: NextPrayerInfo['name']; hours: number; timeStr: string }[] = [
    { name: 'imsak', hours: toHours(times.imsak), timeStr: times.imsak },
    { name: 'fajr', hours: toHours(times.fajr), timeStr: times.fajr },
    { name: 'sunrise', hours: toHours(times.sunrise), timeStr: times.sunrise },
    { name: 'dhuhr', hours: toHours(times.dhuhr), timeStr: times.dhuhr },
    { name: 'asr', hours: toHours(times.asr), timeStr: times.asr },
    { name: 'maghrib', hours: toHours(times.maghrib), timeStr: times.maghrib },
    { name: 'isha', hours: toHours(times.isha), timeStr: times.isha },
  ];

  let next = schedule.find((s) => s.hours > currentHours);
  let prevHours: number;

  if (!next) {
    // Next prayer is tomorrow's Imsak
    next = schedule[0];
    prevHours = schedule[schedule.length - 1].hours;
    const diffHours = (24 - currentHours) + next.hours;
    const totalSpan = (24 - prevHours) + next.hours;
    const remainingSeconds = Math.max(0, Math.floor(diffHours * 3600));

    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    const progress = Math.min(100, Math.max(0, Math.round(((totalSpan - diffHours) / totalSpan) * 100)));

    return {
      name: next.name,
      timeStr: next.timeStr,
      remainingSeconds,
      remainingFormatted: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
      progressPercent: progress,
    };
  }

  const nextIdx = schedule.indexOf(next);
  prevHours = nextIdx === 0 ? schedule[schedule.length - 1].hours - 24 : schedule[nextIdx - 1].hours;

  const diffHours = next.hours - currentHours;
  const totalSpan = next.hours - prevHours;
  const remainingSeconds = Math.max(0, Math.floor(diffHours * 3600));

  const h = Math.floor(remainingSeconds / 3600);
  const m = Math.floor((remainingSeconds % 3600) / 60);
  const s = remainingSeconds % 60;

  const progress = Math.min(100, Math.max(0, Math.round(((totalSpan - diffHours) / totalSpan) * 100)));

  return {
    name: next.name,
    timeStr: next.timeStr,
    remainingSeconds,
    remainingFormatted: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
    progressPercent: progress,
  };
}
