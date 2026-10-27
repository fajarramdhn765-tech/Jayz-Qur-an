import { QariOption } from '../types';

export const QARI_LIST: QariOption[] = [
  { id: 'alafasy', name: 'Mishary Rashid Alafasy', subname: 'الكويت (Kuwait)', bitrate: '128kbps' },
  { id: 'sudais', name: 'Abdur-Rahman As-Sudais', subname: 'إمام الحرم المكي (Makkah)', bitrate: '192kbps' },
  { id: 'ghamdi', name: 'Saad Al-Ghamdi', subname: 'المملكة العربية السعودية (KSA)', bitrate: '128kbps' },
  { id: 'husary', name: 'Mahmoud Khalil Al-Husary', subname: 'مصر (Murattal Egypt)', bitrate: '128kbps' },
];

export const ADZAN_OPTIONS = [
  { id: 'makkah', name: 'Adzan Makkah Al-Mukarramah', audioUrl: 'https://cdn.islamicfinder.org/audio/adhan/makkah.mp3' },
  { id: 'madinah', name: 'Adzan Madinah Al-Munawwarah', audioUrl: 'https://cdn.islamicfinder.org/audio/adhan/madina.mp3' },
  { id: 'alaqsa', name: 'Adzan Masjid Al-Aqsa', audioUrl: 'https://cdn.islamicfinder.org/audio/adhan/alaqsa.mp3' },
  { id: 'soft', name: 'Nada Pengingat Lembut (Soft Chime)', audioUrl: '' },
];

let globalAudio: HTMLAudioElement | null = null;
let adzanAudio: HTMLAudioElement | null = null;

export function getAyahAudioUrl(qariId: string, surahNumber: number, ayahNumber: number): string {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumber).padStart(3, '0');

  switch (qariId) {
    case 'sudais':
      return `https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/${s}${a}.mp3`;
    case 'ghamdi':
      return `https://everyayah.com/data/Ghamadi_40kbps/${s}${a}.mp3`;
    case 'husary':
      return `https://everyayah.com/data/Husary_128kbps/${s}${a}.mp3`;
    case 'alafasy':
    default:
      return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
  }
}

// Play Adzan preview with web-audio chime fallback if network audio blocked
export function playAdzanSound(
  adzanId: string = 'makkah',
  onEnd?: () => void
): { stop: () => void } {
  stopAdzanSound();

  const opt = ADZAN_OPTIONS.find((o) => o.id === adzanId) || ADZAN_OPTIONS[0];

  if (opt.audioUrl) {
    try {
      adzanAudio = new Audio(opt.audioUrl);
      adzanAudio.volume = 0.9;
      adzanAudio.play().catch((e) => {
        console.warn('Network adzan audio blocked, falling back to melodic chime synth:', e);
        playSyntheticChime(onEnd);
      });

      if (onEnd) {
        adzanAudio.onended = onEnd;
      }

      return {
        stop: () => stopAdzanSound(),
      };
    } catch {
      playSyntheticChime(onEnd);
      return { stop: () => stopAdzanSound() };
    }
  } else {
    const cancelSynth = playSyntheticChime(onEnd);
    return { stop: cancelSynth };
  }
}

export function stopAdzanSound() {
  if (adzanAudio) {
    adzanAudio.pause();
    adzanAudio.currentTime = 0;
    adzanAudio = null;
  }
}

// Gentle spiritual Islamic scale synthetic chime
function playSyntheticChime(onComplete?: () => void): () => void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      if (onComplete) onComplete();
      return () => {};
    }
    const ctx = new AudioCtx();
    const notes = [440, 523.25, 659.25, 783.99, 880]; // A4, C5, E5, G5, A5
    let time = ctx.currentTime;
    const oscs: OscillatorNode[] = [];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.2, time + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 2.0);
      oscs.push(osc);
      time += 0.4;
    });

    const timer = setTimeout(() => {
      try {
        ctx.close();
      } catch {}
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      try {
        oscs.forEach((o) => o.stop());
        ctx.close();
      } catch {}
    };
  } catch {
    if (onComplete) onComplete();
    return () => {};
  }
}
