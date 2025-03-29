import { COLORS, LEVELS, generateLevel, generateDailyChallenge, SCORING, calculateStars } from './levels.js';
import { ACHIEVEMENTS, AchievementManager } from './achievements.js';

class ReflexoTiles {
    constructor() {
        this.initializeGameState();
        this.setupEventListeners();
        this.achievementManager = new AchievementManager();
        this.achievementManager.loadProgress();
        this.setupAchievementCallbacks();
        this.loadGameProgress();
        this.startGame();
    }

    initializeGameState() {
        this.currentLevel = 1;
        this.moves = 0;
        this.gameStartTime = null;
        this.gameTimer = null;
        this.coins = parseInt(localStorage.getItem('coins')) || 100;
        this.powerUps = {
            hint: parseInt(localStorage.getItem('powerUp_hint')) || 3,
            undo: parseInt(localStorage.getItem('powerUp_undo')) || 3,
            freeze: parseInt(localStorage.getItem('powerUp_freeze')) || 1
        };
        this.moveHistory = [];
        this.freezeActive = false;
        this.stats = {
            levelsCompleted: 0,
            totalStars: 0,
            dailyStreak: parseInt(localStorage.getItem('dailyStreak')) || 0,
            lastDailyComplete: localStorage.getItem('lastDailyComplete'),
            powerUpsUsed: {},
            levelsWithoutPowerups: 0
        };
    }

    setupEventListeners() {
        // Grid click handlers
        document.getElementById('game-grid').addEventListener('click', (e) => {
            if (e.target.classList.contains('tile')) {
                this.handleTileClick(e.target);
            }
        });

        // Power-up buttons
        document.getElementById('hint-btn').addEventListener('click', () => this.useHint());
        document.getElementById('undo-btn').addEventListener('click', () => this.undoMove());
        document.getElementById('freeze-btn').addEventListener('click', () => this.toggleFreeze());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartLevel());

        // Shop buttons
        document.querySelectorAll('.shop-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleShopPurchase(btn.dataset.item));
        });

        // Daily challenge
        document.getElementById('play-daily').addEventListener('click', () => this.startDailyChallenge());

        // Next level button
        document.getElementById('next-level').addEventListener('click', () => this.loadNextLevel());

        // Share button
        document.getElementById('share-btn').addEventListener('click', () => this.shareResult());
    }

    setupAchievementCallbacks() {
        this.achievementManager.onAchievementUnlocked((achievement) => {
            this.showAchievementPopup(achievement);
            this.addReward(achievement.reward);
        });
    }

    startGame() {
        this.loadLevel(this.currentLevel);
        this.updateUI();
        this.startTimer();
    }

    loadLevel(levelId) {
        const level = LEVELS.find(l => l.id === levelId) || generateLevel(3 + Math.floor(levelId / 5), 1 + levelId / 10);
        this.currentLevel = levelId;
        this.moves = 0;
        this.moveHistory = [];
        this.freezeActive = false;
        this.gameStartTime = Date.now();
        
        this.createGrid(level.size, level.initialState);
        this.createTargetGrid(level.size, level.targetState);
        this.updateUI();

        if (level.tutorial) {
            this.showTutorial(level.tutorial);
        }
    }

    createGrid(size, state) {
        const grid = document.getElementById('game-grid');
        grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
        grid.innerHTML = '';

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const tile = document.createElement('div');
                tile.className = `tile ${state[y][x]}`;
                tile.dataset.x = x;
                tile.dataset.y = y;
                grid.appendChild(tile);
            }
        }
    }

    createTargetGrid(size, state) {
        const targetGrid = document.getElementById('target-grid');
        targetGrid.style.gridTemplateColumns = `repeat(${size}, 30px)`;
        targetGrid.innerHTML = '';

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const tile = document.createElement('div');
                tile.className = `tile ${state[y][x]}`;
                tile.style.width = '30px';
                tile.style.height = '30px';
                targetGrid.appendChild(tile);
            }
        }
    }

    handleTileClick(tile) {
        if (this.isLevelComplete()) return;

        const x = parseInt(tile.dataset.x);
        const y = parseInt(tile.dataset.y);
        
        // Save state for undo
        this.moveHistory.push(this.getCurrentState());

        // Change colors
        this.changeTileColor(tile);
        if (!this.freezeActive) {
            this.changeAdjacentTiles(x, y);
        }

        this.moves++;
        this.updateUI();

        if (this.isLevelComplete()) {
            this.handleLevelComplete();
        }
    }

    changeTileColor(tile) {
        const colors = Object.values(COLORS);
        const currentIndex = colors.indexOf(tile.className.split(' ')[1]);
        const nextIndex = (currentIndex + 1) % colors.length;
        tile.className = `tile ${colors[nextIndex]}`;
    }

    changeAdjacentTiles(x, y) {
        const adjacentPositions = [
            [x-1, y], [x+1, y],
            [x, y-1], [x, y+1]
        ];

        for (const [adjX, adjY] of adjacentPositions) {
            const tile = this.getTileAt(adjX, adjY);
            if (tile) {
                this.changeTileColor(tile);
            }
        }
    }

    getTileAt(x, y) {
        return document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
    }

    getCurrentState() {
        const size = Math.sqrt(document.getElementById('game-grid').children.length);
        const state = Array(size).fill().map(() => Array(size).fill());
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const tile = this.getTileAt(x, y);
                state[y][x] = tile.className.split(' ')[1];
            }
        }

        return state;
    }

    isLevelComplete() {
        const currentState = this.getCurrentState();
        const level = LEVELS.find(l => l.id === this.currentLevel) || 
                     generateLevel(3 + Math.floor(this.currentLevel / 5), 1 + this.currentLevel / 10);
        
        return JSON.stringify(currentState) === JSON.stringify(level.targetState);
    }

    handleLevelComplete() {
        const timeSpent = (Date.now() - this.gameStartTime) / 1000;
        const level = LEVELS.find(l => l.id === this.currentLevel) ||
                     generateLevel(3 + Math.floor(this.currentLevel / 5), 1 + this.currentLevel / 10);
        
        // Calculate score and stars
        const stars = calculateStars(this.moves, level.maxMoves, timeSpent, level.maxMoves * 5);
        const score = this.calculateScore(this.moves, timeSpent, level.maxMoves, stars);

        // Update stats
        this.stats.levelsCompleted++;
        this.stats.totalStars += stars;
        if (!this.moveHistory.some(move => move.powerUpUsed)) {
            this.stats.levelsWithoutPowerups++;
        }

        // Check achievements
        this.achievementManager.checkAchievements(this.stats, level, this.moves, timeSpent);

        // Show completion modal
        this.showLevelComplete(stars, score, timeSpent);

        // Save progress
        this.saveGameProgress();
    }

    calculateScore(moves, time, maxMoves, stars) {
        let score = SCORING.BASE_POINTS;
        score += (maxMoves - moves) * SCORING.MOVE_BONUS;
        score += Math.max(0, (maxMoves * 5 - time)) * SCORING.TIME_BONUS;
        if (stars === 3) score += SCORING.PERFECT_BONUS;
        return Math.max(0, score);
    }

    showLevelComplete(stars, score, time) {
        const modal = document.getElementById('level-complete');
        const starsElement = modal.querySelector('.stars');
        const movesElement = document.getElementById('final-moves');
        const timeElement = document.getElementById('final-time');
        const scoreElement = document.getElementById('final-score');
        const coinsElement = document.getElementById('coins-earned');

        starsElement.textContent = '★'.repeat(stars);
        movesElement.textContent = this.moves;
        timeElement.textContent = time.toFixed(1) + 's';
        scoreElement.textContent = score;
        
        const coinsEarned = Math.floor(score / 100);
        this.addCoins(coinsEarned);
        coinsElement.textContent = coinsEarned;

        modal.classList.add('show');
    }

    useHint() {
        if (this.powerUps.hint <= 0) return;
        
        this.powerUps.hint--;
        this.stats.powerUpsUsed.hint = true;
        
        // Simple hint: highlight a random tile that would help progress
        const tiles = Array.from(document.querySelectorAll('.tile'));
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        randomTile.style.animation = 'pulse 1s infinite';
        setTimeout(() => randomTile.style.animation = '', 3000);

        this.updateUI();
        this.saveGameProgress();
    }

    undoMove() {
        if (this.powerUps.undo <= 0 || this.moveHistory.length === 0) return;

        this.powerUps.undo--;
        this.stats.powerUpsUsed.undo = true;
        
        const previousState = this.moveHistory.pop();
        this.moves--;
        
        // Restore previous state
        const size = previousState.length;
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const tile = this.getTileAt(x, y);
                tile.className = `tile ${previousState[y][x]}`;
            }
        }

        this.updateUI();
        this.saveGameProgress();
    }

    toggleFreeze() {
        if (this.powerUps.freeze <= 0) return;

        this.powerUps.freeze--;
        this.stats.powerUpsUsed.freeze = true;
        this.freezeActive = true;

        // Visual feedback
        document.getElementById('game-grid').classList.add('freeze-active');
        setTimeout(() => {
            this.freezeActive = false;
            document.getElementById('game-grid').classList.remove('freeze-active');
        }, 10000);

        this.updateUI();
        this.saveGameProgress();
    }

    handleShopPurchase(item) {
        const prices = {
            'hint-pack-small': { cost: 99, reward: { hint: 10 } },
            'theme-pack': { cost: 199, reward: { theme: true } },
            'special-pack': { cost: 299, reward: { hint: 5, undo: 5, freeze: 5 } }
        };

        const purchase = prices[item];
        if (!purchase || this.coins < purchase.cost) return;

        this.coins -= purchase.cost;
        this.addReward(purchase.reward);
        this.updateUI();
        this.saveGameProgress();
    }

    addReward(reward) {
        if (reward.coins) {
            this.addCoins(reward.coins);
        }
        if (reward.powerUps) {
            for (const [type, amount] of Object.entries(reward.powerUps)) {
                this.powerUps[type] = (this.powerUps[type] || 0) + amount;
            }
        }
    }

    addCoins(amount) {
        this.coins += amount;
        this.updateUI();
        this.saveGameProgress();
    }

    startDailyChallenge() {
        const today = new Date().toDateString();
        if (this.stats.lastDailyComplete === today) return;

        const dailyLevel = generateDailyChallenge();
        this.loadLevel(dailyLevel.id);
        
        if (this.stats.lastDailyComplete === new Date(Date.now() - 86400000).toDateString()) {
            this.stats.dailyStreak++;
        } else {
            this.stats.dailyStreak = 1;
        }
        
        this.stats.lastDailyComplete = today;
        this.saveGameProgress();
    }

    showAchievementPopup(achievement) {
        const popup = document.getElementById('achievement-popup');
        const nameElement = document.getElementById('achievement-name');
        
        nameElement.textContent = achievement.title;
        popup.classList.add('show');
        
        setTimeout(() => popup.classList.remove('show'), 3000);
    }

    shareResult() {
        const text = `I just completed Level ${this.currentLevel} in ReflexoTiles with ${this.moves} moves! Can you beat my score?`;
        if (navigator.share) {
            navigator.share({
                title: 'ReflexoTiles',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(text);
            alert('Result copied to clipboard!');
        }
    }

    updateUI() {
        // Update level info
        document.getElementById('level').textContent = this.currentLevel;
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('max-moves').textContent = LEVELS[this.currentLevel - 1]?.maxMoves || '∞';
        
        // Update power-ups
        document.querySelector('#hint-btn .count').textContent = `(${this.powerUps.hint})`;
        document.querySelector('#undo-btn .count').textContent = `(${this.powerUps.undo})`;
        document.querySelector('#freeze-btn .count').textContent = `(${this.powerUps.freeze})`;
        
        // Update coins
        document.getElementById('coins').textContent = this.coins;
        
        // Update achievements
        document.getElementById('achievements').textContent = 
            `${this.achievementManager.getUnlockedCount()}/${this.achievementManager.getTotalAchievements()}`;
        
        // Update total stars
        document.getElementById('total-stars').textContent = this.stats.totalStars;
    }

    startTimer() {
        if (this.gameTimer) clearInterval(this.gameTimer);
        this.gameStartTime = Date.now();
        this.gameTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.gameStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('time').textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    stopTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    saveGameProgress() {
        localStorage.setItem('currentLevel', this.currentLevel);
        localStorage.setItem('coins', this.coins);
        localStorage.setItem('stats', JSON.stringify(this.stats));
        
        for (const [type, amount] of Object.entries(this.powerUps)) {
            localStorage.setItem(`powerUp_${type}`, amount);
        }
    }

    loadGameProgress() {
        const savedLevel = localStorage.getItem('currentLevel');
        if (savedLevel) {
            this.currentLevel = parseInt(savedLevel);
        }

        const savedStats = localStorage.getItem('stats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }

    restartLevel() {
        this.loadLevel(this.currentLevel);
    }

    loadNextLevel() {
        document.getElementById('level-complete').classList.remove('show');
        this.loadLevel(this.currentLevel + 1);
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new ReflexoTiles();
}); 