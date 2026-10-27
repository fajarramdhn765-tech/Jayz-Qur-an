import React from 'react';
import { X, Compass } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateQiblaDirection } from '../services/prayerService';

interface QiblaModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  cityName: string;
}

export const QiblaModal: React.FC<QiblaModalProps> = ({
  isOpen,
  onClose,
  latitude,
  longitude,
  cityName,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const qiblaAngle = calculateQiblaDirection(latitude, longitude);

  // Approximate Haversine distance to Makkah
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;
  const R = 6371; // Earth radius in km
  const dLat = ((KAABA_LAT - latitude) * Math.PI) / 180;
  const dLon = ((KAABA_LNG - longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latitude * Math.PI) / 180) *
      Math.cos((KAABA_LAT * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-[#0E3326] shadow-2xl border border-[#E9B949]/30 overflow-hidden text-center">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#064B32] to-[#08784F] text-[#FFFDF5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#E9B949]" />
            <h2 className="text-base font-bold tracking-wide">{t.prayers.qiblaDirection}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compass Visual */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-64 h-64 rounded-full border-4 border-[#064B32]/30 dark:border-[#E9B949]/40 p-2 shadow-inner bg-gradient-to-br from-[#FFFDF5] to-[#F5F7F2] dark:from-[#09251B] dark:to-[#05140E] flex items-center justify-center">
            {/* Cardinal Directions */}
            <span className="absolute top-2 font-bold text-xs text-red-600 dark:text-red-400">N (Utara)</span>
            <span className="absolute bottom-2 font-bold text-xs text-[#52665B] dark:text-[#A3BAAD]">S (Selatan)</span>
            <span className="absolute right-2 font-bold text-xs text-[#52665B] dark:text-[#A3BAAD]">E (Timur)</span>
            <span className="absolute left-2 font-bold text-xs text-[#52665B] dark:text-[#A3BAAD]">W (Barat)</span>

            {/* Subtle concentric circles */}
            <div className="w-48 h-48 rounded-full border border-dashed border-[#DCE5DD] dark:border-[#1E4E3B] flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-[#DCE5DD] dark:border-[#1E4E3B] flex items-center justify-center">
                {/* Center Pin */}
                <div className="w-4 h-4 rounded-full bg-[#E9B949] shadow-md border-2 border-white dark:border-[#09251B]" />
              </div>
            </div>

            {/* Rotating Qibla Needle */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <div className="flex flex-col items-center h-full justify-between py-5">
                {/* Ka'aba icon at the tip */}
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded bg-[#09251B] border-2 border-[#E9B949] flex items-center justify-center text-[10px] font-bold text-[#E9B949] shadow-lg">
                    🕋
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[16px] border-b-[#E9B949]" />
                </div>
                {/* Opposite tail needle */}
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[14px] border-t-gray-400 opacity-60" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-5 space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9B949]/20 text-[#064B32] dark:text-[#E9B949] font-bold text-sm">
              <span>{qiblaAngle}°</span>
              <span className="text-xs font-normal">dari arah Utara</span>
            </div>
            <p className="text-xs font-semibold text-[#09251B] dark:text-[#FFFDF5] pt-1">
              {cityName} → Masjidil Haram (Ka'bah)
            </p>
            <p className="text-[11px] text-[#52665B] dark:text-[#A3BAAD]">
              Jarak lurus: ~{distanceKm.toLocaleString()} km
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F7F2] dark:bg-[#133D2E] border-t border-[#DCE5DD] dark:border-[#1E4E3B]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-[#FFFDF5] text-xs font-semibold transition"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
