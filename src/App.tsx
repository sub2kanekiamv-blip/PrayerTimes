/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { CountdownHero } from './components/CountdownHero';
import { DailyPrayerGrid } from './components/DailyPrayerGrid';
import { QiblaCompass } from './components/QiblaCompass';
import { PrayerTimeInfoBanner } from './components/PrayerTimeInfoBanner';
import { OfficialAuthoritiesSection } from './components/OfficialAuthoritiesSection';
import { SeoAiOverviewSection } from './components/SeoAiOverviewSection';
import { MonthlyScheduleModal } from './components/MonthlyScheduleModal';
import { EmbedWidgetModal } from './components/EmbedWidgetModal';
import { Footer } from './components/Footer';

import { AsrJuristicMethod, CityData, CountryData } from './types/prayer';
import { COUNTRIES, CITIES } from './data/countriesAndCities';
import { AppLanguage } from './translations';
import {
  computePrayerDates,
  getNextPrayerCountdown,
  getPrayerTimesStrings
} from './utils/prayerCalculation';
import { getHijriDate } from './utils/hijriCalendar';
import { prayerAudio } from './utils/audioNotification';

export default function App() {
  // App Language State: 'en' | 'ar' | 'fr'
  const [currentLang, setCurrentLang] = useState<AppLanguage>('en');

  // State for user preferences
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('SA');
  const [selectedCityId, setSelectedCityId] = useState<string>('tabuk'); // Default to Tabuk as requested
  const [asrMethod, setAsrMethod] = useState<AsrJuristicMethod>('standard');
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Active dates & timers
  const [now, setNow] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // Modals
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState<boolean>(false);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState<boolean>(false);

  // Track previous next prayer to sound chime when a prayer begins
  const prevNextPrayerKeyRef = useRef<string | null>(null);

  // Sync document language and text direction (RTL for Arabic, LTR for English and French)
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // 1-second interval timer for real-time second-by-second countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync audio mute state with service
  useEffect(() => {
    prayerAudio.setMuted(isMuted);
  }, [isMuted]);

  // Find active Country & City objects
  const selectedCountry: CountryData = useMemo(() => {
    return COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];
  }, [selectedCountryCode]);

  const selectedCity: CityData = useMemo(() => {
    const found = CITIES.find((c) => c.id === selectedCityId);
    if (found) return found;
    // Fallback to first city in the selected country
    const firstOfCountry = CITIES.find((c) => c.countryCode === selectedCountry.code);
    return firstOfCountry || CITIES[0];
  }, [selectedCityId, selectedCountry]);

  // Compute Next Prayer countdown info (re-evaluated every second as `now` updates)
  const nextPrayer = useMemo(() => {
    return getNextPrayerCountdown(
      now,
      selectedCity.latitude,
      selectedCity.longitude,
      selectedCity.methodKey,
      asrMethod,
      is24Hour
    );
  }, [now, selectedCity, asrMethod, is24Hour]);

  // Audio alert trigger when next prayer arrives
  useEffect(() => {
    if (prevNextPrayerKeyRef.current && prevNextPrayerKeyRef.current !== nextPrayer.key) {
      // Prayer has switched! Sound chime if not muted
      prayerAudio.playAdhanChime();
    }
    prevNextPrayerKeyRef.current = nextPrayer.key;
  }, [nextPrayer.key]);

  // Compute daily schedule for the selected date
  const dailyPrayerDates = useMemo(() => {
    return computePrayerDates(
      selectedDate,
      selectedCity.latitude,
      selectedCity.longitude,
      selectedCity.methodKey,
      asrMethod
    );
  }, [selectedDate, selectedCity, asrMethod]);

  const dailyPrayerTimesStrings = useMemo(() => {
    return getPrayerTimesStrings(dailyPrayerDates, is24Hour);
  }, [dailyPrayerDates, is24Hour]);

  // Compute Hijri Date for today
  const hijriDate = useMemo(() => {
    return getHijriDate(now);
  }, [now]);

  // Handlers
  const handleSelectCountry = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    const country = COUNTRIES.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCityId(country.defaultCityId);
    }
  };

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    const city = CITIES.find((c) => c.id === cityId);
    if (city) {
      setSelectedCountryCode(city.countryCode);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Find the closest city from our catalog using Euclidean distance
        let closestCity = CITIES[0];
        let minDistance = Number.MAX_VALUE;

        CITIES.forEach((c) => {
          const dLat = c.latitude - userLat;
          const dLng = c.longitude - userLng;
          const dist = dLat * dLat + dLng * dLng;
          if (dist < minDistance) {
            minDistance = dist;
            closestCity = c;
          }
        });

        setSelectedCountryCode(closestCity.countryCode);
        setSelectedCityId(closestCity.id);
        setIsDetectingLocation(false);
      },
      (error) => {
        setIsDetectingLocation(false);
        console.warn('Geolocation failed or permission denied:', error.message);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleScrollToQibla = () => {
    const el = document.getElementById('qibla-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white ${
        currentLang === 'ar' ? 'font-arabic' : ''
      }`}
    >
      {/* Top Navigation & Controls */}
      <Header
        hijriDate={hijriDate}
        is24Hour={is24Hour}
        onToggleTimeFormat={() => setIs24Hour(!is24Hour)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        onOpenWidgetModal={() => setIsWidgetModalOpen(true)}
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Core Hero: Second-by-Second Next Salah Countdown with Tabuk & world cities */}
        <CountdownHero
          selectedCountry={selectedCountry}
          selectedCity={selectedCity}
          onSelectCountry={handleSelectCountry}
          onSelectCity={handleSelectCity}
          onDetectLocation={handleDetectLocation}
          isDetectingLocation={isDetectingLocation}
          nextPrayer={nextPrayer}
          asrMethod={asrMethod}
          onChangeAsrMethod={setAsrMethod}
          onOpenMonthlyModal={() => setIsMonthlyModalOpen(true)}
          onScrollToQibla={handleScrollToQibla}
          currentLang={currentLang}
        />

        {/* Daily 5 Prayers Schedule Grid with Sunrise and Night worship markers */}
        <DailyPrayerGrid
          prayerTimes={dailyPrayerTimesStrings}
          nextPrayer={nextPrayer}
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
          cityName={
            currentLang === 'ar'
              ? `${selectedCity.arabicName}، ${selectedCountry.arabicName}`
              : currentLang === 'fr' && selectedCity.frenchName
              ? `${selectedCity.frenchName}, ${selectedCountry.frenchName}`
              : `${selectedCity.name}, ${selectedCountry.name}`
          }
          currentLang={currentLang}
        />

        {/* Featured Backlink & Verification Banner for prayertime.info with keyword anchors */}
        <PrayerTimeInfoBanner
          selectedCity={selectedCity}
          selectedCountry={selectedCountry}
          onOpenWidgetModal={() => setIsWidgetModalOpen(true)}
          currentLang={currentLang}
        />

        {/* Great-Circle Qibla Direction Compass Dial */}
        <QiblaCompass city={selectedCity} currentLang={currentLang} />

        {/* Official Government Authorities Directory & Calculation Methodologies */}
        <OfficialAuthoritiesSection currentLang={currentLang} />

        {/* SEO, AI Overview Knowledge Accordion & Geo Muslim Cities Cloud with keyword links */}
        <SeoAiOverviewSection
          onSelectCityById={handleSelectCity}
          currentLang={currentLang}
        />
      </main>

      {/* Footer with citations, prayertime.info anchors, and government links */}
      <Footer currentLang={currentLang} />

      {/* Monthly Prayer Calendar Modal */}
      <MonthlyScheduleModal
        isOpen={isMonthlyModalOpen}
        onClose={() => setIsMonthlyModalOpen(false)}
        city={selectedCity}
        asrMethod={asrMethod}
        is24Hour={is24Hour}
        currentLang={currentLang}
      />

      {/* Embed Widget Generator Modal */}
      <EmbedWidgetModal
        isOpen={isWidgetModalOpen}
        onClose={() => setIsWidgetModalOpen(false)}
        city={selectedCity}
        currentLang={currentLang}
      />
    </div>
  );
}
