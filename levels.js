const COLORS = {
    BLUE: 'blue',
    RED: 'red',
    GREEN: 'green',
    YELLOW: 'yellow'
};

const LEVELS = [
    // Tutorial Levels (1-5)
    {
        id: 1,
        size: 3,
        maxMoves: 3,
        initialState: [
            [COLORS.BLUE, COLORS.BLUE, COLORS.RED],
            [COLORS.BLUE, COLORS.RED, COLORS.BLUE],
            [COLORS.RED, COLORS.BLUE, COLORS.BLUE]
        ],
        targetState: [
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE],
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE],
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE]
        ],
        tutorial: {
            message: "Tap any tile to change its color and affect adjacent tiles!",
            highlightTile: { x: 1, y: 1 }
        }
    },
    {
        id: 2,
        size: 3,
        maxMoves: 4,
        initialState: [
            [COLORS.RED, COLORS.BLUE, COLORS.RED],
            [COLORS.BLUE, COLORS.GREEN, COLORS.BLUE],
            [COLORS.RED, COLORS.BLUE, COLORS.RED]
        ],
        targetState: [
            [COLORS.GREEN, COLORS.GREEN, COLORS.GREEN],
            [COLORS.GREEN, COLORS.GREEN, COLORS.GREEN],
            [COLORS.GREEN, COLORS.GREEN, COLORS.GREEN]
        ],
        tutorial: {
            message: "Watch how the adjacent tiles change when you tap!",
            highlightTile: { x: 1, y: 1 }
        }
    },
    {
        id: 3,
        size: 3,
        maxMoves: 4,
        initialState: [
            [COLORS.YELLOW, COLORS.RED, COLORS.YELLOW],
            [COLORS.RED, COLORS.BLUE, COLORS.RED],
            [COLORS.YELLOW, COLORS.RED, COLORS.YELLOW]
        ],
        targetState: [
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE]
        ],
        tutorial: {
            message: "Create patterns by planning your moves carefully!",
            highlightTile: { x: 0, y: 0 }
        }
    },
    {
        id: 4,
        size: 3,
        maxMoves: 5,
        initialState: [
            [COLORS.GREEN, COLORS.YELLOW, COLORS.GREEN],
            [COLORS.YELLOW, COLORS.RED, COLORS.YELLOW],
            [COLORS.GREEN, COLORS.YELLOW, COLORS.GREEN]
        ],
        targetState: [
            [COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW]
        ],
        tutorial: {
            message: "Try to complete the level with fewer moves for more stars!",
            highlightTile: { x: 1, y: 1 }
        }
    },
    {
        id: 5,
        size: 3,
        maxMoves: 6,
        initialState: [
            [COLORS.RED, COLORS.GREEN, COLORS.BLUE],
            [COLORS.GREEN, COLORS.YELLOW, COLORS.RED],
            [COLORS.BLUE, COLORS.RED, COLORS.GREEN]
        ],
        targetState: [
            [COLORS.RED, COLORS.RED, COLORS.RED],
            [COLORS.RED, COLORS.GREEN, COLORS.RED],
            [COLORS.RED, COLORS.RED, COLORS.RED]
        ],
        tutorial: {
            message: "Final tutorial level! Use everything you've learned!",
            highlightTile: { x: 1, y: 1 }
        }
    },

    // Beginner Levels (6-20) - Introducing 4x4 grids
    {
        id: 6,
        size: 4,
        maxMoves: 6,
        initialState: [
            [COLORS.BLUE, COLORS.RED, COLORS.BLUE, COLORS.RED],
            [COLORS.RED, COLORS.BLUE, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.BLUE, COLORS.RED],
            [COLORS.RED, COLORS.BLUE, COLORS.RED, COLORS.BLUE]
        ],
        targetState: [
            [COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED],
            [COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED],
            [COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED],
            [COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED]
        ]
    },
    {
        id: 7,
        size: 4,
        maxMoves: 7,
        initialState: [
            [COLORS.GREEN, COLORS.BLUE, COLORS.BLUE, COLORS.GREEN],
            [COLORS.BLUE, COLORS.RED, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.RED, COLORS.BLUE],
            [COLORS.GREEN, COLORS.BLUE, COLORS.BLUE, COLORS.GREEN]
        ],
        targetState: [
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE],
            [COLORS.BLUE, COLORS.GREEN, COLORS.GREEN, COLORS.BLUE],
            [COLORS.BLUE, COLORS.GREEN, COLORS.GREEN, COLORS.BLUE],
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE]
        ]
    },

    // Intermediate Levels (21-50) - 5x5 and 6x6 grids
    {
        id: 21,
        size: 5,
        maxMoves: 8,
        initialState: [
            [COLORS.BLUE, COLORS.RED, COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE],
            [COLORS.RED, COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE, COLORS.RED],
            [COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE, COLORS.RED, COLORS.GREEN],
            [COLORS.YELLOW, COLORS.BLUE, COLORS.RED, COLORS.GREEN, COLORS.YELLOW],
            [COLORS.BLUE, COLORS.RED, COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE]
        ],
        targetState: [
            [COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.BLUE, COLORS.RED, COLORS.BLUE, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.YELLOW],
            [COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW, COLORS.YELLOW]
        ]
    },
    {
        id: 22,
        size: 5,
        maxMoves: 9,
        initialState: [
            [COLORS.RED, COLORS.BLUE, COLORS.RED, COLORS.BLUE, COLORS.RED],
            [COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE],
            [COLORS.RED, COLORS.GREEN, COLORS.BLUE, COLORS.GREEN, COLORS.RED],
            [COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE],
            [COLORS.RED, COLORS.BLUE, COLORS.RED, COLORS.BLUE, COLORS.RED]
        ],
        targetState: [
            [COLORS.GREEN, COLORS.GREEN, COLORS.GREEN, COLORS.GREEN, COLORS.GREEN],
            [COLORS.GREEN, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.GREEN],
            [COLORS.GREEN, COLORS.RED, COLORS.YELLOW, COLORS.RED, COLORS.GREEN],
            [COLORS.GREEN, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.GREEN],
            [COLORS.GREEN, COLORS.GREEN, COLORS.GREEN, COLORS.GREEN, COLORS.GREEN]
        ]
    },

    // Advanced Levels (51-100) - 7x7 and 8x8 grids with complex patterns
    {
        id: 51,
        size: 7,
        maxMoves: 12,
        initialState: [
            [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.GREEN, COLORS.BLUE, COLORS.RED],
            [COLORS.BLUE, COLORS.YELLOW, COLORS.RED, COLORS.BLUE, COLORS.RED, COLORS.YELLOW, COLORS.BLUE],
            [COLORS.GREEN, COLORS.RED, COLORS.YELLOW, COLORS.GREEN, COLORS.YELLOW, COLORS.RED, COLORS.GREEN],
            [COLORS.YELLOW, COLORS.BLUE, COLORS.GREEN, COLORS.RED, COLORS.GREEN, COLORS.BLUE, COLORS.YELLOW],
            [COLORS.GREEN, COLORS.RED, COLORS.YELLOW, COLORS.GREEN, COLORS.YELLOW, COLORS.RED, COLORS.GREEN],
            [COLORS.BLUE, COLORS.YELLOW, COLORS.RED, COLORS.BLUE, COLORS.RED, COLORS.YELLOW, COLORS.BLUE],
            [COLORS.RED, COLORS.BLUE, COLORS.GREEN, COLORS.YELLOW, COLORS.GREEN, COLORS.BLUE, COLORS.RED]
        ],
        targetState: [
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.GREEN, COLORS.GREEN, COLORS.GREEN, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.GREEN, COLORS.YELLOW, COLORS.GREEN, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.GREEN, COLORS.GREEN, COLORS.GREEN, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED, COLORS.BLUE],
            [COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE, COLORS.BLUE]
        ]
    }
];

// Level generation functions for procedural levels
function generateLevel(size, difficulty) {
    const colors = Object.values(COLORS);
    
    // Start with a solved state and apply random valid moves backwards
    const targetState = Array(size).fill().map(() => 
        Array(size).fill(colors[Math.floor(Math.random() * colors.length)])
    );
    
    // Make a copy for the initial state
    const initialState = JSON.parse(JSON.stringify(targetState));
    
    // Apply random valid moves backwards to create the initial state
    const numMoves = Math.floor(size * difficulty * 1.2);
    for (let i = 0; i < numMoves; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        
        // Apply reverse move
        applyReverseMove(initialState, x, y);
    }

    return {
        id: LEVELS.length + 1,
        size,
        maxMoves: numMoves + Math.floor(difficulty),
        initialState,
        targetState
    };
}

function applyReverseMove(state, x, y) {
    const colors = Object.values(COLORS);
    const size = state.length;
    
    // Get current color and previous color in sequence
    const currentColor = state[y][x];
    const currentIndex = colors.indexOf(currentColor);
    const prevIndex = (currentIndex - 1 + colors.length) % colors.length;
    
    // Apply reverse color change to center tile
    state[y][x] = colors[prevIndex];
    
    // Apply reverse color change to adjacent tiles
    const adjacentPositions = [
        [x-1, y], [x+1, y],
        [x, y-1], [x, y+1]
    ];
    
    for (const [adjX, adjY] of adjacentPositions) {
        if (adjX >= 0 && adjX < size && adjY >= 0 && adjY < size) {
            const adjColor = state[adjY][adjX];
            const adjIndex = colors.indexOf(adjColor);
            const adjPrevIndex = (adjIndex - 1 + colors.length) % colors.length;
            state[adjY][adjX] = colors[adjPrevIndex];
        }
    }
}

// Daily challenge generator
function generateDailyChallenge() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    Math.seedrandom(seed);

    const size = 5 + Math.floor(Math.random() * 2); // 5x5 or 6x6
    return generateLevel(size, 1.2); // Slightly harder than regular levels
}

// Scoring system
const SCORING = {
    BASE_POINTS: 1000,
    MOVE_BONUS: 100,
    TIME_BONUS: 50,
    PERFECT_BONUS: 500
};

// Star rating thresholds
function calculateStars(moves, maxMoves, timeSeconds, parTimeSeconds) {
    if (moves <= maxMoves * 0.6 && timeSeconds <= parTimeSeconds * 0.8) return 3;
    if (moves <= maxMoves * 0.8 && timeSeconds <= parTimeSeconds * 1.2) return 2;
    return 1;
}

// Export everything needed by the game
export {
    COLORS,
    LEVELS,
    generateLevel,
    generateDailyChallenge,
    SCORING,
    calculateStars
}; 