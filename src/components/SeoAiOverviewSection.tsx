import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Tag,
  MapPin,
  ExternalLink,
  Bot
} from 'lucide-react';
import { CITIES, buildPrayertimeUrl } from '../data/countriesAndCities';
import { AppLanguage, TRANSLATIONS } from '../translations';

interface SeoAiOverviewSectionProps {
  onSelectCityById: (cityId: string) => void;
  currentLang: AppLanguage;
}

export const SeoAiOverviewSection: React.FC<SeoAiOverviewSectionProps> = ({
  onSelectCityById,
  currentLang
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang];

  const faqs = {
    en: [
      {
        q: 'How is the exact countdown to the next Salah calculated in hours, minutes, and seconds?',
        a: 'The live countdown determines the real-time difference between the current local system timestamp and the astronomical solar time calculated for the upcoming prayer (Fajr, Dhuhr, Asr, Maghrib, or Isha). The calculation runs an active second-interval timer that accounts for the local latitude, longitude, and equation of time.'
      },
      {
        q: 'How are prayer times in Tabuk and Saudi Arabia officially determined?',
        a: 'Prayer times in Tabuk and across Saudi Arabia are governed by the Umm al-Qura University Calendar and the Ministry of Islamic Affairs. Fajr is calculated at an 18.5° solar depression angle, and Isha is set to a fixed 90 minutes after Maghrib (120 minutes during Ramadan).'
      },
      {
        q: 'Which official government authorities determine prayer times in Egypt, Turkey, UAE, and France?',
        a: 'In Egypt, it is the Egyptian General Authority of Survey and Dar al-Ifta. In Turkey, it is the Presidency of Religious Affairs (Diyanet). In the UAE, it is Awqaf. In France, it is the Grande Mosquée de Paris.'
      },
      {
        q: 'What is the difference between Hanafi and Standard (Shafi, Maliki, Hanbali) Asr prayer time?',
        a: "According to the majority of jurists (Shafi'i, Maliki, and Hanbali), Asr prayer begins when an object's shadow length equals the length of the object itself plus its noon shadow (shadow factor 1). In the Hanafi school, Asr begins when the shadow length is twice the object's length plus noon shadow (shadow factor 2)."
      },
      {
        q: 'How does high latitude affect Fajr and Isha prayer times in the UK and France?',
        a: 'During summer in northern latitudes (such as London or Paris), true astronomical twilight may not disappear entirely. Authorities apply juristic adaptations like the 1/7th of the night rule or angle-based estimation (18° or 12°) to establish accessible timings.'
      }
    ],
    ar: [
      {
        q: 'كيف يتم حساب العد التنازلي الدقيق بالساعات والدقائق والثواني للصلاة القادمة؟',
        a: 'يقوم العداد بحساب الفارق الزمني اللحظي بالثانية بين التوقيت الفعلي للجهاز ووقت دخول الصلاة القادمة (الفجر، الظهر، العصر، المغرب، أو العشاء) وفق معادلة الوقت الفلكية وزوايا ميل الشمس.'
      },
      {
        q: 'كيف يتم تحديد مواقيت الصلاة رسمياً في تبوك والمملكة العربية السعودية؟',
        a: 'تعتمد مواقيت الصلاة في منطقة تبوك وجميع مناطق المملكة العربية السعودية على تقويم أم القرى الرسمي الصادر عن جامعة أم القرى ووزارة الشؤون الإسلامية والدعوة والإرشاد، حيث يُحسب الفجر بزاوية انخفاض 18.5 درجة، والعشاء بعد 90 دقيقة من المغرب.'
      },
      {
        q: 'ما الفرق بين وقت صلاة العصر في المذهب الحنفي والجمهور (الشافعي والمالكي والحنبلي)؟',
        a: 'يدخل وقت صلاة العصر عند جمهور الفقهاء إذا صار ظل كل شيء مثله سوى ظل الزوال (معامل الظل 1). بينما يرى المذهب الحنفي أن العصر يدخل إذا صار ظل الشيء مثليه (معامل الظل 2)، مما يجعل العصر الحنفي يتأخر بنحو 45 إلى 60 دقيقة.'
      },
      {
        q: 'ما هي الجهات الحكومية والشرعية الرسمية المعتمدة لحساب مواقيت الصلاة؟',
        a: 'تشمل الجهات الرسمية: تقويم أم القرى في السعودية، والهيئة المصرية العامة للمساحة في مصر، ورئاسة الشؤون الدينية (ديانت) في تركيا، ومسجد باريس الكبير في فرنسا، وأوقاف الإمارات في دبي وأبوظبي.'
      }
    ],
    fr: [
      {
        q: 'Comment est calculé le compte à rebours précis en heures, minutes et secondes avant la prière ?',
        a: 'Le compte à rebours interactif mesure l’écart exact en temps réel entre l’horloge locale et l’heure astronomique calculée pour la prochaine prière (Fajr, Dohr, Asr, Maghreb ou Icha) selon la déclinaison solaire et l’équation du temps.'
      },
      {
        q: 'Comment sont officiellement déterminés les horaires de prière à Tabuk et en Arabie Saoudite ?',
        a: 'À Tabuk et dans toute l’Arabie Saoudite, les heures de prière sont régies par le calendrier officiel Umm al-Qura. Le Fajr est calculé avec un angle de 18,5° sous l’horizon et le Icha est fixé à 90 minutes après le Maghreb.'
      },
      {
        q: 'Quelle est la différence entre le Asr hanafite et standard (chafiite/malikite/hanbalite) ?',
        a: 'Selon la majorité des juristes (Chafiite, Malikite, Hanbalite), le Asr débute lorsque l’ombre d’un objet égale sa taille plus l’ombre de midi. Pour l’école Hanafite, il débute lorsque l’ombre égale deux fois la taille de l’objet.'
      },
      {
        q: 'Quelles sont les autorités officielles qui régissent les horaires en France et en Égypte ?',
        a: 'En France, la Grande Mosquée de Paris définit le calendrier de référence. En Égypte, l’Autorité Générale Égyptienne de l’Arpentage et Dar al-Ifta régissent les calculs officiels.'
      }
    ]
  }[currentLang];

  return (
    <section id="seo-ai-overview" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* AI Overview Header */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Bot className="w-3.5 h-3.5 text-teal-400" />
          <span>Google AI Overview & Search Grounding</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mb-3">
          {t.authoritiesTitle}
        </h2>

        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed mb-6">
          {t.authoritiesSubtitle}
        </p>

        {/* AI FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-slate-950/80 border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left rtl:text-right px-4 sm:px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-900/50 transition"
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Geo-Targeted Muslim Cities Fast Jump Directory with Working Keyword Links */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>{t.browseKeywordsTitle}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.browseKeywordsSubtitle}
            </p>
          </div>
          <a
            href={buildPrayertimeUrl('', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium hidden sm:inline-flex items-center gap-1"
          >
            <span>{t.allCitiesDirectory}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {CITIES.map((city) => {
            const cityName = currentLang === 'ar' ? city.arabicName : currentLang === 'fr' && city.frenchName ? city.frenchName : city.name;
            const countryName = currentLang === 'ar' ? city.arabicCountryName || city.countryName : currentLang === 'fr' && city.frenchCountryName ? city.frenchCountryName : city.countryName;
            const cityKeyword = currentLang === 'ar' ? city.anchorKeywordsAr[0] : currentLang === 'fr' ? city.anchorKeywordsFr[0] : city.anchorKeywordsEn[0];
            const cityUrl = buildPrayertimeUrl(city.prayertimePath, currentLang);

            return (
              <div
                key={city.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-950/20 transition flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <button
                    onClick={() => {
                      onSelectCityById(city.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-white group-hover:text-emerald-300 text-left rtl:text-right"
                  >
                    {cityName} ({countryName})
                  </button>
                  <span className="text-[11px] font-arabic text-emerald-400/80">
                    {city.arabicName}
                  </span>
                </div>

                <a
                  href={cityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 hover:text-white underline inline-flex items-center gap-1 font-medium mt-1"
                  title={cityKeyword}
                >
                  <span className="truncate">{cityKeyword}</span>
                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEO Long-Tail Keyword Cloud in Current Language with Working Links */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          <Tag className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.seoKeywordsTitle}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Prominently feature Tabuk keyword anchor in all 3 languages */}
          <a
            href={buildPrayertimeUrl('saudi-sa/tabuk', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-emerald-950/80 border border-emerald-500 text-emerald-300 px-3 py-1 rounded-lg font-bold hover:bg-emerald-900 transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في تبوك'
                : currentLang === 'fr'
                ? 'horaires de prière à Tabuk'
                : 'salah time in tabuk'}
            </span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={buildPrayertimeUrl('saudi-sa/mecca', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في مكة المكرمة'
                : currentLang === 'fr'
                ? 'horaires de prière à La Mecque'
                : 'salah time in Makkah'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('egypt', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في القاهرة مصر'
                : currentLang === 'fr'
                ? 'horaires de prière au Caire Égypte'
                : 'prayer times in Cairo Egypt'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('france', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في باريس وفرنسا'
                : currentLang === 'fr'
                ? 'horaires de prière à Paris France'
                : 'salah time in Paris France'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('united-kingdom', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في لندن بريطانيا'
                : currentLang === 'fr'
                ? 'horaires de prière à Londres'
                : 'prayer times London United Kingdom'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('united-states', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في نيويورك'
                : currentLang === 'fr'
                ? 'horaires de prière à New York'
                : 'salah time New York City'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('united-arab-emirates', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في دبي والإمارات'
                : currentLang === 'fr'
                ? 'horaires de prière à Dubaï EAU'
                : 'salah time in Dubai UAE'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('turkey', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في إسطنبول وتركيا'
                : currentLang === 'fr'
                ? 'horaires de prière à Istanbul Turquie'
                : 'namaz vakitleri Istanbul Turkey'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <a
            href={buildPrayertimeUrl('morocco/casablanca', currentLang)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-300 px-3 py-1 rounded-lg transition inline-flex items-center gap-1"
          >
            <span>
              {currentLang === 'ar'
                ? 'مواقيت الصلاة في الدار البيضاء بالمغرب'
                : currentLang === 'fr'
                ? 'horaires de prière à Casablanca Maroc'
                : 'salah time in Casablanca Morocco'}
            </span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

    </section>
  );
};
