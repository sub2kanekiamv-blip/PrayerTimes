/**
 * Web Audio API synthesizer for pleasant prayer call / adhan tones
 * Works 100% offline without external network dependencies.
 */
class PrayerAudioService {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Plays a tranquil multi-harmonic chime reminiscent of Islamic Adhan calling chords
   */
  public playAdhanChime(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Harmonic frequencies in spiritual minor pentatonic / maqam Rast scale (D, F, G, A, C)
    const notes = [
      { freq: 293.66, delay: 0.0, dur: 2.2 },  // D4
      { freq: 349.23, delay: 0.35, dur: 2.2 }, // F4
      { freq: 392.00, delay: 0.7, dur: 2.5 },  // G4
      { freq: 440.00, delay: 1.1, dur: 2.8 },  // A4
      { freq: 587.33, delay: 1.6, dur: 3.5 }   // D5 high resonant
    ];

    notes.forEach(({ freq, delay, dur }) => {
      const startTime = now + delay;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Main sine tone with subtle triangle overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, startTime); // 1st harmonic octave

      // Gentle attack and long decaying release
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

      osc.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc2.start(startTime);
      osc.stop(startTime + dur);
      osc2.stop(startTime + dur);
    });
  }

  /**
   * Quick gentle tick for testing or reminder
   */
  public playSoftTick(): void {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }
}

export const prayerAudio = new PrayerAudioService();
