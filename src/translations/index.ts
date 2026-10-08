export type AppLanguage = 'en' | 'ar' | 'fr';

export interface Translations {
  appName: string;
  appSubtitle: string;
  selectCountry: string;
  selectCity: string;
  searchCityPlaceholder: string;
  simpleSelect: string;
  searchAllCities: string;
  useGps: string;
  detectingGps: string;
  asrCalculation: string;
  asrStandard: string;
  asrHanafi: string;
  asrStandardTooltip: string;
  asrHanafiTooltip: string;
  qiblaDirection: string;
  monthlyCalendar: string;
  embedWidget: string;
  timeUntilNextSalah: string;
  nextSalahIs: string;
  atTime: string;
  hours: string;
  minutes: string;
  seconds: string;
  exactRemaining: string;
  untilCallToPrayer: string;
  windowLabel: string;
  elapsed: string;
  officialMethod: string;
  dailyScheduleTitle: string;
  dailyScheduleSubtitle: string;
  today: string;
  nextBadge: string;
  activeBadge: string;
  fastingAndNightMarkers: string;
  imsakDesc: string;
  midnightDesc: string;
  lastThirdDesc: string;
  qiblaTitle: string;
  qiblaDesc: string;
  qiblaAzimuth: string;
  fromTrueNorth: string;
  distanceToKaaba: string;
  kilometers: string;
  focalPoint: string;
  howToPrayGuide: string;
  turnToward: string;
  authoritiesTitle: string;
  authoritiesSubtitle: string;
  filterAuthorities: string;
  officialGovStandard: string;
  officialPortal: string;
  timetableDetails: string;
  howAstronomersDetermine: string;
  solarZenithTitle: string;
  solarZenithDesc: string;
  shadowFactorTitle: string;
  shadowFactorDesc: string;
  twilightAnglesTitle: string;
  twilightAnglesDesc: string;
  verifiedPartnerTitle: string;
  verifiedPartnerDesc: string;
  browseKeywordsTitle: string;
  browseKeywordsSubtitle: string;
  allCitiesDirectory: string;
  seoKeywordsTitle: string;
  footerQuote: string;
  footerQuoteSource: string;
  footerCongregationAdvice: string;
  footerRights: string;
  poweredBy: string;
  copyTable: string;
  copied: string;
  csvExport: string;
  print: string;
  close: string;
  embedTitle: string;
  embedSubtitle: string;
  copyEmbedCode: string;
  testChime: string;
  soundEnabled: string;
  soundMuted: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
  lastThird: string;
  fajrDesc: string;
  sunriseDesc: string;
  dhuhrDesc: string;
  asrDesc: string;
  maghribDesc: string;
  ishaDesc: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  en: {
    appName: 'SalahTime Live',
    appSubtitle: 'Next Prayer Countdown & Global Salah Times',
    selectCountry: 'Select Country',
    selectCity: 'Select City / Region',
    searchCityPlaceholder: 'Search e.g. Tabuk, London, Cairo, Paris...',
    simpleSelect: 'Standard list',
    searchAllCities: 'Search all global cities',
    useGps: 'Use My GPS',
    detectingGps: 'Detecting...',
    asrCalculation: 'Asr Juristic School:',
    asrStandard: 'Standard (Shafi/Maliki/Hanbali)',
    asrHanafi: 'Hanafi (Shadow × 2)',
    asrStandardTooltip: 'Shafi, Maliki, Hanbali (Shadow Factor = 1)',
    asrHanafiTooltip: 'Hanafi School (Shadow Factor = 2, approx 45m later)',
    qiblaDirection: 'Qibla Direction',
    monthlyCalendar: 'Monthly Timetable',
    embedWidget: 'Embed Widget',
    timeUntilNextSalah: 'Time Until Next Salah',
    nextSalahIs: 'Accurate live countdown to',
    atTime: 'at',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    exactRemaining: 'Exact remaining time:',
    untilCallToPrayer: 'until call to prayer',
    windowLabel: 'WINDOW',
    elapsed: 'Elapsed',
    officialMethod: 'Official Calculation Authority:',
    dailyScheduleTitle: 'Daily Prayer Schedule for',
    dailyScheduleSubtitle: 'Astronomically calculated solar times with official horizon offsets',
    today: 'Today',
    nextBadge: 'Next',
    activeBadge: 'Active',
    fastingAndNightMarkers: 'Fasting & Night Worship (Qiyam al-Layl) Markers',
    imsakDesc: 'Fasting safety margin (-10m before Fajr)',
    midnightDesc: 'Halfway point between Maghrib and tomorrow Fajr',
    lastThirdDesc: 'Optimal time for Tahajjud & night supplication',
    qiblaTitle: 'Great-Circle Qibla Compass for',
    qiblaDesc: 'Calculated using spherical trigonometry towards the Holy Kaaba in Makkah al-Mukarramah',
    qiblaAzimuth: 'Qibla Azimuth',
    fromTrueNorth: 'from True North',
    distanceToKaaba: 'Distance to Kaaba',
    kilometers: 'Kilometers (Great Circle)',
    focalPoint: 'Sacred Sanctuary',
    howToPrayGuide: 'How to orient:',
    turnToward: 'Face toward',
    authoritiesTitle: 'How Salah Timing is Officially Counted in Each Country',
    authoritiesSubtitle: 'Calculated using astronomical ephemeris and decrees from national Islamic ministries & survey councils',
    filterAuthorities: 'Filter by country e.g. Saudi, Egypt, UK, France...',
    officialGovStandard: 'Official Standard',
    officialPortal: 'Official Authority Portal',
    timetableDetails: 'Calculation Methodology',
    howAstronomersDetermine: 'Astronomical Criteria Behind Prayer Times',
    solarZenithTitle: '1. Solar Zenith & Dhuhr',
    solarZenithDesc: 'Dhuhr begins when the sun crosses the meridian (solar noon / Zawal) with a 2-minute buffer.',
    shadowFactorTitle: '2. Shadow Ratios for Asr',
    shadowFactorDesc: 'Standard (Shafi/Maliki/Hanbali) uses shadow = object height + noon shadow; Hanafi uses twice object height.',
    twilightAnglesTitle: '3. Solar Depression for Fajr & Isha',
    twilightAnglesDesc: 'Fajr begins at true dawn (15° to 20° solar angle below horizon); Isha begins when twilight fades.',
    verifiedPartnerTitle: 'Verified Against Global Islamic Prayer Observatory',
    verifiedPartnerDesc: 'All municipal prayer calculations are synchronized in real time with national fatwa councils and the global observatory.',
    browseKeywordsTitle: 'Global City Prayer Time Directory',
    browseKeywordsSubtitle: 'Direct links to verified prayer timetables across Saudi Arabia, Egypt, France, UK, US, and world cities',
    allCitiesDirectory: 'Explore All Cities Directory',
    seoKeywordsTitle: 'Search Queries & Long-Tail Keywords',
    footerQuote: '"Indeed, prayer has been decreed upon the believers a decree of specified times."',
    footerQuoteSource: 'Surah An-Nisa [4:103]',
    footerCongregationAdvice: 'Always consult your local mosque for congregation (Iqamah) times and microclimate visual horizons.',
    footerRights: 'All rights reserved.',
    poweredBy: 'Powered by Jean Meeus Solar Ephemeris & Great Circle Astronomy',
    copyTable: 'Copy Table',
    copied: 'Copied!',
    csvExport: 'CSV Export',
    print: 'Print Calendar',
    close: 'Close',
    embedTitle: 'Embed Salah Countdown Widget',
    embedSubtitle: 'Add this responsive live countdown to your mosque portal, blog, or community website',
    copyEmbedCode: 'Copy Embed Code',
    testChime: 'Test Audio',
    soundEnabled: 'Adhan chime enabled',
    soundMuted: 'Adhan chime muted',
    fajr: 'Fajr',
    sunrise: 'Sunrise (Shuruq)',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha',
    imsak: 'Imsak',
    midnight: 'Islamic Midnight',
    lastThird: 'Last Third of Night',
    fajrDesc: 'Dawn prayer before sunrise',
    sunriseDesc: 'Solar disc emergence (end of Fajr)',
    dhuhrDesc: 'Midday prayer after solar zenith',
    asrDesc: 'Late afternoon prayer until sunset',
    maghribDesc: 'Sunset prayer & iftar breaking',
    ishaDesc: 'Nightfall prayer'
  },
  ar: {
    appName: 'مواقيت الصلاة لايف',
    appSubtitle: 'العد التنازلي المباشر للصلاة القادمة ومواقيت الصلاة حول العالم',
    selectCountry: 'اختر الدولة',
    selectCity: 'اختر المدينة / المنطقة',
    searchCityPlaceholder: 'ابحث عن مدينة مثل تبوك، الرياض، القاهرة، مكة...',
    simpleSelect: 'القائمة العادية',
    searchAllCities: 'البحث في جميع مدن العالم',
    useGps: 'موقعي الحالي (GPS)',
    detectingGps: 'جاري التحديد...',
    asrCalculation: 'مذهب حساب العصر:',
    asrStandard: 'الجمهور (الشافعي والمالكي والحنبلي)',
    asrHanafi: 'المذهب الحنفي (الظل × 2)',
    asrStandardTooltip: 'الشافعي والمالكي والحنبلي (ظل المثل)',
    asrHanafiTooltip: 'المذهب الحنفي (ظل المثلين - يتأخر قرابة 45 دقيقة)',
    qiblaDirection: 'اتجاه القبلة',
    monthlyCalendar: 'التقويم الشهري',
    embedWidget: 'تضمين ويدجت',
    timeUntilNextSalah: 'الوقت المتبقي للصلاة القادمة',
    nextSalahIs: 'العد التنازلي الدقيق لصلاة',
    atTime: 'في تمام الساعة',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
    exactRemaining: 'الوقت المتبقي بدقة:',
    untilCallToPrayer: 'حتى يرفع أذان الصلاة',
    windowLabel: 'وقت الصلاة الحالية',
    elapsed: 'المنقضي',
    officialMethod: 'الجهة الرسمية المعتمدة للحساب:',
    dailyScheduleTitle: 'مواقيت الصلاة اليومية لمدينة',
    dailyScheduleSubtitle: 'محسوبة فلكياً بدقة وفق زوايا انخفاض الشمس والجهات الشرعية الرسمية',
    today: 'اليوم',
    nextBadge: 'القادمة',
    activeBadge: 'الحالية',
    fastingAndNightMarkers: 'علامات الصيام وقيام الليل',
    imsakDesc: 'وقت الإمساك الاحتياطي (10 دقائق قبل الفجر)',
    midnightDesc: 'منتصف الليل الشرعي (نصف ما بين المغرب والفجر)',
    lastThirdDesc: 'ثلث الليل الآخر (أفضل وقت لصلاة التهجد وقيام الليل)',
    qiblaTitle: 'بوصلة اتجاه القبلة الدقيقة لمدينة',
    qiblaDesc: 'محسوبة بحساب المثلثات الكروية من إحداثياتك نحو الكعبة المشرفة بمكة المكرمة',
    qiblaAzimuth: 'زاوية انحراف القبلة',
    fromTrueNorth: 'عن الشمال الحقيقي',
    distanceToKaaba: 'المسافة إلى الكعبة المشرفة',
    kilometers: 'كيلومتر (خط مستقيم)',
    focalPoint: 'المقصد الشريف',
    howToPrayGuide: 'كيفية التوجه للصلاة:',
    turnToward: 'استقبل الزاوية',
    authoritiesTitle: 'كيف يُحسب وقت الصلاة رسمياً في كل دولة',
    authoritiesSubtitle: 'وفق الحسابات الفلكية المعتمدة لدى وزارات الأوقاف وهيئات المساحة الرسمية',
    filterAuthorities: 'تصفية حسب الدولة مثل السعودية، مصر، المغرب...',
    officialGovStandard: 'المعيار الحكومي المعتمد',
    officialPortal: 'البوابة الرسمية المعتمدة',
    timetableDetails: 'تفاصيل معايير الحساب',
    howAstronomersDetermine: 'الأسس الفلكية لحساب مواقيت الصلاة',
    solarZenithTitle: '1. الزوال وصلاة الظهر',
    solarZenithDesc: 'يدخل وقت الظهر بزوال الشمس عن كبد السماء مع إضافة دقيقتين للتأكد من الميل.',
    shadowFactorTitle: '2. حساب ظل الشيء لصلاة العصر',
    shadowFactorDesc: 'الجمهور يدخل العصر بمصير ظل الشيء مثله، وفي الحنفي بمصير ظل الشيء مثليه.',
    twilightAnglesTitle: '3. زوايا الشفق للفجر والعشاء',
    twilightAnglesDesc: 'الفجر بانبثاق الخيط الأبيض (زاوية 18° إلى 20°)، والعشاء بمغيب الشفق الأحمر.',
    verifiedPartnerTitle: 'موثق ومطابق للمرصد الفلكي العالمي',
    verifiedPartnerDesc: 'جميع الحسابات متزامنة في الوقت الفعلي مع مجالس الإفتاء والهيئات الرسمية والمرصد العالمي.',
    browseKeywordsTitle: 'دليل مواقيت الصلاة لمدن العالم الإسلامي',
    browseKeywordsSubtitle: 'روابط مباشرة لمواقيت الصلاة في تبوك ومكة والرياض والقاهرة ولندن وباريس',
    allCitiesDirectory: 'تصفح جميع المدن',
    seoKeywordsTitle: 'الكلمات الدلالية ومحركات البحث',
    footerQuote: '﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾',
    footerQuoteSource: 'سورة النساء [١٠٣]',
    footerCongregationAdvice: 'يُرجى مراجعة المسجد المحلي لأوقات الإقامة ومراعاة الفروق التضاريسية الدقيقة.',
    footerRights: 'جميع الحقوق محفوظة.',
    poweredBy: 'يعتمد على خوارزميات جان ميوس الفلكية وحساب الدائرة العظمى',
    copyTable: 'نسخ الجدول',
    copied: 'تم النسخ!',
    csvExport: 'تصدير ملف CSV',
    print: 'طباعة التقويم',
    close: 'إغلاق',
    embedTitle: 'تضمين عداد مواقيت الصلاة',
    embedSubtitle: 'انسخ كود التضمين لإضافة عداد تنازلي مباشر للصلاة في موقعك أو مدونتك',
    copyEmbedCode: 'نسخ كود التضمين',
    testChime: 'تجربة الصوت',
    soundEnabled: 'صوت التنبيه مفعل',
    soundMuted: 'صوت التنبيه مكتوم',
    fajr: 'الفجر',
    sunrise: 'الشروق',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    imsak: 'الإمساك',
    midnight: 'منتصف الليل',
    lastThird: 'ثلث الليل الآخر',
    fajrDesc: 'صلاة الفجر مع طلوع الفجر الصادق',
    sunriseDesc: 'شروق قرص الشمس (انتهاء وقت الفجر)',
    dhuhrDesc: 'صلاة الظهر بعد زوال الشمس',
    asrDesc: 'صلاة العصر حتى اصفرار الشمس',
    maghribDesc: 'صلاة المغرب مع غروب الشمس والإفطار',
    ishaDesc: 'صلاة العشاء بعد مغيب الشفق'
  },
  fr: {
    appName: 'SalahTime Live',
    appSubtitle: 'Compte à Rebours en Direct & Horaires de Prière Mondiaux',
    selectCountry: 'Sélectionner le Pays',
    selectCity: 'Sélectionner la Ville / Région',
    searchCityPlaceholder: 'Rechercher ex. Tabuk, Paris, Marseille, Le Caire...',
    simpleSelect: 'Liste standard',
    searchAllCities: 'Rechercher toutes les villes',
    useGps: 'Utiliser mon GPS',
    detectingGps: 'Détection en cours...',
    asrCalculation: 'Méthode juridique pour le Asr :',
    asrStandard: 'Standard (Chafiite/Malikite/Hanbalite)',
    asrHanafi: 'Hanafite (Ombre × 2)',
    asrStandardTooltip: 'Chafiite, Malikite, Hanbalite (Facteur d’ombre = 1)',
    asrHanafiTooltip: 'École Hanafite (Facteur d’ombre = 2, env. 45 min plus tard)',
    qiblaDirection: 'Direction de la Qibla',
    monthlyCalendar: 'Calendrier Mensuel',
    embedWidget: 'Widget Intégrable',
    timeUntilNextSalah: 'Temps Restant Avant la Prochaine Prière',
    nextSalahIs: 'Compte à rebours précis jusqu’à',
    atTime: 'à',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    exactRemaining: 'Temps exact restant :',
    untilCallToPrayer: 'avant l’appel à la prière',
    windowLabel: 'PÉRIODE',
    elapsed: 'Écoulé',
    officialMethod: 'Autorité officielle de calcul :',
    dailyScheduleTitle: 'Horaires Quotidiens de Prière pour',
    dailyScheduleSubtitle: 'Calculés astronomiquement selon la déclinaison solaire et les normes officielles',
    today: 'Aujourd’hui',
    nextBadge: 'Suivante',
    activeBadge: 'En cours',
    fastingAndNightMarkers: 'Repères de Jeûne & Prières Nocturnes (Qiyam)',
    imsakDesc: 'Marge de sécurité du jeûne (-10 min avant le Fajr)',
    midnightDesc: 'Milieu de la nuit islamique (entre Maghrib et Fajr)',
    lastThirdDesc: 'Dernier tiers de la nuit (moment privilégié du Tahajjud)',
    qiblaTitle: 'Boussole de la Qibla en Grand Cercle pour',
    qiblaDesc: 'Calculée par trigonométrie sphérique vers la Sainte Kaaba à La Mecque',
    qiblaAzimuth: 'Azimut de la Qibla',
    fromTrueNorth: 'par rapport au Nord géographique',
    distanceToKaaba: 'Distance jusqu’à la Kaaba',
    kilometers: 'Kilomètres (Grand Cercle)',
    focalPoint: 'Sanctuaire Sacré',
    howToPrayGuide: 'Comment s’orienter :',
    turnToward: 'Orientez-vous vers',
    authoritiesTitle: 'Comment les Horaires de Prière sont Calculés Officiellement',
    authoritiesSubtitle: 'Calculs astronomiques validés par les ministères islamiques et comités officiels',
    filterAuthorities: 'Filtrer par pays ex. Arabie, France, Égypte, Maroc...',
    officialGovStandard: 'Norme Officielle',
    officialPortal: 'Portail Officiel',
    timetableDetails: 'Méthodologie de Calcul',
    howAstronomersDetermine: 'Fondements Astronomiques des Horaires de Salat',
    solarZenithTitle: '1. Zénith Solaire & Dohr',
    solarZenithDesc: 'Le Dohr débute quand le soleil franchit le méridien (zawal) avec un tampon de 2 min.',
    shadowFactorTitle: '2. Facteur d’Ombre pour le Asr',
    shadowFactorDesc: 'Standard : l’ombre égale la longueur de l’objet + ombre de midi. Hanafite : le double.',
    twilightAnglesTitle: '3. Angles Crépusculaires pour Fajr & Icha',
    twilightAnglesDesc: 'Fajr commence à l’aube véritable (angle de 15° à 20° sous l’horizon) ; Icha à la disparition du crépuscule.',
    verifiedPartnerTitle: 'Vérifié auprès de l’Observatoire Mondial de Prière',
    verifiedPartnerDesc: 'Tous les horaires municipaux sont synchronisés en temps réel avec les commissions nationales et l’observatoire mondial.',
    browseKeywordsTitle: 'Annuaire des Horaires de Prière par Ville',
    browseKeywordsSubtitle: 'Liens directs pour vérifier les horaires de salat à Tabuk, Paris, Marseille, Lyon, Le Caire et Londres',
    allCitiesDirectory: 'Explorer toutes les villes',
    seoKeywordsTitle: 'Requêtes de Recherche & Mots-Clés Pertinents',
    footerQuote: '« La prière demeure, pour les croyants, une prescription à des heures déterminées. »',
    footerQuoteSource: 'Sourate An-Nisa [4:103]',
    footerCongregationAdvice: 'Consultez toujours votre mosquée locale pour les heures d’Iqamah et les spécificités d’horizon.',
    footerRights: 'Tous droits réservés.',
    poweredBy: 'Propulsé par les algorithmes astronomiques de Jean Meeus',
    copyTable: 'Copier le tableau',
    copied: 'Copié !',
    csvExport: 'Exporter CSV',
    print: 'Imprimer le calendrier',
    close: 'Fermer',
    embedTitle: 'Intégrer le Widget de Prière',
    embedSubtitle: 'Ajoutez ce compte à rebours interactif à votre site de mosquée, blog ou communauté',
    copyEmbedCode: 'Copier le code d’intégration',
    testChime: 'Tester l’Adhan',
    soundEnabled: 'Sonnerie de l’Adhan activée',
    soundMuted: 'Sonnerie en sourdine',
    fajr: 'Fajr (Aube)',
    sunrise: 'Chourouq (Lever)',
    dhuhr: 'Dohr (Midi)',
    asr: 'Asr (Après-midi)',
    maghrib: 'Maghreb (Coucher)',
    isha: 'Icha (Nuit)',
    imsak: 'Imsak',
    midnight: 'Minuit Islamique',
    lastThird: 'Dernier Tiers de la Nuit',
    fajrDesc: 'Prière de l’aube avant le lever du soleil',
    sunriseDesc: 'Émergence du disque solaire (fin du Fajr)',
    dhuhrDesc: 'Prière de la mi-journée après le zénith',
    asrDesc: 'Prière de l’après-midi jusqu’au coucher',
    maghribDesc: 'Prière du coucher du soleil et rupture du jeûne',
    ishaDesc: 'Prière de la nuit'
  }
};
