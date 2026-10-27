import { SurahDetail, Ayah, TranslationLanguage } from '../types';
import { SURAH_METADATA } from '../data/quranMetadata';
import { SAMPLE_SURAHS } from '../data/sampleSurahs';

// In-memory cache to avoid redundant API hits
const surahCache = new Map<number, SurahDetail>();

export async function getSurahDetail(surahNumber: number): Promise<SurahDetail> {
  // Check memory cache
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }

  // Check built-in sample surahs first if available
  if (SAMPLE_SURAHS[surahNumber]) {
    const local = SAMPLE_SURAHS[surahNumber];
    surahCache.set(surahNumber, local);
    return local;
  }

  const meta = SURAH_METADATA.find((s) => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah number ${surahNumber} not found in metadata`);
  }

  try {
    // Attempt fetching from reliable Al-Quran Cloud API with multiple editions
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);

    const editions = 'quran-uthmani,en.sahih,id.indonesian,ur.jalandhry';
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${editions}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 2) {
        const arabicData = data.data[0];
        const enData = data.data[1];
        const idData = data.data[2] || enData;
        const urData = data.data[3] || enData;

        const verses: Ayah[] = arabicData.ayahs.map((ayah: any, idx: number) => {
          const numInSurah = ayah.numberInSurah;
          const numInQuran = ayah.number;
          const textArabic = ayah.text;
          const enText = enData?.ayahs?.[idx]?.text || '';
          const idText = idData?.ayahs?.[idx]?.text || enText;
          const urText = urData?.ayahs?.[idx]?.text || enText;

          // Format surah and ayah padding for everyayah audio
          const sPad = String(surahNumber).padStart(3, '0');
          const aPad = String(numInSurah).padStart(3, '0');
          const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${sPad}${aPad}.mp3`;

          return {
            numberInSurah: numInSurah,
            numberInQuran: numInQuran,
            juz: ayah.juz || meta.juzStart,
            page: ayah.page || meta.pageNumber,
            textArabic,
            textLatin: `Ayat ${numInSurah}`,
            translations: {
              id: idText,
              en: enText,
              ms: idText, // Clean Malay fallback
              ur: urText,
              tr: enText,
              ar_tafsir: `تفسير الآية ${numInSurah} من سورة ${meta.nameArabic}`
            },
            audioUrl
          };
        });

        const surahDetail: SurahDetail = {
          ...meta,
          bismillah: surahNumber !== 9 ? {
            textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            textLatin: "Bismillāhir-raḥmānir-raḥīm",
            translation: {
              'id-ID': "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
              'en-US': "In the name of Allah, the Entirely Merciful, the Especially Merciful",
              'ar': "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
              'ms-MY': "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani",
              'ur': "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
              'tr-TR': "Rahmân ve Rahîm olan Allah'ın adıyla"
            }
          } : undefined,
          verses
        };

        surahCache.set(surahNumber, surahDetail);
        return surahDetail;
      }
    }
  } catch (err) {
    console.warn(`Online fetch for Surah ${surahNumber} failed or timed out. Falling back to offline generated verses:`, err);
  }

  // Graceful Offline Fallback Generator
  // If API is unreachable, generate compliant verse placeholders so reader never crashes
  const fallbackVerses: Ayah[] = Array.from({ length: meta.numberOfVerses }, (_, i) => {
    const num = i + 1;
    const sPad = String(surahNumber).padStart(3, '0');
    const aPad = String(num).padStart(3, '0');
    return {
      numberInSurah: num,
      numberInQuran: 0,
      juz: meta.juzStart,
      page: meta.pageNumber,
      textArabic: `${meta.nameArabic} - آية ${num}`,
      textLatin: `${meta.nameTransliteration} ayat ${num}`,
      translations: {
        id: `Terjemahan Surah ${meta.nameTransliteration} ayat ${num}. Silakan sambungkan internet untuk memuat teks lengkap.`,
        en: `Translation of Surah ${meta.nameTransliteration} verse ${num}. Connect to internet to fetch the full text.`,
        ms: `Terjemahan Surah ${meta.nameTransliteration} ayat ${num}.`,
        ur: `سورة ${meta.nameArabic} آیت ${num} کا ترجمہ۔`,
        tr: `${meta.nameTransliteration} Suresi ${num}. ayet meali.`,
        ar_tafsir: `تفسير الآية ${num} من سورة ${meta.nameArabic}`
      },
      audioUrl: `https://everyayah.com/data/Alafasy_128kbps/${sPad}${aPad}.mp3`
    };
  });

  const fallbackDetail: SurahDetail = {
    ...meta,
    verses: fallbackVerses
  };

  surahCache.set(surahNumber, fallbackDetail);
  return fallbackDetail;
}

export function getAyahTranslation(ayah: Ayah, lang: TranslationLanguage): string {
  if (lang === 'ar_tafsir') {
    return ayah.translations.ar_tafsir || ayah.translations.en;
  }
  return ayah.translations[lang] || ayah.translations.id || ayah.translations.en;
}
