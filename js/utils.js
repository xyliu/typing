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

// Play Sound (Placeholder)
export function playSound(type) {
    // console.log('Playing sound:', type);
    // TODO: Implement AudioContext
}
