import React, { useState } from 'react';
import { X, MapPin, Navigation, Compass, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PRESET_LOCATIONS, CALCULATION_METHODS, LocationPreset } from '../services/prayerService';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  currentMethod: string;
  onSelectLocation: (location: LocationPreset) => void;
  onSelectMethod: (methodId: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  currentMethod,
  onSelectLocation,
  onSelectMethod,
}) => {
  const { t } = useLanguage();
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGPSDetect = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser');
      return;
    }

    setIsDetectingGPS(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGPS(false);
        const { latitude, longitude } = pos.coords;
        onSelectLocation({
          city: 'Lokasi Anda (GPS)',
          country: 'Otomatis',
          latitude,
          longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta',
          defaultMethod: currentMethod,
        });
        onClose();
      },
      (err) => {
        setIsDetectingGPS(false);
        setGpsError('Izin lokasi ditolak atau tidak tersedia. Silakan pilih kota dari daftar.');
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0E3326] shadow-2xl border border-[#E9B949]/30 overflow-hidden text-start">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#064B32] to-[#08784F] text-[#FFFDF5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[#E9B949]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide">{t.home.changeLocation}</h2>
              <p className="text-xs text-[#FFF4D6]/80">{t.prayers.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Button */}
        <div className="p-4 border-b border-[#DCE5DD] dark:border-[#1E4E3B] bg-[#F5F7F2]/60 dark:bg-[#133D2E]/40">
          <button
            onClick={handleGPSDetect}
            disabled={isDetectingGPS}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-sm font-semibold shadow transition-all active:scale-95 disabled:opacity-50"
          >
            <Navigation className={`w-4 h-4 text-[#E9B949] ${isDetectingGPS ? 'animate-spin' : ''}`} />
            <span>{isDetectingGPS ? 'Mendeteksi Koordinat...' : t.prayers.detectGPS}</span>
          </button>
          {gpsError && <p className="mt-2 text-xs text-red-500">{gpsError}</p>}
        </div>

        {/* Cities Grid */}
        <div className="p-4 max-h-64 overflow-y-auto">
          <label className="text-xs font-bold uppercase tracking-wider text-[#52665B] dark:text-[#A3BAAD] mb-2 block">
            {t.prayers.selectCity}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESET_LOCATIONS.map((loc) => {
              const isSelected = currentCity.toLowerCase() === loc.city.toLowerCase();
              return (
                <button
                  key={loc.city}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl text-start transition-all ${
                    isSelected
                      ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-2 border-[#08784F] dark:border-[#E9B949]'
                      : 'hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E] border border-[#DCE5DD] dark:border-[#1E4E3B]'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-[#09251B] dark:text-[#FFFDF5]">{loc.city}</p>
                    <p className="text-xs text-[#52665B] dark:text-[#A3BAAD]">{loc.country}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#08784F] dark:text-[#E9B949]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculation Method */}
        <div className="p-4 border-t border-[#DCE5DD] dark:border-[#1E4E3B] bg-[#FFFDF5] dark:bg-[#0E3326]">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-[#E9B949]" />
            <label className="text-xs font-bold uppercase tracking-wider text-[#52665B] dark:text-[#A3BAAD]">
              {t.prayers.calcMethod}
            </label>
          </div>
          <select
            value={currentMethod}
            onChange={(e) => onSelectMethod(e.target.value)}
            className="w-full p-2.5 text-sm rounded-xl bg-white dark:bg-[#09251B] border border-[#DCE5DD] dark:border-[#1E4E3B] text-[#09251B] dark:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#08784F]"
          >
            {Object.values(CALCULATION_METHODS).map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} (Subuh {m.fajrAngle}°, Isya {m.ishaAngle || `${m.ishaInterval}m`}°)
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F7F2] dark:bg-[#133D2E] border-t border-[#DCE5DD] dark:border-[#1E4E3B] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-[#FFFDF5] text-xs font-semibold transition"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
