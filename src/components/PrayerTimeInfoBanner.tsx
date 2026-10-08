import React from 'react';
import { ExternalLink, CheckCircle2, ShieldCheck, ArrowRight, Radio } from 'lucide-react';
import { CityData, CountryData } from '../types/prayer';
import { AppLanguage, TRANSLATIONS } from '../translations';
import { buildPrayertimeUrl } from '../data/countriesAndCities';

interface PrayerTimeInfoBannerProps {
  selectedCity: CityData;
  selectedCountry: CountryData;
  onOpenWidgetModal: () => void;
  currentLang: AppLanguage;
}

export const PrayerTimeInfoBanner: React.FC<PrayerTimeInfoBannerProps> = ({
  selectedCity,
  selectedCountry,
  onOpenWidgetModal,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];

  const cityName = currentLang === 'ar' ? selectedCity.arabicName : currentLang === 'fr' && selectedCity.frenchName ? selectedCity.frenchName : selectedCity.name;
  const countryName = currentLang === 'ar' ? selectedCountry.arabicName : currentLang === 'fr' ? selectedCountry.frenchName : selectedCountry.name;

  const cityPrayertimeUrl = buildPrayertimeUrl(selectedCity.prayertimePath, currentLang);
  const homePrayertimeUrl = buildPrayertimeUrl('', currentLang);

  const primaryCityKeyword = {
    en: selectedCity.anchorKeywordsEn?.[0] || `salah time in ${selectedCity.name}`,
    ar: selectedCity.anchorKeywordsAr?.[0] || `مواقيت الصلاة في ${selectedCity.arabicName}`,
    fr: selectedCity.anchorKeywordsFr?.[0] || `horaires de prière à ${selectedCity.frenchName || selectedCity.name}`
  }[currentLang];

  const observatoryKeyword = {
    en: 'Global Prayer Observatory & Calculation Standard',
    ar: 'المرصد الفلكي العالمي لمواقيت الصلاة المعتمدة',
    fr: 'Observatoire Mondial des Horaires et Calculs de Prière'
  }[currentLang];

  const verifyCityKeyword = {
    en: `Verify ${cityName} Prayer Timetable & Qibla`,
    ar: `التحقق من جدول مواقيت الصلاة في ${cityName}`,
    fr: `Vérifier le calendrier de prière à ${cityName}`
  }[currentLang];

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 overflow-hidden">
        
        {/* Decorative ambient elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{t.verifiedPartnerTitle}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-heading mb-2">
              <a
                href={homePrayertimeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline decoration-emerald-500/60"
                title={observatoryKeyword}
              >
                {observatoryKeyword}
              </a>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 max-w-2xl">
              {t.verifiedPartnerDesc} —{' '}
              <a
                href={cityPrayertimeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 font-bold underline hover:text-white"
              >
                {primaryCityKeyword}
              </a> ({countryName}).
            </p>

            {/* Verification Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Latency Solar Elevation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>National Survey Verification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SEO & AI Overview Calibrated</span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons with Keywords */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            
            {/* Direct Link anchored under Keyword */}
            <a
              href={homePrayertimeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition group"
            >
              <span>{observatoryKeyword}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </a>

            {/* City Specific Link anchored under Keyword */}
            <a
              href={cityPrayertimeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
              title={verifyCityKeyword}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{verifyCityKeyword}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* Embed Widget Generator Trigger */}
            <button
              onClick={onOpenWidgetModal}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-700 text-xs font-medium transition"
            >
              <span>{t.embedWidget}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
