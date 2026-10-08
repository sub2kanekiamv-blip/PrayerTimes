import React from 'react';
import { Volume2, VolumeX, Clock, ExternalLink, Moon, Languages } from 'lucide-react';
import { HijriDateInfo } from '../types/prayer';
import { prayerAudio } from '../utils/audioNotification';
import { AppLanguage, TRANSLATIONS } from '../translations';
import { buildPrayertimeUrl } from '../data/countriesAndCities';

interface HeaderProps {
  hijriDate: HijriDateInfo;
  is24Hour: boolean;
  onToggleTimeFormat: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenWidgetModal: () => void;
  currentLang: AppLanguage;
  onChangeLang: (lang: AppLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  hijriDate,
  is24Hour,
  onToggleTimeFormat,
  isMuted,
  onToggleMute,
  onOpenWidgetModal,
  currentLang,
  onChangeLang
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleTestAudio = () => {
    prayerAudio.playAdhanChime();
  };

  const partnerAnchorKeyword = {
    en: 'Verified Global Prayer Observatory Timetables',
    ar: 'المرصد العالمي لمواقيت الصلاة المعتمدة',
    fr: 'Observatoire Mondial des Horaires de Prière'
  }[currentLang];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
              <span className="text-xl">🌙</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-heading">
                  {t.appName}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal border border-emerald-500/30">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Hijri Date Display */}
          <div className="hidden lg:flex flex-col items-center px-4 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-center">
            <div className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentLang === 'ar' ? hijriDate.formattedAr : hijriDate.formattedEn}</span>
            </div>
            {currentLang !== 'ar' && (
              <div className="text-[11px] text-emerald-200/80 font-arabic font-normal">
                {hijriDate.formattedAr}
              </div>
            )}
          </div>

          {/* Utility Controls & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            
            {/* Language Switcher Button Group */}
            <div className="inline-flex rounded-xl bg-slate-900 border border-slate-700/80 p-0.5">
              <button
                type="button"
                onClick={() => onChangeLang('en')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                  currentLang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('ar')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition font-arabic ${
                  currentLang === 'ar'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="العربية"
              >
                عربي
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('fr')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                  currentLang === 'fr'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Français"
              >
                FR
              </button>
            </div>

            {/* Seamless prayertime.info link under KEYWORD (no raw URL) */}
            <a
              href={buildPrayertimeUrl('', currentLang)}
              target="_blank"
              rel="noopener noreferrer"
              title={partnerAnchorKeyword}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-900/30 hover:bg-emerald-800/50 text-emerald-300 border border-emerald-700/50 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{partnerAnchorKeyword}</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>

            {/* Embed Widget Generator Button */}
            <button
              onClick={onOpenWidgetModal}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title={t.embedTitle}
            >
              <span>{t.embedWidget}</span>
            </button>

            {/* 12h / 24h Toggle */}
            <button
              onClick={onToggleTimeFormat}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Toggle 12H / 24H"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{is24Hour ? '24H' : '12H'}</span>
            </button>

            {/* Audio Mute / Unmute & Preview */}
            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700 p-0.5">
              <button
                onClick={onToggleMute}
                className={`p-1.5 rounded-md transition ${
                  isMuted
                    ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/40'
                    : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40'
                }`}
                title={isMuted ? t.soundMuted : t.soundEnabled}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              
              {!isMuted && (
                <button
                  onClick={handleTestAudio}
                  className="px-2 py-1 text-[11px] font-medium text-emerald-300 hover:text-white hover:bg-emerald-700/50 rounded transition"
                  title={t.testChime}
                >
                  {t.testChime}
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
