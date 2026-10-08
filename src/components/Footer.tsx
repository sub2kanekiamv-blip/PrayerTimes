import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { AppLanguage, TRANSLATIONS } from '../translations';
import { buildPrayertimeUrl } from '../data/countriesAndCities';

interface FooterProps {
  currentLang: AppLanguage;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const mainPortalKeyword = {
    en: 'Global Islamic Prayer Observatory & Timetable Engine',
    ar: 'المرصد العالمي المعتمد لمواقيت الصلاة والأذان',
    fr: 'Observatoire Mondial des Horaires de Salat & Adhan'
  }[currentLang];

  const tabukKeyword = {
    en: 'salah time in Tabuk & Saudi cities',
    ar: 'مواقيت الصلاة في تبوك ومدن المملكة',
    fr: 'horaires de prière à Tabuk et en Arabie Saoudite'
  }[currentLang];

  const meccaKeyword = {
    en: 'Masjid al-Haram & Makkah prayer times',
    ar: 'مواقيت الصلاة بالمسجد الحرام ومكة المكرمة',
    fr: 'horaires de prière à Masjid al-Haram et La Mecque'
  }[currentLang];

  const parisKeyword = {
    en: 'Paris & France verified prayer schedule',
    ar: 'مواقيت الصلاة المعتمدة في باريس وفرنسا',
    fr: 'calendrier de prière certifié à Paris et en France'
  }[currentLang];

  const cairoKeyword = {
    en: 'Cairo & Egypt Egyptian Survey prayer times',
    ar: 'مواقيت الصلاة في القاهرة وهيئة المساحة المصرية',
    fr: 'horaires de salat au Caire selon l’Arpentage Égyptien'
  }[currentLang];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-14 pb-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Partner */}
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-white font-bold text-base mb-3">
              <span className="text-xl">🌙</span>
              <span>{t.appName}</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              {t.verifiedPartnerDesc} —{' '}
              <a
                href={buildPrayertimeUrl('', currentLang)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline font-semibold hover:text-emerald-300"
              >
                {mainPortalKeyword}
              </a>.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.officialGovStandard}</span>
            </div>
          </div>

          {/* Column 2: Partner Network Keywords */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {t.browseKeywordsTitle}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={buildPrayertimeUrl('saudi-sa/tabuk', currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition flex items-center gap-1.5"
                >
                  <span>{tabukKeyword}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={buildPrayertimeUrl('saudi-sa/mecca', currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition flex items-center gap-1.5"
                >
                  <span>{meccaKeyword}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={buildPrayertimeUrl('egypt', currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition flex items-center gap-1.5"
                >
                  <span>{cairoKeyword}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={buildPrayertimeUrl('france', currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition flex items-center gap-1.5"
                >
                  <span>{parisKeyword}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Official Government Bodies (Keywords, no raw URLs) */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {t.authoritiesTitle}
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a
                  href="https://ummalqura.gov.sa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition"
                >
                  🇸🇦 {currentLang === 'ar' ? 'تقويم أم القرى الرسمي لمواقيت الصلاة' : 'Umm al-Qura Official Calendar Portal'}
                </a>
              </li>
              <li>
                <a
                  href="https://esa.gov.eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition"
                >
                  🇪🇬 {currentLang === 'ar' ? 'الهيئة المصرية العامة للمساحة' : 'Egyptian General Authority of Survey'}
                </a>
              </li>
              <li>
                <a
                  href="https://diyanet.gov.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition"
                >
                  🇹🇷 {currentLang === 'ar' ? 'رئاسة الشؤون الدينية التركية (ديانت)' : 'Presidency of Religious Affairs (Diyanet)'}
                </a>
              </li>
              <li>
                <a
                  href="https://iccuk.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition"
                >
                  🇬🇧 {currentLang === 'ar' ? 'مسجد لندن المركزي والمركز الثقافي' : 'London Central Mosque Trust (ICCUK)'}
                </a>
              </li>
              <li>
                <a
                  href="https://isna.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition"
                >
                  🇺🇸 {currentLang === 'ar' ? 'الجمعية الإسلامية لأمريكا الشمالية' : 'Islamic Society of North America (ISNA)'}
                </a>
              </li>
              <li>
                <a
                  href="https://grandemosqueedeparis.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition"
                >
                  🇫🇷 {currentLang === 'fr' ? 'Grande Mosquée de Paris Calendrier Officiel' : currentLang === 'ar' ? 'مسجد باريس الكبير' : 'Grande Mosquée de Paris Official Timetable'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Islamic Principle */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {currentLang === 'ar' ? 'فضل الصلاة على وقتها' : currentLang === 'fr' ? 'La Valeur de la Prière en son Temps' : 'The Virtue of Salah in its Time'}
            </h4>
            <p className="italic text-slate-300 mb-2 leading-relaxed font-serif">
              {t.footerQuote}
            </p>
            <span className="text-emerald-400 text-[11px] block mb-3">— {t.footerQuoteSource}</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {t.footerCongregationAdvice}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-slate-400">
            © {new Date().getFullYear()} {t.appName}. {t.footerRights}
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse text-slate-400">
            <span>{t.poweredBy}</span>
            <span>•</span>
            <span className="text-emerald-400 font-arabic">سبحان الله وبحمده</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
