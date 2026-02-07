/**
 * Storage Module
 * Handles persistence of game results to LocalStorage.
 */

const STORAGE_KEY_PREFIX = 'tf_stats_';

/**
 * Saves a game result.
 * @param {string|number} levelId - Level identifier (1, 2, 3)
 * @param {number} wpm - Words Per Minute
 * @param {number} accuracy - Percentage (0-100)
 */
export function saveResult(levelId, wpm, accuracy) {
    const key = `${STORAGE_KEY_PREFIX}${levelId}`;
    const newRecord = {
        wpm: Math.round(wpm),
        accuracy: Math.round(accuracy),
        date: new Date().toISOString(),
        timestamp: Date.now()
    };

    // Load existing history
    let history = getHistory(levelId);

    // Add new record
    history.push(newRecord);

    // Optional: Limit history size to prevent bloat (e.g., last 100 records)
    if (history.length > 100) {
        history = history.slice(-100);
    }

    localStorage.setItem(key, JSON.stringify(history));

    return checkIsNewHighArray(history, newRecord);
}

/**
 * Retrieves the best result for a level.
 * @param {string|number} levelId 
 * @returns {object|null} { wpm, accuracy, date } or null
 */
export function getBestResult(levelId) {
    const history = getHistory(levelId);
    if (!history || history.length === 0) return null;

    // Best is defined by highest WPM. 
    // If WPM is tie, higher Accuracy wins.
    return history.reduce((prev, current) => {
        if (current.wpm > prev.wpm) return current;
        if (current.wpm === prev.wpm && current.accuracy > prev.accuracy) return current;
        return prev;
    }, history[0]);
}

/**
 * Retrieves recent results.
 * @param {string|number} levelId 
 * @param {number} limit 
 */
export function getRecentResults(levelId, limit = 5) {
    const history = getHistory(levelId);
    // Return reverse chronological (newest first)
    return [...history].reverse().slice(0, limit);
}

// Internal Helper
function getHistory(levelId) {
    const key = `${STORAGE_KEY_PREFIX}${levelId}`;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to load stats:', e);
        return [];
    }
}

// Check if the current record is a new personal best (High Score)
function checkIsNewHighArray(history, current) {
    if (history.length <= 1) return true; // First record is always high score

    // Filter out the current record just pushed (it's already in history)
    // Actually simpler: Find max of history excluding current? No.
    // We want to know if 'current' IS the best.

    const best = history.reduce((prev, curr) => {
        if (curr.wpm > prev.wpm) return curr;
        if (curr.wpm === prev.wpm && curr.accuracy > prev.accuracy) return curr;
        return prev;
    }, history[0]);

    // If current timestamp matches best timestamp, it's the high score
    return best.timestamp === current.timestamp;
}
