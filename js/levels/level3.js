/**
 * Level 3: Flow Mode (Sentence/Article Typing)
 */
import { LEVEL3_ARTICLES, KEY_DISPLAY_MAP } from '../data.js';
import { calculateWPM, playSound } from '../utils.js';
import { highlightKey, clearHints } from '../keyboard.js';

let state = {
    isActive: false,
    container: null,
    currentArticle: null,
    inputText: '',
    startTime: null,
    timerInterval: null,
    currentIndex: 0,
    errors: [], // Indices of errors
    isFinished: false
};

export function init(container) {
    state.container = container;
    renderMenu();
}

function renderMenu() {
    state.container.innerHTML = `
        <div class="level-menu">
            <h2>Level 3: 心流模式</h2>
            <p class="description">练习完整的段落，提升打字的连贯性与韵律。</p>
            <div class="article-list">
                ${LEVEL3_ARTICLES.map(art => `
                    <button class="article-btn" data-id="${art.id}">
                        <div class="art-title">${art.title}</div>
                        <div class="art-preview">${art.content.substring(0, 50)}...</div>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    state.container.querySelectorAll('.article-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const article = LEVEL3_ARTICLES.find(a => a.id === id);
            startSession(article);
        });
    });
}

function startSession(article) {
    state.isActive = true;
    state.currentArticle = article;
    state.inputText = '';
    state.currentIndex = 0;
    state.errors = [];
    state.startTime = null; // Start on first keypress
    state.isFinished = false;

    // Render Stage
    state.container.innerHTML = `
        <div class="level3-stage">
            <div class="stats-live">
                <span>WPM: <b id="live-wpm">0</b></span>
                <span>进度: <b id="live-progress">0%</b></span>
            </div>
            <div id="text-display" class="text-display"></div>
            <div class="caret" id="caret"></div>
            <div class="instruction">开始输入以启动计时</div>
            <button id="exit-btn" class="secondary-btn">退出</button>
        </div>
    `;

    // Render Text
    const displayEl = document.getElementById('text-display');
    const chars = article.content.split('');
    displayEl.innerHTML = chars.map((char, idx) => {
        return `<span class="char" data-idx="${idx}">${char}</span>`;
    }).join('');

    // Setup events
    window.addEventListener('keydown', handleInput);
    document.getElementById('exit-btn').addEventListener('click', exitLevel);

    updateCaret();
}

function handleInput(e) {
    if (!state.isActive || state.isFinished) return;

    // Ignore meta keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        e.preventDefault();
        return;
    }

    // Start Timer on first valid input
    if (!state.startTime) {
        state.startTime = Date.now();
        state.timerInterval = setInterval(updateStats, 1000);
        document.querySelector('.instruction').style.opacity = 0;
    }

    const targetCharIdx = state.currentIndex;
    const targetText = state.currentArticle.content;
    const targetChar = targetText[targetCharIdx];

    if (e.key === 'Backspace') {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            // Clear status of the char we just backed over
            updateCharStatus(state.currentIndex, null);
        }
    } else {
        // Prevent default browser action for keys unless they are system shortcuts
        if (e.key.length === 1) {
            e.preventDefault();

            // Validate
            // Standardizing some chars if needed, but mostly direct match
            if (e.key === targetChar) {
                updateCharStatus(state.currentIndex, 'correct');
                playSound('tick');
            } else {
                updateCharStatus(state.currentIndex, 'error');
                playSound('error');
            }
            state.currentIndex++;
        }
    }

    updateCaret();
    checkCompletion();
}

function updateCharStatus(index, status) {
    const el = document.querySelector(`.char[data-idx="${index}"]`);
    if (!el) return;

    el.className = 'char'; // reset
    if (status === 'correct') el.classList.add('correct');
    if (status === 'error') el.classList.add('error');
}

function updateCaret() {
    // We visually move a caret element or just use the next char's style (underscore)
    // Let's stick to highlighting the current character
    document.querySelectorAll('.char.active').forEach(e => e.classList.remove('active'));

    if (state.currentIndex < state.currentArticle.content.length) {
        const currentEl = document.querySelector(`.char[data-idx="${state.currentIndex}"]`);
        if (currentEl) {
            currentEl.classList.add('active');

            // Scroll into view if needed
            const parent = document.getElementById('text-display');
            if (currentEl.offsetTop > parent.scrollTop + parent.clientHeight - 50) {
                parent.scrollTop = currentEl.offsetTop - 50;
            }
        }
    }

    // --- KEYBOARD HIGHLIGHTING LOGIC ---
    // Rule: "Display next input char; OR if current/prev 5 chars have error, display corrected char (Backspace)"

    // Check previous 5 chars for 'error' class
    let hasNearError = false;
    for (let i = 1; i <= 5; i++) {
        const idx = state.currentIndex - i;
        if (idx >= 0) {
            const el = document.querySelector(`.char[data-idx="${idx}"]`);
            if (el && el.classList.contains('error')) {
                hasNearError = true;
                break;
            }
        }
    }

    if (hasNearError) {
        highlightKey('Backspace');
    } else {
        // Highlight next char
        if (state.currentIndex < state.currentArticle.content.length) {
            const char = state.currentArticle.content[state.currentIndex];
            // Map char to code
            let code = getCodeFromChar(char);
            highlightKey(code);
        } else {
            clearHints();
        }
    }
}

// Helper to map char to Code (Basic set)
function getCodeFromChar(char) {
    if (!char) return '';
    if (char === ' ') return 'Space';
    if (/[a-zA-Z]/.test(char)) return 'Key' + char.toUpperCase();
    if (/[0-9]/.test(char)) return 'Digit' + char;
    // Common punctuation
    const puncMap = {
        ',': 'Comma', '.': 'Period', '/': 'Slash', ';': 'Semicolon',
        "'": 'Quote', '[': 'BracketLeft', ']': 'BracketRight',
        '\\': 'Backslash', '-': 'Minus', '=': 'Equal', '`': 'Backquote'
    };
    if (puncMap[char]) return puncMap[char];

    // Shift pairs (requires more logic to show Shift + Key, but for now just highlight base key)
    const shiftMap = {
        '!': 'Digit1', '@': 'Digit2', '#': 'Digit3', '$': 'Digit4', '%': 'Digit5',
        '^': 'Digit6', '&': 'Digit7', '*': 'Digit8', '(': 'Digit9', ')': 'Digit0',
        '_': 'Minus', '+': 'Equal', '{': 'BracketLeft', '}': 'BracketRight',
        '|': 'Backslash', ':': 'Semicolon', '"': 'Quote', '<': 'Comma', '>': 'Period', '?': 'Slash',
        '~': 'Backquote'
    };
    if (shiftMap[char]) return shiftMap[char];

    return '';
}

function updateStats() {
    if (!state.startTime) return;

    const elapsedSec = (Date.now() - state.startTime) / 1000;
    const wpm = calculateWPM(state.currentIndex, elapsedSec);
    const progress = Math.floor((state.currentIndex / state.currentArticle.content.length) * 100);

    document.getElementById('live-wpm').textContent = wpm;
    document.getElementById('live-progress').textContent = progress + '%';
}

function checkCompletion() {
    if (state.currentIndex >= state.currentArticle.content.length) {
        finishSession();
    }
}

function finishSession() {
    state.isFinished = true;
    clearInterval(state.timerInterval);
    state.isActive = false;
    window.removeEventListener('keydown', handleInput);

    const elapsedSec = (Date.now() - state.startTime) / 1000;
    const wpm = calculateWPM(state.currentArticle.content.length, elapsedSec);

    // Calculate final accuracy
    const correctChars = document.querySelectorAll('.char.correct').length;
    const totalChars = state.currentArticle.content.length;
    const accuracy = Math.round((correctChars / totalChars) * 100);

    state.container.innerHTML = `
        <div class="results-screen">
            <h2>文章完成!</h2>
            <div class="result-grid">
                <div class="res-item">
                    <div class="label">WPM</div>
                    <div class="val">${wpm}</div>
                </div>
                <div class="res-item">
                    <div class="label">准确率</div>
                    <div class="val">${accuracy}%</div>
                </div>
            </div>
            <button id="menu-btn" class="primary-btn">返回列表</button>
        </div>
    `;

    document.getElementById('menu-btn').addEventListener('click', renderMenu);
}

function exitLevel() {
    clearInterval(state.timerInterval);
    state.isActive = false;
    window.removeEventListener('keydown', handleInput);
    renderMenu();
}
