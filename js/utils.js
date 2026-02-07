/**
 * Utility Functions
 */

// Random Integer inclusive
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random Element from Array
export function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Shuffle Array
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Simple WPM Calc
export function calculateWPM(charCount, timeSeconds) {
    if (timeSeconds <= 0) return 0;
    const minutes = timeSeconds / 60;
    const words = charCount / 5;
    return Math.round(words / minutes);
}

// Web Audio Context
let audioCtx = null;
let isSoundEnabled = true;

export function setSoundEnabled(enabled) {
    isSoundEnabled = enabled;
}

// Play Sound using Web Audio API (Synthesized)
export function playSound(type) {
    if (!isSoundEnabled) return;

    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (type === 'tick') {
        // High-pitched "Click" for correct key
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'error') {
        // Low-pitched "Thud" for error
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }
}
