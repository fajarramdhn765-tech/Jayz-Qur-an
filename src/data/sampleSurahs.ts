import { SurahDetail } from '../types';

export const SAMPLE_SURAHS: Record<number, SurahDetail> = {
  1: {
    number: 1,
    nameArabic: "الفاتحة",
    nameTransliteration: "Al-Fatihah",
    nameTranslation: {
      'id-ID': "Pembukaan",
      'en-US': "The Opening",
      'ar': "الفاتحة",
      'ms-MY': "Pembukaan",
      'ur': "آغاز / کھولنے والی",
      'tr-TR': "Fâtiha (Açılış)"
    },
    numberOfVerses: 7,
    revelationType: "Meccan",
    revelationOrder: 5,
    juzStart: 1,
    pageNumber: 1,
    bismillah: {
      textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      textLatin: "Bismillahir-rahmanir-rahim",
      translation: {
        'id-ID': "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
        'en-US': "In the name of Allah, the Entirely Merciful, the Especially Merciful",
        'ar': "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        'ms-MY': "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani",
        'ur': "اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے",
        'tr-TR': "Rahmân ve Rahîm olan Allah'ın adıyla"
      }
    },
    verses: [
      {
        numberInSurah: 1,
        numberInQuran: 1,
        juz: 1,
        page: 1,
        textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        textLatin: "Bismillāhir-raḥmānir-raḥīm(i)",
        translations: {
          id: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
          en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
          ms: "Dengan nama Allah, Yang Maha Pemurah, lagi Maha Mengasihani.",
          ur: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے۔",
          tr: "Rahmân ve Rahîm olan Allah'ın adıyla.",
          ar_tafsir: "أبدأ قراءتي مستعينا باسم الله، مستحضرا كل معاني ألوهيته ورحمته."
        },
        tafsir: {
          kemenag: "Memulai setiap urusan dengan basmalah adalah bentuk permohonan berkah, pertolongan, dan penghambaan diri kepada Allah SWT.",
          jalalayn: "Bismillah dimulai dengan menyebut nama Allah untuk mengharap keberkahan."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
      },
      {
        numberInSurah: 2,
        numberInQuran: 2,
        juz: 1,
        page: 1,
        textArabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        textLatin: "Al-ḥamdu lillāhi rabbil-'ālamīn(a)",
        translations: {
          id: "Segala puji bagi Allah, Tuhan semesta alam,",
          en: "[All] praise is [due] to Allah, Lord of the worlds -",
          ms: "Segala puji tertentu bagi Allah, Tuhan yang memelihara dan mentadbirkan sekalian alam.",
          ur: "سب طرح کی تعریف خدا ہی کو سزاوار ہے جو تمام مخلوقات کا پروردگار ہے۔",
          tr: "Hamd, Âlemlerin Rabbi olan Allah'a mahsustur.",
          ar_tafsir: "الثناء التام الكامل لله وحده، مالك الخلق ومدبر شؤون العالمين."
        },
        tafsir: {
          kemenag: "Pujian tertinggi hanya layak disandarkan kepada Allah yang telah memelihara, mendidik, dan mengaruniakan nikmat tak terhingga bagi seluruh ciptaan-Nya.",
          jalalayn: "Alhamdu lillah bermakna segala bentuk pujian dan sanjungan hakiki adalah milik Allah semata."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3"
      },
      {
        numberInSurah: 3,
        numberInQuran: 3,
        juz: 1,
        page: 1,
        textArabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        textLatin: "Ar-raḥmānir-raḥīm(i)",
        translations: {
          id: "Yang Maha Pengasih, Maha Penyayang,",
          en: "The Entirely Merciful, the Especially Merciful,",
          ms: "Yang Maha Pemurah, lagi Maha Mengasihani.",
          ur: "بڑا مہربان نہایت رحم والا۔",
          tr: "O, Rahmândır ve Rahîmdir.",
          ar_tafsir: "ذو الرحمة الواسعة التي وسعت كل شيء، والرحمة الخاصة بالمؤمنين."
        },
        tafsir: {
          kemenag: "Ar-Rahman adalah kasih sayang Allah yang luas meliputi seluruh makhluk di alam semesta; Ar-Rahim adalah rahmat istimewa bagi kaum mukminin di akhirat.",
          jalalayn: "Ar-Rahman melimpahkan nikmat di dunia, Ar-Rahim mengasihi kaum mukmin di akhirat."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001003.mp3"
      },
      {
        numberInSurah: 4,
        numberInQuran: 4,
        juz: 1,
        page: 1,
        textArabic: "مَالِكِ يَوْمِ الدِّينِ",
        textLatin: "Māliki yaumid-dīn(i)",
        translations: {
          id: "Pemilik hari pembalasan.",
          en: "Sovereign of the Day of Recompense.",
          ms: "Yang Menguasai pemerintahan hari Pembalasan (hari Akhirat).",
          ur: "انصاف کے دن کا حاکم۔",
          tr: "Ceza ve mükâfat gününün (hesap gününün) sahibidir.",
          ar_tafsir: "المتصرف وحده في يوم الجزاء والحساب وهو يوم القيامة."
        },
        tafsir: {
          kemenag: "Allah adalah penguasa tunggal mutlak pada hari kiamat ketika tidak ada seorang pun berdaya memberi manfaat tanpa izin-Nya.",
          jalalayn: "Maliki yaumid-din berarti Raja dan Penguasa tunggal di hari hisab."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001004.mp3"
      },
      {
        numberInSurah: 5,
        numberInQuran: 5,
        juz: 1,
        page: 1,
        textArabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        textLatin: "Iyyāka na'budu wa iyyāka nasta'īn(u)",
        translations: {
          id: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan.",
          en: "It is You we worship and You we ask for help.",
          ms: "Engkaulah sahaja (Ya Allah) Yang Kami sembah, dan kepada Engkaulah sahaja kami memohon pertolongan.",
          ur: "(اے پروردگار) ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔",
          tr: "(Rabbimiz!) Ancak sana kulluk eder ve yalnız senden yardım dileriz.",
          ar_tafsir: "نخصك وحدك بالعبادة وإخلاص الطاعة، ونخصك وحدك بطلب العون في كل أمورنا."
        },
        tafsir: {
          kemenag: "Ikrar tauhid ibadah dan tauhid isti'anah: tidak ada sesembahan dan tempat bersandar selain Allah Yang Maha Kuasa.",
          jalalayn: "Mendahulukan objek (iyyaka) berfaedah pembatasan (hasyr): hanya kepada-Mu semata."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001005.mp3"
      },
      {
        numberInSurah: 6,
        numberInQuran: 6,
        juz: 1,
        page: 1,
        textArabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        textLatin: "Ihdinaṣ-ṣirāṭal-mustaqīm(a)",
        translations: {
          id: "Tunjukilah kami jalan yang lurus,",
          en: "Guide us to the straight path -",
          ms: "Tunjukilah kami jalan yang lurus.",
          ur: "ہم کو سیدھے راستے پر چلا۔",
          tr: "Bizi doğru yola (Sırât-ı Müstakîm'e) ilet.",
          ar_tafsir: "دلنا وأرشدنا وثبتنا على الصراط الواضح الموصل إلى رضاك وجنتك."
        },
        tafsir: {
          kemenag: "Doa memohon hidayah taufiq dan keistiqamahan di atas agama Islam yang murni, terbebas dari penyimpangan.",
          jalalayn: "Bimbing dan kokohkan kami di jalan kebenaran yaitu syariat Islam."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001006.mp3"
      },
      {
        numberInSurah: 7,
        numberInQuran: 7,
        juz: 1,
        page: 1,
        textArabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        textLatin: "Ṣirāṭal-lażīna an'amta 'alaihim, gairil-magḍūbi 'alaihim wa laḍ-ḍāllīn(a)",
        translations: {
          id: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
          en: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
          ms: "Iaitu jalan orang-orang yang Engkau telah kurniakan nikmat kepada mereka, bukan (jalan) orang-orang yang Engkau telah murkai, dan bukan pula (jalan) orang-orang yang sesat.",
          ur: "ان لوگوں کے راستے پر جن پر تو نے انعام کیا نہ ان کے جن پر غضب نازل ہوا اور نہ گمراہوں کے۔",
          tr: "Kendilerine lütuf ve ikramda bulunduğun kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil.",
          ar_tafsir: "طريق النبيين والصديقين والشهداء والصالحين، غير طريق المغضوب عليهم ولا الضالين."
        },
        tafsir: {
          kemenag: "Jalan orang beriman, para nabi, siddiqin, syuhada, dan shalihin. Menghindarkan diri dari sifat orang yang mengetahui kebenaran namun membangkang atau tersesat dalam kebodohan.",
          jalalayn: "Al-Maghdhubi 'alaihim adalah mereka yang dimurkai karena menolak kebenaran setelah mengetahuinya, Adh-Dhallin adalah mereka yang tersesat tanpa ilmu."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001007.mp3"
      }
    ]
  },

  112: {
    number: 112,
    nameArabic: "الإخلاص",
    nameTransliteration: "Al-Ikhlas",
    nameTranslation: {
      'id-ID': "Kemurnian Tauhid",
      'en-US': "The Sincerity",
      'ar': "الإخلاص",
      'ms-MY': "Kemurnian Keesaan",
      'ur': "توحیدِ خالص",
      'tr-TR': "İhlâs"
    },
    numberOfVerses: 4,
    revelationType: "Meccan",
    revelationOrder: 22,
    juzStart: 30,
    pageNumber: 604,
    bismillah: {
      textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      textLatin: "Bismillāhir-raḥmānir-raḥīm(i)",
      translation: {
        'id-ID': "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
        'en-US': "In the name of Allah, the Entirely Merciful, the Especially Merciful",
        'ar': "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        'ms-MY': "Dengan nama Allah Yang Maha Pemurah lagi Maha Mengasihani",
        'ur': "اللہ کے نام سے جو بڑا مہربan نہایت رحم والا ہے",
        'tr-TR': "Rahmân ve Rahîm olan Allah'ın adıyla"
      }
    },
    verses: [
      {
        numberInSurah: 1,
        numberInQuran: 6222,
        juz: 30,
        page: 604,
        textArabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        textLatin: "Qul huwallāhu aḥad(un)",
        translations: {
          id: "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.\"",
          en: "Say, \"He is Allah, [who is] One,\"",
          ms: "Katakanlah (wahai Muhammad): \"(Tuhanku) ialah Allah Yang Maha Esa.\"",
          ur: "کہو کہ وہ (ذات پاک جس کا نام) اللہ (ہے) ایک ہے۔",
          tr: "De ki: O, Allah'tır, bir tektir.",
          ar_tafsir: "قل أيها الرسول: الله هو المتفرد بالألوهية والربوبية والكمال المطلق، لا شريك له."
        },
        tafsir: {
          kemenag: "Penegasan tauhid mutlak: Allah Maha Esa dalam Dzat, Sifat, dan Perbuatan-Nya, tiada tandingan bagi-Nya.",
          jalalayn: "Tuhan yang disembah adalah Tunggal dan Esa."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112001.mp3"
      },
      {
        numberInSurah: 2,
        numberInQuran: 6223,
        juz: 30,
        page: 604,
        textArabic: "اللَّهُ الصَّمَدُ",
        textLatin: "Allāhuṣ-ṣamad(u)",
        translations: {
          id: "Allah tempat meminta segala sesuatu.",
          en: "Allah, the Eternal Refuge.",
          ms: "Allah Yang menjadi tumpuan sekalian makhluk untuk memohon sebarang hajat.",
          ur: "معبود برحق جو بےنیاز ہے۔",
          tr: "Allah Samed'dir (Her şey O'na muhtaç, O hiçbir şeye muhtaç değildir).",
          ar_tafsir: "السيد الذي كمل في شرفه وسؤدده، والمقصود وحده في قضاء الحوائج والرغائب."
        },
        tafsir: {
          kemenag: "As-Samad berarti Tuhan yang bergantung kepada-Nya segala makhluk untuk memenuhi segala hajat, sedang Dia tidak butuh kepada apa pun.",
          jalalayn: "Tempat bergantung dan bermohon seluruh alam."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112002.mp3"
      },
      {
        numberInSurah: 3,
        numberInQuran: 6224,
        juz: 30,
        page: 604,
        textArabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        textLatin: "Lam yalid wa lam yūlad",
        translations: {
          id: "(Allah) tidak beranak dan tidak pula diperanakkan,",
          en: "He neither begets nor is born,",
          ms: "Ia tiada beranak, dan Ia pula tidak diperanakkan;",
          ur: "نہ کسی کا باپ ہے اور نہ کسی کا بیٹا۔",
          tr: "O, doğurmamış ve doğmamıştır.",
          ar_tafsir: "ليس له ولد، ولم يولد من أحد؛ لأنه الأول الذي ليس قبله شيء."
        },
        tafsir: {
          kemenag: "Menafikan segala bentuk kemusyrikan biologis atau silsilah keilahian.",
          jalalayn: "Maha Suci Allah dari berketurunan atau dilahirkan."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112003.mp3"
      },
      {
        numberInSurah: 4,
        numberInQuran: 6225,
        juz: 30,
        page: 604,
        textArabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        textLatin: "Wa lam yakul lahū kufuwan aḥad(un)",
        translations: {
          id: "dan tidak ada sesuatu yang setara dengan Dia.\"",
          en: "Nor is there to Him any equivalent.\"",
          ms: "Dan tidak ada sesiapapun yang serupa dengan-Nya.\"",
          ur: "اور کوئی اس کا ہمسر نہیں۔",
          tr: "Hiçbir şey O'na denk ve benzer değildir.",
          ar_tafsir: "ولم يكن له مماثل ولا مكافئ في أسمائه وصفاته وأفعاله."
        },
        tafsir: {
          kemenag: "Tiada satu pun makhluk, konsep, atau kekuatan di alam semesta yang menyamai kemuliaan Allah SWT.",
          jalalayn: "Tidak ada satu pun yang sebanding dengan-Nya."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112004.mp3"
      }
    ]
  },

  113: {
    number: 113,
    nameArabic: "الفلق",
    nameTransliteration: "Al-Falaq",
    nameTranslation: {
      'id-ID': "Waktu Subuh",
      'en-US': "The Daybreak",
      'ar': "الفلق",
      'ms-MY': "Waktu Subuh",
      'ur': "صبح کا پھٹنا",
      'tr-TR': "Felak"
    },
    numberOfVerses: 5,
    revelationType: "Meccan",
    revelationOrder: 20,
    juzStart: 30,
    pageNumber: 604,
    verses: [
      {
        numberInSurah: 1,
        numberInQuran: 6226,
        juz: 30,
        page: 604,
        textArabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        textLatin: "Qul a'ūżu birabbil-falaq(i)",
        translations: {
          id: "Katakanlah, \"Aku berlindung kepada Tuhan yang menguasai subuh (fajar),",
          en: "Say, \"I seek refuge in the Lord of daybreak,",
          ms: "Katakanlah (wahai Muhammad): \"Aku berlindung kepada (Allah) Tuhan yang menciptakan sekalian makhluk,",
          ur: "کہو کہ میں صبح کے مالک کی پناہ مانگتا ہوں۔",
          tr: "De ki: Sabahın Rabbine sığınırım,",
          ar_tafsir: "قل: أعتصم برب الصبح وفالقه بالنور بعد الظلام."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/113001.mp3"
      },
      {
        numberInSurah: 2,
        numberInQuran: 6227,
        juz: 30,
        page: 604,
        textArabic: "مِن شَرِّ مَا خَلَقَ",
        textLatin: "Min syarri mā khalaq(a)",
        translations: {
          id: "dari kejahatan (makhluk yang) Dia ciptakan,",
          en: "From the evil of that which He created,",
          ms: "Dari bencana makhluk-makhluk yang Dia ciptakan;",
          ur: "ہر اس چیز کی برائی سے جو اس نے پیدا کی ہے۔",
          tr: "Yarattığı şeylerin şerrinden,",
          ar_tafsir: "من شر جميع المخلوقات وأذاها."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/113002.mp3"
      },
      {
        numberInSurah: 3,
        numberInQuran: 6228,
        juz: 30,
        page: 604,
        textArabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        textLatin: "Wa min syarri gāsiqin iżā waqab(a)",
        translations: {
          id: "dan dari kejahatan malam apabila telah gelap gulita,",
          en: "And from the evil of darkness when it settles,",
          ms: "Dan dari bahaya gelap apabila ia masuk;",
          ur: "اور اندھیری رات کی برائی سے جب اس کا اندھیرا چھا جائے۔",
          tr: "Karanlığı çöktüğü zaman gecenin şerrinden,",
          ar_tafsir: "ومن شر الليل وما ينتشر فيه من الشرور إذا أظلم."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/113003.mp3"
      },
      {
        numberInSurah: 4,
        numberInQuran: 6229,
        juz: 30,
        page: 604,
        textArabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        textLatin: "Wa min syarrin-naffāṡāti fil-'uqad(i)",
        translations: {
          id: "dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),",
          en: "And from the evil of the blowers in knots,",
          ms: "Dan dari kejahatan makhluk-makhluk yang menghembus-hembus pada simpulan-simpulan (dan ikatan-ikatan);",
          ur: "اور گنڈوں پر (پڑھ پڑھ کر) پھونکنے والیوں کی برائی سے۔",
          tr: "Düğümlere üfleyen büyücülerin şerrinden,",
          ar_tafsir: "ومن شر السواحر اللاتي ينفثن في عقد السحر للإضرار."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/113004.mp3"
      },
      {
        numberInSurah: 5,
        numberInQuran: 6230,
        juz: 30,
        page: 604,
        textArabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        textLatin: "Wa min syarri ḥāsidin iżā ḥasad(a)",
        translations: {
          id: "dan dari kejahatan orang yang dengki apabila dia dengki.\"",
          en: "And from the evil of an envier when he envies.\"",
          ms: "Dan dari kejahatan orang yang dengki apabila ia melakukan dengkinya.\"",
          ur: "اور حسد کرنے والے کی برائی سے جب وہ حسد کرنے لگے۔",
          tr: "Ve kıskandığı vakit kıskanç kişinin şerrinden.",
          ar_tafsir: "ومن شر حاسد يتمنى زوال النعمة عن غيره."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/113005.mp3"
      }
    ]
  },

  114: {
    number: 114,
    nameArabic: "الناس",
    nameTransliteration: "An-Nas",
    nameTranslation: {
      'id-ID': "Umat Manusia",
      'en-US': "Mankind",
      'ar': "الناس",
      'ms-MY': "Manusia",
      'ur': "تمام انسان",
      'tr-TR': "Nâs (İnsanlar)"
    },
    numberOfVerses: 6,
    revelationType: "Meccan",
    revelationOrder: 21,
    juzStart: 30,
    pageNumber: 604,
    verses: [
      {
        numberInSurah: 1,
        numberInQuran: 6231,
        juz: 30,
        page: 604,
        textArabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        textLatin: "Qul a'ūżu birabbin-nās(i)",
        translations: {
          id: "Katakanlah, \"Aku berlindung kepada Tuhannya manusia,",
          en: "Say, \"I seek refuge in the Lord of mankind,",
          ms: "Katakanlah (wahai Muhammad): \"Aku berlindung kepada (Allah) Pemelihara sekalian manusia,",
          ur: "کہو کہ میں لوگوں کے پروردگار کی پناہ مانگتا ہوں۔",
          tr: "De ki: İnsanların Rabbine sığınırım,",
          ar_tafsir: "قل: أعتصم وأستجير بخالق البشر ومربيهم بنعمه."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/114001.mp3"
      },
      {
        numberInSurah: 2,
        numberInQuran: 6232,
        juz: 30,
        page: 604,
        textArabic: "مَلِكِ النَّاسِ",
        textLatin: "Malikin-nās(i)",
        translations: {
          id: "Raja manusia,",
          en: "The Sovereign of mankind,",
          ms: "Yang Menguasai sekalian manusia,",
          ur: "(یعنی) لوگوں کے بادشاہ کی۔",
          tr: "İnsanların Malikine (hükümranına),",
          ar_tafsir: "ملك الناس المتصرف في كل شؤونهم."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/114002.mp3"
      },
      {
        numberInSurah: 3,
        numberInQuran: 6233,
        juz: 30,
        page: 604,
        textArabic: "إِلَٰهِ النَّاسِ",
        textLatin: "Ilāhin-nās(i)",
        translations: {
          id: "sembahan manusia,",
          en: "The God of mankind,",
          ms: "Tuhan yang berhak disembah oleh sekalian manusia,",
          ur: "لوگوں کے معبود برحق کی۔",
          tr: "İnsanların İlahına,",
          ar_tafsir: "معبودهم بحق الذي لا إله لهم سواه."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/114003.mp3"
      },
      {
        numberInSurah: 4,
        numberInQuran: 6234,
        juz: 30,
        page: 604,
        textArabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        textLatin: "Min syarril-waswāsil-khannās(i)",
        translations: {
          id: "dari kejahatan (bisikan) setan yang bersembunyi,",
          en: "From the evil of the retreating whisperer -",
          ms: "Dari kejahatan bisikan syaitan yang timbul tenggelam,",
          ur: "(شیطان) وسوسہ انداز کی برائی سے جو (خدا کا نام سن کر) پیچھے ہٹ جاتا ہے۔",
          tr: "Sinsice kalplere vesvese verip duran şeytanın şerrinden,",
          ar_tafsir: "من شر الشيطان الذي يوسوس عند الغفلة ويختفي عند ذكر الله."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/114004.mp3"
      },
      {
        numberInSurah: 5,
        numberInQuran: 6235,
        juz: 30,
        page: 604,
        textArabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        textLatin: "Allażī yuwaswisu fī ṣudūrin-nās(i)",
        translations: {
          id: "yang membisikkan (kejahatan) ke dalam dada manusia,",
          en: "Who whispers [evil] into the breasts of mankind -",
          ms: "Yang melemparkan bisikan dan hasutannya ke dalam hati manusia,",
          ur: "جو لوگوں کے دلوں میں وسوسے ڈالتا ہے۔",
          tr: "Ki o, insanların göğüslerine (kalplerine) vesvese verir,",
          ar_tafsir: "الذي يلقي الشبهات والشهوات في قلوب الناس."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/114005.mp3"
      },
      {
        numberInSurah: 6,
        numberInQuran: 6236,
        juz: 30,
        page: 604,
        textArabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        textLatin: "Minal-jinnati wan-nās(i)",
        translations: {
          id: "dari (golongan) jin dan manusia.\"",
          en: "From among the jinn and mankind.\"",
          ms: "(Iaitu pembisik dan penghasut) dari kalangan jin dan manusia.\"",
          ur: "وہ جنوں میں سے ہو یا انسانوں میں سے۔",
          tr: "Gerek cinlerden, gerekse insanlardan.",
          ar_tafsir: "سواء كان هذا الموسوس من شياطين الجن أو من شياطين الإنس."
        },
        audioUrl: "https://everyayah.com/data/Alafasy_128kbps/114006.mp3"
      }
    ]
  }
};

export const DAILY_VERSES = [
  {
    surahNumber: 2,
    surahName: "Al-Baqarah",
    ayahNumber: 255,
    textArabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    textLatin: "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm(u), lā ta'khużuhū sinatuw wa lā naum(un)...",
    translations: {
      'id-ID': "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. (Ayat Al-Kursi)",
      'en-US': "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. (The Throne Verse)",
      'ar': "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ (آية الكرسي)",
      'ms-MY': "Allah, tiada Tuhan melainkan Dia, Yang Tetap Hidup, Yang Mentadbirkan sekalian makhluk. Dia tidak mengantuk dan tidak tidur. Segala yang ada di langit dan di bumi adalah kepunyaan-Nya. (Ayat Kursi)",
      'ur': "اللہ (وہ معبود برحق ہے کہ) اس کے سوا کوئی عبادت کے لائق نہیں۔ زندہ ہمیشہ رہنے والا۔ اسے نہ اونگھ آتی ہے نہ نیند۔ جو کچھ آسمانوں میں اور جو کچھ زمین میں ہے سب اسی کا ہے۔",
      'tr-TR': "Allah, O'ndan başka ilah yoktur; O, Hayy'dır, Kayyûm'dur. O'nu ne bir uyuklama tutabilir, ne de bir uyku. Göklerde ve yerde ne varsa hepsi O'nundur. (Ayetel Kürsi)"
    },
    reflection: {
      'id-ID': "Ayat kursi adalah penghulu segala ayat dalam Al-Qur'an yang menegaskan keagungan Dzat Allah, perlindungan mutlak, serta penjagaan-Nya yang tidak pernah lalai sedetik pun terhadap semesta.",
      'en-US': "Ayat al-Kursi is the greatest verse of the Qur'an, affirming Allah's absolute oneness, eternal sovereignty, and vigilant protection over all creation without weariness.",
      'ar': "آية الكرسي هي أعظم آية في كتاب الله تعالى، تبين توحيد الله وكمال حياته وقيوميته وعظمته التي أحاطت بكل شيء.",
      'ms-MY': "Ayat Kursi adalah penghulu segala ayat yang menegaskan keagungan zat Allah yang tidak pernah lelap menjaga hamba-hamba-Nya.",
      'ur': "آیۃ الکرسی قرآن پاک کی سب سے عظیم آیت ہے جو اللہ کی توحید، لامحدود قدرت اور کائنات پر اس کی دائمی نگہبانی کو بیان کرتی ہے۔",
      'tr-TR': "Âyetü'l-Kürsî, Kur'an'ın en faziletli ayeti olup Allah'ın birliğini, mutlak kudretini ve tüm kâinatı kusursuzca kuşatan egemenliğini ilan eder."
    }
  },
  {
    surahNumber: 94,
    surahName: "Ash-Sharh",
    ayahNumber: 5,
    textArabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    textLatin: "Fa inna ma'al-'usri yusrā(n). Inna ma'al-'usri yusrā(n).",
    translations: {
      'id-ID': "Maka sesungguhnya beserta kesulitan ada kemudahan, sesungguhnya beserta kesulitan ada kemudahan.",
      'en-US': "For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.",
      'ar': "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      'ms-MY': "Oleh itu, sesungguhnya tiap-tiap kesukaran disertai kemudahan, sesungguhnya tiap-tiap kesukaran disertai kemudahan.",
      'ur': "پس بیشک مشکل کے ساتھ آسانی ہے، بیشک مشکل کے ساتھ آسانی ہے۔",
      'tr-TR': "Elbette her zorlukla beraber bir kolaylık vardır. Gerçekten her zorlukla beraber bir kolaylık vardır."
    },
    reflection: {
      'id-ID': "Janji pasti dari Allah: di balik setiap ujian berat yang kita hadapi, Allah selalu menyiapkan berlipat kemudahan dan jalan keluar yang indah.",
      'en-US': "A divine assurance that no hardship exists in isolation; relief and ease are intricately woven alongside every challenge in our life.",
      'ar': "وعد إلهي محكم بأن مع كل ضيق فرجاً، ولن يغلب عسر يسرين.",
      'ms-MY': "Janji Allah yang pasti bahawa setiap ujian dan kesukaran didampingi dengan jalan keluar dan kelapangan.",
      'ur': "اللہ کا اٹل وعدہ کہ ہر تنگی کے ساتھ آسانی کا دروازہ ضرور کھلتا ہے۔",
      'tr-TR': "Yüce Rabbimizin kesin müjdesi: Yaşadığımız her zorluğun hemen yanı başında bir kolaylık ve ferahlık kapısı saklıdır."
    }
  }
];
