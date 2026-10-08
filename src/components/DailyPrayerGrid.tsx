import React from 'react';
import {
  Sun,
  Sunrise,
  Sunset,
  Moon,
  CloudSun,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { NextPrayerInfo, PrayerKey, PrayerTimes } from '../types/prayer';
import { AppLanguage, TRANSLATIONS } from '../translations';

interface DailyPrayerGridProps {
  prayerTimes: PrayerTimes;
  nextPrayer: NextPrayerInfo;
  selectedDate: Date;
  onChangeDate: (newDate: Date) => void;
  cityName: string;
  currentLang: AppLanguage;
}

export const DailyPrayerGrid: React.FC<DailyPrayerGridProps> = ({
  prayerTimes,
  nextPrayer,
  selectedDate,
  onChangeDate,
  cityName,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    onChangeDate(d);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    onChangeDate(d);
  };

  const handleResetToday = () => {
    onChangeDate(new Date());
  };

  const prayersList: Array<{
    key: PrayerKey;
    name: string;
    arabic: string;
    time: string;
    icon: React.ReactNode;
    description: string;
  }> = [
    {
      key: 'fajr',
      name: t.fajr,
      arabic: 'الفجر',
      time: prayerTimes.fajr,
      icon: <Sunrise className="w-5 h-5 text-indigo-400" />,
      description: t.fajrDesc
    },
    {
      key: 'sunrise',
      name: t.sunrise,
      arabic: 'الشروق',
      time: prayerTimes.sunrise,
      icon: <Sun className="w-5 h-5 text-amber-400" />,
      description: t.sunriseDesc
    },
    {
      key: 'dhuhr',
      name: t.dhuhr,
      arabic: 'الظهر',
      time: prayerTimes.dhuhr,
      icon: <Sun className="w-5 h-5 text-yellow-300" />,
      description: t.dhuhrDesc
    },
    {
      key: 'asr',
      name: t.asr,
      arabic: 'العصر',
      time: prayerTimes.asr,
      icon: <CloudSun className="w-5 h-5 text-orange-400" />,
      description: t.asrDesc
    },
    {
      key: 'maghrib',
      name: t.maghrib,
      arabic: 'المغرب',
      time: prayerTimes.maghrib,
      icon: <Sunset className="w-5 h-5 text-rose-400" />,
      description: t.maghribDesc
    },
    {
      key: 'isha',
      name: t.isha,
      arabic: 'العشاء',
      time: prayerTimes.isha,
      icon: <Moon className="w-5 h-5 text-blue-400" />,
      description: t.ishaDesc
    }
  ];

  const locale = currentLang === 'ar' ? 'ar-SA' : currentLang === 'fr' ? 'fr-FR' : 'en-US';
  const formattedDate = selectedDate.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header & Date Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>{t.dailyScheduleTitle} {cityName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {t.dailyScheduleSubtitle}
          </p>
        </div>

        {/* Date Selector Navigation */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-sm">
          <button
            onClick={handlePrevDay}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          
          <span className="text-xs sm:text-sm font-semibold text-slate-200 px-2 min-w-[140px] text-center">
            {isToday ? t.today : formattedDate}
          </span>

          <button
            onClick={handleNextDay}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Next Day"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          {!isToday && (
            <button
              onClick={handleResetToday}
              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 px-2 py-1 bg-emerald-950/60 rounded-md border border-emerald-800/60 transition"
            >
              {t.today}
            </button>
          )}
        </div>
      </div>

      {/* 6 Main Prayer Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {prayersList.map((prayer) => {
          const isNext = isToday && nextPrayer.key === prayer.key;
          const isCurrent = isToday && nextPrayer.currentPrayerKey === prayer.key;

          return (
            <div
              key={prayer.key}
              className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 border ${
                isNext
                  ? 'bg-gradient-to-b from-emerald-900/60 to-slate-900 border-emerald-400/80 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/40 -translate-y-1'
                  : isCurrent
                  ? 'bg-slate-900/90 border-teal-500/40 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  {prayer.icon}
                </div>
                
                {isNext && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 animate-pulse">
                    <Bell className="w-3 h-3" />
                    <span>{t.nextBadge}</span>
                  </span>
                )}

                {isCurrent && !isNext && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-teal-300 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.activeBadge}</span>
                  </span>
                )}
              </div>

              {/* Prayer Name */}
              <div>
                <div className="flex items-baseline justify-between mb-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {prayer.name}
                  </h3>
                  {currentLang !== 'ar' && (
                    <span className="text-base sm:text-lg font-arabic text-emerald-400">
                      {prayer.arabic}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mb-4 line-clamp-1">
                  {prayer.description}
                </p>
              </div>

              {/* Prayer Time Display */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-lg sm:text-2xl font-black text-white font-mono-num tracking-tight">
                  {prayer.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auxiliary Islamic Times (Imsak, Midnight, Last Third of Night) */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.fastingAndNightMarkers}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">{t.imsak}</div>
              <div className="text-[11px] text-slate-400">{t.imsakDesc}</div>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono-num text-indigo-300">
              {prayerTimes.imsak}
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">{t.midnight}</div>
              <div className="text-[11px] text-slate-400">{t.midnightDesc}</div>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono-num text-blue-300">
              {prayerTimes.midnight}
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">{t.lastThird}</div>
              <div className="text-[11px] text-slate-400">{t.lastThirdDesc}</div>
            </div>
            <div className="text-base sm:text-lg font-bold font-mono-num text-emerald-300">
              {prayerTimes.lastThird}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
