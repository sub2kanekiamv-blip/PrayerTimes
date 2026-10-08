import { AsrJuristicMethod, CalculationMethodKey, NextPrayerInfo, PrayerKey, PrayerTimes } from '../types/prayer';
import { CALCULATION_METHODS } from '../data/countriesAndCities';

// Kaaba coordinates in Makkah
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

// Helper math conversion functions
const d2r = (deg: number) => (deg * Math.PI) / 180.0;
const r2d = (rad: number) => (rad * 180.0) / Math.PI;
const fixAngle = (a: number) => {
  let val = a - 360.0 * Math.floor(a / 360.0);
  return val < 0 ? val + 360.0 : val;
};
const fixHour = (h: number) => {
  let val = h - 24.0 * Math.floor(h / 24.0);
  return val < 0 ? val + 24.0 : val;
};

// Julian Date calculation
function getJulianDate(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  return jd + hour / 24.0;
}

// Sun coordinates: returns { declination: deg, equationOfTime: min }
function getSunCoordinates(jd: number): { declination: number; equationOfTime: number } {
  const d = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * d);
  const q = fixAngle(280.459 + 0.98564736 * d);
  const l = fixAngle(q + 1.915 * Math.sin(d2r(g)) + 0.02 * Math.sin(d2r(2 * g)));

  const e = 23.439 - 0.00000036 * d;
  const sinDec = Math.sin(d2r(e)) * Math.sin(d2r(l));
  const declination = r2d(Math.asin(sinDec));

  let ra = r2d(Math.atan2(Math.cos(d2r(e)) * Math.sin(d2r(l)), Math.cos(d2r(l)))) / 15.0;
  ra = fixHour(ra);
  const equationOfTime = (q / 15.0 - ra) * 60.0; // in minutes

  return { declination, equationOfTime };
}

// Calculate time angle when sun is at an altitude angle alpha
function hourAngle(alpha: number, lat: number, dec: number): number | null {
  const sinAlpha = Math.sin(d2r(alpha));
  const sinLat = Math.sin(d2r(lat));
  const cosLat = Math.cos(d2r(lat));
  const sinDec = Math.sin(d2r(dec));
  const cosDec = Math.cos(d2r(dec));

  const cosH = (sinAlpha - sinLat * sinDec) / (cosLat * cosDec);
  if (cosH > 1 || cosH < -1) {
    return null; // Sun never reaches this angle at extreme latitude
  }
  return r2d(Math.acos(cosH)) / 15.0; // hours
}

// Calculate Asr hour angle given shadow factor (1 for standard, 2 for Hanafi)
function asrHourAngle(shadowFactor: number, lat: number, dec: number): number {
  const term = Math.tan(d2r(Math.abs(lat - dec)));
  const angle = -r2d(Math.atan(1.0 / (shadowFactor + term)));
  const ha = hourAngle(angle, lat, dec);
  return ha ?? 3.5;
}

// Convert decimal hours into Date object for given baseDate
export function decimalHoursToDate(baseDate: Date, decimalHours: number): Date {
  const d = new Date(baseDate);
  const totalSeconds = Math.round(decimalHours * 3600);
  const hours = Math.floor(totalSeconds / 3600);
  const remainder = totalSeconds % 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder % 60;
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

// Format Date object to HH:mm string (with 12h or 24h option)
export function formatPrayerTime(date: Date, is24Hour: boolean = false): string {
  const hours24 = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (is24Hour) {
    return `${hours24.toString().padStart(2, '0')}:${minutes}`;
  }

  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes} ${period}`;
}

export interface ComputedDayPrayers {
  imsak: Date;
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  midnight: Date;
  lastThird: Date;
}

export function computePrayerDates(
  date: Date,
  lat: number,
  lng: number,
  methodKey: CalculationMethodKey = 'ummalqura',
  asrMethod: AsrJuristicMethod = 'standard'
): ComputedDayPrayers {
  const method = CALCULATION_METHODS[methodKey] || CALCULATION_METHODS.ummalqura;
  const jd = getJulianDate(date);
  const { declination, equationOfTime } = getSunCoordinates(jd);

  // Timezone offset of local computer for the given date in hours
  const tzOffsetHours = -date.getTimezoneOffset() / 60.0;

  // Solar noon in local decimal hours
  // Midday = 12 + timezone - lng/15 - EqT/60
  const solarNoon = 12.0 + tzOffsetHours - lng / 15.0 - equationOfTime / 60.0;
  const dhuhrHour = solarNoon + 0.0333; // 2 minutes buffer after true zenith (makruh time)

  // Sunrise & Sunset (center of sun -0.833° accounting for refraction and semi-diameter)
  const sunriseAngle = -0.8333;
  let sunRiseSetHA = hourAngle(sunriseAngle, lat, declination);
  if (sunRiseSetHA === null) {
    sunRiseSetHA = 6.0; // fallback in extreme solstice
  }
  const sunriseHour = solarNoon - sunRiseSetHA;
  const sunsetHour = solarNoon + sunRiseSetHA;

  // Fajr angle calculation
  const fajrDepression = -method.fajrAngle;
  let fajrHA = hourAngle(fajrDepression, lat, declination);
  // High-latitude fallback (1/7th of night if sun doesn't reach angle)
  if (fajrHA === null) {
    const nightPortion = (24.0 - sunRiseSetHA * 2) / 7.0;
    fajrHA = sunRiseSetHA + nightPortion;
  }
  const fajrHour = solarNoon - fajrHA;

  // Asr
  const shadowFactor = asrMethod === 'hanafi' ? 2 : 1;
  const asrHA = asrHourAngle(shadowFactor, lat, declination);
  const asrHour = solarNoon + asrHA;

  // Maghrib
  const maghribHour = sunsetHour + (method.maghribInterval ? method.maghribInterval / 60.0 : 0.0333); // 2 min buffer

  // Isha
  let ishaHour: number;
  if (method.ishaInterval) {
    // Umm al-Qura, Qatar, Gulf use minutes after Maghrib
    ishaHour = maghribHour + method.ishaInterval / 60.0;
  } else {
    const ishaDepression = -(method.ishaAngle || 17.5);
    let ishaHA = hourAngle(ishaDepression, lat, declination);
    if (ishaHA === null) {
      const nightPortion = (24.0 - sunRiseSetHA * 2) / 7.0;
      ishaHA = sunRiseSetHA + nightPortion;
    }
    ishaHour = solarNoon + ishaHA;
  }

  // Imsak (10 minutes before Fajr)
  const imsakHour = fajrHour - 10 / 60.0;

  // Convert to Date objects
  const imsakDate = decimalHoursToDate(date, imsakHour);
  const fajrDate = decimalHoursToDate(date, fajrHour);
  const sunriseDate = decimalHoursToDate(date, sunriseHour);
  const dhuhrDate = decimalHoursToDate(date, dhuhrHour);
  const asrDate = decimalHoursToDate(date, asrHour);
  const maghribDate = decimalHoursToDate(date, maghribHour);
  const ishaDate = decimalHoursToDate(date, ishaHour);

  // Midnight (halfway between Maghrib and tomorrow's Fajr)
  // Approximate tomorrow Fajr as fajrDate + 24 hours
  const tomorrowFajrTime = fajrDate.getTime() + 24 * 3600 * 1000;
  const nightDurationMs = tomorrowFajrTime - maghribDate.getTime();
  const midnightDate = new Date(maghribDate.getTime() + nightDurationMs / 2);

  // Last third of night (Qiyam al-Layl)
  const lastThirdDate = new Date(maghribDate.getTime() + (nightDurationMs * 2) / 3);

  return {
    imsak: imsakDate,
    fajr: fajrDate,
    sunrise: sunriseDate,
    dhuhr: dhuhrDate,
    asr: asrDate,
    maghrib: maghribDate,
    isha: ishaDate,
    midnight: midnightDate,
    lastThird: lastThirdDate
  };
}

// Compute formatted string prayer times
export function getPrayerTimesStrings(
  computed: ComputedDayPrayers,
  is24Hour: boolean = false
): PrayerTimes {
  return {
    imsak: formatPrayerTime(computed.imsak, is24Hour),
    fajr: formatPrayerTime(computed.fajr, is24Hour),
    sunrise: formatPrayerTime(computed.sunrise, is24Hour),
    dhuhr: formatPrayerTime(computed.dhuhr, is24Hour),
    asr: formatPrayerTime(computed.asr, is24Hour),
    maghrib: formatPrayerTime(computed.maghrib, is24Hour),
    isha: formatPrayerTime(computed.isha, is24Hour),
    midnight: formatPrayerTime(computed.midnight, is24Hour),
    lastThird: formatPrayerTime(computed.lastThird, is24Hour)
  };
}

// Calculate the Next Prayer Countdown in exact seconds
export function getNextPrayerCountdown(
  now: Date,
  lat: number,
  lng: number,
  methodKey: CalculationMethodKey = 'ummalqura',
  asrMethod: AsrJuristicMethod = 'standard',
  is24Hour: boolean = false
): NextPrayerInfo {
  const todayPrayers = computePrayerDates(now, lat, lng, methodKey, asrMethod);

  // Tomorrow prayers (in case now is past Isha)
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPrayers = computePrayerDates(tomorrow, lat, lng, methodKey, asrMethod);

  // Yesterday prayers (in case now is between midnight and Fajr)
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayPrayers = computePrayerDates(yesterday, lat, lng, methodKey, asrMethod);

  const prayerSchedule: Array<{
    key: PrayerKey;
    label: string;
    arabicName: string;
    date: Date;
    prevDate: Date;
    prevKey: PrayerKey;
  }> = [
    {
      key: 'fajr',
      label: 'Fajr',
      arabicName: 'الفجر',
      date: todayPrayers.fajr,
      prevDate: yesterdayPrayers.isha,
      prevKey: 'isha'
    },
    {
      key: 'sunrise',
      label: 'Sunrise (Shuruq)',
      arabicName: 'الشروق',
      date: todayPrayers.sunrise,
      prevDate: todayPrayers.fajr,
      prevKey: 'fajr'
    },
    {
      key: 'dhuhr',
      label: 'Dhuhr',
      arabicName: 'الظهر',
      date: todayPrayers.dhuhr,
      prevDate: todayPrayers.sunrise,
      prevKey: 'sunrise'
    },
    {
      key: 'asr',
      label: 'Asr',
      arabicName: 'العصر',
      date: todayPrayers.asr,
      prevDate: todayPrayers.dhuhr,
      prevKey: 'dhuhr'
    },
    {
      key: 'maghrib',
      label: 'Maghrib',
      arabicName: 'المغرب',
      date: todayPrayers.maghrib,
      prevDate: todayPrayers.asr,
      prevKey: 'asr'
    },
    {
      key: 'isha',
      label: 'Isha',
      arabicName: 'العشاء',
      date: todayPrayers.isha,
      prevDate: todayPrayers.maghrib,
      prevKey: 'maghrib'
    }
  ];

  const nowMs = now.getTime();

  // Find first prayer that is strictly in the future
  let nextPrayer = prayerSchedule.find((p) => p.date.getTime() > nowMs);
  let prevDate: Date;
  let currentKey: PrayerKey;

  if (nextPrayer) {
    prevDate = nextPrayer.prevDate;
    currentKey = nextPrayer.prevKey;
  } else {
    // If past Isha today, next prayer is Fajr tomorrow
    nextPrayer = {
      key: 'fajr',
      label: 'Fajr',
      arabicName: 'الفجر',
      date: tomorrowPrayers.fajr,
      prevDate: todayPrayers.isha,
      prevKey: 'isha'
    };
    prevDate = todayPrayers.isha;
    currentKey = 'isha';
  }

  const diffMs = Math.max(0, nextPrayer.date.getTime() - nowMs);
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedCountdown = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  // Calculate elapsed progress percentage between prev prayer and next prayer
  const windowDurationMs = Math.max(1000, nextPrayer.date.getTime() - prevDate.getTime());
  const elapsedMs = Math.max(0, nowMs - prevDate.getTime());
  const progressPercent = Math.min(100, Math.max(0, (elapsedMs / windowDurationMs) * 100));

  return {
    key: nextPrayer.key,
    label: nextPrayer.label,
    arabicName: nextPrayer.arabicName,
    timeString: formatPrayerTime(nextPrayer.date, is24Hour),
    targetDateTime: nextPrayer.date,
    totalSecondsRemaining: totalSeconds,
    hours,
    minutes,
    seconds,
    formattedCountdown,
    currentPrayerKey: currentKey,
    progressPercent: Math.round(progressPercent * 10) / 10
  };
}

// Qibla Direction Great Circle Calculation
export interface QiblaInfo {
  directionDegrees: number;
  compassDirection: string;
  distanceKm: number;
}

export function calculateQibla(userLat: number, userLng: number): QiblaInfo {
  const phiK = d2r(KAABA_LAT);
  const lambdaK = d2r(KAABA_LNG);
  const phi = d2r(userLat);
  const lambda = d2r(userLng);

  const deltaLambda = lambdaK - lambda;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = r2d(qiblaRad);
  qiblaDeg = fixAngle(qiblaDeg);

  // Great-circle distance using Haversine
  const R = 6371; // Earth radius in km
  const deltaPhi = phiK - phi;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi) * Math.cos(phiK) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  // Compass cardinal text
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(qiblaDeg / 22.5) % 16;
  const compassDirection = directions[index];

  return {
    directionDegrees: Math.round(qiblaDeg * 10) / 10,
    compassDirection,
    distanceKm
  };
}
