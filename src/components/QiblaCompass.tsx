import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { calculateQibla } from '../utils/prayerCalculation';
import { CityData } from '../types/prayer';
import { AppLanguage, TRANSLATIONS } from '../translations';

interface QiblaCompassProps {
  city: CityData;
  currentLang: AppLanguage;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({ city, currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const qibla = calculateQibla(city.latitude, city.longitude);

  const cityName = currentLang === 'ar' ? city.arabicName : currentLang === 'fr' && city.frenchName ? city.frenchName : city.name;

  return (
    <section id="qibla-section" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-10 shadow-xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.qiblaDirection}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-3">
              {t.qiblaTitle} {cityName}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {t.qiblaDesc} (
              <span className="font-mono text-emerald-400">{city.latitude.toFixed(4)}°N</span>,{' '}
              <span className="font-mono text-emerald-400">{city.longitude.toFixed(4)}°E</span>).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.qiblaAzimuth}</div>
                <div className="text-2xl font-black text-emerald-400 font-mono-num mt-1">
                  {qibla.directionDegrees}°
                </div>
                <div className="text-xs text-slate-400">{qibla.compassDirection} {t.fromTrueNorth}</div>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.distanceToKaaba}</div>
                <div className="text-2xl font-black text-white font-mono-num mt-1">
                  {qibla.distanceKm.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">{t.kilometers}</div>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">{t.focalPoint}</div>
                <div className="text-base font-bold text-emerald-300 mt-1 font-arabic">
                  الكعبة المشرفة
                </div>
                <div className="text-xs text-slate-400">Masjid al-Haram, Makkah</div>
              </div>

            </div>

            <div className="flex items-start gap-2 text-xs text-slate-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>{t.howToPrayGuide}</strong> {t.turnToward} <strong className="text-emerald-300">{qibla.directionDegrees}° ({qibla.compassDirection})</strong>.
              </span>
            </div>
          </div>

          {/* Right Visual Dial */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center shadow-2xl shadow-emerald-950/40 p-4">
              
              <div className="absolute inset-2 rounded-full border border-dashed border-slate-700/60 pointer-events-none" />

              <div className="absolute top-2 text-xs font-black text-rose-400 tracking-wider">N</div>
              <div className="absolute bottom-2 text-xs font-black text-slate-400 tracking-wider">S</div>
              <div className="absolute right-3 text-xs font-black text-slate-400 tracking-wider">E</div>
              <div className="absolute left-3 text-xs font-black text-slate-400 tracking-wider">W</div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
                <span className="text-2xl font-black text-white font-mono-num">
                  {qibla.directionDegrees}°
                </span>
                <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                  {qibla.compassDirection}
                </span>
              </div>

              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${qibla.directionDegrees}deg)` }}
              >
                <div className="relative w-1 h-full flex flex-col items-center justify-between py-6">
                  <div className="flex flex-col items-center -mt-2">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[22px] border-b-emerald-400 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <div className="text-[10px] font-bold text-emerald-300 mt-1 uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-emerald-500/50">
                      🕋 Qibla
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg" />
                  <div className="w-1.5 h-10 bg-slate-700 rounded-full" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
