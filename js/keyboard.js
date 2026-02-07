/**
 * Virtual Keyboard Module
 * Handles rendering of the 75% ANSI layout.
 */

// 75% Layout Definition 
// Rows: [F-Row, Number-Row, Q-Row, A-Row, Z-Row, Bottom-Row]
const KEY_LAYOUT = [
    // Row 0: ESC, F1-F12, Del
    [
        { code: 'Escape', label: 'esc', width: 1 },
        { spacing: 0.5 }, // Gap
        { code: 'F1', label: 'F1' }, { code: 'F2', label: 'F2' }, { code: 'F3', label: 'F3' }, { code: 'F4', label: 'F4' },
        { spacing: 0.5 },
        { code: 'F5', label: 'F5' }, { code: 'F6', label: 'F6' }, { code: 'F7', label: 'F7' }, { code: 'F8', label: 'F8' },
        { spacing: 0.5 },
        { code: 'F9', label: 'F9' }, { code: 'F10', label: 'F10' }, { code: 'F11', label: 'F11' }, { code: 'F12', label: 'F12' },
        { spacing: 0.5 },
        { code: 'Delete', label: 'del' }
    ],
    // Row 1: Numbers
    [
        { code: 'Backquote', label: '`' }, { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' }, { code: 'Digit3', label: '3' },
        { code: 'Digit4', label: '4' }, { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' }, { code: 'Digit7', label: '7' },
        { code: 'Digit8', label: '8' }, { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' }, { code: 'Minus', label: '-' },
        { code: 'Equal', label: '=' }, { code: 'Backspace', label: 'back', width: 2 }, { code: 'Insert', label: 'ins' }
    ],
    // Row 2: Tab + QWERTY
    [
        { code: 'Tab', label: 'tab', width: 1.5 }, { code: 'KeyQ', label: 'Q' }, { code: 'KeyW', label: 'W' }, { code: 'KeyE', label: 'E' },
        { code: 'KeyR', label: 'R' }, { code: 'KeyT', label: 'T' }, { code: 'KeyY', label: 'Y' }, { code: 'KeyU', label: 'U' },
        { code: 'KeyI', label: 'I' }, { code: 'KeyO', label: 'O' }, { code: 'KeyP', label: 'P' }, { code: 'BracketLeft', label: '[' },
        { code: 'BracketRight', label: ']' }, { code: 'Backslash', label: '\\', width: 1.5 }, { code: 'PageUp', label: 'pgup' }
    ],
    // Row 3: Caps + ASDF
    [
        { code: 'CapsLock', label: 'caps', width: 1.75 }, { code: 'KeyA', label: 'A' }, { code: 'KeyS', label: 'S' }, { code: 'KeyD', label: 'D' },
        { code: 'KeyF', label: 'F' }, { code: 'KeyG', label: 'G' }, { code: 'KeyH', label: 'H' }, { code: 'KeyJ', label: 'J' },
        { code: 'KeyK', label: 'K' }, { code: 'KeyL', label: 'L' }, { code: 'Semicolon', label: ';' }, { code: 'Quote', label: "'" },
        { code: 'Enter', label: 'enter', width: 2.25 }, { code: 'PageDown', label: 'pgdn' }
    ],
    // Row 4: Shift + ZXCV
    [
        { code: 'ShiftLeft', label: 'shift', width: 2.25 }, { code: 'KeyZ', label: 'Z' }, { code: 'KeyX', label: 'X' }, { code: 'KeyC', label: 'C' },
        { code: 'KeyV', label: 'V' }, { code: 'KeyB', label: 'B' }, { code: 'KeyN', label: 'N' }, { code: 'KeyM', label: 'M' },
        { code: 'Comma', label: ',' }, { code: 'Period', label: '.' }, { code: 'Slash', label: '/' }, { code: 'ShiftRight', label: 'shift', width: 1.75 },
        { code: 'ArrowUp', label: '↑' }, { code: 'End', label: 'end' } // Placeholder for end/del depending on layout
    ],
    // Row 5: Mods + Space
    [
        { code: 'ControlLeft', label: 'ctrl', width: 1.25 }, { code: 'MetaLeft', label: 'win', width: 1.25 }, { code: 'AltLeft', label: 'alt', width: 1.25 },
        { code: 'Space', label: '', width: 6.25 },
        { code: 'AltRight', label: 'alt', width: 1.25 }, { code: 'ControlRight', label: 'ctrl', width: 1.25 },
        { code: 'ArrowLeft', label: '←' }, { code: 'ArrowDown', label: '↓' }, { code: 'ArrowRight', label: '→' }
    ]
];

export function initKeyboard(container) {
    if (!container) return;

    // Clear
    container.innerHTML = '';

    // Render Rows
    KEY_LAYOUT.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'kb-row';
        rowDiv.style.display = 'flex';
        rowDiv.style.marginBottom = '6px';
        rowDiv.style.justifyContent = 'space-between'; // Distribute space

        row.forEach(key => {
            if (key.spacing) {
                const spacer = document.createElement('div');
                spacer.style.width = `calc(var(--key-spacer) * ${key.spacing})`;
                rowDiv.appendChild(spacer);
                return;
            }

            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';

            // Add finger class
            const fingerClass = getFingerCode(key.code);
            if (fingerClass) keyDiv.classList.add(fingerClass);

            keyDiv.dataset.code = key.code;
            keyDiv.textContent = key.label;

            // Responsive styling using CSS variables
            const width = key.width || 1;
            keyDiv.style.width = `calc(var(--key-unit) * ${width})`;
            keyDiv.style.height = 'var(--key-unit)';

            rowDiv.appendChild(keyDiv);
        });

        container.appendChild(rowDiv);
    });

    // Attach Listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
    const key = document.querySelector(`.key[data-code="${e.code}"]`);
    if (key) {
        key.classList.add('active');
    }
}

function handleKeyUp(e) {
    const key = document.querySelector(`.key[data-code="${e.code}"]`);
    if (key) {
        key.classList.remove('active');
    }
}

// Finger Mapping Helper
function getFingerCode(code) {
    // Left Hand
    if (['Escape', 'Backquote', 'Digit1', 'Tab', 'KeyQ', 'CapsLock', 'KeyA', 'ShiftLeft', 'KeyZ', 'ControlLeft', 'MetaLeft', 'AltLeft'].includes(code)) return 'finger-pinky';
    if (['Digit2', 'KeyW', 'KeyS', 'KeyX'].includes(code)) return 'finger-ring';
    if (['Digit3', 'KeyE', 'KeyD', 'KeyC'].includes(code)) return 'finger-middle-left';
    if (['Digit4', 'Digit5', 'KeyR', 'KeyT', 'KeyF', 'KeyG', 'KeyV', 'KeyB'].includes(code)) return 'finger-index-left';

    // Right Hand
    if (['Digit6', 'Digit7', 'KeyY', 'KeyU', 'KeyH', 'KeyJ', 'KeyN', 'KeyM'].includes(code)) return 'finger-index-right';
    if (['Digit8', 'KeyI', 'KeyK', 'Comma'].includes(code)) return 'finger-middle-right';
    if (['Digit9', 'KeyO', 'KeyL', 'Period'].includes(code)) return 'finger-ring';
    if (['Digit0', 'Minus', 'Equal', 'Backspace', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Semicolon', 'Quote', 'Enter', 'Slash', 'ShiftRight', 'ControlRight', 'AltRight'].includes(code)) return 'finger-pinky';

    // Thumb
    if (['Space'].includes(code)) return 'finger-thumb';

    return '';
}

/**
 * Highlights a specific key on the virtual keyboard.
 * @param {string} code - The DOM KeyboardEvent.code (e.g., 'KeyA', 'Space')
 */
export function highlightKey(code) {
    // Remove old highlights
    clearHints();

    if (!code) return; // If null/empty, just clear

    // Handle codes that might be just chars (compatibility)
    // But ideally we pass full codes. 
    // If it's a simple char like 'a', we might need to find map. 
    // For now assume valid codes are passed, or handle basic mapping if needed.

    const keyEl = document.querySelector(`.key[data-code="${code}"]`);
    if (keyEl) {
        keyEl.classList.add('hint');
    }
}

export function clearHints() {
    document.querySelectorAll('.key.hint').forEach(k => k.classList.remove('hint'));
}
