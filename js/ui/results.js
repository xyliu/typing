/**
 * Results UI Module
 * Handles displaying the result modal overlay.
 */
import { saveResult, getBestResult } from '../utils/storage.js';

export function showResultModal(levelId, wpm, accuracy, onRetry, onMenu) {
    // 1. Save Result & Check High Score
    const isNewRecord = saveResult(levelId, wpm, accuracy);
    const best = getBestResult(levelId);

    // 2. Create Overlay if not exists
    let overlay = document.getElementById('results-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'results-overlay';
        overlay.className = 'results-overlay';
        document.body.appendChild(overlay);
    }

    // 3. Render Content
    overlay.innerHTML = `
        <div class="results-modal">
            <h2>🎉 练习完成!</h2>
            
            <div class="result-grid-new">
                <div class="res-card">
                    <div class="label">WPM</div>
                    <div class="val">${wpm}</div>
                </div>
                <div class="res-card">
                    <div class="label">准确率</div>
                    <div class="val">${accuracy}%</div>
                </div>

                ${isNewRecord ? `<div class="new-record-badge">🏆 新纪录! (历史最佳)</div>` : ''}
                ${(!isNewRecord && best) ? `<div style="grid-column: span 2; color: var(--text-sub); font-size: 0.8rem; margin-top: -10px;">历史最佳: WPM ${best.wpm} / ACC ${best.accuracy}%</div>` : ''}
            </div>

            <div class="modal-actions">
                <button id="modal-retry-btn" class="modal-btn primary">再练一次</button>
                <button id="modal-menu-btn" class="modal-btn secondary">返回菜单</button>
            </div>
        </div>
    `;

    // 4. Bind Events
    document.getElementById('modal-retry-btn').onclick = () => {
        hideResultModal();
        if (onRetry) onRetry();
    };

    document.getElementById('modal-menu-btn').onclick = () => {
        hideResultModal();
        if (onMenu) onMenu();
    };

    // 5. Show with animation
    // Force reflow
    overlay.offsetHeight;
    overlay.classList.add('show');
}

export function hideResultModal() {
    const overlay = document.getElementById('results-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        // Wait for animation
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 300);
    }
}
