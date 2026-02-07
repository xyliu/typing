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
    },
    {
        id: '3-4',
        title: 'Space: The Mystery of Mars',
        content: `Mars is often called the Red Planet because of its color. Scientists are very interested in Mars. They wonder if life ever existed there. Robots called rovers drive on Mars to study the rocks. They send pictures back to Earth. Maybe one day, humans will visit Mars. It would be a long and difficult journey. But exploring space helps us dream big and learn more about our universe.`
    },
    {
        id: '3-5',
        title: 'Friendship: Being a Good Friend',
        content: `A good friend is someone who listens and cares. They enhance the good times and make the hard times easier. To have a good friend, you must be one first. Always be kind and honest. Share your toys and your time. If your friend is sad, try to cheer them up. Friendship is a special gift that makes life happier. Cherish your friends and treat them well.`
    },
    {
        id: '3-6',
        title: 'Sports: The Spirit of Teamwork',
        content: `Playing sports is great for your body and your mind. In team sports like soccer or basketball, you learn to work together. No single player can win a game alone. You must pass the ball and trust your teammates. Winning is fun, but playing fair is more important. Sports teach us how to handle winning with grace and losing with dignity. It builds character and strength.`
    },
    {
        id: '3-7',
        title: 'Nature: The Deep Blue Ocean',
        content: `The ocean covers most of our planet. It is home to many amazing creatures, from tiny fish to giant whales. The ocean gives us food and helps control the weather. But the ocean needs our help. Plastic and trash can hurt marine life. We should keep the beaches clean and use less plastic. Protecting the ocean means protecting our future. Let us keep the blue waters clean and safe.`
    },
    {
        id: '3-8',
        title: 'History: The Great Wall',
        content: `The Great Wall of China is one of the most famous structures in the world. It was built long ago to protect the country. The wall is very long and winds over mountains and valleys. Many people worked hard to build it. Today, people from all over the world visit the Great Wall. It reminds us of the history and strength of the past. It is a symbol of perseverance.`
    },
    {
        id: '3-9',
        title: 'Science: The Power of the Sun',
        content: `The sun is a star at the center of our solar system. It gives us light and heat. Without the sun, there would be no life on Earth. Plants use sunlight to grow and make food. We can also use the sun to make electricity. Solar panels turn sunlight into power for our homes. Using solar energy is clean and good for the planet. The sun is a powerful friend to us all.`
    },
    {
        id: '3-10',
        title: 'Hobbies: Painting Your Dreams',
        content: `Painting is a way to show your feelings without words. You can use many colors to create a beautiful picture. There is no right or wrong way to paint. You can draw a tree, a face, or something from your imagination. Art helps you relax and express yourself. When you finish a painting, you feel proud. It is a piece of you that you can share with the world.`
    },
    {
        id: '3-11',
        title: 'Animals: The Loyal Dog',
        content: `Dogs are known as man's best friend. They are loyal and loving. A dog is always happy to see you when you come home. They love to play and go for walks. Taking care of a dog teaches responsibility. You must feed them and keep them safe. In return, a dog gives you endless love. Having a pet brings joy and comfort to a family.`
    },
    {
        id: '3-12',
        title: 'Music: The Universal Language',
        content: `Music is something everyone can enjoy. It can make you feel happy, sad, or excited. People all over the world listen to music. You might like pop, rock, or classical music. Learning to play an instrument is a great skill. It takes practice, but the result is beautiful. Music brings people together and helps us express emotions. It is a special language that needs no words.`
    },
    {
        id: '3-13',
        title: 'Future: Dreaming Big',
        content: `The future is full of possibilities. You can constitute anything you want to be. Maybe you want to be a doctor, a teacher, or an artist. Setting goals helps you reach your dreams. Work hard in school and always keep learning. Do not be afraid to make mistakes. Mistakes help you learn and grow. Believe in yourself and your ability to change the world. Your future is bright.`
    },
    {
        id: '3-14',
        title: 'Health: Eating a Rainbow',
        content: `Eating healthy food gives you energy. Try to eat fruits and vegetables of different colors. Red apples, orange carrots, and green spinach are all good for you. This is called eating a rainbow. Drinking water is also very important. Your body needs water to work well. Avoiding too much sugar keeps your teeth strong. A healthy body helps you think clearly and play longer. Take care of your health every day.`
    },
    {
        id: '3-15',
        title: 'Culture: Festivals Around the World',
        content: `Every country has its own special festivals. In China, there is the Spring Festival with fireworks and dumplings. In America, Thanksgiving is a time to say thank you. Festivals are times for family and friends to gather. People wear special clothes and eat delicious food. Celebrating festivals helps us keep traditions alive. It is fun to learn about how other people celebrate. It shows how rich our world is.`
    },
    {
        id: '3-16',
        title: 'Kindness: A Simple Smile',
        content: `A smile is a small thing, but it has great power. When you smile at someone, it makes them feel good. It shows that you are friendly and kind. Helping someone in need is also an act of kindness. You can hold a door open or help carry a heavy bag. Kindness spreads like ripples in a pond. One good deed can lead to another. Let us choose to be kind every day.`
    },
    {
        id: '3-17',
        title: 'Science: The Amazing Brain',
        content: `Your brain is like a super computer. It controls everything you do. It helps you think, move, and feel. The brain never stops working, even when you sleep. Learning new things makes your brain stronger. Reading, solving puzzles, and playing games are good exercise for your brain. Protect your head when you ride a bike. Your brain is a precious treasure that helps you explore the world.`
    },
    {
        id: '3-18',
        title: 'Nature: The Busy Bees',
        content: `Bees are small insects, but they do a big job. They fly from flower to flower collecting nectar. As they move, they help plants grow. This process is called pollination. Without bees, we would not have many fruits and vegetables. Bees also make sweet honey. They work together in a hive. We should respect bees and not hurt them. They are nature's little helpers.`
    },
    {
        id: '3-19',
        title: 'Hobbies: The Magic of coding',
        content: `Coding is like writing instructions for a computer. It is a language that tells machines what to do. With coding, you can create games, websites, and apps. It teaches you how to think logically and solve problems. Coding is a creative skill for the future. You can build anything you imagine. Just like learning a new language, practice makes perfect. It is fun to see your code come to life.`
    },
    {
        id: '3-20',
        title: 'Travel: Seeing the World',
        content: `Traveling lets you see new places and meet new people. You can visit tall mountains, sandy beaches, or busy cities. Every place has its own story. When you travel, you try new foods and hear new languages. It opens your mind and makes you curious. Even exploring your own city can be an adventure. The world is a big and beautiful book, and those who do not travel read only one page.`
    },
    {
        id: '3-21',
        title: 'Values: The Importance of Honesty',
        content: `Honesty means telling the truth. When you are honest, people trust you. It takes courage to admit a mistake, but it is the right thing to do. Lies can hurt others and make things complicated. Being honest makes you feel light and happy. You do not have to worry about remembering a lie. Truth is the foundation of good character. Always speak the truth with kindness.`
    },
    {
        id: '3-22',
        title: 'Invention: The Light Bulb',
        content: `Thomas Edison is famous for inventing the light bulb. Before that, people used candles and oil lamps. Edison failed many times before he succeeded. He said, "I have not failed. I've just found 10,000 ways that won't work." His hard work changed the world. Now we have light at the turn of a switch. It shows that we should never give up on our ideas. Perseverance leads to success.`
    },
    {
        id: '3-23',
        title: 'Seasons: The Cycle of Nature',
        content: `The year has four seasons: spring, summer, autumn, and winter. In spring, flowers bloom and the world turns green. Summer is hot and perfect for swimming. Autumn brings cool winds and colorful leaves. Winter is cold and sometimes snowy. Each season has its own beauty. The changing seasons remind us that nature is always moving. We can enjoy the special gifts of every time of year.`
    }
];
