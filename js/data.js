/**
 * Static Data Repository
 */

// Level 1 Lessons
export const LEVEL1_LESSONS = [
    { id: '1-1', name: 'Home Row (ASDF JKL;)', keys: ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon'] },
    { id: '1-2', name: 'Index Ext (G H)', keys: ['KeyF', 'KeyG', 'KeyH', 'KeyJ'] },
    { id: '1-3', name: 'Top Row Left (QWERT)', keys: ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT'] },
    { id: '1-4', name: 'Top Row Right (YUIOP)', keys: ['KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'] },
    { id: '1-5', name: 'Bottom Row (ZXCVBNM)', keys: ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'] },
    { id: '1-6', name: 'Full Alphabet', keys: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => 'Key' + c) }
];

// Key Code to Display Character Mapping
export const KEY_DISPLAY_MAP = {
    'KeyA': 'A', 'KeyB': 'B', 'KeyC': 'C', 'KeyD': 'D', 'KeyE': 'E',
    'KeyF': 'F', 'KeyG': 'G', 'KeyH': 'H', 'KeyI': 'I', 'KeyJ': 'J',
    'KeyK': 'K', 'KeyL': 'L', 'KeyM': 'M', 'KeyN': 'N', 'KeyO': 'O',
    'KeyP': 'P', 'KeyQ': 'Q', 'KeyR': 'R', 'KeyS': 'S', 'KeyT': 'T',
    'KeyU': 'U', 'KeyV': 'V', 'KeyW': 'W', 'KeyX': 'X', 'KeyY': 'Y',
    'KeyZ': 'Z',
    'Semicolon': ';', 'Quote': "'", 'Comma': ',', 'Period': '.', 'Slash': '/'
};

// Finger hints (Optional future use)
export const FINGER_MAP = {
    'KeyA': 'Pinky', 'KeyS': 'Ring', 'KeyD': 'Middle', 'KeyF': 'Index',
    'KeyJ': 'Index', 'KeyK': 'Middle', 'KeyL': 'Ring', 'Semicolon': 'Pinky'
    // ... complete later
};

// Level 3 Articles (VOA Slow English style)
export const LEVEL3_ARTICLES = [
    {
        id: '3-1',
        title: 'Technology: AI in Daily Life',
        content: `Artificial Intelligence, or AI, is changing how we live. Many people use AI every day without knowing it. When you search for something on the internet, AI helps find the results. It learns what you like and shows you more of it. Some phones use AI to recognize your face. This technology makes life easier and faster. However, some people worry about privacy. They think AI might know too much about us. As AI grows, we must learn to use it wisely.`
    },
    {
        id: '3-2',
        title: 'Nature: The Importance of Trees',
        content: `Trees are very important for our planet. They give us the oxygen we need to breathe. Trees also help clean the air by absorbing bad gases. Many animals live in trees. Birds build nests in branches, and squirrels find food there. Forests are like big homes for nature. When we cut down trees, we hurt the earth. Planting new trees is a good way to help. Everyone should try to protect our green friends.`
    },
    {
        id: '3-3',
        title: 'Culture: The Joy of Reading',
        content: `Reading books is a wonderful hobby. It lets you travel to different worlds without leaving your chair. You can learn about history, science, or new cultures. Reading also helps you understand other people better. When you read a story, you feel what the characters feel. This makes you more kind and thoughtful. In a busy world, reading gives you a quiet place to think and dream.`
    }
];
