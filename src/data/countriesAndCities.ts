import { CalculationMethodInfo, CalculationMethodKey, CountryData, CityData } from '../types/prayer';
import { AppLanguage } from '../translations';

export function buildPrayertimeUrl(path: string, lang: AppLanguage = 'en'): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return `https://prayertime.info/${lang}/${cleanPath}/`;
}

export const CALCULATION_METHODS: Record<CalculationMethodKey, CalculationMethodInfo> = {
  ummalqura: {
    key: 'ummalqura',
    name: 'Umm al-Qura University',
    fullName: 'Umm al-Qura University, Makkah & Ministry of Islamic Affairs',
    fajrAngle: 18.5,
    ishaInterval: 90, // 90 mins after Maghrib (120 mins during Ramadan)
    officialAuthority: 'Umm Al-Qura Calendar & Ministry of Islamic Affairs',
    authorityUrl: 'https://ummalqura.gov.sa',
    country: 'Saudi Arabia',
    description: 'Fajr solar depression angle is 18.5 degrees. Isha is set to a fixed 90 minutes after Maghrib (120 minutes during Ramadan).'
  },
  egypt: {
    key: 'egypt',
    name: 'Egyptian General Survey',
    fullName: 'Egyptian General Authority of Survey (الهيئة المصرية العامة للمساحة)',
    fajrAngle: 19.5,
    ishaAngle: 17.5,
    officialAuthority: 'Egyptian General Authority of Survey & Dar al-Ifta al-Misriyyah',
    authorityUrl: 'https://esa.gov.eg',
    country: 'Egypt',
    description: 'Standard throughout Egypt, Sudan, and parts of the Levant. Uses Fajr angle 19.5° and Isha angle 17.5°.'
  },
  isna: {
    key: 'isna',
    name: 'ISNA (North America)',
    fullName: 'Islamic Society of North America & Fiqh Council of North America',
    fajrAngle: 15.0,
    ishaAngle: 15.0,
    officialAuthority: 'Islamic Society of North America (ISNA)',
    authorityUrl: 'https://isna.net',
    country: 'United States & Canada',
    description: 'Adopted across the United States and Canada. Uses Fajr angle 15° and Isha angle 15° for practical community consensus.'
  },
  london: {
    key: 'london',
    name: 'London Unified Timetable',
    fullName: 'London Central Mosque Trust & Islamic Cultural Centre (ICCUK)',
    fajrAngle: 18.0,
    ishaAngle: 18.0,
    officialAuthority: 'The Islamic Cultural Centre & London Central Mosque',
    authorityUrl: 'https://iccuk.org',
    country: 'United Kingdom',
    description: 'Unified timetable widely recognized in London and across the UK, integrating high-latitude solar rules for British summers.'
  },
  france: {
    key: 'france',
    name: 'Grande Mosquée de Paris',
    fullName: 'Grande Mosquée de Paris & Conseil Français du Culte Musulman (CFCM)',
    fajrAngle: 18.0,
    ishaAngle: 18.0,
    officialAuthority: 'Grande Mosquée de Paris',
    authorityUrl: 'https://grandemosqueedeparis.net',
    country: 'France',
    description: 'Official standard for Paris and metropolitan France with angle 18°/18° (or UOIF 12° variation for extreme summer latitudes).'
  },
  diyanet: {
    key: 'diyanet',
    name: 'Diyanet İşleri Başkanlığı',
    fullName: 'Presidency of Religious Affairs of the Republic of Turkey',
    fajrAngle: 18.0,
    ishaAngle: 17.0,
    officialAuthority: 'T.C. Cumhurbaşkanlığı Diyanet İşleri Başkanlığı',
    authorityUrl: 'https://diyanet.gov.tr',
    country: 'Turkey',
    description: 'Astronomical solar calculations verified by Turkish State Astrological & Religious commissions with Fajr 18° and Isha 17°.'
  },
  gulf: {
    key: 'gulf',
    name: 'UAE Awqaf (General Authority)',
    fullName: 'General Authority of Islamic Affairs and Endowments (Awqaf UAE)',
    fajrAngle: 18.2,
    ishaInterval: 90,
    officialAuthority: 'General Authority of Islamic Affairs & Endowments UAE',
    authorityUrl: 'https://awqaf.gov.ae',
    country: 'United Arab Emirates',
    description: 'Official calculation standard for Dubai, Abu Dhabi, Sharjah, with Fajr 18.2° and Isha at 90 minutes after Maghrib.'
  },
  jakim: {
    key: 'jakim',
    name: 'JAKIM Malaysia',
    fullName: 'Department of Islamic Development Malaysia (Jabatan Kemajuan Islam Malaysia)',
    fajrAngle: 20.0,
    ishaAngle: 18.0,
    officialAuthority: 'e-Solat JAKIM (Portal Rasmi Penentuan Waktu Solat)',
    authorityUrl: 'https://www.e-solat.gov.my',
    country: 'Malaysia',
    description: 'Official Malaysian standard using Fajr 20° and Isha 18° determined by the Falak (astronomy) committee.'
  },
  kemenag: {
    key: 'kemenag',
    name: 'Kemenag Indonesia',
    fullName: 'Kementerian Agama Republik Indonesia (Bimas Islam)',
    fajrAngle: 20.0,
    ishaAngle: 18.0,
    officialAuthority: 'Bimas Islam Kementerian Agama RI',
    authorityUrl: 'https://bimasislam.kemenag.go.id',
    country: 'Indonesia',
    description: 'Standard across Indonesian archipelago with Fajr 20° and Isha 18° as regulated by Kemenag astronomy council.'
  },
  karachi: {
    key: 'karachi',
    name: 'Univ. of Islamic Sciences Karachi',
    fullName: 'University of Islamic Sciences, Karachi (Jamia Uloom-ul-Islamia Banuri Town)',
    fajrAngle: 18.0,
    ishaAngle: 18.0,
    officialAuthority: 'Ministry of Religious Affairs & Jamia Banuri Town Karachi',
    authorityUrl: 'https://mora.gov.pk',
    country: 'Pakistan & South Asia',
    description: 'Widely used in Pakistan, India, Bangladesh, and Afghanistan with Fajr 18° and Isha 18°.'
  },
  mwl: {
    key: 'mwl',
    name: 'Muslim World League (MWL)',
    fullName: 'Muslim World League (رابطة العالم الإسلامي)',
    fajrAngle: 18.0,
    ishaAngle: 17.0,
    officialAuthority: 'Muslim World League Headquarters, Makkah',
    authorityUrl: 'https://themwl.org',
    country: 'International',
    description: 'Global standard recommended by the Fiqh Council of the Muslim World League (Fajr 18°, Isha 17°).'
  },
  kuwait: {
    key: 'kuwait',
    name: 'Kuwait Ministry of Awqaf',
    fullName: 'Ministry of Awqaf and Islamic Affairs Kuwait (وزارة الأوقاف والشؤون الإسلامية)',
    fajrAngle: 18.0,
    ishaAngle: 17.5,
    officialAuthority: 'Kuwait Ministry of Awqaf & Islamic Affairs',
    authorityUrl: 'https://awqaf.gov.kw',
    country: 'Kuwait',
    description: 'Official Kuwait state prayer calendar with Fajr 18° and Isha 17.5°.'
  },
  qatar: {
    key: 'qatar',
    name: 'Qatar Ministry of Awqaf',
    fullName: 'Ministry of Endowments and Islamic Affairs Qatar (وزارة الأوقاف والشؤون الإسلامية)',
    fajrAngle: 18.0,
    ishaInterval: 90,
    officialAuthority: 'State of Qatar Ministry of Awqaf',
    authorityUrl: 'https://islam.gov.qa',
    country: 'Qatar',
    description: 'Official Qatar calendar with Fajr 18° and Isha 90 minutes post-sunset.'
  }
};

export const COUNTRIES: CountryData[] = [
  {
    code: 'SA',
    name: 'Saudi Arabia',
    arabicName: 'المملكة العربية السعودية',
    frenchName: 'Arabie Saoudite',
    flag: '🇸🇦',
    defaultCityId: 'tabuk',
    defaultMethodKey: 'ummalqura',
    officialAuthority: 'Umm al-Qura Calendar & Ministry of Islamic Affairs',
    officialAuthorityAr: 'تقويم أم القرى ووزارة الشؤون الإسلامية والدعوة والإرشاد',
    officialAuthorityFr: 'Calendrier Umm al-Qura & Ministère des Affaires Islamiques',
    officialUrl: 'https://ummalqura.gov.sa',
    prayertimePath: 'saudi-sa',
    methodDescription: 'Calculated using Umm al-Qura University solar ephemeris: Fajr 18.5°, Isha 90 minutes after Maghrib (120 minutes in Ramadan).',
    fajrStandard: '18.5° solar depression angle',
    ishaStandard: '90 minutes after Maghrib'
  },
  {
    code: 'EG',
    name: 'Egypt',
    arabicName: 'جمهورية مصر العربية',
    frenchName: 'Égypte',
    flag: '🇪🇬',
    defaultCityId: 'cairo',
    defaultMethodKey: 'egypt',
    officialAuthority: 'Egyptian General Authority of Survey & Dar al-Ifta',
    officialAuthorityAr: 'الهيئة المصرية العامة للمساحة ودار الإفتاء المصرية',
    officialAuthorityFr: 'Autorité Générale Égyptienne de l’Arpentage & Dar al-Ifta',
    officialUrl: 'https://esa.gov.eg',
    prayertimePath: 'egypt',
    methodDescription: 'Official standard computed by the Egyptian General Authority of Survey: Fajr 19.5°, Isha 17.5° solar altitude angles.',
    fajrStandard: '19.5° solar depression angle',
    ishaStandard: '17.5° solar depression angle'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    arabicName: 'المملكة المتحدة',
    frenchName: 'Royaume-Uni',
    flag: '🇬🇧',
    defaultCityId: 'london',
    defaultMethodKey: 'london',
    officialAuthority: 'London Central Mosque Trust & ICCUK',
    officialAuthorityAr: 'مسجد لندن المركزي والمركز الثقافي الإسلامي',
    officialAuthorityFr: 'Mosquée Centrale de Londres & ICCUK',
    officialUrl: 'https://iccuk.org',
    prayertimePath: 'united-kingdom',
    methodDescription: 'London Unified Timetable coordinated with Islamic Cultural Centre and major British councils, with high-latitude adjustments.',
    fajrStandard: '18.0° (with 1/7th night rule in summer)',
    ishaStandard: '18.0° (with 1/7th night rule in summer)'
  },
  {
    code: 'US',
    name: 'United States',
    arabicName: 'الولايات المتحدة الأمريكية',
    frenchName: 'États-Unis',
    flag: '🇺🇸',
    defaultCityId: 'new-york',
    defaultMethodKey: 'isna',
    officialAuthority: 'Islamic Society of North America (ISNA)',
    officialAuthorityAr: 'الجمعية الإسلامية لأمريكا الشمالية (إسنا)',
    officialAuthorityFr: 'Société Islamique d’Amérique du Nord (ISNA)',
    officialUrl: 'https://isna.net',
    prayertimePath: 'united-states',
    methodDescription: 'ISNA standard adopted across North America: Fajr 15.0°, Isha 15.0° providing consistent timings across continental time zones.',
    fajrStandard: '15.0° solar depression angle',
    ishaStandard: '15.0° solar depression angle'
  },
  {
    code: 'FR',
    name: 'France',
    arabicName: 'فرنسا',
    frenchName: 'France',
    flag: '🇫🇷',
    defaultCityId: 'paris',
    defaultMethodKey: 'france',
    officialAuthority: 'Grande Mosquée de Paris & CFCM',
    officialAuthorityAr: 'مسجد باريس الكبير والمجلس الفرنسي للديانة الإسلامية',
    officialAuthorityFr: 'Grande Mosquée de Paris & Conseil Français du Culte Musulman',
    officialUrl: 'https://grandemosqueedeparis.net',
    prayertimePath: 'france',
    methodDescription: 'Grande Mosquée de Paris standard: Fajr 18.0°, Isha 18.0° with astronomical twilight adaptations for European latitudes.',
    fajrStandard: '18.0° (or 12.0° UOIF alternative)',
    ishaStandard: '18.0° (or 12.0° UOIF alternative)'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    arabicName: 'الإمارات العربية المتحدة',
    frenchName: 'Émirats Arabes Unis',
    flag: '🇦🇪',
    defaultCityId: 'dubai',
    defaultMethodKey: 'gulf',
    officialAuthority: 'General Authority of Islamic Affairs and Endowments (Awqaf)',
    officialAuthorityAr: 'الهيئة العامة للشؤون الإسلامية والأوقاف (أوقاف الإمارات)',
    officialAuthorityFr: 'Autorité Générale des Affaires Islamiques et des Waqfs (Awqaf EAU)',
    officialUrl: 'https://awqaf.gov.ae',
    prayertimePath: 'united-arab-emirates',
    methodDescription: 'Official UAE Awqaf unified calendar: Fajr 18.2°, Isha 90 minutes after Maghrib.',
    fajrStandard: '18.2° solar depression angle',
    ishaStandard: '90 minutes after Maghrib'
  },
  {
    code: 'TR',
    name: 'Turkey',
    arabicName: 'الجمهورية التركية',
    frenchName: 'Turquie',
    flag: '🇹🇷',
    defaultCityId: 'istanbul',
    defaultMethodKey: 'diyanet',
    officialAuthority: 'Presidency of Religious Affairs (Diyanet İşleri Başkanlığı)',
    officialAuthorityAr: 'رئاسة الشؤون الدينية التركية (ديانت)',
    officialAuthorityFr: 'Présidence des Affaires Religieuses de Turquie (Diyanet)',
    officialUrl: 'https://diyanet.gov.tr',
    prayertimePath: 'turkey',
    methodDescription: 'Diyanet astronomical calendar: Fajr 18.0°, Isha 17.0° with solar altitude coordinates calibrated by state observatories.',
    fajrStandard: '18.0° solar depression angle (İmsak)',
    ishaStandard: '17.0° solar depression angle (Yatsı)'
  },
  {
    code: 'MA',
    name: 'Morocco',
    arabicName: 'المملكة المغربية',
    frenchName: 'Maroc',
    flag: '🇲🇦',
    defaultCityId: 'casablanca',
    defaultMethodKey: 'mwl',
    officialAuthority: 'Ministry of Habous and Islamic Affairs (وزارة الأوقاف والشؤون الإسلامية)',
    officialAuthorityAr: 'وزارة الأوقاف والشؤون الإسلامية بالمملكة المغربية',
    officialAuthorityFr: 'Ministère des Habous et des Affaires Islamiques du Maroc',
    officialUrl: 'https://habous.gov.ma',
    prayertimePath: 'morocco',
    methodDescription: 'Kingdom of Morocco official ministry timetable based on historical Andalusian-Maghrebi astronomy and MWL guidelines.',
    fajrStandard: '18.0° solar depression angle',
    ishaStandard: '17.0° solar depression angle'
  },
  {
    code: 'PK',
    name: 'Pakistan',
    arabicName: 'جمهورية باكستان الإسلامية',
    frenchName: 'Pakistan',
    flag: '🇵🇰',
    defaultCityId: 'karachi',
    defaultMethodKey: 'karachi',
    officialAuthority: 'Ministry of Religious Affairs & Univ. of Islamic Sciences Karachi',
    officialAuthorityAr: 'جامعة العلوم الإسلامية ببنوري تاون ووزارة الشؤون الدينية',
    officialAuthorityFr: 'Université des Sciences Islamiques de Karachi & Ministère',
    officialUrl: 'https://mora.gov.pk',
    prayertimePath: 'pakistan',
    methodDescription: 'Jamia Uloom-ul-Islamia Banuri Town standard: Fajr 18.0°, Isha 18.0°, standard Hanafi Asr by default across Pakistan.',
    fajrStandard: '18.0° solar depression angle',
    ishaStandard: '18.0° solar depression angle'
  },
  {
    code: 'ID',
    name: 'Indonesia',
    arabicName: 'إندونيسيا',
    frenchName: 'Indonésie',
    flag: '🇮🇩',
    defaultCityId: 'jakarta',
    defaultMethodKey: 'kemenag',
    officialAuthority: 'Bimas Islam Kementerian Agama Republik Indonesia',
    officialAuthorityAr: 'وزارة الشؤون الدينية الإندونيسية (بيماس إسلام)',
    officialAuthorityFr: 'Ministère des Affaires Religieuses d’Indonésie (Kemenag)',
    officialUrl: 'https://bimasislam.kemenag.go.id',
    prayertimePath: 'indonesia',
    methodDescription: 'Official Indonesian Ministry of Religious Affairs (Kemenag) Falak council: Fajr 20.0°, Isha 18.0° across all 3 Indonesian time zones.',
    fajrStandard: '20.0° solar depression angle (Subuh)',
    ishaStandard: '18.0° solar depression angle (Isya)'
  },
  {
    code: 'MY',
    name: 'Malaysia',
    arabicName: 'ماليزيا',
    frenchName: 'Malaisie',
    flag: '🇲🇾',
    defaultCityId: 'kuala-lumpur',
    defaultMethodKey: 'jakim',
    officialAuthority: 'Department of Islamic Development Malaysia (JAKIM)',
    officialAuthorityAr: 'مصلحة التنمية الإسلامية في ماليزيا (جاكيم)',
    officialAuthorityFr: 'Département du Développement Islamique de Malaisie (JAKIM)',
    officialUrl: 'https://www.e-solat.gov.my',
    prayertimePath: 'malaysia',
    methodDescription: 'Official e-Solat JAKIM calendar computed across 29 prayer zones in Malaysia: Fajr 20.0°, Isha 18.0°.',
    fajrStandard: '20.0° solar depression angle',
    ishaStandard: '18.0° solar depression angle'
  },
  {
    code: 'CA',
    name: 'Canada',
    arabicName: 'كندا',
    frenchName: 'Canada',
    flag: '🇨🇦',
    defaultCityId: 'toronto',
    defaultMethodKey: 'isna',
    officialAuthority: 'ISNA Canada & Council of Canadian Mosques',
    officialAuthorityAr: 'الجمعية الإسلامية في كندا ومجلس المساجد الكندية',
    officialAuthorityFr: 'ISNA Canada & Conseil des Mosquées Canadiennes',
    officialUrl: 'https://isna.net',
    prayertimePath: 'canada',
    methodDescription: 'ISNA Canada standard adapted for Canadian latitudes: Fajr 15.0°, Isha 15.0° with high-latitude adjustments.',
    fajrStandard: '15.0° solar depression angle',
    ishaStandard: '15.0° solar depression angle'
  },
  {
    code: 'DE',
    name: 'Germany',
    arabicName: 'ألمانيا',
    frenchName: 'Allemagne',
    flag: '🇩🇪',
    defaultCityId: 'berlin',
    defaultMethodKey: 'diyanet',
    officialAuthority: 'DITIB (Türkisch-Islamische Union) & Islamic Council Germany',
    officialAuthorityAr: 'الاتحاد الإسلامي التركي (ديتيب) والمجلس الإسلامي الألماني',
    officialAuthorityFr: 'Union Islamique Turque (DITIB) & Conseil Islamique Allemand',
    officialUrl: 'https://ditib.de',
    prayertimePath: 'germany',
    methodDescription: 'Standardized by DITIB and German Islamic umbrella organizations with high-latitude midsummer twilight compensation.',
    fajrStandard: '18.0° solar depression angle',
    ishaStandard: '17.0° solar depression angle'
  },
  {
    code: 'DZ',
    name: 'Algeria',
    arabicName: 'الجمهورية الجزائرية الديمقراطية الشعبية',
    frenchName: 'Algérie',
    flag: '🇩🇿',
    defaultCityId: 'algiers',
    defaultMethodKey: 'egypt',
    officialAuthority: 'Ministry of Religious Affairs & Wakfs (وزارة الشؤون الدينية والأوقاف)',
    officialAuthorityAr: 'وزارة الشؤون الدينية والأوقاف بالجمهورية الجزائرية',
    officialAuthorityFr: 'Ministère des Affaires Religieuses et des Wakfs d’Algérie',
    officialUrl: 'https://marw.dz',
    prayertimePath: 'algeria',
    methodDescription: 'Official timetable published by the Algerian Ministry of Religious Affairs using North African solar coordinates.',
    fajrStandard: '18.0° solar depression angle',
    ishaStandard: '17.0° solar depression angle'
  }
];

export const CITIES: CityData[] = [
  // TABUK (SAUDI ARABIA) - Specifically highlighted as requested
  {
    id: 'tabuk',
    name: 'Tabuk',
    nativeName: 'منطقة تبوك',
    arabicName: 'تبوك',
    frenchName: 'Tabouk',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    frenchCountryName: 'Arabie Saoudite',
    arabicCountryName: 'المملكة العربية السعودية',
    latitude: 28.3835,
    longitude: 36.5662,
    timezone: 'Asia/Riyadh',
    methodKey: 'ummalqura',
    officialAuthority: 'Umm al-Qura Calendar & Ministry of Islamic Affairs (Tabuk Branch)',
    officialAuthorityAr: 'تقويم أم القرى وفرع وزارة الشؤون الإسلامية بمنطقة تبوك',
    officialAuthorityFr: 'Calendrier Umm al-Qura & Branche des Affaires Islamiques à Tabuk',
    officialUrl: 'https://ummalqura.gov.sa',
    prayertimePath: 'saudi-sa/tabuk',
    populationInfo: 'Major city in northwestern Saudi Arabia, historic Mosque of the Prophet (Masjid al-Tawba)',
    seoKeywords: [
      'salah time in tabuk',
      'prayer times tabuk saudi arabia',
      'tabuk prayer countdown seconds',
      'how much time until next salah tabuk',
      'fajr and maghrib time tabuk umm al qura'
    ],
    anchorKeywordsEn: [
      'salah time in Tabuk',
      'accurate prayer times in Tabuk Saudi Arabia',
      'live countdown to next salah in Tabuk',
      'Tabuk Fajr, Dhuhr, Asr, Maghrib, Isha timetable'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في تبوك',
      'أوقات الصلاة في تبوك اليوم',
      'العد التنازلي المباشر لأذان الصلاة في تبوك',
      'تقويم أم القرى لمواقيت الصلاة في تبوك'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Tabuk',
      'heures de salat à Tabouk Arabie Saoudite',
      'compte à rebours de prière en direct à Tabuk',
      'calendrier de prière Tabuk selon Umm al-Qura'
    ]
  },

  // MAKKAH AL-MUKARRAMAH
  {
    id: 'makkah',
    name: 'Makkah',
    nativeName: 'مكة المكرمة',
    arabicName: 'مكة المكرمة',
    frenchName: 'La Mecque',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    frenchCountryName: 'Arabie Saoudite',
    arabicCountryName: 'المملكة العربية السعودية',
    latitude: 21.4225,
    longitude: 39.8262,
    timezone: 'Asia/Riyadh',
    methodKey: 'ummalqura',
    officialAuthority: 'Umm al-Qura University & Masjid al-Haram Religious Affairs',
    officialAuthorityAr: 'جامعة أم القرى ورئاسة الشؤون الدينية بالمسجد الحرام',
    officialAuthorityFr: 'Université Umm al-Qura & Présidence Religieuse de Masjid al-Haram',
    officialUrl: 'https://ummalqura.gov.sa',
    prayertimePath: 'saudi-sa/mecca',
    populationInfo: 'Holy City of Islam, home of the Kaaba & Grand Mosque',
    seoKeywords: [
      'makkah prayer times',
      'masjid al haram prayer countdown',
      'next salah countdown makkah',
      'umm al qura mecca prayer schedule'
    ],
    anchorKeywordsEn: [
      'salah time in Makkah Al-Mukarramah',
      'Masjid al-Haram official prayer timetable',
      'live countdown to prayer in Makkah'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في مكة المكرمة',
      'أوقات الصلاة بالمسجد الحرام',
      'العد التنازلي لصلاة الفجر والمغرب بمكة'
    ],
    anchorKeywordsFr: [
      'horaires de prière à La Mecque',
      'heures de salat à Masjid al-Haram',
      'compte à rebours prière La Mecque en direct'
    ]
  },

  // MADINAH AL-MUNAWARAH
  {
    id: 'madinah',
    name: 'Madinah',
    nativeName: 'المدينة المنورة',
    arabicName: 'المدينة المنورة',
    frenchName: 'Médine',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    frenchCountryName: 'Arabie Saoudite',
    arabicCountryName: 'المملكة العربية السعودية',
    latitude: 24.4672,
    longitude: 39.6111,
    timezone: 'Asia/Riyadh',
    methodKey: 'ummalqura',
    officialAuthority: 'Umm al-Qura Calendar & Prophet\'s Mosque Affairs',
    officialAuthorityAr: 'تقويم أم القرى ورئاسة شؤون المسجد النبوي الشريف',
    officialAuthorityFr: 'Affaires Religieuses de la Mosquée du Prophète à Médine',
    officialUrl: 'https://ummalqura.gov.sa',
    prayertimePath: 'saudi-sa/medina',
    populationInfo: 'City of the Prophet, Masjid an-Nabawi',
    seoKeywords: ['madinah prayer times', 'prophets mosque salah schedule'],
    anchorKeywordsEn: [
      'salah time in Madinah Munawwarah',
      'Prophet’s Mosque prayer timetable in Madinah',
      'countdown to next prayer in Madinah'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في المدينة المنورة',
      'أوقات الصلاة بالمسجد النبوي الشريف',
      'العد التنازلي للصلاة في المدينة المنورة'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Médine',
      'heures de salat à la Mosquée du Prophète',
      'compte à rebours prière Médine en direct'
    ]
  },

  // RIYADH
  {
    id: 'riyadh',
    name: 'Riyadh',
    nativeName: 'الرياض',
    arabicName: 'الرياض',
    frenchName: 'Riyad',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    frenchCountryName: 'Arabie Saoudite',
    arabicCountryName: 'المملكة العربية السعودية',
    latitude: 24.7136,
    longitude: 46.6753,
    timezone: 'Asia/Riyadh',
    methodKey: 'ummalqura',
    officialAuthority: 'Ministry of Islamic Affairs Saudi Arabia',
    officialAuthorityAr: 'وزارة الشؤون الإسلامية والدعوة والإرشاد بالرياض',
    officialAuthorityFr: 'Ministère des Affaires Islamiques à Riyad',
    officialUrl: 'https://moia.gov.sa',
    prayertimePath: 'saudi-sa',
    populationInfo: 'Capital of Saudi Arabia, pop. 7.5M+',
    seoKeywords: ['riyadh prayer times', 'salah time in riyadh today'],
    anchorKeywordsEn: [
      'salah time in Riyadh Saudi Arabia',
      'Riyadh daily prayer times Umm al-Qura',
      'countdown until next salah in Riyadh'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في الرياض',
      'أوقات الصلاة في مدينة الرياض اليوم',
      'العد التنازلي لصلاة الفجر والظهر بالرياض'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Riyad',
      'heures de salat à Riyad Arabie Saoudite',
      'compte à rebours des prières à Riyad'
    ]
  },

  // JEDDAH
  {
    id: 'jeddah',
    name: 'Jeddah',
    nativeName: 'جدة',
    arabicName: 'جدة',
    frenchName: 'Djeddah',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    frenchCountryName: 'Arabie Saoudite',
    arabicCountryName: 'المملكة العربية السعودية',
    latitude: 21.5433,
    longitude: 39.1728,
    timezone: 'Asia/Riyadh',
    methodKey: 'ummalqura',
    officialAuthority: 'Ministry of Islamic Affairs Saudi Arabia',
    officialAuthorityAr: 'وزارة الشؤون الإسلامية بمحافظة جدة',
    officialAuthorityFr: 'Ministère des Affaires Islamiques à Djeddah',
    officialUrl: 'https://moia.gov.sa',
    prayertimePath: 'saudi-sa/jeddah',
    populationInfo: 'Red Sea port gateway to Makkah',
    seoKeywords: ['jeddah prayer times', 'salah time jeddah'],
    anchorKeywordsEn: ['salah time in Jeddah', 'prayer times Jeddah Red Sea'],
    anchorKeywordsAr: ['مواقيت الصلاة في جدة', 'أوقات الصلاة بمحافظة جدة'],
    anchorKeywordsFr: ['horaires de prière à Djeddah', 'salat Djeddah Arabie']
  },

  // DAMMAM
  {
    id: 'dammam',
    name: 'Dammam',
    nativeName: 'الدمام',
    arabicName: 'الدمام',
    frenchName: 'Dammam',
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    frenchCountryName: 'Arabie Saoudite',
    arabicCountryName: 'المملكة العربية السعودية',
    latitude: 26.4207,
    longitude: 50.0888,
    timezone: 'Asia/Riyadh',
    methodKey: 'ummalqura',
    officialAuthority: 'Ministry of Islamic Affairs Eastern Province',
    officialAuthorityAr: 'فرع وزارة الشؤون الإسلامية بالمنطقة الشرقية (الدمام)',
    officialAuthorityFr: 'Affaires Islamiques de la Province Orientale à Dammam',
    officialUrl: 'https://moia.gov.sa',
    prayertimePath: 'saudi-sa/dammam',
    populationInfo: 'Eastern Province capital',
    seoKeywords: ['dammam prayer times', 'khobar prayer times'],
    anchorKeywordsEn: ['salah time in Dammam and Eastern Province', 'prayer timetable Dammam'],
    anchorKeywordsAr: ['مواقيت الصلاة في الدمام والخبر', 'أوقات الصلاة بالمنطقة الشرقية'],
    anchorKeywordsFr: ['horaires de prière à Dammam', 'salat Dammam province orientale']
  },

  // CAIRO (EGYPT)
  {
    id: 'cairo',
    name: 'Cairo',
    nativeName: 'القاهرة',
    arabicName: 'القاهرة',
    frenchName: 'Le Caire',
    countryCode: 'EG',
    countryName: 'Egypt',
    frenchCountryName: 'Égypte',
    arabicCountryName: 'جمهورية مصر العربية',
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: 'Africa/Cairo',
    methodKey: 'egypt',
    officialAuthority: 'Egyptian General Authority of Survey & Al-Azhar',
    officialAuthorityAr: 'الهيئة المصرية العامة للمساحة ومشيخة الأزهر الشريف',
    officialAuthorityFr: 'Autorité Générale de l’Arpentage & Al-Azhar au Caire',
    officialUrl: 'https://esa.gov.eg',
    prayertimePath: 'egypt',
    populationInfo: 'Capital of Egypt & Al-Azhar, pop. 20M+',
    seoKeywords: ['cairo prayer times today', 'egyptian survey authority cairo salah'],
    anchorKeywordsEn: [
      'salah time in Cairo Egypt',
      'Egyptian General Authority of Survey Cairo prayer times',
      'countdown to next prayer in Cairo'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في القاهرة',
      'أوقات الصلاة بالجامع الأزهر الشريف والقاهرة',
      'العد التنازلي لمواقيت الصلاة في القاهرة'
    ],
    anchorKeywordsFr: [
      'horaires de prière au Caire',
      'heures de salat au Caire selon l’Arpentage Égyptien',
      'compte à rebours prière Le Caire Égypte'
    ]
  },

  // ALEXANDRIA (EGYPT)
  {
    id: 'alexandria',
    name: 'Alexandria',
    nativeName: 'الإسكندرية',
    arabicName: 'الإسكندرية',
    frenchName: 'Alexandrie',
    countryCode: 'EG',
    countryName: 'Egypt',
    frenchCountryName: 'Égypte',
    arabicCountryName: 'جمهورية مصر العربية',
    latitude: 31.2001,
    longitude: 29.9187,
    timezone: 'Africa/Cairo',
    methodKey: 'egypt',
    officialAuthority: 'Egyptian General Authority of Survey',
    officialAuthorityAr: 'الهيئة المصرية العامة للمساحة بالإسكندرية',
    officialAuthorityFr: 'Autorité Générale Égyptienne à Alexandrie',
    officialUrl: 'https://esa.gov.eg',
    prayertimePath: 'egypt/alexandria',
    populationInfo: 'Second largest city in Egypt, Mediterranean hub',
    seoKeywords: ['alexandria prayer times', 'fajr alexandria egypt'],
    anchorKeywordsEn: ['salah time in Alexandria Egypt', 'Alexandria daily prayer schedule'],
    anchorKeywordsAr: ['مواقيت الصلاة في الإسكندرية', 'أوقات الصلاة في عروس البحر المتوسط'],
    anchorKeywordsFr: ['horaires de prière à Alexandrie', 'heures de salat Alexandrie Égypte']
  },

  // PARIS (FRANCE)
  {
    id: 'paris',
    name: 'Paris',
    nativeName: 'Paris',
    arabicName: 'باريس',
    frenchName: 'Paris',
    countryCode: 'FR',
    countryName: 'France',
    frenchCountryName: 'France',
    arabicCountryName: 'فرنسا',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 'Europe/Paris',
    methodKey: 'france',
    officialAuthority: 'Grande Mosquée de Paris',
    officialAuthorityAr: 'مسجد باريس الكبير والمجلس الفرنسي للديانة الإسلامية',
    officialAuthorityFr: 'Grande Mosquée de Paris & Institut Musulman',
    officialUrl: 'https://grandemosqueedeparis.net',
    prayertimePath: 'france',
    populationInfo: 'Largest Muslim population in Western Europe',
    seoKeywords: ['paris prayer times', 'horaires priere grande mosquee de paris'],
    anchorKeywordsEn: [
      'salah time in Paris France',
      'Grande Mosquée de Paris official prayer times',
      'live countdown to prayer in Paris'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في باريس وفرنسا',
      'أوقات الصلاة بمسجد باريس الكبير',
      'العد التنازلي للصلاة في باريس'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Paris',
      'calendrier officiel de la Grande Mosquée de Paris',
      'compte à rebours salat en direct à Paris',
      'heures de Fajr, Dohr, Asr, Maghreb, Icha à Paris'
    ]
  },

  // MARSEILLE (FRANCE)
  {
    id: 'marseille',
    name: 'Marseille',
    nativeName: 'Marseille',
    arabicName: 'مارسيليا',
    frenchName: 'Marseille',
    countryCode: 'FR',
    countryName: 'France',
    frenchCountryName: 'France',
    arabicCountryName: 'فرنسا',
    latitude: 43.2965,
    longitude: 5.3698,
    timezone: 'Europe/Paris',
    methodKey: 'france',
    officialAuthority: 'Conseil Régional du Culte Musulman PACA',
    officialAuthorityAr: 'المجلس الإسلامي لمنطقة مارسيليا وجنوب فرنسا',
    officialAuthorityFr: 'Conseil Régional du Culte Musulman PACA / Marseille',
    officialUrl: 'https://grandemosqueedeparis.net',
    prayertimePath: 'france/marseille',
    populationInfo: 'Major Muslim community in southern France',
    seoKeywords: ['marseille prayer times', 'horaires priere marseille'],
    anchorKeywordsEn: ['salah time in Marseille France', 'Marseille prayer countdown'],
    anchorKeywordsAr: ['مواقيت الصلاة في مارسيليا', 'أوقات الصلاة في جنوب فرنسا'],
    anchorKeywordsFr: ['horaires de prière à Marseille', 'heures de salat à Marseille PACA']
  },

  // LYON (FRANCE)
  {
    id: 'lyon',
    name: 'Lyon',
    nativeName: 'Lyon',
    arabicName: 'ليون',
    frenchName: 'Lyon',
    countryCode: 'FR',
    countryName: 'France',
    frenchCountryName: 'France',
    arabicCountryName: 'فرنسا',
    latitude: 45.764,
    longitude: 4.8357,
    timezone: 'Europe/Paris',
    methodKey: 'france',
    officialAuthority: 'Grande Mosquée de Lyon',
    officialAuthorityAr: 'مسجد ليون الكبير والاتحاد الإسلامي برون ألب',
    officialAuthorityFr: 'Grande Mosquée de Lyon & Région Auvergne-Rhône-Alpes',
    officialUrl: 'https://grandemosqueedeparis.net',
    prayertimePath: 'france/lyon',
    populationInfo: 'Second largest metropolitan Muslim community in France',
    seoKeywords: ['lyon prayer times', 'horaires priere lyon'],
    anchorKeywordsEn: ['salah time in Lyon France', 'Grande Mosquée de Lyon prayer timetable'],
    anchorKeywordsAr: ['مواقيت الصلاة في ليون', 'أوقات الصلاة بمسجد ليون الكبير'],
    anchorKeywordsFr: ['horaires de prière à Lyon', 'heures de prière Grande Mosquée de Lyon']
  },

  // LONDON (UNITED KINGDOM)
  {
    id: 'london',
    name: 'London',
    nativeName: 'London',
    arabicName: 'لندن',
    frenchName: 'Londres',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    frenchCountryName: 'Royaume-Uni',
    arabicCountryName: 'المملكة المتحدة',
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: 'Europe/London',
    methodKey: 'london',
    officialAuthority: 'London Central Mosque Trust & Islamic Cultural Centre (ICCUK)',
    officialAuthorityAr: 'مسجد لندن المركزي والمركز الثقافي الإسلامي ريجنتس بارك',
    officialAuthorityFr: 'Mosquée Centrale de Londres (Regent’s Park)',
    officialUrl: 'https://iccuk.org',
    prayertimePath: 'united-kingdom',
    populationInfo: 'Over 1.3 million Muslim residents',
    seoKeywords: ['london prayer times today', 'london unified timetable salah countdown'],
    anchorKeywordsEn: [
      'salah time in London United Kingdom',
      'London Central Mosque Regents Park prayer timetable',
      'London Unified Islamic prayer times countdown'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في لندن بريطانيا',
      'التقويم الموحد لمواقيت الصلاة في لندن',
      'العد التنازلي لمواقيت الصلاة في لندن'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Londres Royaume-Uni',
      'calendrier unifié de la Mosquée Centrale de Londres',
      'compte à rebours salat en direct à Londres'
    ]
  },

  // BIRMINGHAM (UNITED KINGDOM)
  {
    id: 'birmingham',
    name: 'Birmingham',
    nativeName: 'Birmingham',
    arabicName: 'برمنغهام',
    frenchName: 'Birmingham',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    frenchCountryName: 'Royaume-Uni',
    arabicCountryName: 'المملكة المتحدة',
    latitude: 52.4862,
    longitude: -1.8904,
    timezone: 'Europe/London',
    methodKey: 'london',
    officialAuthority: 'Birmingham Central Mosque',
    officialAuthorityAr: 'مسجد برمنغهام المركزي بالمملكة المتحدة',
    officialAuthorityFr: 'Mosquée Centrale de Birmingham',
    officialUrl: 'https://centralmosque.org.uk',
    prayertimePath: 'united-kingdom/birmingham',
    populationInfo: 'Over 340,000 Muslim residents (30% of city)',
    seoKeywords: ['birmingham prayer times', 'birmingham central mosque timetable'],
    anchorKeywordsEn: ['salah time in Birmingham UK', 'Birmingham Central Mosque prayer timetable'],
    anchorKeywordsAr: ['مواقيت الصلاة في برمنغهام', 'أوقات الصلاة بمسجد برمنغهام المركزي'],
    anchorKeywordsFr: ['horaires de prière à Birmingham', 'salat Birmingham Mosquée Centrale']
  },

  // NEW YORK (UNITED STATES)
  {
    id: 'new-york',
    name: 'New York City',
    nativeName: 'New York City',
    arabicName: 'نيويورك',
    frenchName: 'New York',
    countryCode: 'US',
    countryName: 'United States',
    frenchCountryName: 'États-Unis',
    arabicCountryName: 'الولايات المتحدة الأمريكية',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
    methodKey: 'isna',
    officialAuthority: 'Islamic Society of North America (ISNA)',
    officialAuthorityAr: 'الجمعية الإسلامية لأمريكا الشمالية (إسنا - نيويورك)',
    officialAuthorityFr: 'Islamic Society of North America (ISNA New York)',
    officialUrl: 'https://isna.net',
    prayertimePath: 'united-states',
    populationInfo: 'Largest Muslim population in USA (800k+)',
    seoKeywords: ['new york prayer times', 'nyc salah countdown isna'],
    anchorKeywordsEn: [
      'salah time in New York City',
      'ISNA New York official prayer schedule',
      'how much time until Maghrib in New York'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في نيويورك',
      'أوقات الصلاة بحسب الجمعية الإسلامية في نيويورك',
      'العد التنازلي للصلاة في نيويورك'
    ],
    anchorKeywordsFr: [
      'horaires de prière à New York City',
      'calendrier de prière ISNA New York',
      'compte à rebours salat à New York'
    ]
  },

  // DEARBORN (UNITED STATES)
  {
    id: 'dearborn',
    name: 'Dearborn / Detroit',
    nativeName: 'Dearborn, Michigan',
    arabicName: 'ديربورن - ديترويت',
    frenchName: 'Dearborn / Détroit',
    countryCode: 'US',
    countryName: 'United States',
    frenchCountryName: 'États-Unis',
    arabicCountryName: 'الولايات المتحدة الأمريكية',
    latitude: 42.3223,
    longitude: -83.1763,
    timezone: 'America/Detroit',
    methodKey: 'isna',
    officialAuthority: 'Islamic Center of America & ISNA',
    officialAuthorityAr: 'المركز الإسلامي في أمريكا والجمعية الإسلامية (ديربورن)',
    officialAuthorityFr: 'Centre Islamique d’Amérique à Dearborn',
    officialUrl: 'https://isna.net',
    prayertimePath: 'united-states/dearborn',
    populationInfo: 'Highest Arab-Muslim concentration in the US',
    seoKeywords: ['dearborn prayer times', 'islamic center of america timetable'],
    anchorKeywordsEn: ['salah time in Dearborn Michigan', 'Islamic Center of America Dearborn timetable'],
    anchorKeywordsAr: ['مواقيت الصلاة في ديربورن ميشيغان', 'أوقات الصلاة بالمركز الإسلامي بأمريكا'],
    anchorKeywordsFr: ['horaires de prière à Dearborn Michigan', 'salat Dearborn Détroit']
  },

  // DUBAI (UNITED ARAB EMIRATES)
  {
    id: 'dubai',
    name: 'Dubai',
    nativeName: 'دبي',
    arabicName: 'دبي',
    frenchName: 'Dubaï',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    frenchCountryName: 'Émirats Arabes Unis',
    arabicCountryName: 'الإمارات العربية المتحدة',
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: 'Asia/Dubai',
    methodKey: 'gulf',
    officialAuthority: 'Islamic Affairs and Charitable Activities Department (IACAD) & Awqaf',
    officialAuthorityAr: 'دائرة الشؤون الإسلامية والعمل الخيري بدبي (إسلاميك أوفيرز) وأوقاف الإمارات',
    officialAuthorityFr: 'Département des Affaires Islamiques de Dubaï (IACAD) & Awqaf',
    officialUrl: 'https://awqaf.gov.ae',
    prayertimePath: 'united-arab-emirates',
    populationInfo: 'Global cosmopolitan hub, official IACAD prayer calendar',
    seoKeywords: ['dubai prayer times', 'iacad dubai salah countdown'],
    anchorKeywordsEn: [
      'salah time in Dubai UAE',
      'Dubai Awqaf and IACAD prayer schedule',
      'live countdown to next prayer in Dubai'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في دبي',
      'تقويم أوقاف الإمارات ودائرة الشؤون الإسلامية بدبي',
      'العد التنازلي لمواقيت الصلاة في دبي'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Dubaï EAU',
      'heures de salat officielles Awqaf Dubaï',
      'compte à rebours prière à Dubaï en direct'
    ]
  },

  // ISTANBUL (TURKEY)
  {
    id: 'istanbul',
    name: 'Istanbul',
    nativeName: 'İstanbul',
    arabicName: 'إسطنبول',
    frenchName: 'Istanbul',
    countryCode: 'TR',
    countryName: 'Turkey',
    frenchCountryName: 'Turquie',
    arabicCountryName: 'الجمهورية التركية',
    latitude: 41.0082,
    longitude: 28.9784,
    timezone: 'Europe/Istanbul',
    methodKey: 'diyanet',
    officialAuthority: 'Presidency of Religious Affairs (Diyanet İşleri Başkanlığı)',
    officialAuthorityAr: 'رئاسة الشؤون الدينية التركية (ديانت إسطنبول)',
    officialAuthorityFr: 'Présidence des Affaires Religieuses de Turquie (Diyanet Istanbul)',
    officialUrl: 'https://diyanet.gov.tr',
    prayertimePath: 'turkey',
    populationInfo: 'Historic capital, Hagia Sophia & Blue Mosque, pop. 15M+',
    seoKeywords: ['istanbul namaz vakitleri', 'diyanet istanbul ezan vakti geri sayim'],
    anchorKeywordsEn: [
      'salah time in Istanbul Turkey',
      'Diyanet official namaz vakitleri in Istanbul',
      'countdown to prayer in Istanbul'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في إسطنبول تركيا',
      'أوقات الصلاة الرسمية المعتمدة من ديانت بإسطنبول',
      'العد التنازلي للأذان في إسطنبول'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Istanbul Turquie',
      'calendrier Diyanet namaz vakti Istanbul',
      'compte à rebours de salat à Istanbul'
    ]
  },

  // CASABLANCA (MOROCCO)
  {
    id: 'casablanca',
    name: 'Casablanca',
    nativeName: 'الدار البيضاء',
    arabicName: 'الدار البيضاء',
    frenchName: 'Casablanca',
    countryCode: 'MA',
    countryName: 'Morocco',
    frenchCountryName: 'Maroc',
    arabicCountryName: 'المملكة المغربية',
    latitude: 33.5731,
    longitude: -7.5898,
    timezone: 'Africa/Casablanca',
    methodKey: 'mwl',
    officialAuthority: 'Ministry of Habous and Islamic Affairs Morocco',
    officialAuthorityAr: 'وزارة الأوقاف والشؤون الإسلامية بالدار البيضاء',
    officialAuthorityFr: 'Ministère des Habous et des Affaires Islamiques à Casablanca',
    officialUrl: 'https://habous.gov.ma',
    prayertimePath: 'morocco/casablanca',
    populationInfo: 'Home of Hassan II Mosque on the Atlantic',
    seoKeywords: ['casablanca prayer times', 'habous casablanca salat'],
    anchorKeywordsEn: [
      'salah time in Casablanca Morocco',
      'Ministry of Habous Casablanca prayer timetable',
      'Hassan II Mosque prayer times countdown'
    ],
    anchorKeywordsAr: [
      'مواقيت الصلاة في الدار البيضاء بالمغرب',
      'أوقات الصلاة بمسجد الحسن الثاني بوزارة الأوقاف',
      'العد التنازلي لأذان الصلاة في الدار البيضاء'
    ],
    anchorKeywordsFr: [
      'horaires de prière à Casablanca Maroc',
      'calendrier officiel du Ministère des Habous à Casablanca',
      'heures de prière Mosquée Hassan II Casablanca'
    ]
  },

  // JAKARTA (INDONESIA)
  {
    id: 'jakarta',
    name: 'Jakarta',
    nativeName: 'Jakarta',
    arabicName: 'جاكرتا',
    frenchName: 'Jakarta',
    countryCode: 'ID',
    countryName: 'Indonesia',
    frenchCountryName: 'Indonésie',
    arabicCountryName: 'إندونيسيا',
    latitude: -6.2088,
    longitude: 106.8456,
    timezone: 'Asia/Jakarta',
    methodKey: 'kemenag',
    officialAuthority: 'Bimas Islam Kementerian Agama RI & Istiqlal Mosque',
    officialAuthorityAr: 'وزارة الشؤون الدينية الإندونيسية ومسجد الاستقلال بجاكرتا',
    officialAuthorityFr: 'Ministère Kemenag & Mosquée Istiqlal à Jakarta',
    officialUrl: 'https://bimasislam.kemenag.go.id',
    prayertimePath: 'indonesia',
    populationInfo: 'Capital of Indonesia, Istiqlal Mosque',
    seoKeywords: ['jadwal sholat jakarta', 'jakarta prayer times countdown'],
    anchorKeywordsEn: ['salah time in Jakarta Indonesia', 'Kemenag Bimas Islam Jakarta timetable'],
    anchorKeywordsAr: ['مواقيت الصلاة في جاكرتا إندونيسيا', 'جدول مواقيت الصلاة في مسجد الاستقلال بجاكرتا'],
    anchorKeywordsFr: ['horaires de prière à Jakarta Indonésie', 'jadwal sholat Jakarta Kemenag']
  },

  // KUALA LUMPUR (MALAYSIA)
  {
    id: 'kuala-lumpur',
    name: 'Kuala Lumpur',
    nativeName: 'Kuala Lumpur',
    arabicName: 'كوالالمبور',
    frenchName: 'Kuala Lumpur',
    countryCode: 'MY',
    countryName: 'Malaysia',
    frenchCountryName: 'Malaisie',
    arabicCountryName: 'ماليزيا',
    latitude: 3.139,
    longitude: 101.6869,
    timezone: 'Asia/Kuala_Lumpur',
    methodKey: 'jakim',
    officialAuthority: 'Department of Islamic Development Malaysia (JAKIM e-Solat)',
    officialAuthorityAr: 'مصلحة التنمية الإسلامية في ماليزيا (جاكيم إي-صلاة)',
    officialAuthorityFr: 'Département JAKIM e-Solat de Malaisie',
    officialUrl: 'https://www.e-solat.gov.my',
    prayertimePath: 'malaysia',
    populationInfo: 'Capital of Malaysia, National Mosque',
    seoKeywords: ['waktu solat kuala lumpur', 'jakim e-solat kl countdown'],
    anchorKeywordsEn: ['salah time in Kuala Lumpur Malaysia', 'JAKIM e-Solat Kuala Lumpur timetable'],
    anchorKeywordsAr: ['مواقيت الصلاة في كوالالمبور ماليزيا', 'نظام إي-صلاة الرسمي في ماليزيا'],
    anchorKeywordsFr: ['horaires de prière à Kuala Lumpur', 'waktu solat Kuala Lumpur JAKIM']
  }
];

export const TRUSTED_OFFICIAL_AUTHORITIES = [
  {
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    countryFr: 'Arabie Saoudite',
    entity: 'Umm al-Qura Calendar & Ministry of Islamic Affairs',
    entityAr: 'تقويم أم القرى ووزارة الشؤون الإسلامية والدعوة والإرشاد',
    entityFr: 'Calendrier Umm al-Qura & Ministère des Affaires Islamiques',
    url: 'https://ummalqura.gov.sa',
    secondaryUrl: 'https://moia.gov.sa',
    anchorKeywordEn: 'Umm al-Qura Official Saudi Calendar Portal',
    anchorKeywordAr: 'بوابة تقويم أم القرى الرسمية لمواقيت الصلاة',
    anchorKeywordFr: 'Portail Officiel du Calendrier Umm al-Qura',
    fajrRule: '18.5° astronomical solar depression',
    ishaRule: '90 minutes fixed after Maghrib (120 minutes during Ramadan)',
    notes: 'Official reference for Tabuk, Makkah, Madinah, Riyadh, and the entire Arabian Peninsula.'
  },
  {
    country: 'Egypt',
    countryAr: 'جمهورية مصر العربية',
    countryFr: 'Égypte',
    entity: 'Egyptian General Authority of Survey & Dar al-Ifta',
    entityAr: 'الهيئة المصرية العامة للمساحة ودار الإفتاء المصرية',
    entityFr: 'Autorité Générale Égyptienne de l’Arpentage & Dar al-Ifta',
    url: 'https://esa.gov.eg',
    secondaryUrl: 'https://dar-alifta.org',
    anchorKeywordEn: 'Egyptian General Authority of Survey Official Portal',
    anchorKeywordAr: 'بوابة الهيئة المصرية العامة للمساحة الرسمية',
    anchorKeywordFr: 'Portail Officiel de l’Arpentage Égyptien',
    fajrRule: '19.5° solar depression angle',
    ishaRule: '17.5° solar depression angle',
    notes: 'Governs Cairo, Alexandria, Nile Delta, and standard for Sudan.'
  },
  {
    country: 'Turkey',
    countryAr: 'الجمهورية التركية',
    countryFr: 'Turquie',
    entity: 'Presidency of Religious Affairs (Diyanet İşleri Başkanlığı)',
    entityAr: 'رئاسة الشؤون الدينية التركية (ديانت)',
    entityFr: 'Présidence des Affaires Religieuses de Turquie (Diyanet)',
    url: 'https://diyanet.gov.tr',
    secondaryUrl: 'https://namazvakitleri.diyanet.gov.tr',
    anchorKeywordEn: 'Presidency of Religious Affairs (Diyanet) Official Timetable',
    anchorKeywordAr: 'البوابة الرسمية لرئاسة الشؤون الدينية التركية (ديانت)',
    anchorKeywordFr: 'Portail Officiel de la Diyanet de Turquie',
    fajrRule: '18.0° solar angle (İmsak)',
    ishaRule: '17.0° solar angle (Yatsı)',
    notes: 'Regulates all mosques in Turkey and European diaspora foundations.'
  },
  {
    country: 'United Kingdom',
    countryAr: 'المملكة المتحدة',
    countryFr: 'Royaume-Uni',
    entity: 'London Central Mosque Trust & Islamic Cultural Centre (ICCUK)',
    entityAr: 'مسجد لندن المركزي والمركز الثقافي الإسلامي ريجنتس بارك',
    entityFr: 'Mosquée Centrale de Londres (ICCUK)',
    url: 'https://iccuk.org',
    secondaryUrl: 'https://centralmosque.org.uk',
    anchorKeywordEn: 'London Central Mosque Trust & ICCUK Unified Timetable',
    anchorKeywordAr: 'بوابة مسجد لندن المركزي والمركز الثقافي الإسلامي',
    anchorKeywordFr: 'Portail Officiel de la Mosquée Centrale de Londres',
    fajrRule: '18.0° (with 1/7th night seasonal adaptation)',
    ishaRule: '18.0° (with 1/7th night seasonal adaptation)',
    notes: 'Collaborative timetable adopted by hundreds of UK mosques.'
  },
  {
    country: 'United States & Canada',
    countryAr: 'الولايات المتحدة الأمريكية وكندا',
    countryFr: 'États-Unis & Canada',
    entity: 'Islamic Society of North America (ISNA)',
    entityAr: 'الجمعية الإسلامية لأمريكا الشمالية (إسنا)',
    entityFr: 'Société Islamique d’Amérique du Nord (ISNA)',
    url: 'https://isna.net',
    secondaryUrl: 'https://fiqhcouncil.org',
    anchorKeywordEn: 'Islamic Society of North America (ISNA) Official Schedule',
    anchorKeywordAr: 'بوابة الجمعية الإسلامية لأمريكا الشمالية الرسمية',
    anchorKeywordFr: 'Portail Officiel de l’ISNA en Amérique du Nord',
    fajrRule: '15.0° solar angle',
    ishaRule: '15.0° solar angle',
    notes: 'Established with Fiqh Council of North America for consistent North American timings.'
  },
  {
    country: 'France',
    countryAr: 'فرنسا',
    countryFr: 'France',
    entity: 'Grande Mosquée de Paris & CFCM',
    entityAr: 'مسجد باريس الكبير والمجلس الفرنسي للديانة الإسلامية',
    entityFr: 'Grande Mosquée de Paris & Conseil Français du Culte Musulman',
    url: 'https://grandemosqueedeparis.net',
    secondaryUrl: 'https://cfcm.fr',
    anchorKeywordEn: 'Grande Mosquée de Paris Official Calendar Portal',
    anchorKeywordAr: 'البوابة الرسمية لمسجد باريس الكبير',
    anchorKeywordFr: 'Portail Officiel de la Grande Mosquée de Paris',
    fajrRule: '18.0° (standard) or 12.0° (UOIF summer adaptation)',
    ishaRule: '18.0° (standard) or 12.0° (UOIF summer adaptation)',
    notes: 'Official institutional authority representing French Muslims.'
  },
  {
    country: 'United Arab Emirates',
    countryAr: 'الإمارات العربية المتحدة',
    countryFr: 'Émirats Arabes Unis',
    entity: 'General Authority of Islamic Affairs and Endowments (Awqaf UAE)',
    entityAr: 'الهيئة العامة للشؤون الإسلامية والأوقاف بدولة الإمارات',
    entityFr: 'Autorité Générale des Affaires Islamiques des EAU',
    url: 'https://awqaf.gov.ae',
    secondaryUrl: 'https://iacad.gov.ae',
    anchorKeywordEn: 'UAE Awqaf Official Prayer Times Portal',
    anchorKeywordAr: 'بوابة الهيئة العامة للشؤون الإسلامية والأوقاف بالإمارات',
    anchorKeywordFr: 'Portail Officiel des Awqaf des Émirats Arabes Unis',
    fajrRule: '18.2° solar angle',
    ishaRule: '90 minutes after Maghrib',
    notes: 'Unified nationwide timetable across Abu Dhabi, Dubai, and Northern Emirates.'
  },
  {
    country: 'Morocco',
    countryAr: 'المملكة المغربية',
    countryFr: 'Maroc',
    entity: 'Ministry of Habous and Islamic Affairs (وزارة الأوقاف والشؤون الإسلامية)',
    entityAr: 'وزارة الأوقاف والشؤون الإسلامية بالمملكة المغربية',
    entityFr: 'Ministère des Habous et des Affaires Islamiques du Maroc',
    url: 'https://habous.gov.ma',
    secondaryUrl: 'https://habous.gov.ma/horaires-de-priere',
    anchorKeywordEn: 'Kingdom of Morocco Ministry of Habous Official Calendar',
    anchorKeywordAr: 'بوابة وزارة الأوقاف والشؤون الإسلامية المغربية الرسمية',
    anchorKeywordFr: 'Portail Officiel du Ministère des Habous du Maroc',
    fajrRule: '18.0° solar angle',
    ishaRule: '17.0° solar angle',
    notes: 'Official royal Moroccan observatory timetable.'
  }
];
