import { HijriDateInfo } from '../types/prayer';

const HIJRI_MONTHS_EN = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu al-Qi'dah",
  'Dhu al-Hijjah'
];

const HIJRI_MONTHS_AR = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة'
];

/**
 * Calculates Hijri date using Intl.DateTimeFormat (Islamic Umm al-Qura calendar)
 * with robust mathematical fallback.
 */
export function getHijriDate(date: Date, dayAdjustment: number = 0): HijriDateInfo {
  const adjustedDate = new Date(date);
  if (dayAdjustment !== 0) {
    adjustedDate.setDate(adjustedDate.getDate() + dayAdjustment);
  }

  try {
    const formatterEn = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });

    const parts = formatterEn.formatToParts(adjustedDate);
    let day = 1;
    let monthNum = 1;
    let year = 1448;

    for (const part of parts) {
      if (part.type === 'day') day = parseInt(part.value, 10);
      if (part.type === 'month') monthNum = parseInt(part.value, 10);
      if (part.type === 'year') year = parseInt(part.value, 10);
    }

    const monthIndex = Math.max(0, Math.min(11, monthNum - 1));
    const monthNameEn = HIJRI_MONTHS_EN[monthIndex];
    const monthNameAr = HIJRI_MONTHS_AR[monthIndex];

    const toArabicNumerals = (num: number) =>
      num.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d, 10)]);

    return {
      day,
      monthNameEn,
      monthNameAr,
      year,
      formattedEn: `${day} ${monthNameEn} ${year} AH`,
      formattedAr: `${toArabicNumerals(day)} ${monthNameAr} ${toArabicNumerals(year)} هـ`
    };
  } catch {
    // Mathematical algorithmic fallback (Kuwaiti algorithm)
    const d = adjustedDate.getDate();
    const m = adjustedDate.getMonth();
    const y = adjustedDate.getFullYear();

    let jd =
      Math.floor((1461 * (y + 4800 + Math.floor((m - 13) / 12))) / 4) +
      Math.floor((367 * (m - 1 - 12 * Math.floor((m - 13) / 12))) / 12) -
      Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 13) / 12)) / 100)) / 4) +
      d -
      32075;

    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j =
      Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
      Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l =
      l -
      Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
      29;
    let hijriMonth = Math.floor((24 * l) / 709);
    let hijriDay = l - Math.floor((709 * hijriMonth) / 24);
    let hijriYear = 30 * n + j - 30;

    const monthIndex = Math.max(0, Math.min(11, hijriMonth - 1));
    const monthNameEn = HIJRI_MONTHS_EN[monthIndex];
    const monthNameAr = HIJRI_MONTHS_AR[monthIndex];

    return {
      day: hijriDay,
      monthNameEn,
      monthNameAr,
      year: hijriYear,
      formattedEn: `${hijriDay} ${monthNameEn} ${hijriYear} AH`,
      formattedAr: `${hijriDay} ${monthNameAr} ${hijriYear} هـ`
    };
  }
}
