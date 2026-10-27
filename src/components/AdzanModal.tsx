import React, { useState } from 'react';
import { X, Bell, Volume2, Square, Play, Check, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ADZAN_OPTIONS, playAdzanSound, stopAdzanSound } from '../services/audioService';

interface AdzanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSound: string;
  onSelectSound: (soundId: string) => void;
  prayerAlarms: Record<string, boolean>;
  onToggleAlarm: (prayer: string) => void;
}

export const AdzanModal: React.FC<AdzanModalProps> = ({
  isOpen,
  onClose,
  selectedSound,
  onSelectSound,
  prayerAlarms,
  onToggleAlarm,
}) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission>(() => {
    return typeof Notification !== 'undefined' ? Notification.permission : 'default';
  });

  if (!isOpen) return null;

  const handlePlayAdzan = (soundId: string) => {
    if (isPlaying) {
      stopAdzanSound();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playAdzanSound(soundId, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleClose = () => {
    stopAdzanSound();
    setIsPlaying(false);
    onClose();
  };

  const requestNotification = async () => {
    if (typeof Notification !== 'undefined') {
      const res = await Notification.requestPermission();
      setNotificationStatus(res);
      if (res === 'granted') {
        new Notification("Jay’z Qur’an", {
          body: "Pengingat Adzan & Waktu Salat telah aktif. Jazakallahu khair!",
          icon: "/icon.svg"
        });
      }
    }
  };

  const prayers = [
    { key: 'fajr', label: t.prayers.fajr },
    { key: 'dhuhr', label: t.prayers.dhuhr },
    { key: 'asr', label: t.prayers.asr },
    { key: 'maghrib', label: t.prayers.maghrib },
    { key: 'isha', label: t.prayers.isha },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0E3326] shadow-2xl border border-[#E9B949]/30 overflow-hidden text-start">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#064B32] to-[#08784F] text-[#FFFDF5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[#E9B949]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide">{t.home.adzanAction}</h2>
              <p className="text-xs text-[#FFF4D6]/80">{t.prayers.adzanReminder}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Permission Card */}
        <div className="p-4 border-b border-[#DCE5DD] dark:border-[#1E4E3B] bg-[#FFF4D6]/30 dark:bg-[#133D2E]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#08784F] dark:text-[#E9B949]" />
              <div>
                <p className="text-xs font-bold text-[#09251B] dark:text-[#FFFDF5]">Izin Notifikasi Sistem</p>
                <p className="text-[11px] text-[#52665B] dark:text-[#A3BAAD]">
                  {notificationStatus === 'granted' ? 'Notifikasi aktif' : 'Izinkan untuk alarm waktu salat'}
                </p>
              </div>
            </div>
            {notificationStatus !== 'granted' ? (
              <button
                onClick={requestNotification}
                className="px-3 py-1.5 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-white text-xs font-semibold shadow transition"
              >
                Aktifkan
              </button>
            ) : (
              <span className="text-xs font-semibold text-[#08784F] dark:text-[#E9B949] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Aktif
              </span>
            )}
          </div>
        </div>

        {/* Adzan Sound Selection */}
        <div className="p-4">
          <label className="text-xs font-bold uppercase tracking-wider text-[#52665B] dark:text-[#A3BAAD] mb-2 block">
            {t.prayers.adzanSound}
          </label>
          <div className="space-y-2">
            {ADZAN_OPTIONS.map((opt) => {
              const isSelected = selectedSound === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#064B32]/10 dark:bg-[#08784F]/30 border-[#08784F] dark:border-[#E9B949]'
                      : 'border-[#DCE5DD] dark:border-[#1E4E3B] hover:bg-[#F5F7F2] dark:hover:bg-[#133D2E]'
                  }`}
                >
                  <button
                    onClick={() => onSelectSound(opt.id)}
                    className="flex-1 text-start"
                  >
                    <p className="text-sm font-semibold text-[#09251B] dark:text-[#FFFDF5]">{opt.name}</p>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlayAdzan(opt.id)}
                      className={`p-2 rounded-lg transition-all ${
                        isPlaying && selectedSound === opt.id
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-[#064B32] hover:bg-[#08784F] text-white'
                      }`}
                      title={isPlaying ? t.prayers.stopAdzan : t.prayers.testAdzan}
                    >
                      {isPlaying && selectedSound === opt.id ? (
                        <Square className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prayer Alarm Toggles */}
        <div className="p-4 border-t border-[#DCE5DD] dark:border-[#1E4E3B] bg-[#F5F7F2]/40 dark:bg-[#09251B]/40">
          <label className="text-xs font-bold uppercase tracking-wider text-[#52665B] dark:text-[#A3BAAD] mb-2.5 block">
            {t.settings.prayerAlerts}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {prayers.map((p) => {
              const isEnabled = prayerAlarms[p.key] ?? true;
              return (
                <button
                  key={p.key}
                  onClick={() => onToggleAlarm(p.key)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-sm font-medium transition-all ${
                    isEnabled
                      ? 'bg-[#064B32] text-white border-[#064B32] shadow-sm'
                      : 'bg-white dark:bg-[#0E3326] text-[#52665B] dark:text-[#A3BAAD] border-[#DCE5DD] dark:border-[#1E4E3B]'
                  }`}
                >
                  <span>{p.label}</span>
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isEnabled ? 'bg-[#E9B949] text-[#09251B]' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    {isEnabled && <Check className="w-3 h-3 font-bold" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F7F2] dark:bg-[#133D2E] border-t border-[#DCE5DD] dark:border-[#1E4E3B] flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl bg-[#064B32] hover:bg-[#08784F] text-[#FFFDF5] text-xs font-semibold transition"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
