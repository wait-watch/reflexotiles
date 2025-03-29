# ReflexoTiles

A challenging puzzle game where you match tile patterns through strategic moves. Test your problem-solving skills across various difficulty levels while collecting achievements and competing with others!

## Features

- **Core Gameplay**
  - Match tile patterns by tapping tiles
  - Adjacent tiles change colors in reaction to your moves
  - Progressive difficulty from 3x3 to 8x8 grids
  - Star rating system based on moves and time

- **Level System**
  - Tutorial levels (1-5)
  - Beginner levels (6-20)
  - Intermediate levels (21-50)
  - Advanced levels (51-100)
  - Daily challenges

- **Power-ups**
  - Hint system
  - Undo move
  - Freeze reflex
  - Purchasable with in-game currency

- **Progression**
  - Achievement system
  - Star collection
  - Daily challenges
  - Leaderboards

- **Social Features**
  - Share scores
  - Compete on leaderboards
  - Daily challenge rankings

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/reflexotiles.git
cd reflexotiles
```

2. Set up a local server (e.g., using Python):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

3. Open your browser and navigate to:
```
http://localhost:5000
```

## Game Controls

- **Tap/Click**: Change tile color
- **Power-ups**:
  - 💡 Hint: Shows the next best move
  - ↩️ Undo: Reverts last move
  - ❄️ Freeze: Prevents adjacent tiles from changing

## Development

### File Structure
```
reflexotiles/
├── index.html          # Main game interface
├── styles.css          # Game styling
├── game.js            # Core game logic
├── levels.js          # Level definitions
├── achievements.js    # Achievement system
├── audio.js          # Sound management
├── manifest.json      # PWA manifest
├── sw.js             # Service Worker
├── README.md         # Documentation
└── assets/
    ├── icons/        # Game icons
    └── sounds/       # Game audio
```

### Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- PWA for offline support
- Local Storage for game progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- SeedRandom.js for deterministic random number generation
- All contributors and players! 