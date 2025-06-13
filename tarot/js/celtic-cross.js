// Celtic Cross Love Tarot JavaScript

// Celtic Cross Tarot Cards with Love Meanings
const celticCrossCards = [
    {
        name: "The Lovers",
        meaning: "Divine union, soulmate connection, and harmonious partnership await you.",
        advice: "Trust in the power of love and make choices from your heart."
    },
    {
        name: "The Star",
        meaning: "Hope and healing in love. Your romantic dreams will manifest.",
        advice: "Have faith in love and stay open to new possibilities."
    },
    {
        name: "The Sun",
        meaning: "Joy, success, and celebration illuminate your love life.",
        advice: "Embrace happiness and share your joy with others."
    },
    {
        name: "Ace of Cups",
        meaning: "New love flows into your life, bringing emotional fulfillment.",
        advice: "Open your heart to receive the love that's coming your way."
    },
    {
        name: "Two of Cups",
        meaning: "Perfect partnership and mutual attraction are yours.",
        advice: "Focus on building balanced and harmonious relationships."
    },
    {
        name: "Ten of Cups",
        meaning: "Ultimate happiness and family bliss in love.",
        advice: "Cherish your relationships and work towards lasting happiness."
    },
    {
        name: "Queen of Cups",
        meaning: "Emotional wisdom guides your romantic decisions.",
        advice: "Trust your intuition and emotional intelligence in love."
    },
    {
        name: "The Moon",
        meaning: "Trust your intuition in matters of the heart.",
        advice: "Look beyond surface appearances and trust your inner wisdom."
    },
    {
        name: "Three of Cups",
        meaning: "Celebration, friendship, and joy in love connections.",
        advice: "Surround yourself with supportive friends and celebrate love."
    },
    {
        name: "Knight of Cups",
        meaning: "Romantic gestures and emotional adventures await.",
        advice: "Be open to romantic opportunities and follow your heart."
    }
];

// Celtic Cross Positions
const celticPositions = [
    { position: 1, name: "Present Situation", description: "Your current romantic state" },
    { position: 2, name: "Challenge/Cross", description: "What crosses or challenges you in love" },
    { position: 3, name: "Distant Past/Foundation", description: "Root causes and foundations of your situation" },
    { position: 4, name: "Recent Past", description: "Recent events affecting your love life" },
    { position: 5, name: "Possible Outcome", description: "What could happen in your romantic future" },
    { position: 6, name: "Immediate Future", description: "What's approaching in the near future" },
    { position: 7, name: "Your Approach", description: "How you approach love and relationships" },
    { position: 8, name: "External Influences", description: "How others and environment affect your love life" },
    { position: 9, name: "Hopes and Fears", description: "Your inner hopes and fears about love" },
    { position: 10, name: "Final Outcome", description: "The ultimate result of your romantic journey" }
];

// Current reading state
let celticReading = {
    cards: [],
    selectedCards: 0,
    totalCards: 10,
    isReading: false
};

// Initialize Celtic Cross Reading
function initializeCelticCross() {
    document.addEventListener('DOMContentLoaded', function() {
        setupEventListeners();
        createCelticCrossLayout();
    });
}

// Setup event listeners
function setupEventListeners() {
    // Question selection
    const questionCards = document.querySelectorAll('.question-card');
    questionCards.forEach(card => {
        card.addEventListener('click', function() {
            selectQuestion(this.dataset.question);
        });
    });

    // Start reading button
    const startBtn = document.querySelector('.start-celtic-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startCelticReading);
    }

    // Card click events
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('celtic-card')) {
            selectCard(e.target);
        }
    });
}

// Create Celtic Cross Layout
function createCelticCrossLayout() {
    const layout = document.querySelector('.celtic-cross-layout');
    if (!layout) return;

    layout.innerHTML = '';

    celticPositions.forEach((pos, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `celtic-card card-position-${pos.position}`;
        cardElement.dataset.position = pos.position;
        cardElement.innerHTML = `
            <div class="card-content">🔮</div>
            <div class="position-label">${pos.name}</div>
        `;
        layout.appendChild(cardElement);
    });
}

// Select question type
function selectQuestion(questionType) {
    const questionCards = document.querySelectorAll('.question-card');
    questionCards.forEach(card => card.classList.remove('selected'));
    
    event.target.closest('.question-card').classList.add('selected');
    
    const questions = {
        relationship: "What does the future hold for my current relationship?",
        singlelife: "When and how will I find love?",
        decision: "What should I do about my romantic situation?"
    };
    
    currentReading.question = questions[questionType] || "What guidance do I need about love?";
    
    // Enable start button
    const startBtn = document.querySelector('.start-celtic-btn');
    if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = "Begin Celtic Cross Reading";
    }
}

// Start Celtic Cross Reading
function startCelticReading() {
    if (celticReading.isReading) return;
    
    celticReading.isReading = true;
    celticReading.selectedCards = 0;
    celticReading.cards = [];
    
    // Show reading section
    document.getElementById('celticReading').style.display = 'block';
    document.querySelector('.question-setting').style.display = 'none';
    
    // Generate random cards for each position
    for (let i = 0; i < 10; i++) {
        const randomCard = celticCrossCards[Math.floor(Math.random() * celticCrossCards.length)];
        celticReading.cards.push(randomCard);
    }
    
    // Start progress animation
    startProgressAnimation();
}

// Start progress animation
function startProgressAnimation() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            progressText.textContent = 'Your Celtic Cross is ready! Click each card to reveal your reading...';
            enableCardSelection();
        }
    }, 50);
}

// Enable card selection
function enableCardSelection() {
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => selectCelticCard(card, index));
    });
}

// Select Celtic card
function selectCelticCard(cardElement, index) {
    if (cardElement.classList.contains('revealed')) return;
    
    cardElement.classList.add('revealed');
    cardElement.style.background = 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)';
    cardElement.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 1rem; font-weight: bold; margin-bottom: 5px;">${celticReading.cards[index].name}</div>
            <div style="font-size: 1.5rem;">💫</div>
        </div>
        <div class="position-label">${cardElement.querySelector('.position-label').textContent}</div>
    `;
    
    celticReading.selectedCards++;
    
    if (celticReading.selectedCards === celticReading.totalCards) {
        setTimeout(() => {
            showCelticResults();
        }, 1000);
    }
}

// Show Celtic Cross results
function showCelticResults() {
    const detailedReading = document.getElementById('detailedReading');
    detailedReading.style.display = 'block';
    
    // Generate core analysis
    generateCoreAnalysis();
    
    // Generate timeline analysis
    generateTimelineAnalysis();
    
    // Generate environment analysis
    generateEnvironmentAnalysis();
    
    // Generate comprehensive advice
    generateComprehensiveAdvice();
    
    // Scroll to results - commented out to prevent page jumping
    // detailedReading.scrollIntoView({ behavior: 'smooth' });
}

// Generate core analysis
function generateCoreAnalysis() {
    const coreCards = document.getElementById('coreCards');
    const presentCard = celticReading.cards[0]; // Position 1
    const challengeCard = celticReading.cards[1]; // Position 2
    
    coreCards.innerHTML = `
        <div class="analysis-grid">
            <div class="analysis-card">
                <h4>💎 Present Situation</h4>
                <div class="card-info">
                    <strong>${presentCard.name}</strong>
                    <p>${presentCard.meaning}</p>
                </div>
            </div>
            <div class="analysis-card">
                <h4>⚡ Current Challenge</h4>
                <div class="card-info">
                    <strong>${challengeCard.name}</strong>
                    <p>${challengeCard.meaning}</p>
                </div>
            </div>
        </div>
    `;
}

// Generate timeline analysis
function generateTimelineAnalysis() {
    const timelineCards = document.getElementById('timelineCards');
    const pastCard = celticReading.cards[3]; // Position 4
    const futureCard = celticReading.cards[5]; // Position 6
    
    timelineCards.innerHTML = `
        <div class="timeline-grid">
            <div class="timeline-card">
                <h4>📅 Past Influences</h4>
                <div class="card-info">
                    <strong>${pastCard.name}</strong>
                    <p>${pastCard.meaning}</p>
                </div>
            </div>
            <div class="timeline-card">
                <h4>🔮 Future Path</h4>
                <div class="card-info">
                    <strong>${futureCard.name}</strong>
                    <p>${futureCard.meaning}</p>
                </div>
            </div>
        </div>
    `;
}

// Generate environment analysis
function generateEnvironmentAnalysis() {
    const environmentCards = document.getElementById('environmentCards');
    const innerCard = celticReading.cards[6]; // Position 7
    const externalCard = celticReading.cards[7]; // Position 8
    
    environmentCards.innerHTML = `
        <div class="environment-grid">
            <div class="environment-card">
                <h4>🧘 Inner Self</h4>
                <div class="card-info">
                    <strong>${innerCard.name}</strong>
                    <p>${innerCard.meaning}</p>
                </div>
            </div>
            <div class="environment-card">
                <h4>🌍 External Influences</h4>
                <div class="card-info">
                    <strong>${externalCard.name}</strong>
                    <p>${externalCard.meaning}</p>
                </div>
            </div>
        </div>
    `;
}

// Generate comprehensive advice
function generateComprehensiveAdvice() {
    const comprehensiveAdvice = document.getElementById('comprehensiveAdvice');
    const outcomeCard = celticReading.cards[9]; // Position 10
    
    comprehensiveAdvice.innerHTML = `
        <div class="advice-container">
            <div class="final-outcome">
                <h4>🌟 Final Outcome</h4>
                <div class="card-info">
                    <strong>${outcomeCard.name}</strong>
                    <p>${outcomeCard.meaning}</p>
                </div>
            </div>
            
            <div class="guidance-points">
                <h4>💝 Key Guidance Points</h4>
                <ul class="advice-list">
                    <li>${celticReading.cards[0].advice}</li>
                    <li>${celticReading.cards[2].advice}</li>
                    <li>${celticReading.cards[4].advice}</li>
                    <li>Trust the journey and remain open to love's possibilities.</li>
                </ul>
            </div>
            
            <div class="love-summary">
                <h4>💕 Summary</h4>
                <p>Your Celtic Cross reading reveals a journey of love that encompasses both challenges and beautiful opportunities. 
                The cards show that by staying true to your heart and maintaining faith in love's power, you can navigate 
                through any obstacles toward a fulfilling romantic destiny. Remember that every experience in love teaches 
                us something valuable and brings us closer to our ultimate happiness.</p>
            </div>
        </div>
    `;
}

// Reset Celtic reading
function resetCelticReading() {
    celticReading.isReading = false;
    celticReading.selectedCards = 0;
    celticReading.cards = [];
    
    // Hide reading sections
    document.getElementById('celticReading').style.display = 'none';
    document.getElementById('detailedReading').style.display = 'none';
    
    // Show question section
    document.querySelector('.question-setting').style.display = 'block';
    
    // Reset cards
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach(card => {
        card.classList.remove('revealed');
        card.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        card.innerHTML = `
            <div class="card-back">🔮</div>
            <div class="position-label">${card.querySelector('.position-label').textContent}</div>
        `;
    });
    
    // Reset progress
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = 'Preparing the spread...';
    
    // Scroll to top - commented out to prevent page jumping
    // document.querySelector('.question-setting').scrollIntoView({ behavior: 'smooth' });
}

// Add CSS styles for the reading results
const style = document.createElement('style');
style.textContent = `
    .analysis-grid, .timeline-grid, .environment-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin: 1.5rem 0;
    }
    
    .analysis-card, .timeline-card, .environment-card {
        background: linear-gradient(135deg, #fff5f5 0%, #ffe8f0 100%);
        padding: 2rem;
        border-radius: 15px;
        border-left: 4px solid #fd79a8;
    }
    
    .analysis-card h4, .timeline-card h4, .environment-card h4 {
        color: #e84393;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .card-info strong {
        color: #2d3436;
        font-size: 1.1rem;
        display: block;
        margin-bottom: 0.5rem;
    }
    
    .card-info p {
        color: #636e72;
        line-height: 1.6;
    }
    
    .advice-container {
        display: grid;
        gap: 2rem;
    }
    
    .final-outcome {
        background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
        padding: 2rem;
        border-radius: 15px;
        border-left: 4px solid #e17055;
    }
    
    .final-outcome h4 {
        color: #e17055;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .guidance-points {
        background: linear-gradient(135deg, #e8f4f8 0%, #d1ecf1 100%);
        padding: 2rem;
        border-radius: 15px;
        border-left: 4px solid #17a2b8;
    }
    
    .guidance-points h4 {
        color: #17a2b8;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .advice-list {
        list-style: none;
        padding: 0;
    }
    
    .advice-list li {
        background: rgba(255, 255, 255, 0.8);
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 10px;
        border-left: 3px solid #17a2b8;
        color: #2d3436;
    }
    
    .love-summary {
        background: linear-gradient(135deg, #f0e6ff 0%, #e6ccff 100%);
        padding: 2rem;
        border-radius: 15px;
        border-left: 4px solid #6c5ce7;
    }
    
    .love-summary h4 {
        color: #6c5ce7;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .love-summary p {
        color: #2d3436;
        line-height: 1.7;
        font-size: 1rem;
    }
`;
document.head.appendChild(style);

// Initialize when document loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Celtic Cross Love Tarot initialized');
});

// Export for global access
window.CelticCross = {
    start: startCelticReading,
    reset: resetCelticReading,
    selectQuestion: selectQuestion
}; 