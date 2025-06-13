// Future Love Tarot JavaScript

// Future Love Tarot Cards
const futureLoveCards = [
    {
        name: "The Star",
        nearFuture: "A period of renewed hope and healing in love is approaching. You're entering a phase where your romantic dreams become more attainable.",
        midFuture: "Deep spiritual connections and meaningful relationships will flourish. Your authentic self attracts the right kind of love.",
        distantFuture: "Your love life becomes a source of inspiration for others. You achieve the romantic fulfillment you've always dreamed of."
    },
    {
        name: "The Sun",
        nearFuture: "Joyful romantic encounters and celebrations in love are coming soon. Happiness and optimism will light up your love life.",
        midFuture: "A relationship brings immense joy and public recognition. Your love story becomes one of celebration and success.",
        distantFuture: "Lasting happiness and a love that brings continuous joy. Your romantic future shines bright with possibilities."
    },
    {
        name: "The Lovers",
        nearFuture: "Important romantic choices and soul connections are on the horizon. A significant love decision will present itself.",
        midFuture: "Deep soul mate connections and harmonious partnerships develop. True love finds its way into your life.",
        distantFuture: "Divine union and perfect partnership. Your soul finds its perfect complement for lifelong happiness."
    },
    {
        name: "Ace of Cups",
        nearFuture: "New love opportunities overflow into your life. Your heart opens to receive beautiful emotional gifts.",
        midFuture: "Emotional fulfillment and deep romantic satisfaction. Your cup of love runs over with blessings.",
        distantFuture: "A legacy of love that touches many lives. Your romantic journey becomes a wellspring of wisdom and joy."
    },
    {
        name: "Two of Cups",
        nearFuture: "Mutual attraction and balanced partnerships emerge. Someone special notices and appreciates you deeply.",
        midFuture: "Perfect partnership and emotional harmony dominate your love life. Balance and equality create lasting bonds.",
        distantFuture: "A relationship that serves as a model of perfect love. Your partnership inspires others and creates lasting legacy."
    },
    {
        name: "Ten of Cups",
        nearFuture: "Family happiness and emotional fulfillment approach. Love brings you closer to your ideal life vision.",
        midFuture: "Complete emotional satisfaction and family bliss. Your romantic dreams manifest into beautiful reality.",
        distantFuture: "Ultimate happiness and generational love. Your love story becomes a blessing that extends to future generations."
    },
    {
        name: "The Empress",
        nearFuture: "Fertile ground for love and creative partnerships. Your natural magnetism attracts abundant romantic opportunities.",
        midFuture: "Nurturing relationships and creative collaborations flourish. Love becomes a source of creative inspiration.",
        distantFuture: "You become a source of love and wisdom for others. Your romantic maturity creates lasting positive impact."
    },
    {
        name: "The Wheel of Fortune",
        nearFuture: "Lucky breaks and positive changes in love are turning your way. Destiny brings unexpected romantic opportunities.",
        midFuture: "Major positive cycles in love bring lasting changes. Your romantic fortunes take a significant upward turn.",
        distantFuture: "Your love story becomes part of a greater divine plan. Destiny and choice combine to create perfect timing."
    }
];

// Current reading state
let futureReading = {
    selectedCards: [],
    revealedCards: 0,
    isComplete: false
};

// Initialize Future Love Reading
function initializeFutureReading() {
    // Generate three random cards for the reading
    futureReading.selectedCards = [];
    for (let i = 0; i < 3; i++) {
        const randomCard = futureLoveCards[Math.floor(Math.random() * futureLoveCards.length)];
        futureReading.selectedCards.push(randomCard);
    }
    futureReading.revealedCards = 0;
    futureReading.isComplete = false;
}

// Reveal individual card
function revealCard(cardIndex, timeframe) {
    const card = futureReading.selectedCards[cardIndex];
    if (!card) return;
    
    const cardElement = document.querySelectorAll('.future-card')[cardIndex];
    const resultElement = document.getElementById(`${timeframe}Result`);
    
    if (cardElement.classList.contains('revealed')) return;
    
    // Mark card as revealed
    cardElement.classList.add('revealed');
    cardElement.innerHTML = '✨';
    cardElement.style.background = 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)';
    
    // Show result based on timeframe
    let meaning = '';
    switch (timeframe) {
        case 'near':
            meaning = card.nearFuture;
            break;
        case 'mid':
            meaning = card.midFuture;
            break;
        case 'distant':
            meaning = card.distantFuture;
            break;
    }
    
    resultElement.innerHTML = `
        <div class="card-interpretation">
            <h4>🌟 ${card.name}</h4>
            <p>${meaning}</p>
        </div>
    `;
    resultElement.style.display = 'block';
    
    futureReading.revealedCards++;
    
    // Check if all cards are revealed
    if (futureReading.revealedCards === 3) {
        showCompleteReading();
    }
}

// Reveal all cards at once
function revealAllCards() {
    const timeframes = ['near', 'mid', 'distant'];
    
    timeframes.forEach((timeframe, index) => {
        setTimeout(() => {
            revealCard(index, timeframe);
        }, index * 500); // Stagger the reveals
    });
    
    // Hide the reveal all button
    document.getElementById('revealAllBtn').style.display = 'none';
}

// Show complete reading results
function showCompleteReading() {
    const readingResults = document.getElementById('readingResults');
    const overallForecast = document.getElementById('overallForecast');
    
    if (!readingResults || !overallForecast) return;
    
    const forecast = generateOverallForecast();
    overallForecast.innerHTML = forecast;
    readingResults.style.display = 'block';
    
    // Hide reveal all button if it's still visible
    const revealBtn = document.getElementById('revealAllBtn');
    if (revealBtn) {
        revealBtn.style.display = 'none';
    }
    
    futureReading.isComplete = true;
}

// Generate overall forecast
function generateOverallForecast() {
    const cards = futureReading.selectedCards;
    
    return `
        <div class="forecast-overview">
            <div class="forecast-summary">
                <h4>💫 Your Love Journey Ahead</h4>
                <p>Your romantic future unfolds in beautiful phases, each bringing its own gifts and opportunities. 
                The cards reveal a journey of growth, connection, and ultimate fulfillment in love.</p>
            </div>
            
            <div class="timeline-forecast">
                <div class="forecast-period">
                    <h5>🌱 Immediate Future (1-6 months)</h5>
                    <p><strong>${cards[0].name}</strong> brings ${cards[0].nearFuture.toLowerCase()}</p>
                </div>
                
                <div class="forecast-period">
                    <h5>🌻 Developing Future (6-18 months)</h5>
                    <p><strong>${cards[1].name}</strong> shows ${cards[1].midFuture.toLowerCase()}</p>
                </div>
                
                <div class="forecast-period">
                    <h5>🌺 Long-term Future (2+ years)</h5>
                    <p><strong>${cards[2].name}</strong> promises ${cards[2].distantFuture.toLowerCase()}</p>
                </div>
            </div>
            
            <div class="love-guidance">
                <h4>💝 Key Guidance for Your Journey</h4>
                <ul>
                    <li>Trust in the natural timing of love and remain open to unexpected opportunities</li>
                    <li>Focus on personal growth and self-love to attract your highest romantic potential</li>
                    <li>Stay optimistic about love, even during challenging periods - they lead to greater happiness</li>
                    <li>Pay attention to synchronicities and signs that guide you toward your romantic destiny</li>
                </ul>
            </div>
        </div>
    `;
}

// Add CSS styles for the reading
const style = document.createElement('style');
style.textContent = `
    .future-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .future-card:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    .future-card.revealed {
        animation: cardReveal 0.6s ease-out;
    }
    
    @keyframes cardReveal {
        0% { transform: rotateY(180deg); }
        100% { transform: rotateY(0deg); }
    }
    
    .card-interpretation {
        background: linear-gradient(135deg, #fff5f5 0%, #ffe8f0 100%);
        padding: 1.5rem;
        border-radius: 15px;
        margin-top: 1rem;
        border-left: 4px solid #fd79a8;
    }
    
    .card-interpretation h4 {
        color: #e84393;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .card-interpretation p {
        color: #2d3436;
        line-height: 1.6;
    }
    
    .forecast-overview {
        display: grid;
        gap: 2rem;
    }
    
    .forecast-summary {
        background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        border-left: 4px solid #00b894;
    }
    
    .forecast-summary h4 {
        color: #00b894;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .forecast-summary p{
        color: #666;
    }
    .timeline-forecast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .forecast-period {
        background: linear-gradient(135deg, #e8f4f8 0%, #d1ecf1 100%);
        padding: 1.5rem;
        border-radius: 15px;
        border-left: 4px solid #17a2b8;
    }
    
    .forecast-period h5 {
        color: #17a2b8;
        margin-bottom: 1rem;
        font-size: 1.1rem;
    }
    
    .forecast-period p {
        color: #2d3436;
        line-height: 1.5;
    }
    
    .love-guidance {
        background: linear-gradient(135deg, #f0e6ff 0%, #e6ccff 100%);
        padding: 2rem;
        border-radius: 15px;
        border-left: 4px solid #6c5ce7;
    }
    
    .love-guidance h4 {
        color: #6c5ce7;
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .love-guidance ul {
        list-style: none;
        padding: 0;
    }
    
    .love-guidance li {
        background: rgba(255, 255, 255, 0.8);
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 10px;
        border-left: 3px solid #6c5ce7;
        color: #2d3436;
    }
    
    .reveal-all-btn {
        background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        margin: 2rem auto;
        display: block;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(253, 121, 168, 0.3);
    }
    
    .reveal-all-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(253, 121, 168, 0.4);
    }
    
    .future-reading-result {
        display: none;
        margin-top: 3rem;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeFutureReading();
    console.log('Future Love Tarot initialized');
});

// Export for global access
window.FutureLove = {
    revealCard: revealCard,
    revealAllCards: revealAllCards,
    initializeReading: initializeFutureReading
}; 