/**
 * Level 1: Key Mapping & Muscle Memory
 */
import { LEVEL1_LESSONS, KEY_DISPLAY_MAP } from '../data.js';
import { randomChoice, playSound } from '../utils.js';
import { highlightKey, clearHints } from '../keyboard.js';
import { calculateWPM, calculateAccuracy } from '../utils/stats.js';
import { showResultModal } from '../ui/results.js';

let currentState = {
    activeLesson: null,
    queue: [],
    currentIndex: 0,
    targetKey: null,
    // Stats
    startTime: null,
    totalTyped: 0,
    errors: 0,
    container: null
};

// UI Elements
let targetDisplayEl = null;

export function init(container) {
    currentState.container = container;
    renderMenu();
}

function renderMenu() {
    // Force cleanup of any overlays
    const overlays = document.querySelectorAll('.results-overlay, .game-overlay');
    overlays.forEach(el => el.remove());

    // Temporarily hide keyboard to rule it out as a blocker
    // const keyboard = document.querySelector('.keyboard-wrapper');
    // if (keyboard) keyboard.style.display = 'none';

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
            if (lesson) {
                startLesson(lesson);
            }
        });
    });
}

function startLesson(lesson) {
    // Generate Queue
    currentState.activeLesson = lesson;
    currentState.queue = [];
    currentState.currentIndex = 0;

    // Stats Reset
    currentState.startTime = null;
    currentState.totalTyped = 0;
    currentState.errors = 0;

    // Restore keyboard
    const keyboard = document.querySelector('.keyboard-wrapper');
    if (keyboard) keyboard.style.display = 'block';

    // Quote generation (20 chars)
    for (let i = 0; i < 20; i++) {
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

    document.getElementById('exit-btn').addEventListener('click', () => {
        cleanup();
        renderMenu();
    });

    // Start Listeners
    window.addEventListener('keydown', handleInput);

    // Show first char
    updateCharDisplay();
}

function updateCharDisplay() {
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
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        e.preventDefault();
        return;
    }

    // Start Timer
    if (!currentState.startTime) {
        currentState.startTime = Date.now();
        document.getElementById('instruction-text').style.opacity = '0';
    }

    if (e.code === currentState.targetKey) {
        // Correct
        playSound('tick');
        targetDisplayEl.classList.add('correct-anim');

        currentState.totalTyped++;
        currentState.currentIndex++;

        // Pre-fetch next target key to avoid race condition
        if (currentState.currentIndex < currentState.queue.length) {
            currentState.targetKey = currentState.queue[currentState.currentIndex];
        }

        // Brief delay for visual feedback
        setTimeout(updateCharDisplay, 100);
    } else {
        // Incorrect
        playSound('error');
        targetDisplayEl.classList.add('shake');
        currentState.errors++;
        currentState.totalTyped++;
        setTimeout(() => targetDisplayEl.classList.remove('shake'), 400);
    }
}

// function finishLesson() {
//     cleanup();
//     alert('Finished! Stats temporarily disabled for debugging.');
//     renderMenu();
// }

function finishLesson() {
    // Capture lesson before cleanup wipes it
    const lessonToRetry = currentState.activeLesson;

    cleanup();

    const elapsedSec = (Date.now() - currentState.startTime) / 1000;
    const wpm = calculateWPM(currentState.totalTyped, elapsedSec);
    const accuracy = calculateAccuracy(currentState.errors, currentState.totalTyped);

    showResultModal(
        1, // Level ID
        wpm,
        accuracy,
        () => startLesson(lessonToRetry), // Retry
        () => renderMenu() // Menu
    );
}

function cleanup() {
    const keyboard = document.querySelector('.keyboard-wrapper');
    if (keyboard) keyboard.style.display = 'block';

    window.removeEventListener('keydown', handleInput);
    currentState.activeLesson = null;
    clearHints();
}


