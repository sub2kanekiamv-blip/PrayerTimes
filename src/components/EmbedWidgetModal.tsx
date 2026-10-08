import React, { useState } from 'react';
import { X, Code2, Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { CityData } from '../types/prayer';
import { AppLanguage, TRANSLATIONS } from '../translations';
import { buildPrayertimeUrl } from '../data/countriesAndCities';

interface EmbedWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: CityData;
  currentLang: AppLanguage;
}

export const EmbedWidgetModal: React.FC<EmbedWidgetModalProps> = ({
  isOpen,
  onClose,
  city,
  currentLang
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const cityName = currentLang === 'ar' ? city.arabicName : currentLang === 'fr' && city.frenchName ? city.frenchName : city.name;
  const countryName = currentLang === 'ar' ? city.arabicCountryName || city.countryName : currentLang === 'fr' && city.frenchCountryName ? city.frenchCountryName : city.countryName;
  const cityUrl = buildPrayertimeUrl(city.prayertimePath, currentLang);
  const cityAnchor = currentLang === 'ar' ? city.anchorKeywordsAr[0] : currentLang === 'fr' ? city.anchorKeywordsFr[0] : city.anchorKeywordsEn[0];

  const embedCode = `<!-- Salah Countdown Widget -->
<div id="salahtime-widget" data-city="${city.id}" style="font-family: system-ui, -apple-system, sans-serif; background: #020617; color: #f8fafc; border: 1px solid #059669; border-radius: 16px; padding: 18px; max-width: 360px; text-align: center; box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.2);">
  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #34d399; font-weight: 700;">${t.timeUntilNextSalah}</div>
  <div style="font-size: 20px; font-weight: 800; margin: 4px 0; color: #ffffff;">${cityName}, ${countryName}</div>
  <div style="font-size: 28px; font-weight: 900; color: #10b981; font-family: monospace; letter-spacing: 0.05em; padding: 10px 0;">01:24:45</div>
  <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid #1e293b; padding-top: 8px; margin-top: 4px;">
    <a href="${cityUrl}" target="_blank" rel="noopener" style="color: #34d399; text-decoration: underline; font-weight: 600;">${cityAnchor}</a>
  </div>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.embedTitle}</h3>
              <p className="text-xs text-slate-400">{t.embedSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 mb-2">Widget Preview:</label>
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-900/60 flex justify-center">
            <div className="w-full max-w-xs bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 text-center shadow-lg">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                {t.timeUntilNextSalah}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">{cityName}, {countryName}</h4>
              <div className="text-3xl font-black text-emerald-400 font-mono-num my-2">
                01:24:45
              </div>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                <a
                  href={cityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline font-semibold"
                >
                  {cityAnchor}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">Copy HTML Embed Code:</label>
            <span className="text-[11px] text-slate-400">Optimized for SEO & Indexing</span>
          </div>
          <pre className="bg-slate-950 text-emerald-300/90 text-xs p-3.5 rounded-xl border border-slate-800 overflow-x-auto font-mono max-h-36">
            {embedCode}
          </pre>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <a
            href={buildPrayertimeUrl('', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-semibold"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.allCitiesDirectory}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition"
          >
            {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copied : t.copyEmbedCode}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
