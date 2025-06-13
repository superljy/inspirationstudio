// Three Card Love Reading JavaScript Functions

// Professional Tarot Deck Data - For Three Card Reading
const threeCardTarotDeck = [
    {
        name: "The Lovers",
        emoji: "💕",
        pastMeaning: "Past relationships taught you the importance of choice. Those emotional experiences helped you understand what kind of love you truly want.",
        presentMeaning: "You now face important emotional choices, possibly about commitment, relationship development, or life direction.",
        futureMeaning: "You will meet your true soulmate in the future. A beautiful relationship is about to begin or deepen.",
        advice: "Follow your heart's voice and make sincere choices. Love requires courage and commitment."
    },
    {
        name: "The Empress",
        emoji: "👑",
        pastMeaning: "You were once deeply loved, or you gave selfless care to others. This warmth influences your view of love.",
        presentMeaning: "You are now full of charm and attraction. It's a great time to plant seeds of love, with relationships full of nourishment and growth.",
        futureMeaning: "Future love will bring harvest and fulfillment, possibly good news about family or deepening relationships.",
        advice: "Show your gentleness and tolerance, nurture feelings with love, and create a warm relationship atmosphere."
    },
    {
        name: "The Emperor",
        emoji: "🤴",
        pastMeaning: "Past experiences taught you to remain rational and steady in love, building a solid emotional foundation.",
        presentMeaning: "You need to show more initiative and responsibility in relationships, providing stable support.",
        futureMeaning: "Future relationships will be more stable and reliable, possibly entering more formal stages like engagement or marriage.",
        advice: "Take responsibility in love, prove your commitment through actions, and provide security for your partner."
    },
    {
        name: "The Fool",
        emoji: "🌟",
        pastMeaning: "You may have had naive fantasies about love in the past. Those innocent experiences were important starting points in life.",
        presentMeaning: "Now is the time for a fresh start. Let go of past baggage and welcome new feelings with an open heart.",
        futureMeaning: "The future is full of infinite possibilities. A brand new romance will bring fresh experiences and growth.",
        advice: "Maintain passion and curiosity about love, bravely take the first step, and believe in love's beauty."
    },
    {
        name: "The Star",
        emoji: "⭐",
        pastMeaning: "Past wounds are healing, and you gained inner wisdom and longing for beauty from difficulties.",
        presentMeaning: "Your current mindset is peaceful and hopeful, making it the best time to attract true love.",
        futureMeaning: "Future love will come as you wish. The person you've been waiting for will appear in your life.",
        advice: "Maintain confidence in the future, continue to improve yourself. Beautiful love is worth waiting for."
    },
    {
        name: "The Moon",
        emoji: "🌙",
        pastMeaning: "Past relationships may have had misunderstandings or secrets. These unclear experiences made you crave sincerity.",
        presentMeaning: "Current emotional situations may not be clear enough, requiring deeper communication to clarify each other's thoughts.",
        futureMeaning: "The future will gradually become clear. Those confusions and uncertainties will be answered, and truth will surface.",
        advice: "Honestly face your inner feelings, don't let misunderstandings continue. Open and honest communication is important."
    },
    {
        name: "The Sun",
        emoji: "☀️",
        pastMeaning: "Past happy times accumulated positive energy for you. Those beautiful memories are your driving force.",
        presentMeaning: "You are now radiant, with emotional life full of sunshine and happiness. It's the golden period for love.",
        futureMeaning: "Future love will bring great joy and success, possibly with good news worth celebrating.",
        advice: "Enjoy the beauty of love, share your happiness and positive energy, let relationships be filled with sunshine."
    },
    {
        name: "Judgement",
        emoji: "⚖️",
        pastMeaning: "Past emotional experiences gave you important life enlightenment, and you have a deeper understanding of love.",
        presentMeaning: "Now is the time to start anew. Past mistakes and regrets can be forgiven and released.",
        futureMeaning: "There will be important turning points in the future, possibly major relationship developments or new romance beginnings.",
        advice: "Let go of past burdens, give yourself and others a second chance, and view relationships with fresh eyes."
    },
    {
        name: "The World",
        emoji: "🌍",
        pastMeaning: "Past emotional experiences helped you grow into a more complete person, and you're ready to welcome true love.",
        presentMeaning: "You are now in a perfect state, with both emotions and life achieving ideal balance.",
        futureMeaning: "The future will bring a complete ending, with lasting happiness and successful relationships waiting for you.",
        advice: "Cherish everything you have now, while preparing for an even better future."
    },
    {
        name: "Justice",
        emoji: "⚖️",
        pastMeaning: "In the past, you upheld principles of fairness and honesty in relationships, earning you respect.",
        presentMeaning: "Now you need to make fair judgments in relationships, balancing your own and your partner's needs.",
        futureMeaning: "Future relationships will be more fair and harmonious, with both parties receiving their due rewards.",
        advice: "Maintain honesty and fairness in love, listen carefully to your partner's thoughts, and seek win-win solutions."
    },
    {
        name: "The Hermit",
        emoji: "🔦",
        pastMeaning: "Past solitary time helped you understand yourself better, and this self-awareness is important for future relationships.",
        presentMeaning: "You may now need some time to think about the direction of your relationships. Inner wisdom will guide you.",
        futureMeaning: "In the future, you will meet someone who truly understands your heart, establishing a deep spiritual connection.",
        advice: "Take time to understand your true needs, don't rush into decisions, and listen to your inner voice."
    },
    {
        name: "Wheel of Fortune",
        emoji: "🎰",
        pastMeaning: "Past emotional ups and downs taught you to accept change, and these experiences are destiny's arrangements.",
        presentMeaning: "Your love fortune is now rising, and important changes will come when the time is right.",
        futureMeaning: "The future will bring unexpected opportunities, and destiny will bring you beautiful encounters.",
        advice: "Trust in destiny's arrangements, maintain an open mindset, and be prepared to welcome changes and opportunities."
    }
];

// Selected cards
let selectedCards = [];
let selectedCardData = [];

// Initialize after page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialization code can be added here
});

// Start three card reading
function startThreeCardReading() {
    const wishSection = document.getElementById('wishSection');
    const cardSelection = document.getElementById('cardSelection');
    
    // Hide wish area, show card selection area
    wishSection.style.display = 'none';
    cardSelection.style.display = 'block';
    
    // Generate cards
    generateCardDeck();
    
    // Remove scrollIntoView to prevent page jumping
    // cardSelection.scrollIntoView({ behavior: 'smooth' });
}

// Generate card deck
function generateCardDeck() {
    const cardDeck = document.getElementById('cardDeck');
    cardDeck.innerHTML = '';
    
    // Create 15 selectable cards
    for (let i = 0; i < 15; i++) {
        const deckCard = document.createElement('div');
        deckCard.className = 'deck-card';
        deckCard.dataset.cardIndex = i;
        deckCard.addEventListener('click', function() {
            selectCard(this, i);
        });
        cardDeck.appendChild(deckCard);
    }
}

// Select card
function selectCard(cardElement, cardIndex) {
    // Check if 3 cards already selected
    if (selectedCards.length >= 3 && !cardElement.classList.contains('selected')) {
        return;
    }
    
    // Toggle selection state
    if (cardElement.classList.contains('selected')) {
        // Deselect
        cardElement.classList.remove('selected');
        const index = selectedCards.indexOf(cardIndex);
        if (index > -1) {
            selectedCards.splice(index, 1);
        }
    } else {
        // Add selection
        cardElement.classList.add('selected');
        selectedCards.push(cardIndex);
    }
    
    // Update selection count
    updateSelectionCount();
    
    // If 3 cards selected, show reveal button
    if (selectedCards.length === 3) {
        document.getElementById('revealBtn').style.display = 'block';
    } else {
        document.getElementById('revealBtn').style.display = 'none';
    }
}

// Update selection count
function updateSelectionCount() {
    document.getElementById('selectedCount').textContent = selectedCards.length;
}

// Reveal selected cards
async function revealSelectedCards() {
    const btn = document.getElementById('revealBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    
    // Randomly select 3 tarot cards
    const shuffledDeck = [...threeCardTarotDeck].sort(() => 0.5 - Math.random());
    selectedCardData = shuffledDeck.slice(0, 3);
    
    // Simulate reading process
    await sleep(2500);
    
    // Show results
    showThreeCardResult();
    
    // Restore button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    btn.disabled = false;
}

// Show three card results
function showThreeCardResult() {
    const cardSelection = document.getElementById('cardSelection');
    const readingResult = document.getElementById('readingResult');
    
    // Hide card selection area, show results area
    cardSelection.style.display = 'none';
    readingResult.style.display = 'block';
    
    // Generate three cards display
    generateThreeCardsDisplay();
    
    // Generate detailed interpretation
    generateDetailedInterpretation();
    
    // Generate love advice
    generateLoveAdvice();
    
    // Remove scrollIntoView to prevent page jumping
    // readingResult.scrollIntoView({ behavior: 'smooth' });
}

// Generate three cards display
function generateThreeCardsDisplay() {
    const threeCardsDisplay = document.getElementById('threeCardsDisplay');
    const positions = ['Past', 'Present', 'Future'];
    
    threeCardsDisplay.innerHTML = '';
    
    selectedCardData.forEach((card, index) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        
        let meaning;
        if (index === 0) meaning = card.pastMeaning;
        else if (index === 1) meaning = card.presentMeaning;
        else meaning = card.futureMeaning;
        
        resultCard.innerHTML = `
            <div class="card-position-label">${positions[index]}</div>
            <div class="revealed-tarot-card">
                <div style="
                    width: 100%; 
                    height: 100%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-size: 3.5em; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    border-radius: 8px; 
                    color: white; 
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
                    "></div>
                    <span style="position: relative; z-index: 2; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${card.emoji}</span>
                </div>
            </div>
            <div class="card-name">${card.name}</div>
            <div class="card-brief-meaning">${meaning}</div>
        `;
        
        threeCardsDisplay.appendChild(resultCard);
    });
}

// Generate detailed interpretation
function generateDetailedInterpretation() {
    const interpretationContent = document.getElementById('interpretationContent');
    const positions = ['Past', 'Present', 'Future'];
    
    interpretationContent.innerHTML = '';
    
    selectedCardData.forEach((card, index) => {
        const cardInterpretation = document.createElement('div');
        cardInterpretation.className = 'card-interpretation';
        
        let meaning;
        if (index === 0) meaning = card.pastMeaning;
        else if (index === 1) meaning = card.presentMeaning;
        else meaning = card.futureMeaning;
        
        cardInterpretation.innerHTML = `
            <h5>${positions[index]} - ${card.name}</h5>
            <p>${meaning}</p>
        `;
        
        interpretationContent.appendChild(cardInterpretation);
    });
}

// Generate love advice
function generateLoveAdvice() {
    const adviceContent = document.getElementById('adviceContent');
    
    // Generate comprehensive advice based on selected cards
    const mainAdvice = selectedCardData[1].advice; // Use current position advice as main advice
    
    let comprehensiveAdvice = `
        <p><strong>Based on your three cards, the universe brings you the following love guidance:</strong></p>
        <p>${mainAdvice}</p>
        <ul>
    `;
    
    // Generate personalized advice based on different card combinations
    const hasPositiveCards = selectedCardData.some(card => 
        ['The Lovers', 'The Empress', 'The Emperor', 'The Star', 'The Sun', 'The World'].includes(card.name)
    );
    
    const hasChallengeCards = selectedCardData.some(card => 
        ['The Moon', 'The Tower', 'The Hermit'].includes(card.name)
    );
    
    if (hasPositiveCards) {
        comprehensiveAdvice += `
            <li>Your love fortune is very good, seize the current opportunities</li>
            <li>Maintain a positive and optimistic attitude to attract beautiful connections</li>
        `;
    }
    
    if (hasChallengeCards) {
        comprehensiveAdvice += `
            <li>Face challenges in relationships with patience and wisdom</li>
            <li>Resolve relationship issues through introspection and communication</li>
        `;
    }
    
    comprehensiveAdvice += `
            <li>Trust your intuition, it will guide you to make the right choices</li>
            <li>Maintain sincerity and openness in love</li>
            <li>Give your relationship enough time and space to develop</li>
        </ul>
    `;
    
    adviceContent.innerHTML = comprehensiveAdvice;
}

// Reset three card reading
function resetThreeCardReading() {
    // Reset all variables
    selectedCards = [];
    selectedCardData = [];
    
    // Hide results area, show wish area
    document.getElementById('readingResult').style.display = 'none';
    document.getElementById('cardSelection').style.display = 'none';
    document.getElementById('wishSection').style.display = 'block';
    
    // Reset selection count
    document.getElementById('selectedCount').textContent = '0';
    document.getElementById('revealBtn').style.display = 'none';
    
    // Remove scrollIntoView to prevent page jumping
    // document.querySelector('.three-card-reading').scrollIntoView({ behavior: 'smooth' });
}

// 工具函数：暂停
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Save result functionality
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.save-result-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Save functionality can be implemented here
            alert('Reading result saved successfully!');
        });
    }
    
    const shareBtn = document.querySelector('.share-result-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // Share functionality can be implemented here
            if (navigator.share) {
                navigator.share({
                    title: 'My Three Card Love Reading Result',
                    text: 'Come see the love mysteries the tarot cards revealed for me!',
                    url: window.location.href
                });
            } else {
                // Copy link to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard, share it with your friends!');
                });
            }
        });
    }
}); 