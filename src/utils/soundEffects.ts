/**
 * Engine Start sound using Web Audio API
 * Dual-oscillator Mechanical + Digital tone — no external audio files needed
 */

/** Engine Start — sawtooth sub-engine + sine digital whir */
export function playAutomationSound() {
    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const duration = 1.5;

        // Layer 1: The Sub Engine (เสียงทุ้มต่ำ)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(40, audioCtx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + duration);

        // Layer 2: The Digital Whir (เสียงวี้ดแบบ Hi-tech)
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + duration);

        // Filter: ตัดเสียงแหลมเกินไปออกให้ดู Smooth
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

        // Envelope: คุมความดัง
        gain1.gain.setValueAtTime(0, audioCtx.currentTime);
        gain1.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.1);
        gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        gain2.gain.setValueAtTime(0, audioCtx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.2);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(filter);
        gain2.connect(filter);
        filter.connect(audioCtx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + duration);
        osc2.stop(audioCtx.currentTime + duration);

        // Clean up after sounds finish
        setTimeout(() => audioCtx.close(), 2000);
    } catch (e) {
        // Silently ignore — sound is non-critical
        console.warn('[SFX] Could not play automation sound:', e);
    }
}
