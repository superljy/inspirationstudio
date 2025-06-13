// Relationship Analysis JavaScript Functions

// Professional Tarot Cards Data - Specialized for Relationship Analysis
const relationshipTarotCards = [
    {
        name: "The Lovers",
        image: "💕",
        meaning: "Represents choice and commitment. In relationships, this card suggests an important decision moment, possibly about deepening commitment or entering a new relationship phase.",
        relationshipMeaning: "You are facing important choices in your relationship that may determine its future direction.",
        advice: "Face your feelings honestly and make choices that align with your heart's true desires."
    },
    {
        name: "The Empress",
        image: "👑",
        meaning: "Symbolizes nurturing and care. In relationships, represents warmth, acceptance, and unconditional love.",
        relationshipMeaning: "Your relationship is filled with warmth and care, with one or both partners lovingly nurturing the bond.",
        advice: "Continue to nurture the relationship with love and patience, creating more tender moments together."
    },
    {
        name: "The Emperor",
        image: "⚔️",
        meaning: "Represents stability and protection. In relationships, symbolizes security and reliable commitment.",
        relationshipMeaning: "Your relationship has a solid foundation with strong protective instincts and sense of responsibility.",
        advice: "While providing security, remember to give your partner appropriate freedom and space."
    },
    {
        name: "The Tower",
        image: "⚡",
        meaning: "Represents sudden change and upheaval. In relationships, may indicate crisis or major turning points.",
        relationshipMeaning: "Your relationship may be experiencing or about to experience major changes that require reassessing your positions.",
        advice: "Accept change and transform crisis into an opportunity for new beginnings."
    },
    {
        name: "The Star",
        image: "⭐",
        meaning: "Symbolizes hope and healing. In relationships, represents renewed hope and a bright future.",
        relationshipMeaning: "After difficult times, your relationship is regaining vitality and filled with new hope.",
        advice: "Maintain faith in the future and face relationship challenges with a positive attitude."
    },
    {
        name: "The Moon",
        image: "🌙",
        meaning: "Represents subconscious fears and uncertainty. In relationships, there may be misunderstandings or hidden issues.",
        relationshipMeaning: "There are unclear areas in your relationship that need deeper communication to clarify.",
        advice: "Honestly express your inner concerns and don't let misunderstandings continue to fester."
    },
    {
        name: "The Sun",
        image: "☀️",
        meaning: "Symbolizes joy and success. In relationships, represents harmony, joy, and a bright future.",
        relationshipMeaning: "Your relationship is in a very positive state, filled with happiness and satisfaction.",
        advice: "Enjoy this wonderful time while not forgetting to continue nurturing the relationship."
    },
    {
        name: "Judgement",
        image: "🎺",
        meaning: "Represents rebirth and awakening. In relationships, suggests new beginnings or important cognitive changes.",
        relationshipMeaning: "Your relationship is undergoing important transformation, possibly a time to rediscover each other.",
        advice: "Let go of past baggage and view this relationship with fresh perspective."
    },
    {
        name: "The World",
        image: "🌍",
        meaning: "Symbolizes completion and fulfillment. In relationships, represents reaching new milestones or perfect harmony.",
        relationshipMeaning: "Your relationship has reached an important stage where both feel satisfied and complete.",
        advice: "Cherish this fulfillment while preparing for the next phase."
    },
    {
        name: "Strength",
        image: "🦁",
        meaning: "Represents inner strength and gentle control. In relationships, symbolizes overcoming difficulties through patience and understanding.",
        relationshipMeaning: "Through inner strength and gentle approaches, you can resolve conflicts in your relationship.",
        advice: "Handle relationship issues with gentle but firm methods, avoiding harsh confrontation."
    },
    {
        name: "The Hermit",
        image: "🏮",
        meaning: "Symbolizes introspection and seeking answers. In relationships, may need alone time to clarify thoughts.",
        relationshipMeaning: "You may need some personal space to think about the relationship's direction.",
        advice: "Give each other some alone time to find the relationship's true needs through introspection."
    },
    {
        name: "Wheel of Fortune",
        image: "🎡",
        meaning: "Represents destiny's turning points and cycles. In relationships, suggests important changes are coming.",
        relationshipMeaning: "Your relationship is at a turning point; change is inevitable.",
        advice: "Embrace change and trust that these changes will bring better results."
    }
];

// Relationship Analysis Spread Configuration
const relationshipSpreads = {
    current: {
        name: "Current Status",
        description: "5-card deep analysis of your current relationship state",
        positions: [
            { name: "Your Feelings", description: "Your true feelings about this relationship" },
            { name: "Their Feelings", description: "Your partner's attitude toward this relationship" },
            { name: "Current State", description: "The actual status of your relationship" },
            { name: "Influencing Factors", description: "External factors affecting relationship development" },
            { name: "Development Advice", description: "Direction and suggestions for relationship improvement" }
        ]
    },
    deep: {
        name: "Deep Analysis",
        description: "7-card comprehensive analysis of all relationship aspects",
        positions: [
            { name: "Foundation", description: "The fundamental basis of your relationship" },
            { name: "Emotional Connection", description: "The emotional bond between you" },
            { name: "Communication", description: "Your communication patterns and effectiveness" },
            { name: "Challenges", description: "Main challenges facing your relationship" },
            { name: "Hidden Factors", description: "Underlying factors affecting the relationship" },
            { name: "Growth Potential", description: "The relationship's potential for growth" },
            { name: "Final Outcome", description: "The most likely direction of your relationship" }
        ]
    },
    challenge: {
        name: "Problem Solving",
        description: "6-card focused analysis for solving specific relationship issues",
        positions: [
            { name: "Root Cause", description: "The fundamental cause of relationship problems" },
            { name: "Your Role", description: "Your part in the problem" },
            { name: "Their Role", description: "Your partner's part in the problem" },
            { name: "Solution", description: "Specific methods to solve the problem" },
            { name: "Changes Needed", description: "Changes that need to be made" },
            { name: "Final Result", description: "The situation after problem resolution" }
        ]
    }
};

// Relationship Analysis Result Templates
const relationshipAnalysis = {
    high: {
        emotional: { min: 80, max: 95 },
        communication: { min: 75, max: 90 },
        stability: { min: 85, max: 95 },
        description: "Your relationship is very healthy and harmonious with deep emotional connection and excellent communication. This relationship has great potential for development.",
        advice: [
            { title: "Cherish What You Have", content: "You already have a great relationship foundation - treasure and continue to nurture it." },
            { title: "Grow Together", content: "Set mutual goals and support each other's growth within the relationship." },
            { title: "Keep It Fresh", content: "Don't let the relationship become too routine - maintain some novelty and surprises." }
        ],
        future: "If you continue to maintain your current state, you're very likely to develop into a long-term stable relationship, possibly leading to marriage."
    },
    medium: {
        emotional: { min: 60, max: 80 },
        communication: { min: 55, max: 75 },
        stability: { min: 65, max: 80 },
        description: "Your relationship has a solid foundation but still has room for improvement. Through effort and communication, the relationship can reach new heights.",
        advice: [
            { title: "Strengthen Communication", content: "Spend more time in deep conversation to understand each other's thoughts and feelings." },
            { title: "Resolve Differences", content: "Face existing problems in the relationship head-on and actively seek solutions." },
            { title: "Deepen Understanding", content: "Learn more about each other's needs and expectations to enhance mutual understanding." }
        ],
        future: "Through mutual effort, there's great room for improvement and potential development into a more stable long-term relationship."
    },
    low: {
        emotional: { min: 30, max: 60 },
        communication: { min: 25, max: 55 },
        stability: { min: 35, max: 65 },
        description: "Your relationship currently faces some challenges that need serious review and improvement. However, if both parties are willing, the relationship can still be salvaged.",
        advice: [
            { title: "Open Honesty", content: "Honestly discuss problems in the relationship without avoiding or hiding issues." },
            { title: "Seek Help", content: "If needed, seek professional relationship counseling or advice from friends." },
            { title: "Re-evaluate", content: "Seriously consider whether this relationship is worth continued investment of time and energy." }
        ],
        future: "The relationship's future is uncertain and requires significant effort from both parties to improve the current situation."
    }
};

// Initialize after page loads
document.addEventListener('DOMContentLoaded', function() {
    setupSpreadSelection();
});

// Setup spread selection
function setupSpreadSelection() {
    const spreadCards = document.querySelectorAll('.spread-card');
    spreadCards.forEach(card => {
        const button = card.querySelector('.choose-spread-btn');
        button.addEventListener('click', function() {
            const spreadType = card.dataset.spread;
            startRelationshipReading(spreadType);
        });
    });
}

// Start relationship analysis
function startRelationshipReading(spreadType) {
    const processSection = document.getElementById('readingProcess');
    const spreadConfig = relationshipSpreads[spreadType];
    
    // Update title and description
    document.getElementById('processTitle').textContent = spreadConfig.name;
    document.getElementById('processDescription').textContent = 'Preparing your professional relationship analysis...';
    
    // Show process area
    processSection.style.display = 'block';
    // Commented out to prevent page jumping
    // processSection.scrollIntoView({ behavior: 'smooth' });
    
    // Start analysis process
    performRelationshipAnalysis(spreadType, spreadConfig);
}

// Perform relationship analysis
async function performRelationshipAnalysis(spreadType, spreadConfig) {
    // Step 1: Set up spread
    updateProgress(20, 'Setting up tarot spread...');
    await sleep(1000);
    
    setupTarotSpread(spreadType, spreadConfig);
    
    // Step 2: Draw cards
    updateProgress(40, 'Drawing guidance cards for you...');
    await sleep(1500);
    
    const selectedCards = selectCards(spreadConfig.positions.length);
    
    // Step 3: Reveal cards
    updateProgress(60, 'Interpreting card messages...');
    await sleep(1000);
    
    await revealCards(selectedCards);
    
    // Step 4: Generate analysis
    updateProgress(80, 'Generating detailed analysis report...');
    await sleep(1500);
    
    const analysis = generateRelationshipAnalysis(selectedCards, spreadConfig);
    
    // Step 5: Show results
    updateProgress(100, 'Analysis complete!');
    await sleep(500);
    
    displayAnalysisResult(analysis);
}

// Update progress
function updateProgress(percentage, description) {
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('processDescription').textContent = description;
}

// Setup tarot spread
function setupTarotSpread(spreadType, spreadConfig) {
    const spreadContainer = document.getElementById('tarotSpread');
    const layoutClass = `spread-layout-${spreadType}`;
    
    spreadContainer.innerHTML = '';
    spreadContainer.className = `tarot-spread ${layoutClass}`;
    
    // Create cards
    spreadConfig.positions.forEach((position, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'tarot-card';
        cardElement.dataset.position = index;
        cardElement.innerHTML = `
            <div class="card-back">
                <div class="card-pattern"></div>
            </div>
        `;
        
        // Add position label
        const label = document.createElement('div');
        label.className = 'position-label';
        label.textContent = position.name;
        label.style.cssText = `
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: #87ceeb;
            font-size: 0.9rem;
            text-align: center;
            white-space: nowrap;
        `;
        cardElement.appendChild(label);
        
        spreadContainer.appendChild(cardElement);
    });
}

// Select cards
function selectCards(count) {
    const shuffled = [...relationshipTarotCards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Reveal cards
async function revealCards(selectedCards) {
    const cards = document.querySelectorAll('.tarot-card');
    
    for (let i = 0; i < cards.length; i++) {
        await sleep(500);
        
        const card = cards[i];
        const cardData = selectedCards[i];
        
        // Flip card animation
        card.style.transform = 'rotateY(180deg)';
        
        setTimeout(() => {
            card.classList.add('flipped');
            card.innerHTML = `
                <div class="tarot-card-image">${cardData.image}</div>
                <div class="card-name" style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">${cardData.name}</div>
            `;
        }, 150);
    }
}

// Generate relationship analysis
function generateRelationshipAnalysis(selectedCards, spreadConfig) {
    // Calculate relationship quality scores
    const scores = calculateRelationshipScores(selectedCards);
    
    // Determine relationship level
    const avgScore = (scores.emotional + scores.communication + scores.stability) / 3;
    let level;
    if (avgScore >= 75) level = 'high';
    else if (avgScore >= 55) level = 'medium';
    else level = 'low';
    
    const template = relationshipAnalysis[level];
    
    return {
        scores,
        level,
        description: template.description,
        advice: template.advice,
        future: template.future,
        cards: selectedCards,
        positions: spreadConfig.positions,
        interpretation: generateDetailedInterpretation(selectedCards, spreadConfig.positions)
    };
}

// Calculate relationship scores
function calculateRelationshipScores(cards) {
    const positiveCards = ['The Lovers', 'The Empress', 'The Emperor', 'The Star', 'The Sun', 'The World', 'Strength'];
    const neutralCards = ['The Hermit', 'Wheel of Fortune', 'Judgement'];
    const challengingCards = ['The Tower', 'The Moon'];
    
    let baseScore = 60;
    let emotionalBonus = 0;
    let communicationBonus = 0;
    let stabilityBonus = 0;
    
    cards.forEach((card, index) => {
        let cardScore = 0;
        
        if (positiveCards.includes(card.name)) cardScore = 15;
        else if (neutralCards.includes(card.name)) cardScore = 8;
        else if (challengingCards.includes(card.name)) cardScore = -5;
        
        // Adjust score based on position
        if (index < 2) emotionalBonus += cardScore; // First two cards affect emotion
        if (index === 2 || index === 3) communicationBonus += cardScore; // Middle cards affect communication
        if (index >= cards.length - 2) stabilityBonus += cardScore; // Last cards affect stability
    });
    
    return {
        emotional: Math.max(20, Math.min(95, baseScore + emotionalBonus + Math.random() * 10)),
        communication: Math.max(20, Math.min(95, baseScore + communicationBonus + Math.random() * 10)),
        stability: Math.max(20, Math.min(95, baseScore + stabilityBonus + Math.random() * 10))
    };
}

// Generate detailed interpretation
function generateDetailedInterpretation(cards, positions) {
    return cards.map((card, index) => ({
        position: positions[index].name,
        card: card.name,
        meaning: card.relationshipMeaning,
        advice: card.advice
    }));
}

// Display analysis results
function displayAnalysisResult(analysis) {
    const resultSection = document.getElementById('analysisResult');
    
    // Display relationship status indicators
    animateIndicators(analysis.scores);
    
    // Display detailed interpretation
    displayDetailedInterpretation(analysis.interpretation);
    
    // Display advice
    displayRelationshipAdvice(analysis.advice);
    
    // Display future outlook
    displayFutureOutlook(analysis.future);
    
    // Show results area
    resultSection.style.display = 'block';
    // Commented out to prevent page jumping
    // resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Animate indicators display
function animateIndicators(scores) {
    const indicators = [
        { id: 'emotionDepth', value: 'emotionValue', score: Math.round(scores.emotional) },
        { id: 'communicationQuality', value: 'communicationValue', score: Math.round(scores.communication) },
        { id: 'relationshipStability', value: 'stabilityValue', score: Math.round(scores.stability) }
    ];
    
    indicators.forEach((indicator, index) => {
        setTimeout(() => {
            const fillElement = document.getElementById(indicator.id);
            const valueElement = document.getElementById(indicator.value);
            
            fillElement.style.width = indicator.score + '%';
            
            // Animate numbers
            let currentValue = 0;
            const targetValue = indicator.score;
            const increment = targetValue / 50;
            
            const valueAnimation = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(valueAnimation);
                }
                valueElement.textContent = Math.round(currentValue) + '%';
            }, 30);
            
        }, index * 500);
    });
}

// Display detailed interpretation
function displayDetailedInterpretation(interpretation) {
    const container = document.getElementById('detailedInterpretation');
    container.innerHTML = '';
    
    interpretation.forEach(item => {
        const meaningDiv = document.createElement('div');
        meaningDiv.className = 'card-meaning';
        meaningDiv.innerHTML = `
            <h5>${item.position} - ${item.card}</h5>
            <p>${item.meaning}</p>
            <p><strong>Advice:</strong> ${item.advice}</p>
        `;
        container.appendChild(meaningDiv);
    });
}

// Display relationship advice
function displayRelationshipAdvice(advice) {
    const container = document.getElementById('relationshipAdvice');
    container.innerHTML = '';
    
    advice.forEach(item => {
        const adviceDiv = document.createElement('div');
        adviceDiv.className = 'advice-item';
        adviceDiv.innerHTML = `
            <h5>${item.title}</h5>
            <p>${item.content}</p>
        `;
        container.appendChild(adviceDiv);
    });
}

// Display future outlook
function displayFutureOutlook(future) {
    const container = document.getElementById('futureOutlook');
    container.innerHTML = `
        <div class="future-timeline">
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h4>Relationship Outlook</h4>
                    <p>${future}</p>
                </div>
            </div>
        </div>
    `;
}

// Reset analysis
function resetReading() {
    const processSection = document.getElementById('readingProcess');
    const resultSection = document.getElementById('analysisResult');
    
    processSection.style.display = 'none';
    resultSection.style.display = 'none';
    
    // Reset progress
    document.getElementById('progressFill').style.width = '0%';
    
    // Scroll back to spread selection area - commented out to prevent page jumping
    // document.querySelector('.relationship-reading').scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} 