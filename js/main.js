/**
 * TypeFlow - Main Application Entry
 */
import { initKeyboard } from './keyboard.js';
import { setSoundEnabled, initAudioContext } from './utils.js';
import * as Level1 from './levels/level1.js';
import * as Level2 from './levels/level2.js';
import * as Level3 from './levels/level3.js';

// Global State
const State = {
    currentLevel: null,
    isGameActive: false,
    settings: {
        soundEnabled: true
    },
    stats: {
        wpm: 0,
        accuracy: 100
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('TypeFlow Initializing...');

    // 1. Initialize Virtual Keyboard
    initKeyboard(document.getElementById('virtual-keyboard'));

    // 2. Setup Navigation
    setupNavigation();

    // 3. Setup Sound Toggle
    setupSoundToggle();

    // 4. iOS Audio Unlocker
    const unlockHandler = () => {
        initAudioContext();
        // Remove listeners after first successful interaction
        document.removeEventListener('click', unlockHandler);
        document.removeEventListener('touchstart', unlockHandler);
        document.removeEventListener('keydown', unlockHandler);
    };
    document.addEventListener('click', unlockHandler);
    document.addEventListener('touchstart', unlockHandler);
    document.addEventListener('keydown', unlockHandler);
});

function setupSoundToggle() {
    const btn = document.getElementById('sound-toggle');

    // update initial UI
    updateSoundBtnUI(btn);

    btn.addEventListener('click', () => {
        State.settings.soundEnabled = !State.settings.soundEnabled;
        setSoundEnabled(State.settings.soundEnabled);
        updateSoundBtnUI(btn);
    });
}

function updateSoundBtnUI(btn) {
    if (State.settings.soundEnabled) {
        btn.textContent = '🔊';
        btn.classList.remove('muted');
        btn.title = "Mute Sound";
    } else {
        btn.textContent = '🔇';
        btn.classList.add('muted');
        btn.title = "Enable Sound";
    }
}

function setupNavigation() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // UI Update
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Logic Update
            const level = parseInt(e.target.dataset.level);
            switchLevel(level);
        });
    });
}

function switchLevel(levelIndex) {
    console.log(`Switching to Level ${levelIndex}`);
    State.currentLevel = levelIndex;

    // Clear Stage
    const stage = document.getElementById('game-container');
    stage.innerHTML = '';

    // Load Level Logic
    if (levelIndex === 1) Level1.init(stage);
    else if (levelIndex === 2) Level2.init(stage);
    else if (levelIndex === 3) Level3.init(stage);
}
