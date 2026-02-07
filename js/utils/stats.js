/**
 * Stats Calculation Utilities
 */

/**
 * Calculates Words Per Minute (WPM).
 * Standard formula: (Characters / 5) / (Minutes)
 * @param {number} charCount - Total characters typed (including spaces)
 * @param {number} timeSeconds - Time elapsed in seconds
 * @returns {number} WPM (rounded integer)
 */
export function calculateWPM(charCount, timeSeconds) {
    if (timeSeconds <= 0) return 0;
    const minutes = timeSeconds / 60;
    const words = charCount / 5; // Standard word length
    return Math.round(words / minutes);
}

/**
 * Calculates Accuracy Percentage.
 * Formula: ((Total - Errors) / Total) * 100
 * @param {number} errorCount 
 * @param {number} totalChars 
 * @returns {number} Accuracy 0-100 (rounded integer)
 */
export function calculateAccuracy(errorCount, totalChars) {
    if (totalChars <= 0) return 100;
    const correct = Math.max(0, totalChars - errorCount);
    // Accuracy shouldn't be negative
    const acc = (correct / totalChars) * 100;
    return Math.round(acc);
}
