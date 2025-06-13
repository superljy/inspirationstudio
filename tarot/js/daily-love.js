// Daily Love Tarot JavaScript Functions

// Professional Tarot Card Data - Major Arcana Love Meanings
const dailyLoveTarotCards = [
    {
        name: "The Lovers",
        image: "../images/tarot/lovers.jpg",
        meaning: "The Lovers card represents choices in love and deep connections. Today is an important moment for love decisions, whether it's the beginning of a new romance or deepening an existing relationship, you need to feel and choose with your heart.",
        advice: "Today is especially suitable for expressing your true inner thoughts. If you're hesitating about an emotional decision, trust your intuition. Single friends may meet someone who makes your heart flutter, while those in relationships can consider taking things to the next level.",
        actions: [
            "Actively express your feelings",
            "Make important emotional decisions",
            "Have deep communication with your partner",
            "Trust your inner voice"
        ]
    },
    {
        name: "The Empress",
        image: "../images/tarot/empress.jpg",
        meaning: "The Empress card symbolizes feminine energy, fertility, and unconditional love. Today is filled with gentle and caring energy, making it an excellent time to nurture feelings and enjoy the beauty of love.",
        advice: "Show your gentle and caring side, whether you are male or female. Today is suitable for expressing love through thoughtful care, and it's also a good time to receive love from others. Family and emotional security will be today's focus.",
        actions: [
            "Express care through practical actions",
            "Create a warm dating environment",
            "Listen to your partner's inner needs",
            "Enjoy simple moments of love"
        ]
    },
    {
        name: "The Sun",
        image: "../images/tarot/sun.jpg",
        meaning: "The Sun card brings joy, success, and positive energy. Today's love fortune is very bright, full of hope and happiness, making it a beautiful day to enjoy the joy and satisfaction that love brings.",
        advice: "Face your emotional life with a cheerful and positive attitude. Today is especially suitable for doing fun activities with your partner, or if you're single, socialize with confidence and happiness. A sunny smile will be your greatest charm.",
        actions: [
            "Plan a pleasant date",
            "Share happy moments",
            "Maintain a positive and optimistic attitude",
            "Show your charm and confidence"
        ]
    },
    {
        name: "The World",
        image: "../images/tarot/world.jpg",
        meaning: "The World card represents completion, achievement, and harmony. In terms of emotions, this means a perfect ending or an important milestone in a relationship, which is a very auspicious love sign.",
        advice: "Today is the time to reap the fruits in your emotional relationship. It could be the establishment of a new romance or important progress in an existing relationship. Cherish this perfect moment and let love reach new heights.",
        actions: [
            "Celebrate achievements in your relationship",
            "Establish important relationship commitments",
            "Share your feelings of happiness",
            "Plan future emotional goals"
        ]
    },
    {
        name: "The Star",
        image: "../images/tarot/star.jpg",
        meaning: "The Star card symbolizes hope, inspiration, and inner guidance. Today's love energy is full of idealism and beautiful aspirations, making it the best time to plant seeds of love.",
        advice: "Follow your inner voice and intuition. Today is especially suitable for making wishes and setting emotional goals. If you've been waiting for someone or a certain relationship, maintain hope and patience - beautiful things are approaching you.",
        actions: [
            "Make beautiful wishes for love",
            "Trust your intuitive guidance",
            "Maintain hope for love",
            "Feel your inner voice with your heart"
        ]
    },
    {
        name: "The Moon",
        image: "../images/tarot/moon.jpg",
        meaning: "The Moon card reminds us to pay attention to our intuition and subconscious voice. In emotions, there may be some misunderstandings or hidden feelings that need to be clarified, requiring deeper understanding and communication.",
        advice: "Today, pay special attention to the importance of communication. There may be some emotional fog that needs to be cleared, don't be afraid to delve into those complex feelings. Trust your intuition, but also seek the truth.",
        actions: [
            "Clarify misunderstandings in relationships",
            "Explore true feelings deeply",
            "Listen to your intuitive voice",
            "Maintain open communication"
        ]
    },
    {
        name: "Strength",
        image: "../images/tarot/strength.jpg",
        meaning: "The Strength card represents inner courage and gentle power. In emotions, this means handling relationship challenges through patience, understanding, and inner strength.",
        advice: "Handle emotional issues with a gentle yet firm approach. Today is the time to show your inner strength and mature charm. When facing difficulties in relationships, choose tolerance and understanding rather than arguments and confrontation.",
        actions: [
            "Show your inner strength and charm",
            "Use gentleness to resolve emotional conflicts",
            "Maintain patience and understanding",
            "Face challenges with a mature attitude"
        ]
    },
    {
        name: "Judgement",
        image: "../images/tarot/judgement.jpg",
        meaning: "The Judgement card symbolizes rebirth and new beginnings. In terms of emotions, this may mean a re-evaluation of a relationship, or gaining new wisdom and growth from past experiences.",
        advice: "Today is a good time for reflection and renewal. If you've been troubled by a past relationship, now is the time to let go and start fresh. For existing relationships, it's also a good time to re-examine and improve.",
        actions: [
            "Reflect on past emotional experiences",
            "Forgive and let go of past hurts",
            "Give relationships a new beginning",
            "Gain wisdom from experience"
        ]
    }
];

// Daily Love Fortune Content (fixed based on date)
const dailyFortuneContent = [
    {
        single: "Social activities are frequent today, making it easy to meet someone special at friend gatherings. Keep an open mind and actively show your charm.",
        relationship: "Communication flows smoothly between couples, making this a good time to resolve issues. Express your inner thoughts more to deepen mutual understanding.",
        marriage: "Marital feelings are harmonious with a warm family atmosphere. It's suitable for planning the future together and strengthening emotional foundations."
    },
    {
        single: "Your romantic luck is strong today, and you may have unexpected romantic encounters. Trust your first impressions and be brave in expressing your thoughts.",
        relationship: "Your relationship with your partner is developing steadily, suitable for deep communication. You can try some new dating methods.",
        marriage: "Family life is harmonious with perfect understanding between spouses. It's a good time to discuss important decisions."
    },
    {
        single: "Today is suitable for introspection and self-improvement. Attract better relationships by improving yourself. Be patient and wait for the right person to appear.",
        relationship: "You need to give each other more personal space while maintaining independence in the relationship. Avoid excessive dependence.",
        marriage: "Focus on personal growth between spouses and support each other's dreams and goals. Growing together leads to going further."
    },
    {
        single: "A day full of vitality, suitable for participating in various social activities. Your enthusiasm and energy will attract many people's attention.",
        relationship: "Try new things with your partner to inject new vitality into the relationship. An adventurous spirit will make love sweeter.",
        marriage: "Married life needs some new excitement and change. You can plan a romantic trip or try new hobbies together."
    },
    {
        single: "Today you're emotionally sensitive and easily touched by others' care. Learn to distinguish between genuine and false kindness.",
        relationship: "You need more emotional support and understanding. Share your vulnerabilities with your partner to increase mutual trust.",
        marriage: "Family harmony requires effort and tolerance from both parties. More understanding and consideration, less blame and demands."
    }
];

// Love Index and Related Data
const dailyLoveData = [
    { index: "85%", moon: "Waxing Moon - New Beginnings", color: "Rose Pink" },
    { index: "92%", moon: "Full Moon - Perfect Moment", color: "Rose Gold" },
    { index: "78%", moon: "Waning Moon - Releasing the Past", color: "Lavender Purple" },
    { index: "88%", moon: "New Moon - New Opportunities", color: "Coral Pink" },
    { index: "81%", moon: "Crescent Moon - Growth Period", color: "Peach Blossom Pink" }
];

// Initialize after page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDailyContent();
    initializeTodayReaders();
    setupCardSelection();
});

// Initialize daily content (fixed based on date)
function initializeDailyContent() {
    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const seed = hashCode(dateString);
    
    // Set today's love data
    const dataIndex = Math.abs(seed) % dailyLoveData.length;
    const todayData = dailyLoveData[dataIndex];
    
    const loveIndexEl = document.getElementById('dailyLoveIndex');
    const moonPhaseEl = document.getElementById('moonPhase');
    const luckyColorEl = document.getElementById('luckyColor');
    
    if (loveIndexEl) loveIndexEl.textContent = todayData.index;
    if (moonPhaseEl) moonPhaseEl.textContent = todayData.moon;
    if (luckyColorEl) luckyColorEl.textContent = todayData.color;
    
    // Set today's fortune content
    const fortuneIndex = Math.abs(seed * 2) % dailyFortuneContent.length;
    const todayFortune = dailyFortuneContent[fortuneIndex];
    
    const singleFortuneEl = document.getElementById('singleFortune');
    const relationshipFortuneEl = document.getElementById('relationshipFortune');
    const marriageFortuneEl = document.getElementById('marriageFortune');
    
    if (singleFortuneEl) singleFortuneEl.textContent = todayFortune.single;
    if (relationshipFortuneEl) relationshipFortuneEl.textContent = todayFortune.relationship;
    if (marriageFortuneEl) marriageFortuneEl.textContent = todayFortune.marriage;
}

// Initialize today's readers count (dynamically growing based on time)
function initializeTodayReaders() {
    const todayReadersEl = document.getElementById('todayReaders');
    if (!todayReadersEl) return;
    
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    
    // Calculate today's reader count based on time
    const baseReaders = 1250;
    const hourlyIncrease = hour * 45;
    const minuteIncrease = Math.floor(minute / 10) * 8;
    const totalReaders = baseReaders + hourlyIncrease + minuteIncrease;
    
    // Animate number display
    animateNumber(todayReadersEl, 0, totalReaders, 2000);
}

// Number animation effect
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Set up card selection functionality
function setupCardSelection() {
    const cards = document.querySelectorAll('.daily-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('selected')) return;
            
            // Remove selected state from other cards
            cards.forEach(c => c.classList.remove('selected'));
            
            // Select current card
            this.classList.add('selected');
            
            // Delay showing results
            setTimeout(() => {
                showDailyReading(parseInt(this.dataset.card));
            }, 1000);
        });
    });
}

// Show daily reading results
function showDailyReading(cardIndex) {
    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const seed = hashCode(dateString);
    
    // Select today's card based on date and card index
    const dailyCardIndex = Math.abs(seed + cardIndex) % dailyLoveTarotCards.length;
    const selectedCard = dailyLoveTarotCards[dailyCardIndex];
    
    // Update result display
    const cardImageEl = document.getElementById('selectedCardImage');
    if (cardImageEl.tagName === 'IMG') {
        cardImageEl.src = selectedCard.image;
        cardImageEl.alt = selectedCard.name;
    } else {
        // If it's a div with emoji, just show the card name
        cardImageEl.innerHTML = '✨';
    }
    
    document.getElementById('selectedCardName').textContent = selectedCard.name;
    document.getElementById('cardMeaning').textContent = selectedCard.meaning;
    document.getElementById('loveAdvice').textContent = selectedCard.advice;
    
    // Update action guide
    const actionGuideEl = document.getElementById('actionGuide');
    actionGuideEl.innerHTML = '';
    selectedCard.actions.forEach(action => {
        const li = document.createElement('li');
        li.textContent = action;
        actionGuideEl.appendChild(li);
    });
    
    // Show result area
    const resultEl = document.getElementById('readingResult');
    resultEl.style.display = 'block';
    // Commented out to prevent page jumping
    // resultEl.scrollIntoView({ behavior: 'smooth' });
    
    // Add particle effect
    createParticleEffect();
}

// Reset reading
function resetReading() {
    const cards = document.querySelectorAll('.daily-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    const resultEl = document.getElementById('readingResult');
    resultEl.style.display = 'none';
    
    // Commented out to prevent page jumping
    // document.getElementById('cardSelection').scrollIntoView({ behavior: 'smooth' });
}

// Create particle effect
function createParticleEffect() {
    const particles = [];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '💖';
        particle.style.position = 'fixed';
        particle.style.fontSize = Math.random() * 20 + 15 + 'px';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        // Float up animation
        const animation = particle.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: particle.style.opacity },
            { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'ease-out'
        });
        
        animation.addEventListener('finish', () => {
            particle.remove();
        });
    }
}

// Hash function for date-based randomization
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
} 