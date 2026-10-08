import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Globe, BookOpen, Search, CheckCircle } from 'lucide-react';
import { TRUSTED_OFFICIAL_AUTHORITIES } from '../data/countriesAndCities';
import { AppLanguage, TRANSLATIONS } from '../translations';

interface OfficialAuthoritiesSectionProps {
  currentLang: AppLanguage;
}

export const OfficialAuthoritiesSection: React.FC<OfficialAuthoritiesSectionProps> = ({
  currentLang
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const t = TRANSLATIONS[currentLang];

  const filteredAuthorities = TRUSTED_OFFICIAL_AUTHORITIES.filter((auth) => {
    const q = filterQuery.toLowerCase();
    const cName = currentLang === 'ar' ? auth.countryAr : currentLang === 'fr' ? auth.countryFr : auth.country;
    const eName = currentLang === 'ar' ? auth.entityAr : currentLang === 'fr' ? auth.entityFr : auth.entity;
    return (
      cName.toLowerCase().includes(q) ||
      eName.toLowerCase().includes(q) ||
      auth.country.toLowerCase().includes(q)
    );
  });

  return (
    <section id="official-authorities" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.officialGovStandard}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            {t.authoritiesTitle}
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl mt-1">
            {t.authoritiesSubtitle}
          </p>
        </div>

        {/* Filter Input */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={t.filterAuthorities}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 pl-9 rtl:pl-3.5 rtl:pr-9 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-2.5" />
        </div>
      </div>

      {/* Grid of Authorities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAuthorities.map((auth, index) => {
          const countryDisplayName = currentLang === 'ar' ? auth.countryAr : currentLang === 'fr' ? auth.countryFr : auth.country;
          const entityDisplayName = currentLang === 'ar' ? auth.entityAr : currentLang === 'fr' ? auth.entityFr : auth.entity;
          const anchorKeyword = currentLang === 'ar' ? auth.anchorKeywordAr : currentLang === 'fr' ? auth.anchorKeywordFr : auth.anchorKeywordEn;

          return (
            <div
              key={index}
              className="bg-slate-900/80 border border-slate-800 hover:border-emerald-600/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-md hover:shadow-emerald-950/30"
            >
              <div>
                
                {/* Country Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                    {countryDisplayName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>{t.officialGovStandard}</span>
                  </span>
                </div>

                {/* Entity Title */}
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {entityDisplayName}
                </h3>

                {/* Notes */}
                <p className="text-xs text-slate-300 mb-4">
                  {auth.notes}
                </p>

                {/* Technical Rule Specs */}
                <div className="space-y-1.5 text-xs bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Fajr Standard:</span>
                    <span className="font-mono text-emerald-300 font-semibold">{auth.fajrRule}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Isha Standard:</span>
                    <span className="font-mono text-emerald-300 font-semibold">{auth.ishaRule}</span>
                  </div>
                </div>

              </div>

              {/* Official Authority Links Anchored Under Descriptive Keyword */}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <a
                  href={auth.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
                  title={anchorKeyword}
                >
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span className="underline decoration-emerald-500/50">{anchorKeyword}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                {auth.secondaryUrl && (
                  <a
                    href={auth.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition"
                  >
                    <BookOpen className="w-3 h-3 shrink-0" />
                    <span>{t.timetableDetails}</span>
                  </a>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Explanatory Methodology Card */}
      <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h4 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span>{t.howAstronomersDetermine}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed mt-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <strong className="text-white block mb-1 font-semibold">{t.solarZenithTitle}</strong>
            {t.solarZenithDesc}
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <strong className="text-white block mb-1 font-semibold">{t.shadowFactorTitle}</strong>
            {t.shadowFactorDesc}
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <strong className="text-white block mb-1 font-semibold">{t.twilightAnglesTitle}</strong>
            {t.twilightAnglesDesc}
          </div>
        </div>
      </div>

    </section>
  );
};
