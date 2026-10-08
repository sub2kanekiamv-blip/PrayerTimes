export type PrayerKey = 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export type AsrJuristicMethod = 'standard' | 'hanafi';

export type CalculationMethodKey =
  | 'ummalqura'
  | 'egypt'
  | 'isna'
  | 'mwl'
  | 'diyanet'
  | 'france'
  | 'jakim'
  | 'kemenag'
  | 'karachi'
  | 'gulf'
  | 'kuwait'
  | 'qatar'
  | 'london';

export interface CalculationMethodInfo {
  key: CalculationMethodKey;
  name: string;
  fullName: string;
  fajrAngle: number;
  maghribInterval?: number; // minutes
  ishaAngle?: number;
  ishaInterval?: number; // minutes after Maghrib (e.g. 90 for Umm al-Qura)
  officialAuthority: string;
  authorityUrl: string;
  country: string;
  description: string;
}

export interface CityData {
  id: string;
  name: string;
  nativeName: string;
  arabicName: string;
  frenchName?: string;
  countryCode: string;
  countryName: string;
  frenchCountryName?: string;
  arabicCountryName?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  methodKey: CalculationMethodKey;
  officialAuthority: string;
  officialAuthorityAr?: string;
  officialAuthorityFr?: string;
  officialUrl: string;
  prayertimePath: string; // e.g. "saudi-sa/tabuk" -> https://prayertime.info/{lang}/saudi-sa/tabuk/
  populationInfo?: string;
  seoKeywords: string[];
  anchorKeywordsEn: string[];
  anchorKeywordsAr: string[];
  anchorKeywordsFr: string[];
}

export interface CountryData {
  code: string;
  name: string;
  arabicName: string;
  frenchName: string;
  flag: string;
  defaultCityId: string;
  defaultMethodKey: CalculationMethodKey;
  officialAuthority: string;
  officialAuthorityAr: string;
  officialAuthorityFr: string;
  officialUrl: string;
  prayertimePath: string; // e.g. "saudi-sa", "egypt", "france"
  methodDescription: string;
  fajrStandard: string;
  ishaStandard: string;
}

export interface PrayerTimes {
  imsak: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  midnight: string;
  lastThird: string;
}

export interface NextPrayerInfo {
  key: PrayerKey;
  label: string;
  arabicName: string;
  timeString: string;
  targetDateTime: Date;
  totalSecondsRemaining: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedCountdown: string;
  currentPrayerKey: PrayerKey;
  progressPercent: number; // 0 to 100% elapsed between previous prayer and next prayer
}

export interface HijriDateInfo {
  day: number;
  monthNameEn: string;
  monthNameAr: string;
  year: number;
  formattedEn: string;
  formattedAr: string;
}
