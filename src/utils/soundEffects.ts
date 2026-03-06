/**
 * Mechanical "แต๊ก" click sound using Web Audio API
 * No external audio files needed — all sounds are synthesized in real-time
 */

/** "แต๊ก" — crisp mechanical click with sub-bass weight */
export function playAutomationSound() {
    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

        // --- Layer 1: Noise-based click (plastic/metal snap) ---
        const bufferSize = audioCtx.sampleRate * 0.05;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 3000;
        filter.Q.value = 5;

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start();
        noise.stop(audioCtx.currentTime + 0.05);

        // --- Layer 2: Sub-thump for weight ---
        const thump = audioCtx.createOscillator();
        const thumpGain = audioCtx.createGain();
        thump.type = 'sine';
        thump.frequency.setValueAtTime(150, audioCtx.currentTime);
        thump.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.05);
        thumpGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        thumpGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        thump.connect(thumpGain);
        thumpGain.connect(audioCtx.destination);
        thump.start();
        thump.stop(audioCtx.currentTime + 0.05);

        // Clean up after sounds finish
        setTimeout(() => audioCtx.close(), 300);
    } catch (e) {
        // Silently ignore — sound is non-critical
        console.warn('[SFX] Could not play automation sound:', e);
    }
}
