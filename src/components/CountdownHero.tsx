import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Calendar,
  ExternalLink,
  ChevronDown,
  Navigation,
  Info,
  CheckCircle2
} from 'lucide-react';
import { AsrJuristicMethod, CityData, CountryData, NextPrayerInfo } from '../types/prayer';
import { CALCULATION_METHODS, COUNTRIES, CITIES, buildPrayertimeUrl } from '../data/countriesAndCities';
import { AppLanguage, TRANSLATIONS } from '../translations';

interface CountdownHeroProps {
  selectedCountry: CountryData;
  selectedCity: CityData;
  onSelectCountry: (countryCode: string) => void;
  onSelectCity: (cityId: string) => void;
  onDetectLocation: () => void;
  isDetectingLocation: boolean;
  nextPrayer: NextPrayerInfo;
  asrMethod: AsrJuristicMethod;
  onChangeAsrMethod: (method: AsrJuristicMethod) => void;
  onOpenMonthlyModal: () => void;
  onScrollToQibla: () => void;
  currentLang: AppLanguage;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({
  selectedCountry,
  selectedCity,
  onSelectCountry,
  onSelectCity,
  onDetectLocation,
  isDetectingLocation,
  nextPrayer,
  asrMethod,
  onChangeAsrMethod,
  onOpenMonthlyModal,
  onScrollToQibla,
  currentLang
}) => {
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [isCitySearchOpen, setIsCitySearchOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const methodInfo = CALCULATION_METHODS[selectedCity.methodKey] || CALCULATION_METHODS.ummalqura;

  // Filter cities by current country
  const countryCities = CITIES.filter((c) => c.countryCode === selectedCountry.code);

  // Search filter across all cities if user types
  const filteredSearchCities = citySearchQuery.trim()
    ? CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
          c.countryName.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
          c.nativeName.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
          c.arabicName.toLowerCase().includes(citySearchQuery.toLowerCase()) ||
          (c.frenchName && c.frenchName.toLowerCase().includes(citySearchQuery.toLowerCase()))
      )
    : countryCities;

  // Pad hours, minutes, seconds
  const pad = (n: number) => n.toString().padStart(2, '0');

  // Localized City & Country Name
  const getCityDisplayName = (c: CityData) => {
    if (currentLang === 'ar') return c.arabicName;
    if (currentLang === 'fr' && c.frenchName) return c.frenchName;
    return c.name;
  };

  const getCountryDisplayName = (c: CountryData) => {
    if (currentLang === 'ar') return c.arabicName;
    if (currentLang === 'fr' && c.frenchName) return c.frenchName;
    return c.name;
  };

  // Primary anchor keyword for this city
  const cityAnchorKeyword = {
    en: selectedCity.anchorKeywordsEn?.[0] || `salah time in ${selectedCity.name}`,
    ar: selectedCity.anchorKeywordsAr?.[0] || `مواقيت الصلاة في ${selectedCity.arabicName}`,
    fr: selectedCity.anchorKeywordsFr?.[0] || `horaires de prière à ${selectedCity.frenchName || selectedCity.name}`
  }[currentLang];

  // Official authority anchor keyword
  const authorityAnchorKeyword = {
    en: `${methodInfo.fullName} Official Schedule`,
    ar: selectedCountry.officialAuthorityAr || methodInfo.fullName,
    fr: selectedCountry.officialAuthorityFr || methodInfo.fullName
  }[currentLang];

  const cityPrayertimeUrl = buildPrayertimeUrl(selectedCity.prayertimePath, currentLang);

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Islamic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar: Location & Asr Toggles */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Country Selector */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-1">
                {t.selectCountry}
              </label>
              <div className="relative">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => onSelectCountry(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 hover:border-emerald-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white appearance-none cursor-pointer transition font-medium"
                >
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.code} className="bg-slate-900 text-white">
                      {country.flag} {getCountryDisplayName(country)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-3 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* City Selector */}
            <div className="md:col-span-5 relative">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  {t.selectCity}
                </label>
                <button
                  type="button"
                  onClick={() => setIsCitySearchOpen(!isCitySearchOpen)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  {isCitySearchOpen ? t.simpleSelect : t.searchAllCities}
                </button>
              </div>

              {!isCitySearchOpen ? (
                <div className="relative">
                  <select
                    value={selectedCity.id}
                    onChange={(e) => onSelectCity(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 hover:border-emerald-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white appearance-none cursor-pointer transition font-medium"
                  >
                    {countryCities.map((city) => (
                      <option key={city.id} value={city.id} className="bg-slate-900 text-white">
                        {getCityDisplayName(city)} {currentLang !== 'ar' ? `(${city.arabicName})` : ''}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-3 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={citySearchQuery}
                    onChange={(e) => setCitySearchQuery(e.target.value)}
                    placeholder={t.searchCityPlaceholder}
                    className="w-full bg-slate-800/90 border border-emerald-500/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    autoFocus
                  />
                  {filteredSearchCities.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 max-h-56 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 divide-y divide-slate-800">
                      {filteredSearchCities.map((city) => (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => {
                            onSelectCity(city.id);
                            setIsCitySearchOpen(false);
                            setCitySearchQuery('');
                          }}
                          className="w-full text-left rtl:text-right px-3.5 py-2 text-xs hover:bg-emerald-950/60 transition flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-semibold text-white group-hover:text-emerald-300">
                              {getCityDisplayName(city)}
                            </span>
                            <span className="text-slate-400 ml-1.5 rtl:mr-1.5">
                              ({currentLang === 'ar' ? city.arabicCountryName || city.countryName : city.countryName})
                            </span>
                          </div>
                          <span className="font-arabic text-emerald-400 text-sm">{city.arabicName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Geolocation Button */}
            <div className="md:col-span-3 flex items-end">
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isDetectingLocation}
                className="w-full h-[42px] mt-auto flex items-center justify-center gap-2 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-emerald-900/30 transition disabled:opacity-50"
                title="Detect prayer times using your device GPS location"
              >
                <Navigation className={`w-4 h-4 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                <span>{isDetectingLocation ? t.detectingGps : t.useGps}</span>
              </button>
            </div>

          </div>

          {/* Sub Bar: Juristic Asr toggle & Quick links */}
          <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            {/* Asr Juristic Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">{t.asrCalculation}</span>
              <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                <button
                  type="button"
                  onClick={() => onChangeAsrMethod('standard')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    asrMethod === 'standard'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={t.asrStandardTooltip}
                >
                  {t.asrStandard}
                </button>
                <button
                  type="button"
                  onClick={() => onChangeAsrMethod('hanafi')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    asrMethod === 'hanafi'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={t.asrHanafiTooltip}
                >
                  {t.asrHanafi}
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onScrollToQibla}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.qiblaDirection}</span>
              </button>

              <button
                type="button"
                onClick={onOpenMonthlyModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.monthlyCalendar}</span>
              </button>
            </div>

          </div>
        </div>

        {/* MAIN HERO CARD: Next Salah Countdown */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl shadow-emerald-950/40 text-center overflow-hidden">
          
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
          
          {/* Active City Location Badge with contextual link */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-4">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <a
              href={cityPrayertimeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-semibold text-emerald-300 flex items-center gap-1"
              title={cityAnchorKeyword}
            >
              <span>
                {selectedCountry.flag} {getCityDisplayName(selectedCity)}, {getCountryDisplayName(selectedCountry)}
              </span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>
            {currentLang !== 'ar' && (
              <span className="text-emerald-200/70 font-arabic text-sm">
                ({selectedCity.arabicName})
              </span>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading mb-2">
            {t.timeUntilNextSalah}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
            {t.nextSalahIs}{' '}
            <strong className="text-emerald-400 font-semibold">{nextPrayer.label}</strong> (
            <span className="font-arabic text-emerald-300">{nextPrayer.arabicName}</span>) {t.atTime}{' '}
            <strong className="text-white font-semibold">{nextPrayer.timeString}</strong>
          </p>

          {/* DIGITAL SECOND-BY-SECOND COUNTDOWN DISPLAY */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-slate-950/80 p-4 sm:p-7 rounded-2xl border border-emerald-800/40 shadow-inner">
              
              {/* Hours */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-3xl sm:text-6xl md:text-7xl font-black text-white font-mono-num tracking-tight">
                  {pad(nextPrayer.hours)}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 mt-1">
                  {t.hours}
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-3xl sm:text-6xl md:text-7xl font-black text-white font-mono-num tracking-tight">
                  {pad(nextPrayer.minutes)}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 mt-1">
                  {t.minutes}
                </span>
              </div>

              {/* Seconds (Pulsing highlight) */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                <span className="text-3xl sm:text-6xl md:text-7xl font-black text-emerald-400 font-mono-num tracking-tight relative z-10">
                  {pad(nextPrayer.seconds)}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-300 mt-1 relative z-10">
                  {t.seconds}
                </span>
              </div>

            </div>
          </div>

          {/* Detailed Sentence Breakdown for Clarity with Anchor Link */}
          <div className="inline-block bg-slate-950/60 px-5 py-2.5 rounded-full border border-slate-800 text-xs sm:text-sm text-slate-300 mb-6">
            <span className="text-slate-400">{t.exactRemaining} </span>
            <span className="text-emerald-300 font-semibold font-mono-num">
              {nextPrayer.hours}h {nextPrayer.minutes}m {nextPrayer.seconds}s
            </span>
            <span className="text-slate-400"> {t.untilCallToPrayer} — </span>
            <a
              href={cityPrayertimeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline font-semibold ml-1 rtl:mr-1"
            >
              {cityAnchorKeyword}
            </a>
          </div>

          {/* Progress Bar through Prayer Window */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>{t.windowLabel}: {nextPrayer.currentPrayerKey.toUpperCase()}</span>
              <span className="text-emerald-400 font-semibold">{nextPrayer.progressPercent}% {t.elapsed}</span>
              <span>{nextPrayer.label.toUpperCase()}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-linear shadow-sm"
                style={{ width: `${nextPrayer.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Official Method & Calculation Authority Mention (Under Semantic Anchor Text Keywords) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 max-w-3xl mx-auto">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.officialMethod}</span>
            </span>
            <a
              href={methodInfo.authorityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline font-semibold flex items-center gap-1"
              title={authorityAnchorKeyword}
            >
              <span>{authorityAnchorKeyword}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-mono">Fajr {methodInfo.fajrAngle}°</span>
            {methodInfo.ishaInterval ? (
              <span className="text-slate-300 font-mono">Isha {methodInfo.ishaInterval}min</span>
            ) : (
              <span className="text-slate-300 font-mono">Isha {methodInfo.ishaAngle}°</span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
