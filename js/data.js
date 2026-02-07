/**
 * Static Data Repository
 */

// Level 1 Lessons
export const LEVEL1_LESSONS = [
    { id: '1-1', name: 'Home Row (ASDF JKL;)', keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon'] },
    { id: '1-2', name: 'Index Ext (G H)', keys: ['KeyF', 'KeyG', 'KeyH', 'KeyJ'] },
    { id: '1-3', name: 'Top Row Left (QWERT)', keys: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT'] },
    { id: '1-4', name: 'Top Row Right (YUIOP)', keys: ['KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'] },
    { id: '1-5', name: 'Bottom Row (ZXCVBNM)', keys: ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'] },
    { id: '1-6', name: 'Full Alphabet', keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => 'Key' + c) }
];

// Key Code to Display Character Mapping
export const KEY_DISPLAY_MAP = {
    'KeyA': 'A', 'KeyB': 'B', 'KeyC': 'C', 'KeyD': 'D', 'KeyE': 'E',
    'KeyF': 'F', 'KeyG': 'G', 'KeyH': 'H', 'KeyI': 'I', 'KeyJ': 'J',
    'KeyK': 'K', 'KeyL': 'L', 'KeyM': 'M', 'KeyN': 'N', 'KeyO': 'O',
    'KeyP': 'P', 'KeyQ': 'Q', 'KeyR': 'R', 'KeyS': 'S', 'KeyT': 'T',
    'KeyU': 'U', 'KeyV': 'V', 'KeyW': 'W', 'KeyX': 'X', 'KeyY': 'Y',
    'KeyZ': 'Z',
    'Semicolon': ';', 'Quote': "'", 'Comma': ',', 'Period': '.', 'Slash': '/'
};

// Finger hints (Optional future use)
export const FINGER_MAP = {
    'KeyA': 'Pinky', 'KeyS': 'Ring', 'KeyD': 'Middle', 'KeyF': 'Index',
    'KeyJ': 'Index', 'KeyK': 'Middle', 'KeyL': 'Ring', 'Semicolon': 'Pinky'
    // ... complete later
};
