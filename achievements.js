const ACHIEVEMENTS = {
    // Progression Achievements
    BEGINNER: {
        id: 'beginner',
        title: 'First Steps',
        description: 'Complete the tutorial levels',
        condition: (stats) => stats.levelsCompleted >= 5,
        reward: { coins: 100 }
    },
    INTERMEDIATE: {
        id: 'intermediate',
        title: 'Getting Better',
        description: 'Complete 20 levels',
        condition: (stats) => stats.levelsCompleted >= 20,
        reward: { coins: 250 }
    },
    EXPERT: {
        id: 'expert',
        title: 'Puzzle Master',
        description: 'Complete 50 levels',
        condition: (stats) => stats.levelsCompleted >= 50,
        reward: { coins: 500 }
    },

    // Performance Achievements
    PERFECT_SOLVER: {
        id: 'perfect_solver',
        title: 'Perfect Solver',
        description: 'Complete a level with minimum possible moves',
        condition: (stats, level, moves) => moves <= level.maxMoves * 0.5,
        reward: { coins: 150 }
    },
    SPEED_DEMON: {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Complete a level in under 10 seconds',
        condition: (stats, level, moves, time) => time < 10,
        reward: { coins: 200 }
    },
    STAR_COLLECTOR: {
        id: 'star_collector',
        title: 'Star Collector',
        description: 'Earn 50 stars total',
        condition: (stats) => stats.totalStars >= 50,
        reward: { coins: 300 }
    },

    // Special Achievements
    DAILY_STREAK: {
        id: 'daily_streak',
        title: 'Daily Player',
        description: 'Complete daily challenges 7 days in a row',
        condition: (stats) => stats.dailyStreak >= 7,
        reward: { coins: 500, powerUps: { hint: 3, freeze: 2 } }
    },
    POWERUP_MASTER: {
        id: 'powerup_master',
        title: 'Power-Up Master',
        description: 'Use each type of power-up at least once',
        condition: (stats) => stats.powerUpsUsed?.hint && stats.powerUpsUsed?.freeze && stats.powerUpsUsed?.undo,
        reward: { coins: 200, powerUps: { hint: 2, freeze: 2, undo: 2 } }
    },
    NO_POWERUP_WIN: {
        id: 'no_powerup_win',
        title: 'Pure Skill',
        description: 'Complete 10 levels without using any power-ups',
        condition: (stats) => stats.levelsWithoutPowerups >= 10,
        reward: { coins: 400 }
    }
};

class AchievementManager {
    constructor() {
        this.unlockedAchievements = new Set();
        this.callbacks = new Set();
    }

    // Add a callback for when achievements are unlocked
    onAchievementUnlocked(callback) {
        this.callbacks.add(callback);
    }

    // Check if an achievement is unlocked
    isUnlocked(achievementId) {
        return this.unlockedAchievements.has(achievementId);
    }

    // Check achievements after each level
    checkAchievements(stats, level = null, moves = null, time = null) {
        for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
            if (!this.isUnlocked(id) && achievement.condition(stats, level, moves, time)) {
                this.unlockAchievement(id);
            }
        }
    }

    // Unlock an achievement and trigger callbacks
    unlockAchievement(achievementId) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement || this.isUnlocked(achievementId)) return;

        this.unlockedAchievements.add(achievementId);
        
        // Save to local storage
        this.saveProgress();

        // Trigger callbacks
        this.callbacks.forEach(callback => callback(achievement));

        return achievement.reward;
    }

    // Save progress to local storage
    saveProgress() {
        localStorage.setItem('achievements', JSON.stringify(Array.from(this.unlockedAchievements)));
    }

    // Load progress from local storage
    loadProgress() {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            this.unlockedAchievements = new Set(JSON.parse(saved));
        }
    }

    // Get all achievements with their unlock status
    getAllAchievements() {
        return Object.entries(ACHIEVEMENTS).map(([id, achievement]) => ({
            ...achievement,
            unlocked: this.isUnlocked(id)
        }));
    }

    // Get total number of achievements
    getTotalAchievements() {
        return Object.keys(ACHIEVEMENTS).length;
    }

    // Get number of unlocked achievements
    getUnlockedCount() {
        return this.unlockedAchievements.size;
    }
}

// Export everything needed by the game
export {
    ACHIEVEMENTS,
    AchievementManager
}; 