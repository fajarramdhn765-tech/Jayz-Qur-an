import { AppLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  isRTL: boolean;
  nav: {
    home: string;
    quran: string;
    prayerTimes: string;
    calendar: string;
    bookmarks: string;
    settings: string;
  };
  home: {
    greeting: string;
    subtitle: string;
    prayerSchedule: string;
    nextPrayer: string;
    timeRemaining: string;
    changeLocation: string;
    viewFullSchedule: string;
    dailyVerse: string;
    dailyVerseTitle: string;
    dailyVerseMeaning: string;
    readSurah: string;
    shareVerse: string;
    verseCopied: string;
    quickAccess: string;
    quranAction: string;
    tafsirAction: string;
    prayerAction: string;
    adzanAction: string;
    calendarAction: string;
    qiblaAction: string;
    lastRead: string;
    continueReading: string;
  };
  prayers: {
    title: string;
    subtitle: string;
    imsak: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    nextIn: string;
    nowTime: string;
    adzanReminder: string;
    testAdzan: string;
    stopAdzan: string;
    adzanSound: string;
    selectCity: string;
    detectGPS: string;
    calcMethod: string;
    qiblaDirection: string;
    towardKaaba: string;
    monthlySchedule: string;
    hijriDateLabel: string;
  };
  quran: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    surahTab: string;
    juzTab: string;
    revelationMeccan: string;
    revelationMedinan: string;
    versesCount: string;
    verses: string;
    playAudio: string;
    pauseAudio: string;
    listenAll: string;
    showTranslation: string;
    showLatin: string;
    showTafsir: string;
    arabicSize: string;
    translationLang: string;
    bookmarkAdded: string;
    bookmarkRemoved: string;
    copySuccess: string;
    tafsirTitle: string;
    qariReciter: string;
    nextSurah: string;
    prevSurah: string;
  };
  calendar: {
    title: string;
    subtitle: string;
    islamicEvents: string;
    sunnahFasting: string;
    ayyamulBidh: string;
    mondayThursday: string;
    upcomingDays: string;
    eventRamadan: string;
    eventEidFitr: string;
    eventArafah: string;
    eventEidAdha: string;
    eventNewYear: string;
    eventMawlid: string;
    eventIsraMiraj: string;
  };
  bookmarks: {
    title: string;
    subtitle: string;
    lastRead: string;
    noBookmarks: string;
    noBookmarksDesc: string;
    khatamTracker: string;
    khatamProgress: string;
    targetDays: string;
    versesReadToday: string;
    congratulations: string;
    categories: {
      all: string;
      favorite: string;
      daily: string;
      memorization: string;
    };
  };
  settings: {
    title: string;
    subtitle: string;
    appearance: string;
    themeMode: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    appLanguage: string;
    appLanguageDesc: string;
    followDevice: string;
    quranTranslation: string;
    quranTranslationDesc: string;
    quranAudio: string;
    defaultQari: string;
    readingExperience: string;
    arabicFontSize: string;
    transFontSize: string;
    notifications: string;
    prayerAlerts: string;
    about: string;
    version: string;
    developedForUmmah: string;
    pwaInstall: string;
    pwaInstalled: string;
  };
  common: {
    close: string;
    save: string;
    cancel: string;
    search: string;
    loading: string;
    error: string;
    retry: string;
    copied: string;
    offlineMode: string;
    onlineMode: string;
    viewAll: string;
  };
}

export const translations: Record<AppLanguage, TranslationDictionary> = {
  'id-ID': {
    appName: "Jay’z Qur’an",
    tagline: "Dekat dengan Al-Qur’an, Setiap Waktu",
    isRTL: false,
    nav: {
      home: "Beranda",
      quran: "Al-Qur'an",
      prayerTimes: "Jadwal Salat",
      calendar: "Kalender",
      bookmarks: "Bookmark",
      settings: "Pengaturan"
    },
    home: {
      greeting: "Assalamu’alaikum Warahmatullahi Wabarakatuh",
      subtitle: "Mari bersholawat dan membaca firman Allah Subhanahu wa Ta'ala",
      prayerSchedule: "Jadwal Salat",
      nextPrayer: "Salat Berikutnya",
      timeRemaining: "menuju waktu",
      changeLocation: "Ganti Kota / Koordinat",
      viewFullSchedule: "Lihat Jadwal Lengkap",
      dailyVerse: "Ayat Hari Ini",
      dailyVerseTitle: "Tadabbur Qur'ani",
      dailyVerseMeaning: "Mutiara hikmah petunjuk kehidupan dari Al-Qur'an Al-Karim",
      readSurah: "Baca Surah",
      shareVerse: "Bagikan Ayat",
      verseCopied: "Ayat disalin ke papan klip",
      quickAccess: "Akses Cepat",
      quranAction: "Baca Al-Qur'an",
      tafsirAction: "Tafsir & Terjemah",
      prayerAction: "Jadwal Salat",
      adzanAction: "Adzan & Alarm",
      calendarAction: "Kalender Hijriah",
      qiblaAction: "Arah Kiblat",
      lastRead: "Terakhir Dibaca",
      continueReading: "Lanjutkan Membaca"
    },
    prayers: {
      title: "Jadwal Salat & Waktu Ibadah",
      subtitle: "Jadwal akurat berdasarkan koordinat dan hisab astronomis terpercaya",
      imsak: "Imsak",
      fajr: "Subuh",
      sunrise: "Terbit",
      dhuhr: "Zuhur",
      asr: "Asar",
      maghrib: "Magrib",
      isha: "Isya",
      nextIn: "Menuju",
      nowTime: "Waktu Sekarang",
      adzanReminder: "Pengingat Adzan",
      testAdzan: "Putar Adzan",
      stopAdzan: "Hentikan Adzan",
      adzanSound: "Pilihan Nada Adzan",
      selectCity: "Pilih Kota",
      detectGPS: "Gunakan Lokasi GPS",
      calcMethod: "Metode Perhitungan",
      qiblaDirection: "Kompas Arah Kiblat",
      towardKaaba: "derajat dari Utara menuju Ka'bah di Makkah",
      monthlySchedule: "Jadwal Bulanan",
      hijriDateLabel: "Tanggal Hijriah"
    },
    quran: {
      title: "Al-Qur'an Al-Karim",
      subtitle: "Teks Arab Utsmani resmi, terjemahan terverifikasi & murottal merdu",
      searchPlaceholder: "Cari nama surah, arti, atau nomor...",
      surahTab: "Daftar Surah",
      juzTab: "Juz 1 - 30",
      revelationMeccan: "Makkiyyah",
      revelationMedinan: "Madaniyyah",
      versesCount: "Ayat",
      verses: "ayat",
      playAudio: "Dengar Murottal",
      pauseAudio: "Jeda Audio",
      listenAll: "Putar Seluruh Surah",
      showTranslation: "Terjemahan",
      showLatin: "Transliterasi Latin",
      showTafsir: "Tafsir",
      arabicSize: "Ukuran Tulisan Arab",
      translationLang: "Bahasa Terjemahan",
      bookmarkAdded: "Ayat ditambahkan ke bookmark",
      bookmarkRemoved: "Ayat dihapus dari bookmark",
      copySuccess: "Teks ayat berhasil disalin",
      tafsirTitle: "Tafsir Ayat",
      qariReciter: "Qari / Pembaca",
      nextSurah: "Surah Selanjutnya",
      prevSurah: "Surah Sebelumnya"
    },
    calendar: {
      title: "Kalender Hijriah & Hari Besar",
      subtitle: "Penanggalan Islam, puasa sunnah, dan peringatan hari besar Islam",
      islamicEvents: "Hari Besar Islam",
      sunnahFasting: "Jadwal Puasa Sunnah",
      ayyamulBidh: "Puasa Ayyamul Bidh (13, 14, 15 Hijriah)",
      mondayThursday: "Puasa Senin & Kamis",
      upcomingDays: "Hari Penting Mendatang",
      eventRamadan: "Awal Ramadan 1448 H",
      eventEidFitr: "Hari Raya Idul Fitri 1 Syawal",
      eventArafah: "Puasa Hari Arafah (9 Dzulhijjah)",
      eventEidAdha: "Hari Raya Idul Adha (10 Dzulhijjah)",
      eventNewYear: "Tahun Baru Islam (1 Muharram)",
      eventMawlid: "Maulid Nabi Muhammad SAW (12 Rabiul Awal)",
      eventIsraMiraj: "Isra' Mi'raj Nabi SAW (27 Rajab)"
    },
    bookmarks: {
      title: "Bookmark & Riwayat Bacaan",
      subtitle: "Simpan ayat favorit dan pantau target khatam Al-Qur'an Anda",
      lastRead: "Ayat Terakhir Dibaca",
      noBookmarks: "Belum Ada Ayat Tersimpan",
      noBookmarksDesc: "Tekan tombol bookmark pada ayat di mushaf untuk menyimpannya di sini.",
      khatamTracker: "Target Khatam Al-Qur'an",
      khatamProgress: "Progres Membaca",
      targetDays: "Target 30 Hari",
      versesReadToday: "Ayat dibaca hari ini",
      congratulations: "Alhamdulillah! Tetap istiqomah membaca Al-Qur'an",
      categories: {
        all: "Semua",
        favorite: "Favorit",
        daily: "Wirid Harian",
        memorization: "Hafalan"
      }
    },
    settings: {
      title: "Pengaturan Aplikasi",
      subtitle: "Kustomisasi bahasa, tampilan mushaf, qari murottal, dan preferensi waktu",
      appearance: "Tampilan & Tema",
      themeMode: "Mode Tampilan",
      themeLight: "Terang (Warm Ivory)",
      themeDark: "Gelap (Forest Dark)",
      themeSystem: "Ikuti Sistem",
      appLanguage: "Bahasa Aplikasi",
      appLanguageDesc: "Pilih bahasa tampilan antarmuka Jay’z Qur’an",
      followDevice: "Ikuti Bahasa Perangkat",
      quranTranslation: "Bahasa Terjemahan Al-Qur'an",
      quranTranslationDesc: "Pengaturan bahasa terjemahan terpisah dari bahasa antarmuka",
      quranAudio: "Audio & Murottal",
      defaultQari: "Qari Pilihan",
      readingExperience: "Pengalaman Membaca",
      arabicFontSize: "Ukuran Huruf Arab",
      transFontSize: "Ukuran Terjemahan",
      notifications: "Pengingat Ibadah",
      prayerAlerts: "Notifikasi Waktu Salat",
      about: "Tentang Jay’z Qur’an",
      version: "Versi 2.0.0 (Production)",
      developedForUmmah: "Dibuat dengan cinta untuk Ummah Islamiyah di seluruh dunia.",
      pwaInstall: "Pasang Aplikasi (PWA)",
      pwaInstalled: "Aplikasi Terpasang"
    },
    common: {
      close: "Tutup",
      save: "Simpan",
      cancel: "Batal",
      search: "Cari",
      loading: "Memuat data...",
      error: "Terjadi kesalahan",
      retry: "Coba Lagi",
      copied: "Berhasil disalin!",
      offlineMode: "Mode Offline Aktif",
      onlineMode: "Terhubung Kembali",
      viewAll: "Lihat Semua"
    }
  },

  'en-US': {
    appName: "Jay’z Qur’an",
    tagline: "Close to the Holy Qur’an, Every Moment",
    isRTL: false,
    nav: {
      home: "Home",
      quran: "Al-Qur'an",
      prayerTimes: "Prayer Times",
      calendar: "Calendar",
      bookmarks: "Bookmarks",
      settings: "Settings"
    },
    home: {
      greeting: "Assalamu’alaikum Warahmatullahi Wabarakatuh",
      subtitle: "Send salawat upon the Prophet and recite the words of Allah",
      prayerSchedule: "Prayer Schedule",
      nextPrayer: "Next Prayer",
      timeRemaining: "remaining until",
      changeLocation: "Change City / Coordinates",
      viewFullSchedule: "View Full Schedule",
      dailyVerse: "Verse of the Day",
      dailyVerseTitle: "Quranic Reflection",
      dailyVerseMeaning: "Timeless guidance and wisdom from the Noble Qur'an",
      readSurah: "Read Surah",
      shareVerse: "Share Verse",
      verseCopied: "Verse copied to clipboard",
      quickAccess: "Quick Access",
      quranAction: "Read Qur'an",
      tafsirAction: "Tafsir & Translation",
      prayerAction: "Prayer Times",
      adzanAction: "Adzan & Alarms",
      calendarAction: "Hijri Calendar",
      qiblaAction: "Qibla Compass",
      lastRead: "Last Read",
      continueReading: "Continue Reading"
    },
    prayers: {
      title: "Prayer Times & Worship",
      subtitle: "Accurate astronomical calculations and trusted prayer schedules",
      imsak: "Imsak",
      fajr: "Fajr",
      sunrise: "Sunrise",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
      nextIn: "Countdown to",
      nowTime: "Current Time",
      adzanReminder: "Adzan Reminder",
      testAdzan: "Play Adzan",
      stopAdzan: "Stop Adzan",
      adzanSound: "Adzan Melody",
      selectCity: "Select City",
      detectGPS: "Use GPS Location",
      calcMethod: "Calculation Method",
      qiblaDirection: "Qibla Compass",
      towardKaaba: "degrees from North pointing directly to the Ka'aba",
      monthlySchedule: "Monthly Schedule",
      hijriDateLabel: "Hijri Date"
    },
    quran: {
      title: "The Holy Qur'an",
      subtitle: "Authentic Uthmanic script, verified translations & melodious murottal",
      searchPlaceholder: "Search surah name, meaning, or number...",
      surahTab: "Surah List",
      juzTab: "Juz 1 - 30",
      revelationMeccan: "Meccan",
      revelationMedinan: "Medinan",
      versesCount: "Verses",
      verses: "verses",
      playAudio: "Listen Murottal",
      pauseAudio: "Pause Audio",
      listenAll: "Play Full Surah",
      showTranslation: "Translation",
      showLatin: "Transliteration",
      showTafsir: "Tafsir",
      arabicSize: "Arabic Font Size",
      translationLang: "Translation Language",
      bookmarkAdded: "Verse added to bookmarks",
      bookmarkRemoved: "Verse removed from bookmarks",
      copySuccess: "Verse copied to clipboard",
      tafsirTitle: "Exegesis & Tafsir",
      qariReciter: "Qari / Reciter",
      nextSurah: "Next Surah",
      prevSurah: "Previous Surah"
    },
    calendar: {
      title: "Hijri Calendar & Events",
      subtitle: "Islamic dates, Sunnah fasting calendar and major Islamic events",
      islamicEvents: "Islamic Events",
      sunnahFasting: "Sunnah Fasting",
      ayyamulBidh: "White Days (13th, 14th, 15th Hijri)",
      mondayThursday: "Monday & Thursday Fasting",
      upcomingDays: "Upcoming Important Days",
      eventRamadan: "Start of Ramadan 1448 AH",
      eventEidFitr: "Eid al-Fitr (1st Shawwal)",
      eventArafah: "Day of Arafah (9th Dhu al-Hijjah)",
      eventEidAdha: "Eid al-Adha (10th Dhu al-Hijjah)",
      eventNewYear: "Islamic New Year (1st Muharram)",
      eventMawlid: "Mawlid al-Nabi (12th Rabi' al-Awwal)",
      eventIsraMiraj: "Isra' and Mi'raj (27th Rajab)"
    },
    bookmarks: {
      title: "Bookmarks & History",
      subtitle: "Bookmark favorite verses and track your Khatam Qur'an goals",
      lastRead: "Last Read Verse",
      noBookmarks: "No Bookmarks Yet",
      noBookmarksDesc: "Tap the bookmark icon on any verse while reading to save it here.",
      khatamTracker: "Qur'an Completion Tracker",
      khatamProgress: "Reading Progress",
      targetDays: "30-Day Target",
      versesReadToday: "Verses read today",
      congratulations: "Alhamdulillah! Keep steadfast in reciting the Qur'an",
      categories: {
        all: "All",
        favorite: "Favorites",
        daily: "Daily Recitation",
        memorization: "Memorization"
      }
    },
    settings: {
      title: "App Settings",
      subtitle: "Configure language, Quran typography, Qari voice, and prayer times",
      appearance: "Appearance & Theme",
      themeMode: "Theme Mode",
      themeLight: "Light (Warm Ivory)",
      themeDark: "Dark (Forest Dark)",
      themeSystem: "System Default",
      appLanguage: "Application Language",
      appLanguageDesc: "Select interface language for Jay’z Qur’an",
      followDevice: "Follow Device Language",
      quranTranslation: "Qur'an Translation Language",
      quranTranslationDesc: "Choose translation language independently from app language",
      quranAudio: "Audio & Recitation",
      defaultQari: "Preferred Qari",
      readingExperience: "Reading Experience",
      arabicFontSize: "Arabic Text Size",
      transFontSize: "Translation Text Size",
      notifications: "Worship Alerts",
      prayerAlerts: "Prayer Time Notifications",
      about: "About Jay’z Qur’an",
      version: "Version 2.0.0 (Production)",
      developedForUmmah: "Crafted with devotion for the global Muslim Ummah.",
      pwaInstall: "Install App (PWA)",
      pwaInstalled: "App Installed"
    },
    common: {
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      search: "Search",
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      copied: "Copied successfully!",
      offlineMode: "Offline Mode Active",
      onlineMode: "Back Online",
      viewAll: "View All"
    }
  },

  'ar': {
    appName: "قرآن جايز",
    tagline: "قريب من القرآن الكريم في كل وقت",
    isRTL: true,
    nav: {
      home: "الرئيسية",
      quran: "القرآن الكريم",
      prayerTimes: "مواقيت الصلاة",
      calendar: "التقويم الهجري",
      bookmarks: "الإشارات المرجعية",
      settings: "الإعدادات"
    },
    home: {
      greeting: "السلام عليكم ورحمة الله وبركاته",
      subtitle: "صلوا على النبي المصطفى ورتلوا آيات الله البينات",
      prayerSchedule: "مواقيت الصلاة",
      nextPrayer: "الصلاة القادمة",
      timeRemaining: "متبقي على أذان",
      changeLocation: "تغيير المدينة / الإحداثيات",
      viewFullSchedule: "عرض الجدول الكامل",
      dailyVerse: "آية اليوم",
      dailyVerseTitle: "تدبر قرآني",
      dailyVerseMeaning: "نور وهداية من آيات الذكر الحكيم",
      readSurah: "قراءة السورة",
      shareVerse: "مشاركة الآية",
      verseCopied: "تم نسخ الآية الكريمة",
      quickAccess: "الوصول السريع",
      quranAction: "قراءة القرآن",
      tafsirAction: "التفسير والترجمة",
      prayerAction: "مواقيت الصلاة",
      adzanAction: "الأذان والتنبيهات",
      calendarAction: "التقويم الهجري",
      qiblaAction: "اتجاه القبلة",
      lastRead: "آخر قراءة",
      continueReading: "متابعة التلاوة"
    },
    prayers: {
      title: "مواقيت الصلاة والعبادة",
      subtitle: "حسابات فلكية دقيقة ومواقيت معتمدة",
      imsak: "الإمساك",
      fajr: "الفجر",
      sunrise: "الشروق",
      dhuhr: "الظهر",
      asr: "العصر",
      maghrib: "المغرب",
      isha: "العشاء",
      nextIn: "الوقت المتبقي لـ",
      nowTime: "الوقت الحالي",
      adzanReminder: "تنبيه الأذان",
      testAdzan: "تشغيل الأذان",
      stopAdzan: "إيقاف الأذان",
      adzanSound: "صوت الأذان",
      selectCity: "اختر المدينة",
      detectGPS: "تحديد الموقع عبر GPS",
      calcMethod: "طريقة الحساب",
      qiblaDirection: "بوصلة القبلة",
      towardKaaba: "درجة باتجاه الكعبة المشرفة في مكة المكرمة",
      monthlySchedule: "جدول الشهر",
      hijriDateLabel: "التاريخ الهجري"
    },
    quran: {
      title: "القرآن الكريم",
      subtitle: "بالرسم العثماني المعتمد وتلاوات خاشعة وتفاسير ميسرة",
      searchPlaceholder: "ابحث عن اسم السورة أو رقمها...",
      surahTab: "فهرس السور",
      juzTab: "الأجزاء (1 - 30)",
      revelationMeccan: "مكية",
      revelationMedinan: "مدنية",
      versesCount: "آياتها",
      verses: "آية",
      playAudio: "استماع للتلاوة",
      pauseAudio: "إيقاف مؤقت",
      listenAll: "تشغيل السورة كاملة",
      showTranslation: "الترجمة والتفسير",
      showLatin: "النطق الصوتي",
      showTafsir: "التفسير الميسر",
      arabicSize: "حجم الخط القرآني",
      translationLang: "لغة الترجمة",
      bookmarkAdded: "تم حفظ الآية في الإشارات المرجعية",
      bookmarkRemoved: "تمت إزالة الآية من المحفوظات",
      copySuccess: "تم نسخ نص الآية",
      tafsirTitle: "تفسير الآية",
      qariReciter: "القارئ",
      nextSurah: "السورة التالية",
      prevSurah: "السورة السابقة"
    },
    calendar: {
      title: "التقويم الهجري والمناسبات",
      subtitle: "مواقيت الصيام المستحب والمناسبات الدينية الكبرى",
      islamicEvents: "المناسبات الإسلامية",
      sunnahFasting: "صيام السنن",
      ayyamulBidh: "صيام الأيام البيض (13 و 14 و 15)",
      mondayThursday: "صيام الإثنين والخميس",
      upcomingDays: "المناسبات القادمة",
      eventRamadan: "غرة شهر رمضان المبارك 1448 هـ",
      eventEidFitr: "عيد الفطر المبارك (1 شوال)",
      eventArafah: "يوم عرفة (9 ذو الحجة)",
      eventEidAdha: "عيد الأضحى المبارك (10 ذو الحجة)",
      eventNewYear: "رأس السنة الهجرية (1 محرم)",
      eventMawlid: "المولد النبوي الشريف (12 ربيع الأول)",
      eventIsraMiraj: "الإسراء والمعراج (27 رجب)"
    },
    bookmarks: {
      title: "الإشارات وسجل التلاوة",
      subtitle: "احفظ الآيات وتابع خطة ختم القرآن الكريم",
      lastRead: "آخر موضع قرأته",
      noBookmarks: "لا توجد إشارات مرجعية بعد",
      noBookmarksDesc: "اضغط على أيقونة الإشارة في أي آية أثناء القراءة لحفظها هنا.",
      khatamTracker: "متابعة ختم القرآن",
      khatamProgress: "نسبة الإنجاز",
      targetDays: "خطة 30 يوماً",
      versesReadToday: "آيات قُرئت اليوم",
      congratulations: "الحمد لله! داوم على تلاوة كتاب الله",
      categories: {
        all: "الكل",
        favorite: "المفضلة",
        daily: "الورد اليومي",
        memorization: "الحفظ والمراجعة"
      }
    },
    settings: {
      title: "إعدادات التطبيق",
      subtitle: "تخصيص لغة الواجهة، الخط القرآني، القراء، ومواقيت الصلاة",
      appearance: "المظهر والسمات",
      themeMode: "وضع السمة",
      themeLight: "فاتح (عاجي دافئ)",
      themeDark: "داكن (زمردي ملكي)",
      themeSystem: "حسب نظام الجهاز",
      appLanguage: "لغة التطبيق",
      appLanguageDesc: "اختر لغة واجهة تطبيق قرآن جايز",
      followDevice: "اتباع لغة الجهاز",
      quranTranslation: "لغة ترجمة القرآن الكريم",
      quranTranslationDesc: "تحديد لغة الترجمة بشكل منفصل عن لغة الواجهة",
      quranAudio: "التلاوة والصوتيات",
      defaultQari: "القارئ المفضل",
      readingExperience: "تجربة القراءة",
      arabicFontSize: "حجم الخط العربي",
      transFontSize: "حجم نص الترجمة",
      notifications: "تنبيهات العبادات",
      prayerAlerts: "تنبيهات مواقيت الصلاة",
      about: "عن تطبيق قرآن جايز",
      version: "الإصدار 2.0.0 (إنتاجي)",
      developedForUmmah: "صُمم بإتقان ومحبة للأمة الإسلامية في أرجاء المعمورة.",
      pwaInstall: "تثبيت التطبيق على الجهاز",
      pwaInstalled: "التطبيق مثبت"
    },
    common: {
      close: "إغلاق",
      save: "حفظ",
      cancel: "إلغاء",
      search: "بحث",
      loading: "جاري التحميل...",
      error: "حدث خطأ ما",
      retry: "إعادة المحاولة",
      copied: "تم النسخ بنجاح!",
      offlineMode: "وضع عدم الاتصال مفعل",
      onlineMode: "تمت استعادة الاتصال",
      viewAll: "عرض الكل"
    }
  },

  'ms-MY': {
    appName: "Jay’z Qur’an",
    tagline: "Dekat dengan Al-Qur’an, Setiap Waktu",
    isRTL: false,
    nav: {
      home: "Utama",
      quran: "Al-Qur'an",
      prayerTimes: "Waktu Solat",
      calendar: "Kalendar",
      bookmarks: "Penanda",
      settings: "Tetapan"
    },
    home: {
      greeting: "Assalamu’alaikum Warahmatullahi Wabarakatuh",
      subtitle: "Berselawat ke atas Nabi dan tadabbur firman Allah Subhanahu wa Ta'ala",
      prayerSchedule: "Waktu Solat",
      nextPrayer: "Solat Seterusnya",
      timeRemaining: "menjelang waktu",
      changeLocation: "Tukar Bandar / Koordinat",
      viewFullSchedule: "Lihat Jadual Penuh",
      dailyVerse: "Ayat Hari Ini",
      dailyVerseTitle: "Tadabbur Qur'ani",
      dailyVerseMeaning: "Mutiara hikmah dan panduan hidup daripada Al-Qur'an Al-Karim",
      readSurah: "Baca Surah",
      shareVerse: "Kongsi Ayat",
      verseCopied: "Ayat disalin ke papan klip",
      quickAccess: "Akses Pantas",
      quranAction: "Baca Al-Qur'an",
      tafsirAction: "Tafsir & Terjemahan",
      prayerAction: "Waktu Solat",
      adzanAction: "Azan & Peringatan",
      calendarAction: "Kalendar Hijrah",
      qiblaAction: "Arah Kiblat",
      lastRead: "Terakhir Dibaca",
      continueReading: "Teruskan Bacaan"
    },
    prayers: {
      title: "Waktu Solat & Ibadah",
      subtitle: "Jadual tepat berasaskan hisab falak dan sumber dipercayai",
      imsak: "Imsak",
      fajr: "Subuh",
      sunrise: "Syuruk",
      dhuhr: "Zohor",
      asr: "Asar",
      maghrib: "Maghrib",
      isha: "Isyak",
      nextIn: "Menjelang",
      nowTime: "Waktu Sekarang",
      adzanReminder: "Peringatan Azan",
      testAdzan: "Dengar Azan",
      stopAdzan: "Hentikan Azan",
      adzanSound: "Pilihan Nada Azan",
      selectCity: "Pilih Bandar",
      detectGPS: "Gunakan Lokasi GPS",
      calcMethod: "Kaedah Kiraan",
      qiblaDirection: "Kompas Kiblat",
      towardKaaba: "darjah dari Utara menghadap Kaabah di Makkah",
      monthlySchedule: "Jadual Bulanan",
      hijriDateLabel: "Tarikh Hijrah"
    },
    quran: {
      title: "Al-Qur'an Al-Karim",
      subtitle: "Teks Rasm Uthmani rasmi, terjemahan Melayu & bacaan murottal",
      searchPlaceholder: "Cari nama surah, erti, atau nombor...",
      surahTab: "Senarai Surah",
      juzTab: "Juzuk 1 - 30",
      revelationMeccan: "Makkiyyah",
      revelationMedinan: "Madaniyyah",
      versesCount: "Ayat",
      verses: "ayat",
      playAudio: "Dengar Murottal",
      pauseAudio: "Jeda Audio",
      listenAll: "Main Seluruh Surah",
      showTranslation: "Terjemahan",
      showLatin: "Transliterasi",
      showTafsir: "Tafsir",
      arabicSize: "Saiz Huruf Arab",
      translationLang: "Bahasa Terjemahan",
      bookmarkAdded: "Ayat ditambah ke penanda",
      bookmarkRemoved: "Ayat dipadam dari penanda",
      copySuccess: "Teks ayat berjaya disalin",
      tafsirTitle: "Tafsir Ayat",
      qariReciter: "Qari Pilihan",
      nextSurah: "Surah Seterusnya",
      prevSurah: "Surah Sebelumnya"
    },
    calendar: {
      title: "Kalendar Hijrah & Takwim Islam",
      subtitle: "Tarikh Islam, puasa sunat, dan hari-hari kebesaran Islam",
      islamicEvents: "Hari Kebesaran Islam",
      sunnahFasting: "Puasa Sunat",
      ayyamulBidh: "Puasa Hari Putih (13, 14, 15 Hijrah)",
      mondayThursday: "Puasa Isnin & Khamis",
      upcomingDays: "Hari Penting Mendatang",
      eventRamadan: "Awal Ramadan 1448 H",
      eventEidFitr: "Hari Raya Aidilfitri (1 Syawal)",
      eventArafah: "Puasa Hari Arafah (9 Zulhijjah)",
      eventEidAdha: "Hari Raya Aidiladha (10 Zulhijjah)",
      eventNewYear: "Awal Muharram / Maal Hijrah",
      eventMawlid: "Maulidur Rasul (12 Rabiulawal)",
      eventIsraMiraj: "Israk & Mikraj (27 Rejab)"
    },
    bookmarks: {
      title: "Penanda & Sejarah Bacaan",
      subtitle: "Simpan ayat kegemaran dan jejak sasaran khatam Al-Qur'an",
      lastRead: "Ayat Terakhir Dibaca",
      noBookmarks: "Tiada Penanda Lagi",
      noBookmarksDesc: "Tekan ikon penanda pada mana-mana ayat untuk menyimpannya di sini.",
      khatamTracker: "Sasaran Khatam Al-Qur'an",
      khatamProgress: "Kemajuan Bacaan",
      targetDays: "Sasaran 30 Hari",
      versesReadToday: "Ayat dibaca hari ini",
      congratulations: "Alhamdulillah! Teruskan istiqomah membaca Al-Qur'an",
      categories: {
        all: "Semua",
        favorite: "Kegemaran",
        daily: "Wirid Harian",
        memorization: "Hafazan"
      }
    },
    settings: {
      title: "Tetapan Aplikasi",
      subtitle: "Urus bahasa, rupa mushaf, qari murottal, dan waktu solat",
      appearance: "Rupa & Tema",
      themeMode: "Mod Tema",
      themeLight: "Cerah (Warm Ivory)",
      themeDark: "Gelap (Forest Dark)",
      themeSystem: "Ikut Sistem",
      appLanguage: "Bahasa Aplikasi",
      appLanguageDesc: "Pilih bahasa antara muka Jay’z Qur’an",
      followDevice: "Ikut Bahasa Peranti",
      quranTranslation: "Bahasa Terjemahan Al-Qur'an",
      quranTranslationDesc: "Tetapkan bahasa terjemahan berasingan daripada bahasa aplikasi",
      quranAudio: "Audio & Murottal",
      defaultQari: "Qari Pilihan",
      readingExperience: "Pengalaman Membaca",
      arabicFontSize: "Saiz Huruf Arab",
      transFontSize: "Saiz Terjemahan",
      notifications: "Peringatan Ibadah",
      prayerAlerts: "Pemberitahuan Waktu Solat",
      about: "Mengenai Jay’z Qur’an",
      version: "Versi 2.0.0 (Production)",
      developedForUmmah: "Dibina dengan penuh keikhlasan untuk Ummah Islam seluruh dunia.",
      pwaInstall: "Pasang Aplikasi (PWA)",
      pwaInstalled: "Aplikasi Dipasang"
    },
    common: {
      close: "Tutup",
      save: "Simpan",
      cancel: "Batal",
      search: "Cari",
      loading: "Memuatkan data...",
      error: "Ralat berlaku",
      retry: "Cuba Semula",
      copied: "Berjaya disalin!",
      offlineMode: "Mod Luar Talian Aktif",
      onlineMode: "Kembali Dalam Talian",
      viewAll: "Lihat Semua"
    }
  },

  'ur': {
    appName: "جے ز قرآن",
    tagline: "قرآن پاک سے قربت، ہر لمحہ",
    isRTL: true,
    nav: {
      home: "صفحہ اول",
      quran: "قرآن مجید",
      prayerTimes: "اوقات نماز",
      calendar: "ہجری کیلنڈر",
      bookmarks: "نشانیات",
      settings: "ترتیبات"
    },
    home: {
      greeting: "السلام علیکم ورحمۃ اللہ وبرکاتہ",
      subtitle: "نبی کریم پر درود بھیجیں اور کلام الٰہی کی تلاوت کریں",
      prayerSchedule: "اوقات نماز",
      nextPrayer: "اگلی نماز",
      timeRemaining: "باقی وقت برائے",
      changeLocation: "شہر / مقام تبدیل کریں",
      viewFullSchedule: "مکمل شیڈول دیکھیں",
      dailyVerse: "آج کی آیت",
      dailyVerseTitle: "قرآنی تدبر",
      dailyVerseMeaning: "قرآن حکیم سے حکمت اور رہنمائی کے انمول موتی",
      readSurah: "سورت پڑھیں",
      shareVerse: "آیت شیئر کریں",
      verseCopied: "آیت کاپی کر لی گئی",
      quickAccess: "فوری رسائی",
      quranAction: "قرآن پڑھیں",
      tafsirAction: "تفسیر و ترجمہ",
      prayerAction: "اوقات نماز",
      adzanAction: "اذان و الارم",
      calendarAction: "ہجری کیلنڈر",
      qiblaAction: "قبلہ نما",
      lastRead: "آخری تلاوت",
      continueReading: "تلاوت جاری رکھیں"
    },
    prayers: {
      title: "اوقاتِ نماز و عبادات",
      subtitle: "مستند فلکیاتی حسابات اور معتبر اوقات",
      imsak: "امساک",
      fajr: "فجر",
      sunrise: "طلوع آفتاب",
      dhuhr: "ظہر",
      asr: "عصر",
      maghrib: "مغرب",
      isha: "عشاء",
      nextIn: "وقت برائے",
      nowTime: "موجودہ وقت",
      adzanReminder: "اذان الرٹ",
      testAdzan: "اذان سنیں",
      stopAdzan: "اذان بند کریں",
      adzanSound: "آواز اذان",
      selectCity: "شہر کا انتخاب",
      detectGPS: "موجودہ GPS لوکیشن",
      calcMethod: "طریقۂ حساب",
      qiblaDirection: "قبلہ کا رخ",
      towardKaaba: "شمال سے ڈگری مکہ مکرمہ میں کعبہ کی جانب",
      monthlySchedule: "ماہانہ نظام الاوقات",
      hijriDateLabel: "ہجری تاریخ"
    },
    quran: {
      title: "قرآنِ کریم",
      subtitle: "رسم عثمانی، مستند اردو ترجمہ اور دلنشیں تلاوت",
      searchPlaceholder: "سورت کا نام، معنی یا نمبر تلاش کریں...",
      surahTab: "فہرست سورتیں",
      juzTab: "پارے (1 - 30)",
      revelationMeccan: "مکی",
      revelationMedinan: "مدنی",
      versesCount: "آیات",
      verses: "آیات",
      playAudio: "تلاوت سنیں",
      pauseAudio: "وقفہ",
      listenAll: "مکمل سورت سنیں",
      showTranslation: "ترجمہ",
      showLatin: "رومن تلفظ",
      showTafsir: "تفسیر",
      arabicSize: "عربی فونٹ سائز",
      translationLang: "ترجمے کی زبان",
      bookmarkAdded: "آیت محفوظ کر لی گئی",
      bookmarkRemoved: "آیت فہرست سے ہٹا دی گئی",
      copySuccess: "آیت مبارکہ کاپی ہو گئی",
      tafsirTitle: "تفسیر و تشریح",
      qariReciter: "قاری",
      nextSurah: "اگلی سورت",
      prevSurah: "پچھلی سورت"
    },
    calendar: {
      title: "ہجری کیلنڈر و اسلامی ایام",
      subtitle: "اسلامی تواریخ، مسنون روزے اور اہم تہوار",
      islamicEvents: "اسلامی ایام",
      sunnahFasting: "مسنون روزے",
      ayyamulBidh: "ایام بیض کے روزے (13، 14، 15)",
      mondayThursday: "پیر اور جمعرات کے روزے",
      upcomingDays: "آنے والے اہم دن",
      eventRamadan: "یکم رمضان المبارک 1448ھ",
      eventEidFitr: "عید الفطر (یکم شوال)",
      eventArafah: "یومِ عرفہ (9 ذوالحجہ)",
      eventEidAdha: "عید الاضحیٰ (10 ذوالحجہ)",
      eventNewYear: "نیا اسلامی سال (یکم محرم)",
      eventMawlid: "میلاد النبی ﷺ (12 ربیع الاول)",
      eventIsraMiraj: "اسراء و معراج (27 رجب)"
    },
    bookmarks: {
      title: "بک مارکس و ریکارڈ",
      subtitle: "پسندیدہ آیات محفوظ کریں اور ختم قرآن کا ہدف دیکھیں",
      lastRead: "آخری پڑھی گئی آیت",
      noBookmarks: "کوئی بک مارک موجود نہیں",
      noBookmarksDesc: "تلاوت کے دوران کسی بھی آیت پر بک مارک کا نشان دبائیں۔",
      khatamTracker: "ہدف ختم قرآن",
      khatamProgress: "تلاوت کی رفتار",
      targetDays: "30 روزہ ہدف",
      versesReadToday: "آج پڑھی گئی آیات",
      congratulations: "الحمد للہ! قرآن پاک سے اپنا تعلق مضبوط رکھیں",
      categories: {
        all: "تمام",
        favorite: "پسندیدہ",
        daily: "روزانہ کا ورد",
        memorization: "حفظ"
      }
    },
    settings: {
      title: "ایپ ترتیبات",
      subtitle: "زبان، قرآنی فونٹ سائز، قاری کا انتخاب اور اوقات نماز",
      appearance: "ظاہری شکل و تھیم",
      themeMode: "تھیم موڈ",
      themeLight: "روشن (Warm Ivory)",
      themeDark: "تاریک (Forest Dark)",
      themeSystem: "سسٹم کے مطابق",
      appLanguage: "ایپ کی زبان",
      appLanguageDesc: "جے ز قرآن کے انٹرفیس کی زبان منتخب کریں",
      followDevice: "ڈیوائس کی زبان اپنائیں",
      quranTranslation: "قرآن ترجمے کی زبان",
      quranTranslationDesc: "ترجمے کی زبان ایپ انٹرفیس سے الگ منتخب کریں",
      quranAudio: "تلاوت و آڈیو",
      defaultQari: "پسندیدہ قاری",
      readingExperience: "مطالعے کا تجربہ",
      arabicFontSize: "عربی فونٹ سائز",
      transFontSize: "ترجمے کا فونٹ سائز",
      notifications: "عبادت کے نوٹیفیکیشنز",
      prayerAlerts: "اوقاتِ نماز کے الرٹس",
      about: "جے ز قرآن کے بارے میں",
      version: "ورژن 2.0.0 (پروڈکشن)",
      developedForUmmah: "پوری دنیا کے مسلمانوں کے لیے خلوص نیت کے ساتھ تیار کردہ۔",
      pwaInstall: "ایپ انسٹال کریں (PWA)",
      pwaInstalled: "ایپ انسٹال ہو گئی"
    },
    common: {
      close: "بند کریں",
      save: "محفوظ کریں",
      cancel: "منسوخ",
      search: "تلاش",
      loading: "لوڈ ہو رہا ہے...",
      error: "کوئی خرابی پیش آئی",
      retry: "دوبارہ کوشش کریں",
      copied: "کامیابی سے کاپی ہو گیا!",
      offlineMode: "آف لائن موڈ فعال ہے",
      onlineMode: "دوبارہ آن لائن",
      viewAll: "تمام دیکھیں"
    }
  },

  'tr-TR': {
    appName: "Jay’z Qur’an",
    tagline: "Her Zaman Kur’an-ı Kerim ile Baş Başa",
    isRTL: false,
    nav: {
      home: "Ana Sayfa",
      quran: "Kur’an-ı Kerim",
      prayerTimes: "Namaz Vakitleri",
      calendar: "Hicri Takvim",
      bookmarks: "Yer İmleri",
      settings: "Ayarlar"
    },
    home: {
      greeting: "Esselâmü Aleyküm ve Rahmetullâhi ve Berekâtüh",
      subtitle: "Peygamber Efendimize salavat getirin ve Yüce Allah'ın ayetlerini tefekkür edin",
      prayerSchedule: "Namaz Vakitleri",
      nextPrayer: "Sıradaki Vakit",
      timeRemaining: "kalan süre",
      changeLocation: "Şehir / Konum Değiştir",
      viewFullSchedule: "Tam Vakitleri Gör",
      dailyVerse: "Günün Ayeti",
      dailyVerseTitle: "Kur’ani Tefekkür",
      dailyVerseMeaning: "Kur'an-ı Kerim'den hayat rehberi ve hikmet incileri",
      readSurah: "Sureyi Oku",
      shareVerse: "Ayeti Paylaş",
      verseCopied: "Ayet panoya kopyalandı",
      quickAccess: "Hızlı Erişim",
      quranAction: "Kur'an Oku",
      tafsirAction: "Tefsir & Meal",
      prayerAction: "Namaz Vakitleri",
      adzanAction: "Ezan & Hatırlatıcı",
      calendarAction: "Hicri Takvim",
      qiblaAction: "Kıble Pusulası",
      lastRead: "Son Okunan",
      continueReading: "Okumaya Devam Et"
    },
    prayers: {
      title: "Namaz Vakitleri & İbadet",
      subtitle: "Hassas astronomik hesaplamalar ve güvenilir ezan saatleri",
      imsak: "İmsak",
      fajr: "Sabah",
      sunrise: "Güneş",
      dhuhr: "Öğle",
      asr: "İkindi",
      maghrib: "Akşam",
      isha: "Yatsı",
      nextIn: "Vakte Kalan",
      nowTime: "Şu Anki Saat",
      adzanReminder: "Ezan Hatırlatıcı",
      testAdzan: "Ezanı Dinle",
      stopAdzan: "Ezanı Durdur",
      adzanSound: "Ezan Makamı",
      selectCity: "Şehir Seç",
      detectGPS: "GPS Konumu Kullan",
      calcMethod: "Hesaplama Yöntemi",
      qiblaDirection: "Kıble Pusulası",
      towardKaaba: "Kuzeyden Mekke'deki Kabe-i Muazzama yönüne derece",
      monthlySchedule: "Aylık Vakit Çizelgesi",
      hijriDateLabel: "Hicri Tarih"
    },
    quran: {
      title: "Kur’an-ı Kerim",
      subtitle: "Resmi Resm-i Osmani hattı, Diyanet meali ve eşsiz kıraatler",
      searchPlaceholder: "Sure adı, anlamı veya numara ara...",
      surahTab: "Sure Listesi",
      juzTab: "Cüzler (1 - 30)",
      revelationMeccan: "Mekki",
      revelationMedinan: "Medeni",
      versesCount: "Ayet Sayısı",
      verses: "ayet",
      playAudio: "Kıraati Dinle",
      pauseAudio: "Duraklat",
      listenAll: "Tüm Sureyi Çal",
      showTranslation: "Meal / Türkçe Çeviri",
      showLatin: "Okunuş (Transkripsiyon)",
      showTafsir: "Tefsir",
      arabicSize: "Arapça Yazı Boyutu",
      translationLang: "Meal Dili",
      bookmarkAdded: "Ayet yer imlerine eklendi",
      bookmarkRemoved: "Ayet yer imlerinden silindi",
      copySuccess: "Ayet metni kopyalandı",
      tafsirTitle: "Ayet Tefsiri",
      qariReciter: "Hafız / Kari",
      nextSurah: "Sonraki Sure",
      prevSurah: "Önceki Sure"
    },
    calendar: {
      title: "Hicri Takvim & Dini Günler",
      subtitle: "Hicri tarihler, sünnet oruçları ve mübarek kandiller",
      islamicEvents: "Dini Günler ve Kandiller",
      sunnahFasting: "Sünnet Oruçları",
      ayyamulBidh: "Eyyam-ı Bıyd Orucu (13, 14, 15 Hicri)",
      mondayThursday: "Pazartesi & Perşembe Orucu",
      upcomingDays: "Yaklaşan Önemli Günler",
      eventRamadan: "Ramazan-ı Şerif Başlangıcı 1448",
      eventEidFitr: "Ramazan Bayramı (1 Şevval)",
      eventArafah: "Arefe Günü (9 Zilhicce)",
      eventEidAdha: "Kurban Bayramı (10 Zilhicce)",
      eventNewYear: "Hicri Yılbaşı (1 Muharrem)",
      eventMawlid: "Mevlid Kandili (12 Rebiülevvel)",
      eventIsraMiraj: "Miraç Kandili (27 Recep)"
    },
    bookmarks: {
      title: "Yer İmleri & Okuma Geçmişi",
      subtitle: "Favori ayetlerinizi kaydedin ve hatim hedefinizi takip edin",
      lastRead: "Son Okunan Ayet",
      noBookmarks: "Henüz Yer İmi Yok",
      noBookmarksDesc: "Okurken kaydetmek istediğiniz ayetin yanındaki yer imi simgesine dokunun.",
      khatamTracker: "Hatim Takip Programı",
      khatamProgress: "Okuma İlerlemesi",
      targetDays: "30 Günlük Hedef",
      versesReadToday: "Bugün okunan ayet",
      congratulations: "Elhamdülillah! Kur'an-ı Kerim tilavetinde daim olun",
      categories: {
        all: "Tümü",
        favorite: "Favoriler",
        daily: "Günlük Vird",
        memorization: "Ezber"
      }
    },
    settings: {
      title: "Uygulama Ayarları",
      subtitle: "Dil tercihi, Kur'an yazı boyutu, hafız seçimi ve namaz vakitleri",
      appearance: "Görünüm ve Tema",
      themeMode: "Tema Tercihi",
      themeLight: "Açık (Sıcak Fildişi)",
      themeDark: "Koyu (Zümrüt Yeşili)",
      themeSystem: "Sistem Varsayılanı",
      appLanguage: "Uygulama Dili",
      appLanguageDesc: "Jay’z Qur’an arayüz dilini belirleyin",
      followDevice: "Cihaz Dilini Takip Et",
      quranTranslation: "Kur'an Meal Dili",
      quranTranslationDesc: "Meal dilini uygulama arayüz dilinden bağımsız seçin",
      quranAudio: "Ses ve Kıraat",
      defaultQari: "Tercih Edilen Hafız",
      readingExperience: "Okuma Deneyimi",
      arabicFontSize: "Arapça Font Boyutu",
      transFontSize: "Meal Font Boyutu",
      notifications: "İbadet Hatırlatıcıları",
      prayerAlerts: "Ezan Vakti Bildirimleri",
      about: "Jay’z Qur’an Hakkında",
      version: "Sürüm 2.0.0 (Production)",
      developedForUmmah: "Dünya çapındaki İslam ümmeti için sevgi ve özenle geliştirildi.",
      pwaInstall: "Uygulamayı Yükle (PWA)",
      pwaInstalled: "Uygulama Yüklendi"
    },
    common: {
      close: "Kapat",
      save: "Kaydet",
      cancel: "İptal",
      search: "Ara",
      loading: "Yükleniyor...",
      error: "Bir hata oluştu",
      retry: "Tekrar Dene",
      copied: "Başarıyla kopyalandı!",
      offlineMode: "Çevrimdışı Mod Aktif",
      onlineMode: "Yeniden Çevrimiçi",
      viewAll: "Hepsini Gör"
    }
  }
};

export const LANGUAGE_OPTIONS: {
  code: AppLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
  isRTL: boolean;
}[] = [
  { code: 'id-ID', label: 'Bahasa Indonesia', nativeLabel: 'Bahasa Indonesia', flag: '🇮🇩', isRTL: false },
  { code: 'en-US', label: 'English', nativeLabel: 'English', flag: '🇬🇧', isRTL: false },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦', isRTL: true },
  { code: 'ms-MY', label: 'Bahasa Melayu', nativeLabel: 'Bahasa Melayu', flag: '🇲🇾', isRTL: false },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', flag: '🇵🇰', isRTL: true },
  { code: 'tr-TR', label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷', isRTL: false },
];

export const TRANSLATION_LANGUAGES = [
  { code: 'id', label: 'Bahasa Indonesia (Kemenag RI)', source: 'Kementerian Agama RI' },
  { code: 'en', label: 'English (Sahih International)', source: 'Sahih International' },
  { code: 'ms', label: 'Bahasa Melayu (Basmeih)', source: 'Abdullah Muhammad Basmeih' },
  { code: 'ur', label: 'اردو (Jalandhry)', source: 'Fateh Muhammad Jalandhry' },
  { code: 'tr', label: 'Türkçe (Diyanet İşleri)', source: 'Diyanet İşleri Başkanlığı' },
  { code: 'ar_tafsir', label: 'العربية (التفسير الميسر)', source: 'مجمع الملك فهد' },
] as const;
