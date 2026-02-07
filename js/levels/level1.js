/**
 * Level 1: Key Mapping & Muscle Memory
 */
import { LEVEL1_LESSONS, KEY_DISPLAY_MAP } from '../data.js';
import { randomChoice, playSound } from '../utils.js';

let currentState = {
    activeLesson: null,
    queue: [],
    currentIndex: 0,
    targetKey: null,
    correctCount: 0,
    totalCount: 0,
    container: null
};

// UI Elements
let targetDisplayEl = null;
let instructionEl = null;

export function init(container) {
    currentState.container = container;
    renderMenu();
}

function renderMenu() {
    currentState.container.innerHTML = `
        <div class="level-menu">
            <h2>Level 1: 基础键位练习</h2>
            <div class="lesson-grid">
                ${LEVEL1_LESSONS.map(lesson => `
                    <button class="lesson-btn" data-id="${lesson.id}">
                        ${lesson.name}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Bind events
    currentState.container.querySelectorAll('.lesson-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lessonId = btn.dataset.id;
            const lesson = LEVEL1_LESSONS.find(l => l.id === lessonId);
            startLesson(lesson);
        });
    });
}

function startLesson(lesson) {
    // Generate Queue
    currentState.activeLesson = lesson;
    currentState.queue = [];
    currentState.currentIndex = 0;
    currentState.correctCount = 0;
    currentState.totalCount = 20; // Fixed session length for now

    for (let i = 0; i < currentState.totalCount; i++) {
        currentState.queue.push(randomChoice(lesson.keys));
    }

    // Setup Game UI
    currentState.container.innerHTML = `
        <div class="level1-stage">
            <div class="target-display-wrapper">
                <div id="target-display" class="target-char"></div>
            </div>
            <div id="instruction-text" class="instruction">按键以开始</div>
            <button id="exit-btn" class="secondary-btn">退出</button>
        </div>
    `;

    targetDisplayEl = document.getElementById('target-display');
    instructionEl = document.getElementById('instruction-text');

    document.getElementById('exit-btn').addEventListener('click', () => {
        cleanup();
        renderMenu();
    });

    // Start Listeners
    window.addEventListener('keydown', handleInput);

    // Show first char
    nextChar();
}

function nextChar() {
    if (currentState.currentIndex >= currentState.queue.length) {
        finishLesson();
        return;
    }

    const key = currentState.queue[currentState.currentIndex];
    currentState.targetKey = key;

    // Update UI
    const char = KEY_DISPLAY_MAP[key] || key.replace('Key', '');
    targetDisplayEl.textContent = char;
    targetDisplayEl.classList.remove('shake', 'correct-anim');

    // Update Keyboard Highlight
    highlightKey(key);
}

function handleInput(e) {
    if (!currentState.activeLesson) return;

    // Ignore modifiers
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;

    if (e.code === currentState.targetKey) {
        // Correct
        playSound('tick');
        targetDisplayEl.classList.add('correct-anim');
        currentState.correctCount++; // Logic check, usually simple progress
        currentState.currentIndex++;
        setTimeout(nextChar, 100); // Brief delay for visual
    } else {
        // Incorrect
        playSound('error');
        targetDisplayEl.classList.add('shake');
        setTimeout(() => targetDisplayEl.classList.remove('shake'), 400);
    }
}

function highlightKey(keyCode) {
    // Remove old highlights
    document.querySelectorAll('.key.hint').forEach(k => k.classList.remove('hint'));

    // Add new
    const keyEl = document.querySelector(`.key[data-code="${keyCode}"]`);
    if (keyEl) {
        keyEl.classList.add('hint');
    }
}

function finishLesson() {
    cleanup();
    currentState.container.innerHTML = `
        <div class="results-screen">
            <h2>练习完成!</h2>
            <p>Great Job!</p>
            <button id="back-btn" class="primary-btn">返回菜单</button>
        </div>
    `;
    document.getElementById('back-btn').addEventListener('click', renderMenu);
}

function cleanup() {
    window.removeEventListener('keydown', handleInput);
    currentState.activeLesson = null;
    // Clear hints
    document.querySelectorAll('.key.hint').forEach(k => k.classList.remove('hint'));
}
