import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, X, Volume2, Gauge } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { QARI_LIST } from '../services/audioService';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  surahNumber: number | null;
  ayahNumber: number | null;
  surahName: string;
  totalVerses: number;
  audioUrl: string;
  qariId: string;
  onTogglePlay: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  surahNumber,
  ayahNumber,
  surahName,
  totalVerses,
  audioUrl,
  qariId,
  onTogglePlay,
  onNextAyah,
  onPrevAyah,
  onClose,
}) => {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const currentQari = QARI_LIST.find((q) => q.id === qariId) || QARI_LIST[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (ayahNumber && ayahNumber < totalVerses) {
        onNextAyah();
      } else {
        onTogglePlay();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [ayahNumber, totalVerses, onNextAyah, onTogglePlay]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = playbackRate;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Audio play auto-interrupted:', err);
        });
      }
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  if (!surahNumber) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 inset-x-3 md:inset-x-auto md:right-6 md:w-96 z-40 animate-slideUp">
      <div className="rounded-2xl bg-gradient-to-r from-[#064B32] via-[#08784F] to-[#09251B] text-[#FFFDF5] p-3.5 shadow-2xl border border-[#E9B949]/40 backdrop-blur-md">
        {/* Top Info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="p-1.5 rounded-lg bg-[#E9B949]/20 text-[#E9B949] flex-shrink-0">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>
            <div className="truncate text-start">
              <p className="text-xs font-bold truncate">
                {surahName} {ayahNumber ? `• Ayat ${ayahNumber}` : ''}
              </p>
              <p className="text-[10px] text-[#FFF4D6]/80 truncate">{currentQari.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleSpeed}
              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-[#E9B949] transition"
              title="Playback speed"
            >
              {playbackRate}x
            </button>
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                onClose();
              }}
              className="p-1 rounded-lg text-white/70 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Slider */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-white/70 min-w-[28px]">{formatSeconds(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E9B949]"
          />
          <span className="text-[10px] text-white/70 min-w-[28px]">{formatSeconds(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onPrevAyah}
            disabled={!ayahNumber || ayahNumber <= 1}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-40 transition"
          >
            <SkipBack className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onTogglePlay}
            className="p-2.5 rounded-full bg-[#E9B949] hover:bg-[#F7D070] text-[#09251B] font-bold shadow-md transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
          </button>

          <button
            onClick={onNextAyah}
            disabled={!ayahNumber || ayahNumber >= totalVerses}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-40 transition"
          >
            <SkipForward className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
