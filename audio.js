class AudioManager {
    constructor() {
        this.sounds = {
            tileClick: new Audio('sounds/tile-click.mp3'),
            levelComplete: new Audio('sounds/level-complete.mp3'),
            achievement: new Audio('sounds/achievement.mp3'),
            powerUp: new Audio('sounds/power-up.mp3'),
            buttonClick: new Audio('sounds/button-click.mp3'),
            background: new Audio('sounds/background-music.mp3')
        };

        // Configure background music
        this.sounds.background.loop = true;
        this.sounds.background.volume = 0.3;

        this.isMuted = localStorage.getItem('isMuted') === 'true';
        this.updateMuteState();
    }

    play(soundName) {
        if (this.isMuted) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // Ignore autoplay restrictions
        }
    }

    startBackgroundMusic() {
        if (this.isMuted) return;
        this.sounds.background.play().catch(() => {});
    }

    stopBackgroundMusic() {
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
            sound.muted = this.isMuted;
        });
    }
}

const audioManager = new AudioManager();
export default audioManager; 