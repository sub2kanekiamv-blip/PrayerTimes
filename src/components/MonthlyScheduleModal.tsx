import React, { useState } from 'react';
import { X, Printer, Download, Calendar, Copy, Check } from 'lucide-react';
import { AsrJuristicMethod, CityData } from '../types/prayer';
import { computePrayerDates, formatPrayerTime } from '../utils/prayerCalculation';
import { AppLanguage, TRANSLATIONS } from '../translations';
import { buildPrayertimeUrl } from '../data/countriesAndCities';

interface MonthlyScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: CityData;
  asrMethod: AsrJuristicMethod;
  is24Hour: boolean;
  currentLang: AppLanguage;
}

export const MonthlyScheduleModal: React.FC<MonthlyScheduleModalProps> = ({
  isOpen,
  onClose,
  city,
  asrMethod,
  is24Hour,
  currentLang
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  if (!isOpen) return null;

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const locale = currentLang === 'ar' ? 'ar-SA' : currentLang === 'fr' ? 'fr-FR' : 'en-US';
  const monthName = new Date(selectedYear, selectedMonth, 1).toLocaleString(locale, {
    month: 'long'
  });

  const cityName = currentLang === 'ar' ? city.arabicName : currentLang === 'fr' && city.frenchName ? city.frenchName : city.name;
  const countryName = currentLang === 'ar' ? city.arabicCountryName || city.countryName : currentLang === 'fr' && city.frenchCountryName ? city.frenchCountryName : city.countryName;

  const monthData = daysArray.map((day) => {
    const d = new Date(selectedYear, selectedMonth, day, 12, 0, 0);
    const times = computePrayerDates(d, city.latitude, city.longitude, city.methodKey, asrMethod);
    return {
      day,
      dayName: d.toLocaleDateString(locale, { weekday: 'short' }),
      fajr: formatPrayerTime(times.fajr, is24Hour),
      sunrise: formatPrayerTime(times.sunrise, is24Hour),
      dhuhr: formatPrayerTime(times.dhuhr, is24Hour),
      asr: formatPrayerTime(times.asr, is24Hour),
      maghrib: formatPrayerTime(times.maghrib, is24Hour),
      isha: formatPrayerTime(times.isha, is24Hour)
    };
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = `${t.monthlyCalendar} - ${cityName}, ${countryName} (${monthName} ${selectedYear})\n`;
    text += `Day\t${t.fajr}\t${t.sunrise}\t${t.dhuhr}\t${t.asr}\t${t.maghrib}\t${t.isha}\n`;
    monthData.forEach((row) => {
      text += `${row.day} (${row.dayName})\t${row.fajr}\t${row.sunrise}\t${row.dhuhr}\t${row.asr}\t${row.maghrib}\t${row.isha}\n`;
    });
    text += `\n${buildPrayertimeUrl(city.prayertimePath, currentLang)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    let csv = `Day,Weekday,${t.fajr},${t.sunrise},${t.dhuhr},${t.asr},${t.maghrib},${t.isha}\n`;
    monthData.forEach((row) => {
      csv += `${row.day},${row.dayName},${row.fajr},${row.sunrise},${row.dhuhr},${row.asr},${row.maghrib},${row.isha}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `salah-times-${city.id}-${monthName}-${selectedYear}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const cityUrl = buildPrayertimeUrl(city.prayertimePath, currentLang);
  const cityAnchor = currentLang === 'ar' ? city.anchorKeywordsAr[0] : currentLang === 'fr' ? city.anchorKeywordsFr[0] : city.anchorKeywordsEn[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t.monthlyCalendar}: {cityName}, {countryName}
              </h3>
              <p className="text-xs text-slate-400">
                {monthName} {selectedYear} • {asrMethod === 'hanafi' ? t.asrHanafi : t.asrStandard}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-3 sm:px-6 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label className="text-slate-400 font-medium">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1"
            >
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((m, idx) => (
                <option key={idx} value={idx}>{m}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyTable}</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.csvExport}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.print}</span>
            </button>
          </div>
        </div>

        {/* Timetable Table Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <table className="w-full text-left rtl:text-right text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 uppercase font-semibold">
                <th className="py-2.5 px-2">Day</th>
                <th className="py-2.5 px-2">{t.fajr}</th>
                <th className="py-2.5 px-2">{t.sunrise}</th>
                <th className="py-2.5 px-2">{t.dhuhr}</th>
                <th className="py-2.5 px-2">{t.asr}</th>
                <th className="py-2.5 px-2">{t.maghrib}</th>
                <th className="py-2.5 px-2">{t.isha}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {monthData.map((row) => {
                const isCurrentDay =
                  row.day === now.getDate() &&
                  selectedMonth === now.getMonth() &&
                  selectedYear === now.getFullYear();

                return (
                  <tr
                    key={row.day}
                    className={`hover:bg-slate-800/40 transition font-mono-num ${
                      isCurrentDay ? 'bg-emerald-950/40 font-bold text-emerald-300' : 'text-slate-200'
                    }`}
                  >
                    <td className="py-2 px-2 whitespace-nowrap">
                      <span>{row.day}</span>
                      <span className="text-slate-400 font-sans ml-1 rtl:mr-1 text-[11px]">({row.dayName})</span>
                    </td>
                    <td className="py-2 px-2 text-indigo-300">{row.fajr}</td>
                    <td className="py-2 px-2 text-amber-300/80">{row.sunrise}</td>
                    <td className="py-2 px-2 text-yellow-300">{row.dhuhr}</td>
                    <td className="py-2 px-2 text-orange-300">{row.asr}</td>
                    <td className="py-2 px-2 text-rose-300">{row.maghrib}</td>
                    <td className="py-2 px-2 text-blue-300">{row.isha}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Footer with keyword link */}
        <div className="p-3 sm:px-6 bg-slate-950/80 border-t border-slate-800 text-center text-xs text-slate-400">
          <a
            href={cityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline font-semibold"
          >
            {cityAnchor}
          </a>
        </div>

      </div>
    </div>
  );
};
