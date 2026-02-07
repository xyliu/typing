const perform = window.performance || Date;

/**
 * Level 2: Rain Game (Reflex Training)
 */
import { randomInt, randomChoice, playSound } from '../utils.js';
import { KEY_DISPLAY_MAP } from '../data.js';
import { highlightKey, clearHints } from '../keyboard.js';
import { calculateWPM, calculateAccuracy } from '../utils/stats.js';
import { showResultModal } from '../ui/results.js';

let state = {
    isActive: false,
    container: null,
    score: 0,
    lives: 5,
    entities: [], // { id, char, x, y, speed, element }
    lastSpawnTime: 0,
    spawnRate: 2000, // ms
    gameLoopId: null,
    baseSpeed: 1, // pixels per frame
    difficultyMultiplier: 1,
    // Stats
    startTime: 0,
    totalHits: 0,
    totalMisses: 0
};

// Config
const CHAR_SET = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
const GAME_HEIGHT = 500; // Virtual height for logic
const SPAWN_Y = -50;

export function init(container) {
    state.container = container;
    renderMenu();
}

function renderMenu() {
    state.container.innerHTML = `
        <div class="level-menu">
            <h2>Level 2: 雨滴字符游戏</h2>
            <p class="description">字符将从上方掉落，在它们触底之前按下对应的按键。</p>
            <div class="stats-preview">
                <div>初始生命值: 5</div>
                <div>难度: 随时间增加</div>
            </div>
            <button id="start-game-btn" class="primary-btn large">开始挑战</button>
        </div>
    `;

    document.getElementById('start-game-btn').addEventListener('click', startGame);
}

function startGame() {
    // Reset State
    state.isActive = true;
    state.score = 0;
    state.lives = 5;
    state.entities = [];
    state.spawnRate = 2000;
    state.baseSpeed = 1.6; // Increased start speed
    state.difficultyMultiplier = 1;
    state.lastSpawnTime = perform.now();

    // Stats
    state.startTime = Date.now();
    state.totalHits = 0;
    state.totalMisses = 0;

    // Setup UI
    state.container.innerHTML = `
        <div class="level2-stage">
            <div class="game-hud">
                <div class="hud-item">分数: <span id="score-val">0</span></div>
                <div class="hud-item">生命: <span id="lives-val">❤️❤️❤️❤️❤️</span></div>
            </div>
            <div id="rain-area" class="rain-area">
                <!-- Falling chars go here -->
            </div>
            <div id="game-overlay" class="game-overlay hidden"></div>
        </div>
    `;

    // Cache DOM & Dimens
    state.rainArea = document.getElementById('rain-area');
    state.gameHeight = state.rainArea.clientHeight || GAME_HEIGHT;

    // Handle resize to update height cache
    window.addEventListener('resize', handleResize);

    // Start Loop
    window.addEventListener('keydown', handleInput);
    state.gameLoopId = requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (!state.isActive) return;

    // 1. Spawning
    if (timestamp - state.lastSpawnTime > state.spawnRate) {
        spawnEntity();
        state.lastSpawnTime = timestamp;

        // Increase difficulty
        if (state.spawnRate > 600) state.spawnRate -= 30;
        state.baseSpeed += 0.005;
    }

    // 2. Update Entities
    const rainArea = state.rainArea; // Cached
    if (!rainArea) {
        // Redundant safety check, but if we lost the ref somehow
        gameOver();
        return;
    }

    // Cache height once per loop or rely on resize listener?
    // Using cached `state.gameHeight` is best for performance.
    const areaHeight = state.gameHeight;

    // Iterate backwards
    for (let i = state.entities.length - 1; i >= 0; i--) {
        let ent = state.entities[i];
        ent.y += ent.speed * state.baseSpeed;

        // Update DOM
        if (ent.element) {
            ent.element.style.transform = `translate(${ent.x}px, ${ent.y}px)`;
        }

        // Check Bottom Collision
        if (ent.y > areaHeight - 40) { // Offset for visual bottom
            handleMiss(i);
        }
    }

    // HIGHLIGHT LOGIC: Find the entity closest to bottom (largest y)
    if (state.entities.length > 0) {
        const target = state.entities.reduce((prev, current) => (prev.y > current.y) ? prev : current);
        highlightKey(target.key);
    } else {
        clearHints();
    }

    state.gameLoopId = requestAnimationFrame(gameLoop);
}

function spawnEntity() {
    const rainArea = document.getElementById('rain-area');
    if (!rainArea) return;

    const char = randomChoice(CHAR_SET);
    const width = rainArea.clientWidth;
    // Padding to avoid edges (50px each side)
    const x = randomInt(20, width - 60);

    const el = document.createElement('div');
    el.className = 'rain-char';
    el.textContent = char;
    // el.style.left = x + 'px'; // Using translate instead for performance

    // Random variations
    const speedVar = Math.random() * 0.5 + 0.8; // 0.8x to 1.3x speed

    const entity = {
        id: Date.now() + Math.random(),
        char: char,
        key: 'Key' + char.toUpperCase(), // Simple mapping for letters
        x: x,
        y: SPAWN_Y,
        speed: speedVar,
        element: el
    };

    // Number key adjustments
    if (!isNaN(parseInt(char))) {
        entity.key = 'Digit' + char;
    }

    rainArea.appendChild(el);
    state.entities.push(entity);
}

function handleInput(e) {
    if (!state.isActive) return;

    // Ignore modifiers
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;

    // Find matching entities
    const code = e.code;
    const matches = state.entities.filter(ent => ent.key === code);

    if (matches.length > 0) {
        // Hit the lowest one (highest Y)
        matches.sort((a, b) => b.y - a.y);
        const target = matches[0];

        destroyEntity(target, true);
        playSound('tick');
    } else {
        // Miss (Wrong key)
        playSound('error');
        state.totalMisses++; // Typing error is also a miss/error for accuracy

        // Optional: penalty?
        if (rainArea) {
            rainArea.classList.add('shake-sm');
            setTimeout(() => rainArea.classList.remove('shake-sm'), 200);
        }
    }
} // Closes handleInput

function destroyEntity(entity, isHit) {
    // Stop tracking in game loop (remove from State FIRST)
    // This prevents the loop from updating its transform while it's animating out
    state.entities = state.entities.filter(e => e.id !== entity.id);

    if (entity.element) {
        if (isHit) {
            // Fix: Convert visual position from translate to top/left
            // so animation's transform:scale doesn't conflict
            entity.element.style.left = entity.x + 'px';
            entity.element.style.top = entity.y + 'px';
            entity.element.style.transform = 'none';

            entity.element.classList.add('pop-out');
            setTimeout(() => entity.element.remove(), 200);

            // Update Score
            state.score += 10;
            state.totalHits++;
            updateHUD();
        } else {
            // Just remove immediately
            entity.element.remove();
        }
    }
}

function handleMiss(index) {
    const entity = state.entities[index];

    // Remove entity
    state.entities.splice(index, 1);
    if (entity.element) entity.element.remove();

    state.lives--;
    state.totalMisses++; // Dropped char is a miss
    updateHUD();
    playSound('error');

    if (state.lives <= 0) {
        gameOver();
    }
}

function updateHUD() {
    const scoreEl = document.getElementById('score-val');
    const livesEl = document.getElementById('lives-val');
    if (scoreEl) scoreEl.textContent = state.score;
    if (livesEl) livesEl.textContent = '❤️'.repeat(Math.max(0, state.lives));
}

function gameOver() {
    state.isActive = false;
    cancelAnimationFrame(state.gameLoopId);
    window.removeEventListener('keydown', handleInput);
    window.removeEventListener('resize', handleResize); // clean up resize

    const elapsedSec = (Date.now() - state.startTime) / 1000;
    const wpm = calculateWPM(state.totalHits, elapsedSec);
    const accuracy = calculateAccuracy(state.totalMisses, state.totalHits + state.totalMisses);

    showResultModal(
        2,
        wpm,
        accuracy,
        startGame, // Retry
        renderMenu // Menu
    );
}

function handleResize() {
    if (state.rainArea) {
        state.gameHeight = state.rainArea.clientHeight;
    }
}
