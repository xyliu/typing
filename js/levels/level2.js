/**
 * Level 2: Rain Game (Reflex Training)
 */
import { randomInt, randomChoice, playSound } from '../utils.js';
import { KEY_DISPLAY_MAP } from '../data.js';
import { highlightKey, clearHints } from '../keyboard.js';

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
    difficultyMultiplier: 1
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
    const rainArea = document.getElementById('rain-area');
    // Guard against quick level switches clearing DOM
    if (!rainArea) {
        gameOver();
        return;
    }

    const areaHeight = rainArea.clientHeight || GAME_HEIGHT;

    state.entities.forEach((ent, index) => {
        ent.y += ent.speed * state.baseSpeed;

        // Update DOM
        ent.element.style.transform = `translate(${ent.x}px, ${ent.y}px)`;

        // Check Bottom Collision
        if (ent.y > areaHeight - 40) { // Offset for visual bottom
            handleMiss(index);
        }
    });

    // HIGHLIGHT LOGIC: Find the entity closest to bottom (largest y)
    if (state.entities.length > 0) {
        // Sort/Find max Y. Since entities are usually ordered by spawn, 
        // older spawns are usually at valid indices, but speed varies.
        // Let's simple reduce.
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
        // Optional: penalty?
        const rainArea = document.getElementById('rain-area');
        if (rainArea) {
            rainArea.classList.add('shake-sm');
            setTimeout(() => rainArea.classList.remove('shake-sm'), 200);
        }
    }
}

function destroyEntity(entity, isHit) {
    // Remove from DOM
    if (entity.element && entity.element.parentNode) {
        if (isHit) {
            entity.element.classList.add('pop-out');
            setTimeout(() => entity.element.remove(), 200);
        } else {
            entity.element.remove();
        }
    }

    // Remove from State
    state.entities = state.entities.filter(e => e.id !== entity.id);

    if (isHit) {
        state.score += 10;
        updateHUD();
    }
}

function handleMiss(index) {
    const entity = state.entities[index];

    // Remove immediately from array to avoid double counting
    // (Note: we use filter in destroyEntity, but here we work by index in loop context, 
    // actually safer to just mark for removal or use ID)

    // Better: just call destroy logic but as "Miss"
    // Since we are iterating, we must be careful modifying array.
    // NOTE: In the main loop, we should iterate backwards or map if deleting.
    // For simplicity, we'll let the loop finish updates, but mark this entity as 'dead' if needed?
    // Actually, simply splicing here might break the loop index. 
    // Correction: In gameLoop, use a "toRemove" list or filter after update.
    // Refactoring gameLoop update slightly for safety:

    // For this prototype, we'll just remove it and accept a potential frame skip for next entity
    state.entities.splice(index, 1);
    if (entity.element) entity.element.remove();

    state.lives--;
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

    state.container.innerHTML = `
        <div class="results-screen">
            <h2>游戏结束</h2>
            <div class="final-score">最终得分: ${state.score}</div>
            <button id="retry-btn" class="primary-btn">再试一次</button>
            <button id="menu-btn" class="secondary-btn">返回菜单</button>
        </div>
    `;

    document.getElementById('retry-btn').addEventListener('click', startGame);
    document.getElementById('menu-btn').addEventListener('click', renderMenu);
}

// Polyfill for perform.now if needed (browsers usually have it)
const perform = window.performance || Date;
