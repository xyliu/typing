/**
 * TypeFlow - Main Application Entry
 */
import { initKeyboard } from './keyboard.js';
import * as Level1 from './levels/level1.js';
import * as Level2 from './levels/level2.js';
import * as Level3 from './levels/level3.js';

// Global State
const State = {
    currentLevel: null,
    isGameActive: false,
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
});

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
