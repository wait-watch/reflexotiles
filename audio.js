class AudioManager {
    constructor() {
        this.sounds = {};
        this.isMuted = true; // Start muted since we don't have sound files yet
        
        // We'll load these sounds when they become available
        this.soundPaths = {
            tileClick: 'assets/sounds/tile-click.mp3',
            levelComplete: 'assets/sounds/level-complete.mp3',
            achievement: 'assets/sounds/achievement.mp3',
            powerUp: 'assets/sounds/power-up.mp3',
            buttonClick: 'assets/sounds/button-click.mp3',
            background: 'assets/sounds/background-music.mp3'
        };
    }

    play(soundName) {
        // Silently fail if sound is not available
        if (this.isMuted || !this.sounds[soundName]) return;
        
        const sound = this.sounds[soundName];
        sound.currentTime = 0;
        sound.play().catch(() => {}); // Ignore autoplay restrictions
    }

    startBackgroundMusic() {
        if (this.isMuted || !this.sounds.background) return;
        this.sounds.background.play().catch(() => {});
    }

    stopBackgroundMusic() {
        if (!this.sounds.background) return;
        this.sounds.background.pause();
        this.sounds.background.currentTime = 0;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('isMuted', this.isMuted);
        this.updateMuteState();

        if (this.isMuted) {
            this.stopBackgroundMusic();
        } else {
            this.startBackgroundMusic();
        }
    }

    updateMuteState() {
        Object.values(this.sounds).forEach(sound => {
            if (sound) sound.muted = this.isMuted;
        });
    }
}

const audioManager = new AudioManager();
export default audioManager; 